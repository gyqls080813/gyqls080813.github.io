'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle2 } from "lucide-react"; // 아이콘 라이브러리 추가
import Category from "@/components/common/Category/Category";
import NextButton from "@/components/common/NextButton/NextButton";
import { useEditCategoryMutation } from "@/hooks/user/EditCategory";
import { useSubscribesQuery } from "@/hooks/user/Subscribes";

export default function CategoryEditPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSynced, setIsSynced] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // mutate 객체에서 isPending을 직접 가져오면 로딩 상태 관리가 편합니다.
  const { mutate, isPending } = useEditCategoryMutation();
  const { data: serverIds, isLoading, isSuccess } = useSubscribesQuery();

  useEffect(() => {
    if (isSuccess && serverIds) {
      const initialData = Array.isArray(serverIds) ? serverIds : [];
      setSelectedIds(initialData);
      setIsSynced(true);
    }
  }, [serverIds, isSuccess]);

  const toggleCategory = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    mutate({ genreIds: selectedIds }, {
      onSuccess: () => {
        setIsModalOpen(true);
      },
      onError: (error) => {
        console.error("실패:", error);
        alert("저장 실패");
      },
    });
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push("/mypage");
  };

  if (isLoading || !isSynced) {
    return <div className="flex h-screen items-center justify-center">데이터 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col items-center pb-20">
      <Category selectedIds={selectedIds} onToggle={toggleCategory} />

      <div className="w-full max-w-md px-4">
        <NextButton
          text={isPending ? "저장 중..." : "수정 완료"}
          onClick={handleSave}
          disabled={isPending}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.5)] border-none disabled:bg-zinc-700"
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
                  <h3 className="text-xl font-bold text-white">수정 완료</h3>
                  <p className="text-zinc-400">카테고리 설정이 정상적으로 변경되었습니다.</p>
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
    </div>
  );
}