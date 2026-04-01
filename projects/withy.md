---
layout: tour
title: WITHY
app_logo: /WITHY/public/withy/Withy_logo.png
---

<!-- JSON CONFIGURATION FOR THE TOUR ENGINE -->
<script type="application/json" id="tour-script-data">
{
  "steps": [
    {
      "screenId": "screen-home",
      "title": "Welcome to WITHY",
      "desc": "넷플릭스, 유튜브 화면 공유의 끊김과 저화질을 해결하기 위해 탄생했습니다.<br><br>독자적인 <strong>타임라인 직접 동기화 기술</strong>로 완벽한 몰입감과 <strong>AI 클린 채팅</strong>을 선사하는 실시간 스트리밍 같이보기 서비스입니다.",
      "tooltipPos": { "top": "20%", "left": "50%", "transform": "translateX(-50%)" },
      "requiresClick": false
    },
    {
      "screenId": "screen-home",
      "title": "같이보기 파티 입장",
      "desc": "홈 화면에서는 현재 많은 사람들이 모여 시청 중인 <strong>인기 파티</strong> 목록을 장르별로 확인할 수 있습니다.<br><br>실제 개발된 컴포넌트입니다! 반짝이는 <strong>[하울의 움직이는 성]</strong> 방을 직접 클릭해서 파티에 진입해보세요!",
      "tooltipPos": { "top": "40%", "left": "60%" },
      "requiresClick": true,
      "targetId": "target-party-card"
    },
    {
      "screenId": "screen-room",
      "title": "실시간 파티방 동기화",
      "desc": "파티에 입장했습니다! 방장이 영상을 컨트롤하면 <strong>WebSocket</strong> 통신을 통해 <strong>밀리세컨드 단위</strong>로 모든 참여자의 영상 시점이 똑같이 제어됩니다.<br><br>또한, gRPC 기반의 AI가 채팅을 실시간으로 감시하여 욕설과 스포일러를 채팅창에서 원천 차단합니다.<br><br><span style='font-size:0.85rem;color:#888;'>(* 실제 대기실 컴포넌트 레이아웃입니다.)</span>",
      "tooltipPos": { "bottom": "15%", "right": "10%" },
      "requiresClick": false
    },
    {
      "screenId": "screen-room",
      "title": "내 기록 확인하기",
      "desc": "같이보기 파티가 끝났다면, 내가 시청한 <strong>통계 및 기록</strong>을 확인해 볼까요?<br><br>제일 우측 상단의 <strong>사용자 메뉴 아이콘</strong>을 클릭해보세요!",
      "tooltipPos": { "top": "80px", "right": "80px" },
      "requiresClick": "mypage-nav"
    },
    {
      "screenId": "screen-mypage",
      "title": "마이페이지 대시보드",
      "desc": "나의 <strong>플랫폼별 시청 시간 통계</strong>와 참여했던 파티 <strong>히스토리</strong>가 다채로운 그래프와 함께 정리되어 보여집니다.<br><br>이 데이터를 기반으로 AI가 다음번에 참여할 만한 파티를 또 다시 추천해줍니다!",
      "tooltipPos": { "bottom": "15%", "left": "50%", "transform": "translateX(-50%)" },
      "requiresClick": false
    }
  ]
}
</script>

<!-- CSS specifically for lucide icons and scrolling -->
<style>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
/* Render SVG icons */
.lucide { width: 1.25rem; height: 1.25rem; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; fill: none; }
</style>

<!-- SCREEN 1: REAL HOME COMPONENT -->
<div class="screen-view t-screen flex h-full text-white" id="screen-home" style="background:#0a0a0a;">
    
    <!-- Navbar (Sidebar) Component -->
    <aside class="w-20 bg-[#121212] h-full overflow-y-auto scrollbar-hide z-40 relative flex-shrink-0 border-r border-white/5">
        <div class="p-4 space-y-4 pt-10 flex flex-col items-center">
            
            <!-- Home Icon -->
            <button class="w-12 h-12 flex flex-col items-center justify-center rounded-xl transition-colors bg-neutral-800 text-white mb-6">
                <svg class="lucide w-6 h-6 mb-1" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </button>

            <!-- Platform Logs (Mocked) -->
            <div class="flex flex-col gap-4">
                <div class="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-black opacity-60 grayscale hover:opacity-100 hover:grayscale-0 cursor-pointer">
                    <img src="/WITHY/public/logo-1.png" alt="NETFLIX" class="w-full h-full object-cover" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><rect width=\'100%\' height=\'100%\' fill=\'%23E50914\'/><text x=\'50%\' y=\'50%\' fill=\'white\' font-size=\'20\' font-family=\'Arial\' font-weight=\'bold\' text-anchor=\'middle\' dy=\'.3em\'>N</text></svg>'">
                </div>
                <div class="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-black opacity-60 grayscale hover:opacity-100 hover:grayscale-0 cursor-pointer">
                    <span class="text-xl font-bold text-red-600">Y</span>
                </div>
            </div>
        </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
        
        <!-- Header Component -->
        <header class="pl-4 pr-8 py-3 bg-[#121212] z-50 sticky top-0 border-b border-white/5 flex flex-shrink-0 items-center justify-between">
            <div class="flex items-center gap-4">
                <button class="cursor-pointer p-1 rounded-lg text-neutral-400 hover:text-white">
                    <svg class="lucide"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                </button>
                <div class="w-32 h-10 relative flex items-center">
                    <img src="/WITHY/public/withy/Withy_logo.png" alt="WITHY" class="h-full object-contain">
                </div>
            </div>

            <div class="flex-1 max-w-2xl px-10">
                <div class="relative w-full">
                    <svg class="lucide absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
                    <input type="text" placeholder="파티 검색..." class="w-full pl-12 pr-6 py-2.5 rounded-xl bg-[#1f1f1f] border border-white/5 text-sm text-white focus:ring-2 focus:ring-red-600 outline-none">
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button class="px-5 py-2.5 rounded-xl font-bold bg-[#500000] text-neutral-200 hover:bg-[#700000] text-sm">+ 만들기</button>
                <button class="p-2.5 rounded-xl border border-white/5 bg-[#1f1f1f] text-neutral-300">
                    <svg class="lucide"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </button>
                <button class="p-2.5 rounded-xl border border-white/5 bg-[#1f1f1f] text-neutral-300">
                    <svg class="lucide"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </button>
                <!-- Target MyPage Hotspot will anchor here via Javascript -->
                <button id="nav-mypage" class="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-[#27272a]">
                    <img src="/WITHY/docs/assets/images/프로필사진_강영욱.jpg" onerror="this.src='https://ui-avatars.com/api/?name=User&background=random';" class="w-full h-full object-cover">
                </button>
            </div>
        </header>

        <!-- Card Container Main View -->
        <main class="flex-1 overflow-y-auto p-8 bg-[#0a0a0c]">
            <!-- 카테고리 셀렉터 -->
            <div class="mb-8 flex gap-3 pb-4 border-b border-white/10">
                <button class="px-5 py-2 font-black rounded-full bg-red-600 text-white text-sm">전체 파티</button>
                <button class="px-5 py-2 font-bold rounded-full bg-neutral-900 border border-white/10 text-neutral-400 text-sm">진행중 LIVE</button>
                <button class="px-5 py-2 font-bold rounded-full bg-neutral-900 border border-white/10 text-neutral-400 text-sm">대기중</button>
            </div>

            <section class="mb-10">
                <h2 class="text-xl font-bold mb-5 tracking-tight flex items-center gap-2">🔥 실시간 인기 파티</h2>
                <!-- Card Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    
                    <!-- PartyCard 1 (Music) -->
                    <div class="group flex flex-col w-full h-[280px] bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5">
                        <div class="relative w-full aspect-video bg-neutral-900 border-b border-white/5">
                            <img src="/WITHY/docs/assets/images/jpop.jpg" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase bg-red-600 text-white">
                                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>LIVE
                                </div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>2 / 4</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-4 gap-2 flex-1">
                            <h3 class="text-[16px] font-bold text-neutral-100 leading-snug truncate">J-POP 신곡 같이 들어요</h3>
                            <div class="flex items-center gap-1 text-[11px] font-medium mt-auto">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 text-red-600">YouTube</span>
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5">음악</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard 2 (Howl's Moving Castle) - THIS IS THE TARGET -->
                    <div id="target-party-card" class="group flex flex-col w-full h-[280px] bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5">
                        <!-- We style this to be aspect-[2/3] logic visually equivalent -->
                        <div class="relative w-full h-[180px] bg-neutral-900 border-b border-white/5">
                            <img src="/WITHY/docs/assets/images/프로필사진_강영욱.jpg" onerror="this.src='https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" alt="Howl" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase bg-neutral-600 text-white">
                                    WAITING
                                </div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>1 / 4</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-4 gap-2 flex-1">
                            <div class="flex justify-between items-start">
                                <h3 class="text-[16px] font-bold text-neutral-100 leading-snug truncate">하울의 움직이는 성</h3>
                                <span class="text-[12px] text-red-500 font-medium">10분 후 시작</span>
                            </div>
                            <div class="flex items-center gap-1 text-[11px] font-medium mt-auto">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 text-red-500">Netflix</span>
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5">애니메이션</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard 3 (Arcane) -->
                    <div class="group flex flex-col w-full h-[280px] bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5">
                        <div class="relative w-full h-[180px] bg-neutral-900 border-b border-white/5">
                            <img src="/WITHY/docs/assets/images/프로필사진_김건희.png" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase bg-neutral-600 text-white">
                                    WAITING
                                </div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>2 / 8</span>
                                </div>
                            </div>
                            <div class="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur p-1.5 rounded-full border border-white/10">
                                <svg class="lucide w-3 h-3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                        </div>
                        <div class="flex flex-col p-4 gap-2 flex-1">
                            <div class="flex justify-between items-start">
                                <h3 class="text-[16px] font-bold text-neutral-100 leading-snug truncate">아케인 정주행</h3>
                                <span class="text-[12px] text-red-500 font-medium">1일 후 시작</span>
                            </div>
                            <div class="flex items-center gap-1 text-[11px] font-medium mt-auto">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 text-red-500">Netflix</span>
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5">애니메이션</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    </div>
</div>

<!-- =======================
     SCREEN 2: ROOM ENTRY (Actual Withy Waiting Room Structure)
======================== -->
<div class="screen-view t-screen flex h-full text-white w-full" id="screen-room" style="background:#000;">
   
   <!-- Left: Video Player Area (using the GIF to simulate active content) -->
   <div class="flex-1 flex flex-col border-r border-white/10 bg-black">
       <!-- Waiting Room Header -->
       <header class="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-[#0a0a0c]">
           <div class="flex items-center gap-4">
               <button class="p-2 hover:bg-white/10 rounded-full transition"><svg class="lucide"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg></button>
               <div>
                   <h1 class="font-bold text-lg select-none">하울의 움직이는 성</h1>
                   <div class="text-xs text-neutral-400 mt-0.5">대기실 번호: 1A2B3C</div>
               </div>
           </div>
           <div class="flex gap-2">
               <span class="px-3 py-1.5 bg-red-600/20 text-red-500 rounded-lg text-sm font-bold border border-red-500/20">방장</span>
               <button class="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold flex items-center gap-2">
                   <svg class="lucide w-4 h-4"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> 지금 재생
               </button>
           </div>
       </header>

       <!-- Main Video Area -->
       <div class="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
            <!-- Overlay active mode warning or full GIF -->
            <img src="/WITHY/docs/assets/gif/party_enter.gif" alt="Party Room Output" class="absolute inset-0 w-full h-full object-contain opacity-60">
            <div class="z-10 bg-black/60 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center animate-in zoom-in">
               <svg class="lucide w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
               <h2 class="text-3xl font-black text-white mb-2">대기실 동기화 완료!</h2>
               <p class="text-gray-300">웹소켓 서버(Spring)에 연결되었습니다.<br>방장이 영상을 시작하면 일제히 로드됩니다.</p>
            </div>
       </div>
   </div>

   <!-- Right: Chat & Users Sidebar -->
   <aside class="w-80 bg-[#0a0a0c] flex flex-col shrink-0">
       <div class="h-16 flex border-b border-white/10">
           <button class="flex-1 border-b-2 border-red-500 font-bold bg-white/5">채팅 (23)</button>
           <button class="flex-1 text-neutral-500 font-medium hover:bg-white/5">참여자 (8)</button>
       </div>
       <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-sm">
           <div class="bg-red-900/10 text-red-400 p-3 rounded-xl border border-red-500/10 font-medium">안내: 비속어 및 스포일러 발언 시 <strong>AI 모듈(gRPC)</strong>에 의해 0.3초 내에 임시 블라인드 처리됩니다.</div>
           <div><span class="font-bold text-red-500 mr-2">방장_영욱</span>기다리다 지치네요! 얼른 틀어주세요</div>
           <div><span class="font-bold text-blue-400 mr-2">하울바라기</span>와이파이가 좀 느린데 타임라인 못 따라가면 어떡하죠?</div>
           <div><span class="font-bold text-red-500 mr-2">방장_영욱</span>Kafka 동기화로 버퍼 걱정 없습니다. 바로 시작합니다~</div>
           <div class="opacity-50 line-through"><span>[AI 블라인드 처리된 메시지입니다.]</span></div>
       </div>
       <!-- Chat Input -->
       <div class="p-4 border-t border-white/10">
           <div class="bg-[#1f1f1f] rounded-xl flex items-center p-2 border border-white/5 focus-within:border-red-500 transition-colors">
               <input type="text" placeholder="메시지를 입력하세요..." class="bg-transparent flex-1 text-sm outline-none px-2">
               <button class="p-2 text-red-500 rounded-lg hover:bg-red-500/10"><svg class="lucide w-4 h-4"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
           </div>
       </div>
   </aside>
</div>

<!-- =======================
     SCREEN 3: MY PAGE MOCKUP
======================== -->
<div class="screen-view t-screen" id="screen-mypage">
    <div class="mockup-container">
        <!-- Dashboard UI Mockup using Tailwind -->
        <div class="max-w-5xl mx-auto text-white font-sans">
            
            <h1 class="text-3xl font-black border-b-2 border-white/10 pb-5 mb-8">마이페이지</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Profile Section -->
                <div class="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                    <img src="/WITHY/docs/assets/images/프로필사진_강영욱.jpg" class="w-32 h-32 rounded-full object-cover mb-5 border-4 border-red-600 shadow-xl" onerror="this.src='https://ui-avatars.com/api/?name=User&background=random';">
                    <h2 class="text-2xl font-bold mb-2">강영욱 님</h2>
                    <p class="text-neutral-400 mb-6 italic">"함께 볼 때 더 즐거운 OTT 라이프"</p>
                    
                    <div class="flex justify-center gap-4 w-full mb-6">
                        <div class="bg-black/40 p-4 rounded-xl flex-1 border border-white/5">
                            <div class="text-xs text-neutral-400 mb-1">팔로워</div>
                            <div class="text-xl font-bold">1,240</div>
                        </div>
                        <div class="bg-black/40 p-4 rounded-xl flex-1 border border-white/5">
                            <div class="text-xs text-neutral-400 mb-1">함께 본 파티</div>
                            <div class="text-xl font-bold">38 회</div>
                        </div>
                    </div>
                    
                    <button class="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition">프로필 수정</button>
                </div>

                <!-- Stats Section -->
                <div class="col-span-2 flex flex-col gap-8">
                    <!-- Platform Stats -->
                    <div class="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-2">📊 최근 시청 플랫폼 통계</h3>
                        <div class="flex items-end gap-6 h-48 pb-4 border-b border-white/10">
                            
                            <!-- Graph Bars -->
                            <div class="flex-1 flex flex-col justify-end items-center gap-3">
                                <div class="w-16 h-40 bg-red-600 rounded-t-lg relative group">
                                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs py-1 px-2 rounded hidden group-hover:block">120h</div>
                                </div>
                                <span class="text-sm font-bold text-neutral-400">Netflix</span>
                            </div>
                            <div class="flex-1 flex flex-col justify-end items-center gap-3">
                                <div class="w-16 h-24 bg-red-500 rounded-t-lg relative group">
                                     <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs py-1 px-2 rounded hidden group-hover:block">64h</div>
                                </div>
                                <span class="text-sm font-bold text-neutral-400">YouTube</span>
                            </div>
                            <div class="flex-1 flex flex-col justify-end items-center gap-3">
                                <div class="w-16 h-16 bg-blue-600 rounded-t-lg relative group">
                                     <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs py-1 px-2 rounded hidden group-hover:block">48h</div>
                                </div>
                                <span class="text-sm font-bold text-neutral-400">Watcha</span>
                            </div>
                            <div class="flex-1 flex flex-col justify-end items-center gap-3">
                                <div class="w-16 h-10 bg-purple-500 rounded-t-lg relative group">
                                     <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs py-1 px-2 rounded hidden group-hover:block">12h</div>
                                </div>
                                <span class="text-sm font-bold text-neutral-400">Twitch</span>
                            </div>

                        </div>
                    </div>
                    
                    <!-- History -->
                    <div class="bg-white/5 p-8 rounded-2xl border border-white/10 flex-1">
                        <h3 class="text-xl font-bold mb-6 flex items-center gap-2">🕒 최근 파티 참여 히스토리</h3>
                        <div class="flex flex-col gap-3">
                            <div class="p-4 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition cursor-pointer">
                                <div class="flex items-center gap-4">
                                    <img src="/WITHY/docs/assets/images/프로필사진_강영욱.jpg" class="w-10 h-10 rounded-md object-cover">
                                    <div>
                                        <div class="font-bold mb-1">하울의 움직이는 성 같이보기</div>
                                        <div class="text-xs text-neutral-500">어제 · 플랫폼: Netflix · 15명 참여</div>
                                    </div>
                                </div>
                                <div class="text-teal-400 font-bold text-sm bg-teal-400/10 px-3 py-1 rounded-full">시청 완료</div>
                            </div>
                            <div class="p-4 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition cursor-pointer">
                                <div class="flex items-center gap-4">
                                    <img src="/WITHY/docs/assets/images/프로필사진_김건희.png" class="w-10 h-10 rounded-md object-cover bg-neutral-900">
                                    <div>
                                        <div class="font-bold mb-1">아케인 정주행 파티 (1-3화)</div>
                                        <div class="text-xs text-neutral-500">3일 전 · 플랫폼: Netflix · 42명 참여</div>
                                    </div>
                                </div>
                                <div class="text-teal-400 font-bold text-sm bg-teal-400/10 px-3 py-1 rounded-full">시청 완료</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
