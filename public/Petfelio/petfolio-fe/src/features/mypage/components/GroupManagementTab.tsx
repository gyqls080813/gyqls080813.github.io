'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ConfirmModal from '@/shared/components/common/ConfirmModal';
import { Card } from '@/shared/components/common/Card';
import { ListRow } from '@/shared/components/common/ListRow';
import { getInviteCode, refreshInviteCode, getGroupMembers, delegateHost, kickMember, leaveGroup } from '@/features/group/api/group';
import { request } from '@/api/request';
import type { GroupMember } from '@/features/group/types/group';
import { InviteCodeSection } from './group/InviteCodeSection';
import { MemberListSection } from './group/MemberListSection';
import { LeaveGroupSection } from './group/LeaveGroupSection';
import accountWithDog from '@/shared/components/ui/category/account_with_dog.png';

export function GroupManagementTab() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [myRole, setMyRole] = useState('');
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [leaveSheetOpen, setLeaveSheetOpen] = useState(false);
  const [kickTarget, setKickTarget] = useState<GroupMember | null>(null);
  const [delegateTarget, setDelegateTarget] = useState<GroupMember | null>(null);

  const isHost = myRole === 'HOST';

  // ── 데이터 로딩 ──
  const loadData = useCallback(async () => {
    try {
      // 1. /api/v1/users/me 로 그룹 소속 여부 확인
      const userRes = await request<{ status: number; data: { userId: number; role?: string; groupId?: number | null; groupName?: string | null } }>(
        '/api/v1/users/me', 'GET'
      );
      const user = userRes.data;

      // 2. 그룹에 소속되어 있으면 멤버 + 초대코드 조회
      if (user?.groupId) {
        setGroupName(user.groupName || `그룹 #${user.groupId}`);

        const results = await Promise.allSettled([
          getGroupMembers(),
          getInviteCode(),
        ]);

        const [membersRes, inviteRes] = results;

        if (membersRes.status === 'fulfilled') {
          const memberList = membersRes.value.data?.members ?? [];
          setMembers(memberList);
          // 내 role 확인 (members 목록에서 본인 userId 매칭)
          const me = memberList.find((m: GroupMember) => m.userId === user.userId);
          if (me) setMyRole(me.role);
          else if (user.role) setMyRole(user.role);
        } else {
          console.warn('멤버 목록 로딩 실패:', membersRes.reason?.message || membersRes.reason);
        }

        if (inviteRes.status === 'fulfilled') {
          setInviteCode(inviteRes.value.data?.inviteCode ?? '');
        } else {
          console.warn('초대 코드 로딩 실패:', inviteRes.reason?.message || inviteRes.reason);
        }
      }
    } catch (e: unknown) {
      console.warn('데이터 로딩 실패:', (e as Error)?.message || e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ── 핸들러 ──
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await refreshInviteCode();
      setInviteCode(res.data?.inviteCode ?? '');
    } catch (e) {
      console.error('초대 코드 갱신 실패', e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleKickConfirm = async () => {
    if (!kickTarget) return;
    setKickTarget(null);
    try {
      await kickMember(kickTarget.userId);
      setMembers((prev) => prev.filter((m) => m.userId !== kickTarget.userId));
    } catch (e) {
      console.error('멤버 강퇴 실패', e);
    }
  };

  const handleLeaveConfirm = async () => {
    setLeaveSheetOpen(false);
    try {
      if (isHost) {
        // 호스트: 모든 그룹원을 강퇴한 뒤 탈퇴
        const nonHostMembers = members.filter(m => m.role !== 'HOST');
        for (const member of nonHostMembers) {
          try {
            await kickMember(member.userId);
          } catch (e) {
            console.error(`멤버 ${member.nickname} 강퇴 실패`, e);
          }
        }
      }
      // 그룹 탈퇴
      await leaveGroup();
      router.push('/onboarding');
    } catch (e) {
      console.error('그룹 탈퇴 실패', e);
    }
  };

  const handleDelegateConfirm = async () => {
    if (!delegateTarget) return;
    setDelegateTarget(null);
    try {
      await delegateHost(delegateTarget.userId);
      // 위임 후 데이터 새로고침 (역할이 변경되므로)
      await loadData();
    } catch (e) {
      console.error('방장 위임 실패', e);
    }
  };

  // ── 로딩 스켈레톤 ──
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Card elevation="low" radius="large"><ListRow.Loader verticalPadding="large" /></Card>
        <Card elevation="low" radius="large">
          {[0, 1, 2].map((i) => <ListRow.Loader key={i} type="circle" verticalPadding="medium" />)}
        </Card>
      </div>
    );
  }

  // ── 그룹이 없는 경우 ──
  if (!groupName) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <Image
          src={accountWithDog}
          alt="강아지"
          width={120}
          height={120}
          style={{ objectFit: 'contain', margin: '0 auto 1rem' }}
        />
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-pet-text, #3d2c1e)', marginBottom: '0.5rem' }}>
          소속된 그룹이 없습니다
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-pet-text-muted, #b0a090)', lineHeight: 1.5 }}>
          함께 반려동물을 관리할<br />그룹을 생성하거나 초대 코드로 참여해 보세요.
        </p>
      </div>
    );
  }

  // ── 렌더 (그룹 있을 때 — 그룹원이 없어도 그룹 정보 + 초대 코드 표시) ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '2rem' }}>
      <InviteCodeSection
        inviteCode={inviteCode}
        isHost={isHost}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      {members.length > 0 ? (
        <MemberListSection
          members={members}
          groupName={groupName}
          isHost={isHost}
          onKick={setKickTarget}
          onDelegate={isHost ? setDelegateTarget : undefined}
        />
      ) : (
        <Card elevation="low" radius="large">
          <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-pet-text, #3d2c1e)', marginBottom: '0.25rem' }}>
              {groupName}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-pet-text-muted, #b0a090)', margin: 0 }}>
              아직 참여한 그룹원이 없어요.<br />초대 코드를 공유해 보세요!
            </p>
          </div>
        </Card>
      )}

      <LeaveGroupSection isHost={isHost} onLeave={() => setLeaveSheetOpen(true)} />

      {/* 강퇴 확인 모달 */}
      {kickTarget && (
        <ConfirmModal
          title={`${kickTarget.nickname || kickTarget.name}님을 강퇴하시겠어요?`}
          subtitle="강퇴된 구성원은 그룹에서 제거됩니다."
          actions={[{ label: '강퇴하기', danger: true, onClick: handleKickConfirm }]}
          onClose={() => setKickTarget(null)}
        />
      )}

      {/* 탈퇴/해체 확인 모달 */}
      {leaveSheetOpen && (
        <ConfirmModal
          title={isHost ? '그룹을 해체하시겠어요?' : '그룹에서 탈퇴하시겠어요?'}
          subtitle={isHost ? '모든 구성원이 강퇴되고, 그룹이 삭제됩니다.' : '탈퇴 후에는 그룹 정보를 볼 수 없습니다.'}
          actions={[{ label: isHost ? '해체하기' : '탈퇴하기', danger: true, onClick: handleLeaveConfirm }]}
          onClose={() => setLeaveSheetOpen(false)}
        />
      )}

      {/* 위임 확인 모달 */}
      {delegateTarget && (
        <ConfirmModal
          title={`${delegateTarget.nickname || delegateTarget.name}님에게 방장을 위임하시겠어요?`}
          subtitle="위임 후 당신은 일반 구성원이 됩니다."
          actions={[{ label: '위임하기', danger: false, onClick: handleDelegateConfirm }]}
          onClose={() => setDelegateTarget(null)}
        />
      )}
    </div>
  );
}
