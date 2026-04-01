"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
// 컴포넌트
import Condition from "@/components/common/Condition/Condition";
import NextButton from "@/components/common/NextButton/NextButton";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/PasswordToggle/PasswordToggle";
// 훅
import { useMyProfileQuery } from "@/hooks/user/Myprofile";
import { useEditPasswordMutation } from "@/hooks/user/EditPassword";

export default function PasswordChangeForm() {
  const router = useRouter();
  const { mutate, isPending } = useEditPasswordMutation();

  // 상태 관리
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 유효성 검사
  const isLengthValid = newPassword.length >= 8;
  const isUpperValid = /[A-Z]/.test(newPassword);
  const isSpecialValid = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isPasswordValid = isLengthValid && isUpperValid && isSpecialValid;

  // 수정 버튼 핸들러 (실제 서버 전송)
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    if (!isPasswordValid) {
      setError("새 비밀번호 조건을 모두 충족해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (currentPassword === newPassword) {
      setError("현재 비밀번호와 다르게 설정해주세요.");
      return;
    }

    // 서버에 비밀번호 변경 요청
    mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          // 성공 시 성공 모달을 띄움
          setIsModalOpen(true);
        },
        onError: (err) => {
          setError("비밀번호 수정에 실패했습니다. 현재 비밀번호를 다시 확인해주세요.");
          console.error(err);
        },
      }
    );
  };

  // 모달 확인 버튼 클릭 시 이동
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push("/mypage");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden relative">
      <div
        className="absolute left-1/2 top-1/2 z-0"
        style={{ transform: "translate(-50%, calc(-50% - 280px)) scale(0.35)" }}
      >
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 z-10 static-chr-lit">
            <Image src="/withy/Withy_chr.png" alt="Withy Character" fill className="object-contain" priority />
          </div>
          <div className="absolute inset-0 z-20 static-red-neon ml-4">
            <Image src="/withy/Withy_logo.png" alt="Withy Logo" fill className="object-contain" priority />
          </div>
        </div>
        <div className="mt-[-40px] z-30 white-neon-glow flex justify-center">
          <p className="text-white text-3xl font-black tracking-[0.25em] uppercase italic">Watch with WITHY</p>
        </div>
      </div>

      {/* Content Container */}
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center relative z-10 mt-56">
        <div className="w-full">
          {/* 현재 비밀번호 */}
          <p className="text-sm text-zinc-400 font-bold mb-2">현재 비밀번호</p>
          <div className="relative mb-6">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="현재 비밀번호 입력"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pr-12 bg-zinc-900/80 text-white placeholder-zinc-500 border-zinc-700 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 [&::-ms-reveal]:hidden"
            />
            <PasswordToggle isVisible={showCurrentPassword} onToggle={() => setShowCurrentPassword(!showCurrentPassword)} />
          </div>

          {/* 새 비밀번호 */}
          <p className="text-sm text-zinc-400 font-bold mt-5 mb-2">새 비밀번호</p>
          <div className="relative mb-2">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="영문 대문자, 특수문자 포함 8자 이상"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-12 bg-zinc-900/80 text-white placeholder-zinc-500 border-zinc-700 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 [&::-ms-reveal]:hidden"
            />
            <PasswordToggle isVisible={showNewPassword} onToggle={() => setShowNewPassword(!showNewPassword)} />
          </div>
          {/* 비밀번호 조건 표시 컴포넌트 */}
          <Condition newPassword={newPassword} />

          {/* 확인 */}
          <p className="text-sm text-zinc-400 font-bold mt-6 mb-2">새 비밀번호 확인</p>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-12 bg-zinc-900/80 text-white placeholder-zinc-500 border-zinc-700 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 [&::-ms-reveal]:hidden"
            />
            <PasswordToggle isVisible={showConfirmPassword} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} />
          </div>

          {error && <div className="mt-8 text-center text-red-500 text-sm font-bold animate-pulse">{error}</div>}

          <NextButton
            text={isPending ? "변경 중..." : "수정 완료"}
            type="submit"
            className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.5)] border-none disabled:bg-zinc-700"
          />

          <NextButton
            text="뒤로"
            onClick={() => router.push("/mypage/profile")}
            className="bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 rounded-xl mt-5 py-4 font-bold shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
          />

          {/* 성공 모달 */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-zinc-900 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-zinc-800 animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-6 py-4 bg-zinc-800/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-red-600 rounded-full" />
                    <h2 className="text-lg font-black text-white tracking-tight">알림</h2>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 bg-zinc-700/50 rounded-xl text-zinc-400 hover:text-white transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="text-green-500" size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">변경 완료</h3>
                    <p className="text-zinc-400">비밀번호가 정상적으로 변경되었습니다.</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-black/20 flex gap-3">
                  <button
                    onClick={handleModalConfirm}
                    className="flex-1 py-4 bg-red-600 text-white hover:bg-red-700 rounded-[20px] font-bold shadow-lg transition-all"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}