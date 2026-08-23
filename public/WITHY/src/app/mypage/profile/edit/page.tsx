'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, X, CheckCircle2, ChevronDown } from "lucide-react";
import imageCompression from 'browser-image-compression';
import { useEditLanguageMutation } from "@/hooks/user/EditLanguage";
import NextButton from "@/components/common/NextButton/NextButton"
import Input from "@/components/common/Input/Input";
import { useMyProfileQuery } from "@/hooks/user/Myprofile";
import { useEditUserMutation } from "@/hooks/user/EditUser";

export default function OnboardingStep1() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data } = useMyProfileQuery();

    // 상태 관리
    const [nickname, setNickname] = useState("");
    const [checkMessage, setCheckMessage] = useState("");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedLang, setSelectedLang] = useState("kr");
    // 모달 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 훅 (isPending 추가)
    const { mutate: editUser, isPending } = useEditUserMutation();
    const { mutate: editLanguage } = useEditLanguageMutation();

    // 선호 언어 변경 리스트
    const LANGUAGE_OPTIONS = [
        { code: "kr", label: "KR" },
        { code: "en", label: "EN" },
    ];

    // 이미지 처리 로직
    const handleFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("이미지 파일만 업로드 가능합니다.");
            return;
        }
        const resizingImage = await imageCompression(file, { maxSizeMB: 1 });
        setProfileImageFile(resizingImage);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(resizingImage);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    const checkNicknameAPI = async (nickname: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isTaken = ["admin", "test", "master"].includes(nickname);
                resolve(!isTaken);
            }, 500);
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length <= 20) {
            setNickname(val);
            setIsAvailable(null);
            setCheckMessage("");
        }
    };

    useEffect(() => {
        if (data?.data?.nickname) {
            setNickname(data.data.nickname);
            setIsAvailable(true);
            setCheckMessage("");
        }
    }, [data]);

    useEffect(() => {
        if (data?.data) {
            if (data.data.nickname) {
                setNickname(data.data.nickname);
                setIsAvailable(true);
            }
            if (data.data.preferredLanguage) {
                // 서버 데이터가 kr/en 중 하나라면 해당 값으로 설정
                setSelectedLang(data.data.preferredLanguage);
            }
        }
    }, [data]);

    const handleCheck = async () => {
        if (nickname.trim().length === 0) {
            setCheckMessage("닉네임을 입력해주세요.");
            setIsAvailable(false);
            return;
        }
        if (nickname.trim().length < 2) {
            setCheckMessage("2글자 이상 입력해주세요.");
            setIsAvailable(false);
            return;
        }
        if (data?.data?.nickname === nickname) {
            setIsAvailable(true);
            setCheckMessage("현재 사용 중인 닉네임입니다.");
            return;
        }

        const available = await checkNicknameAPI(nickname);
        if (available) {
            setIsAvailable(true);
            setCheckMessage("사용 가능한 닉네임입니다.");
        } else {
            setIsAvailable(false);
            setCheckMessage("이미 사용 중인 닉네임입니다.");
        }
    };

    const handleNext = () => {
        if (!nickname.trim() || isAvailable !== true) return;

        // 1. 프로필 정보 업데이트
        const formData = new FormData();
        const requestData = { nickname: nickname };
        const jsonBlob = new Blob([JSON.stringify(requestData)], { type: "application/json" });
        formData.append("request", jsonBlob);
        if (profileImageFile) formData.append("profileImage", profileImageFile);

        editUser(formData, {
            onSuccess: () => {
                // 2. 언어 설정 업데이트 (kr 또는 en 전송)
                editLanguage({ language: selectedLang }, {
                    onSuccess: () => setIsModalOpen(true),
                    onError: () => alert("언어 설정 변경 중 오류가 발생했습니다.")
                });
            },
            onError: (err) => {
                console.error("수정 실패", err);
                alert("서버 오류가 발생했습니다.");
            }
        });
    };

    // 모달 확인 버튼 로직
    const handleModalConfirm = () => {
        setIsModalOpen(false);
        router.push("/mypage");
    };

    const serverProfileImage = data?.data?.profileImageUrl;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-15 bg-black overflow-hidden relative">
            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">

                <div className="flex items-center gap-6 mb-12 w-full justify-center">
                    {/* Profile Image */}
                    <div
                        className={`relative group cursor-pointer transition-all rounded-full p-1 ${isDragging ? "bg-red-900/50 scale-105" : "bg-transparent"}`}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-45 h-45 rounded-full overflow-hidden border-2 border-zinc-700 bg-zinc-800 group-hover:border-red-500 transition-colors shadow-2xl">
                            <img
                                src={preview || serverProfileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full border-2 border-black group-hover:bg-red-500 transition-colors">
                            <Camera size={18} className="text-white fill-white" />
                        </div>
                        <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} accept="image/*" />
                    </div>

                    {/* Language Selector Box */}

                </div>

                {/* Nickname Form */}
                <div className="w-full">
                    <p className="text-center text-sm text-zinc-400 font-bold mb-4">새로운 닉네임을 설정해주세요</p>
                    <div className="flex gap-2 w-full">
                        {/* 언어 변경 */}
                        <div className="flex flex-col gap-2">
                            <div className="relative min-w-[30px]">
                                <select
                                    value={selectedLang}
                                    onChange={(e) => setSelectedLang(e.target.value)}
                                    className="h-[50] min-w-[30px] appearance-none bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-red-600 transition-all cursor-pointer hover:bg-zinc-800"
                                >
                                    {LANGUAGE_OPTIONS.map((lang) => (
                                        <option key={lang.code} value={lang.code} className="bg-zinc-900">
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Input
                            type="text"
                            className={`bg-zinc-900/80 text-white placeholder-zinc-500 border-zinc-700 rounded-xl flex-1 ${isAvailable === true ? "border-green-500 focus:border-green-500" : ""} ${isAvailable === false ? "border-red-500 focus:border-red-500" : "focus:border-red-600"}`}
                            placeholder="닉네임을 입력하세요"
                            value={nickname}
                            onChange={handleChange}
                        />

                        <NextButton text="중복확인" onClick={handleCheck} className="w-28 bg-zinc-800 hover:bg-zinc-700 text-white font-bold border border-zinc-600 rounded-xl" />
                    </div>

                    <div className="flex justify-between items-center mt-2 mb-8 px-1">
                        <p className={`text-sm font-bold ${isAvailable === true ? "text-green-500" : "text-red-500"}`}>
                            {checkMessage} &nbsp;
                        </p>
                        <p className="text-sm text-zinc-500">
                            {nickname.length}/20
                        </p>
                    </div>

                    <NextButton
                        onClick={handleNext}
                        text={isPending ? "수정 중..." : "수정 완료"}
                        disabled={isPending || isAvailable !== true}
                        className={`${isAvailable === true
                            ? "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"} w-full py-4 rounded-xl font-bold`}
                    />

                    <NextButton
                        text="뒤로"
                        onClick={() => router.push("/mypage/profile")}
                        className="bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 rounded-xl mt-5 py-4 font-bold shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                    />
                </div>
            </div>

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
                                <p className="text-zinc-400">프로필 정보가 성공적으로 변경되었습니다.</p>
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
    );
}