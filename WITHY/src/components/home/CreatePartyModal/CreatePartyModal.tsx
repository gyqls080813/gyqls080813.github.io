import React, { useState, useEffect, useRef } from 'react';
import { X, Link2, Users, PlayCircle, Loader2, CheckCircle2, Lock, Unlock, Hash, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, AlertCircle, MonitorPlay } from 'lucide-react';
import { getNetflixMetadata, getYoutubeMetadata } from '@/api/home/PartyAPI/ContentMetadata';
import { useCreateParty } from '@/hooks/home/PartyHooks/useCreateParty';
import { useEnterParty } from '@/hooks/home/PartyHooks/useEnterParty';
import { useDeleteParty } from '@/hooks/home/PartyHooks/useDeleteParty';
import { useLeaveParty } from '@/hooks/home/PartyHooks/useLeaveParty';
import { useRouter } from 'next/navigation';
import { useNavigationGuard } from '@/store/useNavigationGuard';
import ActivePartyExitModal from '@/components/home/ActivePartyExitModal/ActivePartyExitModal';
import { getKSTTimeComponents, KST_TIMEZONE } from '@/utils/timezone';

interface CreatePartyModalProps {
    onClose: () => void;
}

const CreatePartyModal = ({ onClose }: CreatePartyModalProps) => {
    const router = useRouter();
    const { isHost, isActive, isInParty, partyIdToLeave, setPartyState } = useNavigationGuard();
    const createPartyMutation = useCreateParty();
    const deletePartyMutation = useDeleteParty();
    const leavePartyMutation = useLeaveParty();

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [maxUsers, setMaxUsers] = useState("4");
    const [selectedDate, setSelectedDate] = useState(0);
    const [hourInput, setHourInput] = useState(getKSTTimeComponents().hours.toString().padStart(2, '0'));
    const [minInput, setMinInput] = useState(getKSTTimeComponents().minutes.toString().padStart(2, '0'));
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState("");
    const [timeDiffMessage, setTimeDiffMessage] = useState("");
    const [parsingStatus, setParsingStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
    const [parsedContent, setParsedContent] = useState({
        contentId: "",
        contentTitle: "",
        platform: "OTT" as "OTT" | "YOUTUBE"
    });

    const isMaxUsersInvalid = parseInt(maxUsers) > 100;
    const dateScrollRef = useRef<HTMLDivElement>(null);

    const dates = Array.from({ length: 14 }, (_, i) => {
        const kst = getKSTTimeComponents();
        // kst.month는 1-based이므로 0-based로 변환 필요
        const d = new Date(kst.year, kst.month - 1, kst.date + i);

        // 요일 구하기 (한글)
        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = weekDays[d.getDay()];

        // [Fix] toISOString()은 UTC 기준이라 한국 시간 00:00 -> 전날 15:00로 되어 날짜가 하루 밀림
        // 따라서 로컬 시간 기준으로 문자열을 생성해야 함
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const fullDate = `${year}-${month}-${day}`;

        return {
            full: fullDate,
            day: d.getDate(),
            weekday: dayOfWeek,
        };
    });

    // 핵심 수정 1: 초기 위치 강제 교정 (Snap 위치 동기화)
    useEffect(() => {
        if (!dates[selectedDate]) return;

        const finalHour = hourInput.padStart(2, '0');
        const finalMin = minInput.padStart(2, '0');
        const [year, month, day] = dates[selectedDate].full.split('-').map(Number);

        // 선택된 시간 (Local Time)
        const selectedTime = new Date(year, month - 1, day, parseInt(finalHour), parseInt(finalMin));
        const now = new Date();

        // 초/밀리초 단위 초기화로 정확한 분 차이 계산
        now.setSeconds(0);
        now.setMilliseconds(0);

        const diffMs = selectedTime.getTime() - now.getTime();

        if (diffMs < 0) {
            setIsTimeInvalid(true);
            setTimeDiffMessage("");
        } else {
            setIsTimeInvalid(false);

            // 남은 시간 계산
            const diffMinTotal = Math.floor(diffMs / (1000 * 60));
            const days = Math.floor(diffMinTotal / (60 * 24));
            const hours = Math.floor((diffMinTotal % (60 * 24)) / 60);
            const mins = diffMinTotal % 60;

            let message = "";
            if (days > 0) message += `${days}일 `;
            if (hours > 0) message += `${hours}시간 `;
            message += `${mins}분 후 시작`;

            setTimeDiffMessage(message);
        }
    }, [hourInput, minInput, selectedDate]);

    // 핵심 수정 2: 마지막 위치 스크롤 제한 로직 추가
    const moveDate = (direction: 'left' | 'right') => {
        if (dateScrollRef.current) {
            const cardWidth = 64;
            const gap = 10;
            const scrollAmount = (cardWidth + gap) * 3;
            const currentScroll = dateScrollRef.current.scrollLeft;
            const maxScroll = dateScrollRef.current.scrollWidth - dateScrollRef.current.clientWidth;

            let targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

            // 마지막 버튼을 눌렀을 때 더 이상 오른쪽으로 밀리지 않게 고정
            if (direction === 'right' && currentScroll >= maxScroll - 5) return;
            if (direction === 'left' && currentScroll <= 5) return;

            dateScrollRef.current.scrollTo({
                left: Math.max(0, Math.min(targetScroll, maxScroll)),
                behavior: 'smooth'
            });
        }
    };

    const handleMaxUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        if (val === '') { setMaxUsers(''); return; }
        const numVal = parseInt(val, 10).toString();
        setMaxUsers(numVal);
    };

    const handleMaxUsersBlur = () => {
        if (maxUsers === '' || parseInt(maxUsers) < 2) setMaxUsers('2');
    };

    const handleTimeInput = (val: string, setter: (v: string) => void) => {
        const cleanVal = val.replace(/[^0-9]/g, '');
        if (cleanVal.length <= 2) setter(cleanVal);
    };

    const handleTimeBlur = (val: string, max: number, setter: (v: string) => void) => {
        if (val === "") { setter("00"); return; }
        let num = parseInt(val);
        if (isNaN(num)) num = 0;
        if (num > max) num = max;
        setter(num.toString().padStart(2, '0'));
    };

    const adjustTime = (type: 'h' | 'm', delta: number) => {
        if (type === 'h') {
            const current = parseInt(hourInput) || 0;
            setHourInput(((current + delta + 24) % 24).toString().padStart(2, '0'));
        } else {
            const current = parseInt(minInput) || 0;
            setMinInput(((current + delta + 60) % 60).toString().padStart(2, '0'));
        }
    };

    const { checkEntryEligibility } = useEnterParty(); // [Refactor] 호스트도 입장 로직 통일

    // State for active party exit modal
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [pendingPartyData, setPendingPartyData] = useState<any>(null);

    // Simplified: CREATE → ENTER only (LEAVE handled by disabled button)
    const createNewParty = async (partyData: any) => {
        try {
            // Step 1: Create new party
            const createResult = await createPartyMutation.mutateAsync(partyData);
            const newPartyId = createResult?.data?.partyId;

            if (!newPartyId) {
                throw new Error('파티 생성에 실패했습니다.');
            }



            // Step 2: Enter new party
            const entryData = await checkEntryEligibility(newPartyId, partyData.isPrivate ? partyData.password : undefined);

            if (entryData) {
                setPartyState(true, newPartyId, entryData.isHost, entryData.isActive);

                // Save host status to localStorage for page refresh persistence
                if (entryData.isHost) {
                    localStorage.setItem('party_host_status', JSON.stringify({
                        partyId: newPartyId,
                        isHost: true,
                        timestamp: Date.now()
                    }));
                }

                router.push(`/waiting-room/${newPartyId}`);
                onClose();
            } else {
                alert("파티 생성에는 성공했으나 입장 처리에 실패했습니다. 내 파티 목록을 확인해주세요.");
                onClose();
            }
        } catch (error) {
            console.error('[CreateParty] Flow failed:', error);
            alert('파티 생성에 실패했습니다.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isMaxUsersInvalid) return;

        const finalHour = hourInput.padStart(2, '0');
        const finalMin = minInput.padStart(2, '0');
        const [year, month, day] = dates[selectedDate].full.split('-').map(Number);

        // 입력된 값으로 Date 객체 생성 (Local Timezone 기준)
        const dateObj = new Date(year, month - 1, day, parseInt(finalHour), parseInt(finalMin));

        // ISO String 변환 (서버 전송용 UTC)
        const scheduledTime = dateObj.toISOString();



        const partyData = {
            partyTitle: title,
            metadata: { contentId: parsedContent.contentId, contentTitle: parsedContent.contentTitle },
            platform: parsedContent.platform,
            timeStr: scheduledTime,
            maxParticipants: parseInt(maxUsers),
            isPrivate: isPrivate,
            password: isPrivate ? password : null,
        };

        // Check if user is host in active party
        if (isInParty && isHost && isActive) {
            // Save party data and show exit modal - DON'T create yet!

            setPendingPartyData(partyData);
            setIsExitModalOpen(true);
        } else {
            // Direct creation if not in active party
            await createNewParty(partyData);
        }
    };

    // Handle new party creation after deletion (called by ActivePartyExitModal)
    const handleExitAndCreate = async () => {
        if (!pendingPartyData) {

            return;
        }



        // ActivePartyExitModal already handled DELETE and state clearing
        // Just create the new party
        await createNewParty(pendingPartyData);
        setPendingPartyData(null);
    };



    useEffect(() => {
        const isNetflix = url.includes('netflix.com');
        const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
        if (!isNetflix && !isYoutube) { setParsingStatus('idle'); return; }

        const timer = setTimeout(async () => {
            setParsingStatus('loading');
            try {
                const data = isNetflix ? await getNetflixMetadata(url) : await getYoutubeMetadata(url);
                setParsedContent({
                    contentId: data.contentId || "",
                    contentTitle: data.contentTitle || "",
                    platform: isNetflix ? "OTT" : "YOUTUBE"
                });
                setParsingStatus('done');
            } catch { setParsingStatus('error'); }
        }, 800);
        return () => clearTimeout(timer);
    }, [url]);

    const [isTimeInvalid, setIsTimeInvalid] = useState(false);

    // 시간 유효성 검사 (현재 시간 - 5분 까지만 허용)
    useEffect(() => {
        if (!dates[selectedDate]) return;
        const finalHour = hourInput.padStart(2, '0');
        const finalMin = minInput.padStart(2, '0');
        const [year, month, day] = dates[selectedDate].full.split('-').map(Number);

        // 선택된 시간
        const selectedTime = new Date(year, month - 1, day, parseInt(finalHour), parseInt(finalMin));

        // 현재 시간 (초/밀리초 버림)
        const now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
        // const limit = new Date(now.getTime() - 5 * 60 * 1000); // 5분 여유 제거

        setIsTimeInvalid(selectedTime < now);
    }, [hourInput, minInput, selectedDate]); // dates는 상수라 deps 제외 가능하지만 경고 방지 위해선 포함 가능 (여기선 생략)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 leading-none text-zinc-200">
            <style>{`
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="bg-card w-[95%] md:w-[90%] lg:max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
                {/* 헤더 */}
                <div className="px-8 py-5 bg-card flex justify-between items-center border-b border-border shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-5 bg-primary rounded-full" />
                        <h2 className="text-lg font-black tracking-tight text-foreground">새 파티 만들기</h2>
                    </div>
                    <button onClick={onClose} type="button" className="p-2 bg-secondary border border-border rounded-xl text-muted-foreground hover:text-primary transition-all">
                        <X size={18} />
                    </button>
                </div>

                <form className="grid grid-cols-12 overflow-hidden h-full" onSubmit={handleSubmit}>
                    {/* LEFT SECTION */}
                    <div className="col-span-12 md:col-span-5 p-6 border-r border-border flex flex-col justify-between overflow-y-auto">
                        <div className="space-y-5">
                            <div className="space-y-3 group">
                                <span className="text-[17px] font-bold text-primary tracking-widest ml-1 flex items-center gap-2">
                                    01. 파티 세부 내용
                                </span>
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="제목을 입력해주세요"
                                        className="w-full text-2xl font-black bg-transparent border-b-2 border-zinc-800 focus:border-primary focus:ring-0 pb-3 transition-all text-foreground placeholder:text-white"
                                    />
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-focus-within:w-full" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Video Source</label>
                                <div className="flex items-center mt-[3px] bg-zinc-900/50 rounded-[20px] px-5 py-3 shadow-inner border border-transparent focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-primary transition-all">
                                    <Link2 className="text-muted-foreground mr-3" size={18} />
                                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="영상 주소를 복사하여 입력해주세요" className="bg-transparent border-none focus:ring-0 w-full font-bold text-sm text-foreground placeholder:text-white" />
                                </div>

                                <div className={`relative h-[205px] rounded-[32px] transition-all duration-500 flex items-center justify-center overflow-hidden border-2 ${parsingStatus === 'idle' ? "bg-zinc-900/50 border-dashed border-border text-muted-foreground" :
                                    parsingStatus === 'loading' ? "bg-zinc-900/50 border-solid border-border" :
                                        parsingStatus === 'done' ? "bg-black border-none text-white shadow-xl" :
                                            "bg-destructive/10 border-solid border-destructive/50 text-destructive/80"
                                    }`}>
                                    {parsingStatus === 'idle' && (
                                        <div className="flex flex-col items-center gap-3">
                                            <MonitorPlay size={32} className="opacity-40" />
                                            <p className="text-[11px] font-bold text-muted-foreground">주소를 넣으면 미리보기가 나타납니다.</p>
                                        </div>
                                    )}
                                    {parsingStatus === 'loading' && (
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin text-primary" size={32} />
                                            <p className="text-[11px] font-bold text-muted-foreground">영상 정보를 분석하고 있습니다...</p>
                                        </div>
                                    )}
                                    {parsingStatus === 'done' && (
                                        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-95 duration-500">
                                            <PlayCircle size={40} className="text-primary" />
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{parsedContent.platform === "OTT" ? "NETFLIX" : parsedContent.platform}</p>
                                                <h4 className="text-base font-bold line-clamp-2 px-4 leading-tight">{parsedContent.contentTitle}</h4>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-[28px] border-2 border-transparent">
                                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                                    <Users size={18} className="text-muted-foreground" />
                                    <span>참여 인원 (2~100명)</span>
                                </div>
                                <div className="bg-zinc-900 px-4 py-2.5 rounded-[18px] border border-border shadow-sm flex items-center gap-2">
                                    <input type="text" value={maxUsers} onChange={handleMaxUsersChange} onBlur={handleMaxUsersBlur} className={`w-12 text-center border-none focus:ring-0 text-xl font-black p-0 bg-transparent ${isMaxUsersInvalid ? 'text-destructive' : 'text-foreground'}`} />
                                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter">명</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="col-span-12 md:col-span-7 p-5 bg-black/20 space-y-5 flex flex-col overflow-y-auto">
                        <div className="space-y-4 mt-[4]">
                            <span className="text-[17px] font-bold text-primary tracking-widest ml-1">02. 파티 날짜</span>
                            <div className="flex items-center justify-center w-full gap-1">
                                <button type="button" onClick={() => moveDate('left')} className="p-2 bg-secondary rounded-full shadow-lg border border-border text-muted-foreground hover:text-foreground transition-all active:scale-95 shrink-0 z-20">
                                    <ChevronLeft size={20} />
                                </button>

                                <div
                                    ref={dateScrollRef}
                                    className="flex gap-[10px] overflow-x-hidden snap-x snap-mandatory py-6 px-[18px] w-full max-w-[380px] no-scrollbar scroll-smooth"
                                >
                                    {dates.map((d, i) => (
                                        <button
                                            key={d.full}
                                            type="button"
                                            onClick={() => setSelectedDate(i)}
                                            className={`flex-shrink-0 w-16 h-20 rounded-[24px] snap-center snap-always border-2 transition-all duration-300 flex flex-col items-center justify-center gap-0.5 
                                                ${selectedDate === i ? "bg-primary border-primary text-white shadow-xl scale-110 z-10" : "bg-card border-border text-muted-foreground hover:border-zinc-500"}`}
                                        >
                                            <span className={`text-[8px] font-black uppercase ${selectedDate === i ? "text-white/70" : "text-muted-foreground"}`}>{d.weekday}</span>
                                            <span className="text-xl font-black leading-none">{d.day}</span>
                                        </button>
                                    ))}
                                </div>

                                <button type="button" onClick={() => moveDate('right')} className="p-2 bg-secondary rounded-full shadow-lg border border-border text-muted-foreground hover:text-foreground transition-all active:scale-95 shrink-0 z-20">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <span className="text-[17px] font-bold text-primary tracking-widest ml-1">03. 시작 시간</span>
                            <div className="bg-zinc-900/50 h-full mt-5 px-8 rounded-[36px] shadow-sm border-2 border-white/20 flex flex-col items-center justify-center">
                                <div className="flex items-center gap-14">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <button type="button" onClick={() => adjustTime('h', 1)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronUp size={24} /></button>
                                        <input type="text" value={hourInput} onChange={(e) => handleTimeInput(e.target.value, setHourInput)} onBlur={() => handleTimeBlur(hourInput, 23, setHourInput)} className="w-24 text-center text-6xl font-black text-foreground leading-tight h-16 bg-transparent border-none focus:ring-0 p-0" />
                                        <button type="button" onClick={() => adjustTime('h', -1)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronDown size={24} /></button>
                                    </div>
                                    <div className="text-3xl font-black text-foreground mt-2">:</div>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <button type="button" onClick={() => adjustTime('m', 10)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronUp size={24} /></button>
                                        <input type="text" value={minInput} onChange={(e) => handleTimeInput(e.target.value, setMinInput)} onBlur={() => handleTimeBlur(minInput, 59, setMinInput)} className="w-24 text-center text-6xl font-black text-foreground leading-tight h-16 bg-transparent border-none focus:ring-0 p-0" />
                                        <button type="button" onClick={() => adjustTime('m', -10)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronDown size={24} /></button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    {isTimeInvalid ? (
                                        <div className="flex items-center gap-2 text-destructive font-bold animate-pulse h-4">
                                            <AlertCircle size={14} />
                                            <span className="text-xs">파티 시작 시간은 현재 시간 이후여야 합니다.</span>
                                        </div>
                                    ) : (
                                        <div className={`flex items-center gap-2 text-primary font-bold transition-opacity duration-300 h-4 ${timeDiffMessage ? 'opacity-100' : 'opacity-0'}`}>
                                            <CheckCircle2 size={14} className='text-green-500' />
                                            <span className="text-xs text-green-500">{timeDiffMessage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-auto pt-4">
                            <div className="flex p-1 bg-zinc-900/50 rounded-[22px] border border-border shadow-sm w-32 h-[56px] shrink-0">
                                <button type="button" onClick={() => setIsPrivate(false)} className={`flex-1 rounded-[16px] flex items-center justify-center transition-all ${!isPrivate ? "bg-card text-foreground shadow-md" : "text-muted-foreground"}`}><Unlock size={16} /></button>
                                <button type="button" onClick={() => setIsPrivate(true)} className={`flex-1 rounded-[16px] flex items-center justify-center transition-all ${isPrivate ? "bg-primary text-primary-foreground shadow-md shadow-primary/50" : "text-muted-foreground"}`}><Lock size={16} /></button>
                            </div>
                            <div className={`flex-1 flex items-center h-[56px] rounded-[22px] px-5 border-2 transition-all duration-300 ${isPrivate ? "bg-zinc-900 border-primary/50 shadow-xl shadow-primary/10 text-white" : "bg-secondary/50 border-transparent opacity-40 select-none grayscale pointer-events-none"}`}>
                                <Hash className={isPrivate ? "text-primary mr-2" : "text-muted-foreground mr-2"} size={18} />
                                <input type="text" value={password} disabled={!isPrivate} onChange={(e) => setPassword(e.target.value)} placeholder={isPrivate ? "Enter Passcode" : "Open Room"} className="bg-transparent border-none focus:ring-0 w-full font-black text-sm text-foreground placeholder:text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="col-span-12 px-8 py-5 border-t border-border bg-card shrink-0">
                        <button
                            type="submit"
                            disabled={!title || parsingStatus !== 'done' || createPartyMutation.isPending || isMaxUsersInvalid || (isPrivate && !password) || isTimeInvalid}
                            className="w-full py-4 bg-red-500 hover:bg-red-300 cursor-pointer text-white rounded-[28px] text-lg font-black flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl disabled:bg-secondary disabled:text-muted-foreground"
                        >
                            {createPartyMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : (
                                <>파티 방 개설하기 <CheckCircle2 size={20} /></>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Active Party Exit Modal for Create Party */}
            {isExitModalOpen && partyIdToLeave && (
                <ActivePartyExitModal
                    partyId={partyIdToLeave}
                    onClose={() => setIsExitModalOpen(false)}
                    onDeleteSuccess={handleExitAndCreate}
                />
            )}
        </div>
    );
};

export default CreatePartyModal;