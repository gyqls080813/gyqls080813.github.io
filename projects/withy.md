---
layout: tour
title: WITHY
app_logo: /WITHY/public/withy/Withy_logo.png
---

<!-- JSON Configuration Removed (Now using Clickable Prototype Router) -->

<!-- CSS specifically for lucide icons and scrolling -->
<style>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
/* Render SVG icons */
.lucide { width: 1.25rem; height: 1.25rem; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; fill: none; }

/* Splash Screen Animations */
@keyframes chrSync { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.95; transform: scale(0.98); } }
@keyframes redNeon { 0%, 100% { filter: drop-shadow(0 0 8px rgba(220,38,38,0.5)); } 50% { filter: drop-shadow(0 0 15px rgba(220,38,38,0.8)); } }
.animate-chr-sync { animation: chrSync 2s ease-in-out infinite; }
.animate-red-neon { animation: redNeon 1.5s ease-in-out infinite; }
.white-neon-glow { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
</style>

<!-- =======================
     SCREEN 0: SPLASH SCREEN
======================== -->
<div class="screen-view t-screen flex flex-col items-center justify-center bg-black w-full h-full cursor-pointer" id="screen-splash" onclick="window.switchScreen('screen-home')">
    <div class="relative flex flex-col items-center transform transition-transform duration-1000 ease-in-out hover:-translate-y-24 hover:scale-75">
        <!-- 1. Character & Logo Group -->
        <div class="relative w-[400px] h-[400px]">
            <div class="absolute inset-0 z-10 animate-chr-sync">
                <img src="/WITHY/public/withy/Withy_chr.png" alt="Withy Character" class="object-contain w-full h-full drop-shadow-2xl">
            </div>
            <div class="absolute inset-0 z-20 animate-red-neon ml-4">
                <img src="/WITHY/public/withy/Withy_logo.png" alt="Withy Logo" class="object-contain w-full h-full">
            </div>
        </div>

        <!-- 2. Text -->
        <div class="mt-[-20px] z-30 white-neon-glow">
            <p class="text-white text-3xl font-black tracking-[0.25em] uppercase italic text-center">
                Watch with WITHY
            </p>
        </div>
    </div>
</div>

<!-- =======================
     SCREEN 1: REAL HOME COMPONENT
======================== -->
<div class="screen-view t-screen flex h-full text-white w-full" id="screen-home" style="background:#0a0a0a;">
    
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
                <button class="px-5 py-2.5 rounded-xl font-bold bg-[#500000] text-neutral-200 hover:bg-[#700000] text-sm cursor-pointer" onclick="window.switchScreen('screen-room')">+ 만들기</button>
                <button class="p-2.5 rounded-xl border border-white/5 bg-[#1f1f1f] text-neutral-300 cursor-pointer hover:border-red-500 transition-colors" onclick="document.getElementById('friends-panel').classList.toggle('translate-x-full'); document.getElementById('chat-panel').classList.add('translate-x-full');">
                    <svg class="lucide w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </button>
                <button class="p-2.5 rounded-xl border border-white/5 bg-[#1f1f1f] text-neutral-300 cursor-pointer hover:border-red-500 transition-colors" onclick="document.getElementById('chat-panel').classList.toggle('translate-x-full'); document.getElementById('friends-panel').classList.add('translate-x-full');">
                    <svg class="lucide w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </button>
                <!-- Target MyPage Button -->
                <button id="nav-mypage" class="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-[#27272a] cursor-pointer hover:border-red-500 transition-colors" onclick="window.switchScreen('screen-mypage')">
                    <img src="https://ui-avatars.com/api/?name=GUEST&background=dc2626&color=fff&bold=true" onerror="this.src='https://ui-avatars.com/api/?name=User&background=random';" class="w-full h-full object-cover">
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

                    <!-- PartyCard 2 (Howl's Moving Castle) - Interactive Prototype Click Target -->
                    <div id="target-party-card" class="group flex flex-col w-full h-[280px] bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer hover:border-red-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(220,38,38,0.2)]" onclick="window.switchScreen('screen-room')">
                        <!-- We style this to be aspect-[2/3] logic visually equivalent -->
                        <div class="relative w-full h-[180px] bg-neutral-900 border-b border-white/5">
                            <img src="https://image.tmdb.org/t/p/w500/TkTPELv4kC3u1lkloush8skOjE.jpg" onerror="this.src='https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" alt="Howl" class="object-cover w-full h-full">
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
                            <img src="https://image.tmdb.org/t/p/w500/xQ6GijEziUjzYogI2Hj5N6n0qI5.jpg" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" class="object-cover w-full h-full">
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

        <!-- =======================
             SLIDING PANELS 
        ======================== -->
        <!-- Chat Panel -->
        <div id="chat-panel" class="absolute top-[80px] right-6 w-[420px] h-[600px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300 z-50 overflow-hidden ring-1 ring-black/5">
            <style>
                .red-scrollbar::-webkit-scrollbar { width: 6px; }
                .red-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .red-scrollbar::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
                .red-scrollbar::-webkit-scrollbar-thumb:hover { background: #b91c1c; }
            </style>
            <div class="bg-zinc-800 px-4 py-3 flex items-center justify-between shrink-0 border-b border-zinc-700 rounded-t-xl">
                <div class="flex items-center gap-3">
                    <p class="text-white text-base font-bold">메시지</p>
                </div>
                <div class="flex items-center gap-1">
                    <button class="p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"><svg class="lucide w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"></line></svg></button>
                    <button onclick="document.getElementById('chat-panel').classList.add('translate-x-full')" class="p-1.5 hover:bg-red-500/20 rounded-lg text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"><svg class="lucide w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg></button>
                </div>
            </div>
            <div class="flex-1 bg-zinc-900 overflow-y-auto rounded-b-xl red-scrollbar">
                <div class="divide-y divide-zinc-800">
                    <div class="flex items-center gap-3 p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                        <div class="relative flex-shrink-0">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="김민수" class="w-12 h-12 rounded-full object-cover bg-zinc-700">
                        </div>
                        <div class="flex-1 min-w-0 pr-2">
                            <div class="flex justify-between items-start">
                                <div class="flex flex-col min-w-0 mr-2">
                                    <p class="font-semibold text-zinc-200 text-sm mb-0.5">김민수</p>
                                    <p class="text-sm truncate text-zinc-400">오늘 워치파티 어땠어?</p>
                                </div>
                                <div class="flex flex-col items-end gap-1 shrink-0">
                                    <span class="text-xs text-zinc-500 whitespace-nowrap">방금 전</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                        <div class="relative flex-shrink-0">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="이지은" class="w-12 h-12 rounded-full object-cover bg-zinc-700">
                        </div>
                        <div class="flex-1 min-w-0 pr-2">
                            <div class="flex justify-between items-start">
                                <div class="flex flex-col min-w-0 mr-2">
                                    <p class="font-semibold text-zinc-200 text-sm mb-0.5">이지은</p>
                                    <p class="text-sm truncate text-zinc-400">다음에 또 봐요!</p>
                                </div>
                                <div class="flex flex-col items-end gap-1 shrink-0">
                                    <span class="text-xs text-zinc-500 whitespace-nowrap">10분 전</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Friends Panel -->
        <div id="friends-panel" class="absolute top-[80px] right-6 w-[420px] h-[600px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300 z-50 overflow-hidden ring-1 ring-black/5">
            <div class="flex-shrink-0 p-4 border-b border-zinc-700 bg-zinc-800">
                <div class="mb-4 p-4 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl shadow-sm relative">
                    <button onclick="document.getElementById('friends-panel').classList.add('translate-x-full')" class="absolute top-3 right-3 p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"><svg class="lucide w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg></button>
                    <div class="flex items-center gap-3 mb-3">
                        <div class="relative">
                            <img src="https://ui-avatars.com/api/?name=GUEST&background=dc2626&color=fff&bold=true" class="w-14 h-14 rounded-full object-cover border-2 border-zinc-600" alt="me">
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-white truncate">GUEST</p>
                            <p class="text-[11px] text-zinc-400 truncate">guest@withy.com</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="window.switchScreen('screen-mypage')" class="flex-1 px-3 py-2 rounded-lg bg-zinc-700 text-zinc-200 text-xs font-semibold hover:bg-zinc-600 cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm border border-zinc-600">
                            <svg class="lucide w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> 프로필
                        </button>
                        <button class="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm border border-red-700">
                            <svg class="lucide w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> 로그아웃
                        </button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <div class="relative flex-1">
                        <svg class="lucide absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
                        <input type="text" placeholder="친구 검색..." class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm outline-none transition-all focus:ring-1 focus:ring-red-600 placeholder:text-zinc-500">
                    </div>
                    <button class="px-3 py-2.5 rounded-lg text-white cursor-pointer transition-all flex items-center shadow-sm bg-red-600 hover:bg-red-700">
                        <svg class="lucide w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                    </button>
                </div>
            </div>
            
            <div class="flex-1 overflow-y-auto bg-zinc-900 scrollbar-hide">
                <div class="p-6 pt-4 space-y-4">
                    <div class="sticky top-0 bg-zinc-900 z-10 flex border-b border-zinc-700 mb-2">
                        <button class="flex-1 py-3 text-sm font-bold cursor-pointer relative transition-all text-white border-b-2 border-white">친구 (2)</button>
                        <button class="flex-1 py-3 text-sm font-bold cursor-pointer relative transition-all text-zinc-500 hover:text-zinc-300">신청 (0)</button>
                        <button class="flex-1 py-3 text-sm font-bold cursor-pointer relative transition-all text-zinc-500 hover:text-zinc-300">차단 (0)</button>
                    </div>
                    <div class="flex gap-2 mb-2">
                        <button class="flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer bg-red-900/30 text-red-400 border-2 border-red-700/50">온라인 (2)</button>
                        <button class="flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer bg-zinc-800 text-zinc-500 border-2 border-transparent">오프라인 (0)</button>
                    </div>

                    <!-- List -->
                    <div class="space-y-1">
                        <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 group cursor-pointer transition-all">
                            <div class="relative flex-shrink-0">
                                <img src="https://ui-avatars.com/api/?name=Jiwon&background=3b82f6&color=fff&bold=true" class="w-10 h-10 rounded-full object-cover bg-zinc-700">
                                <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-zinc-900"></div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-sm text-zinc-200 truncate">Jiwon</p>
                                <p class="text-[11px] text-zinc-500 truncate">Netflix 시청 중</p>
                            </div>
                            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button class="p-1.5 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors" title="메시지 보내기"><svg class="lucide w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                                <button class="p-1.5 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors" title="친구 삭제"><svg class="lucide w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 group cursor-pointer transition-all">
                            <div class="relative flex-shrink-0">
                                <img src="https://ui-avatars.com/api/?name=MinKyu&background=8b5cf6&color=fff&bold=true" class="w-10 h-10 rounded-full object-cover bg-zinc-700">
                                <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-zinc-900"></div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-sm text-zinc-200 truncate">MinKyu</p>
                                <p class="text-[11px] text-zinc-500 truncate">접속 중</p>
                            </div>
                            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button class="p-1.5 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors" title="메시지 보내기"><svg class="lucide w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
                                <button class="p-1.5 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors" title="친구 삭제"><svg class="lucide w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- =======================
     SCREEN 2: ROOM ENTRY (Actual Withy Waiting Room Structure)
======================== -->
<div class="screen-view t-screen w-full h-full bg-black relative overflow-hidden" id="screen-room">
    
    <!-- Background Video Layer (Fake Iframe placeholder) -->
    <div class="absolute inset-0 w-full h-full z-0 flex flex-col items-center justify-center text-white bg-[#0a0a0c]">
        <!-- Fullscreen GIF representing background video/ad mode -->
        <img src="/WITHY/docs/assets/gif/party_enter.gif" alt="Waiting Room Background" class="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm pointer-events-none">
        
        <!-- Overlay Activate Button (from page.tsx) -->
        <div class="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-6 z-50">
            <button class="flex items-center gap-3 px-12 py-6 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-2xl transition-all shadow-2xl cursor-pointer">
                <svg class="lucide w-7 h-7"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
                파티 시작하기
            </button>
        </div>
    </div>

    <!-- Overlay: Top Info Bar -->
    <div class="absolute top-0 left-0 w-full z-10 p-8 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between">
        <!-- Left: Title -->
        <div class="flex items-start gap-4">
            <div class="text-white">
                <div class="flex items-center gap-3">
                    <!-- Back Button -->
                    <button class="p-2 rounded-lg bg-white/10 hover:bg-red-600 transition-all backdrop-blur-sm border border-white/20 cursor-pointer" onclick="window.switchScreen('screen-home')">
                        <svg class="lucide w-6 h-6 text-white"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <h1 class="text-3xl font-bold drop-shadow-md">하울의 움직이는 성 예약방</h1>
                </div>
                <!-- Start time -->
                <p class="text-red-500 text-xl font-bold mt-2 drop-shadow-md tracking-tight">
                    10분 후 시작 예정
                </p>
            </div>
        </div>

        <!-- Right: Status Badges -->
        <div class="flex items-center gap-3">
            <!-- Delete Party Button -->
            <button class="flex items-center justify-center w-[34px] h-[34px] rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer">
                <svg class="lucide w-4 h-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>

            <!-- Live/Waiting Badge -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wider uppercase shadow-sm bg-neutral-600 text-white">
                WAITING
            </div>
        </div>
    </div>
</div>

<!-- =======================
     SCREEN 3: MY PAGE MOCKUP (Real Zinc-900 Dark Theme Components)
======================== -->
<div class="screen-view t-screen w-full h-full bg-black overflow-y-auto flex flex-col !justify-start !items-center" id="screen-mypage">
    
    <!-- Header Component -->
    <header class="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div class="max-w-[1440px] mx-auto px-10 py-3 flex items-center gap-6">
        <!-- 뒤로가기 버튼 -->
        <button class="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white cursor-pointer" onclick="window.switchScreen('screen-home')" aria-label="뒤로 가기">
          <svg class="lucide w-6 h-6"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <!-- 타이틀 영역 -->
        <div>
          <h1 class="text-2xl font-bold text-white tracking-tight">내 활동 & 프로필</h1>
          <p class="text-sm text-zinc-500 mt-0.5">시청 기록 및 프로필 관리</p>
        </div>
      </div>
    </header>

    <main class="max-w-[1440px] mx-auto px-10 py-12 text-white font-sans">
        
        <!-- ProfileSection Component -->
        <section class="w-full bg-zinc-900 border border-zinc-800 rounded-[30px] p-6 lg:p-8 shadow-sm mb-12">
            <div class="flex flex-wrap items-end justify-center xl:justify-between gap-y-8 gap-x-6">
                <!-- User Info -->
                <div class="flex flex-col md:flex-row items-center gap-6 lg:gap-10 shrink-0">
                    <div class="relative shrink-0">
                        <div class="w-20 h-20 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800">
                            <img src="https://ui-avatars.com/api/?name=GUEST&background=dc2626&color=fff&bold=true" alt="Profile" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-zinc-400 ml-1">닉네임</label>
                            <div class="flex items-center gap-3 px-4 py-3 bg-black border border-zinc-800 rounded-xl w-[240px] text-white">
                                <span class="text-sm truncate font-medium">GUEST 님</span>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-zinc-400 ml-1">이메일</label>
                            <div class="flex items-center gap-3 px-4 py-3 bg-black border border-zinc-800 rounded-xl w-[240px] text-white">
                                <svg class="lucide w-4 h-4 text-zinc-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <span class="text-sm truncate font-medium">guest@withy.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap items-center justify-center gap-2 w-full xl:w-auto pb-1">
                    <button class="flex items-center justify-center gap-2 px-4 py-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold text-white transition-colors border border-zinc-700 whitespace-nowrap cursor-pointer">
                        <svg class="lucide w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        정보 수정
                    </button>
                    <button class="flex items-center justify-center gap-2 px-4 py-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold text-white transition-colors border border-zinc-700 whitespace-nowrap cursor-pointer">
                        <svg class="lucide w-4 h-4"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        내 카테고리
                    </button>
                    <button class="flex items-center justify-center gap-2 px-4 py-[11px] bg-red-900/40 hover:bg-red-900/60 rounded-xl text-sm font-bold text-red-200 transition-colors border border-red-900/30 whitespace-nowrap cursor-pointer">
                        로그아웃
                    </button>
                </div>
            </div>
        </section>

        <div class="space-y-12">
            <!-- HostedPartySection Component -->
            <section class="border border-zinc-800 p-10 rounded-3xl shadow-sm bg-zinc-900 relative overflow-hidden">
                <div class="flex flex-wrap items-center justify-between mb-8 gap-4">
                    <div class="flex items-center gap-4">
                        <h2 class="text-xl font-bold text-white">내가 만든 파티</h2>
                        <div class="text-gray-400 text-sm font-bold bg-zinc-800 px-3 py-1 rounded-full">2개</div>
                    </div>
                    <div class="flex gap-2">
                        <button class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]">Netflix</button>
                        <button class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700">YouTube</button>
                    </div>
                </div>

                <div class="flex gap-2 mb-6">
                    <button class="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 text-gray-400 hover:bg-zinc-800 hover:text-white rounded-xl transition-all font-bold text-sm border border-zinc-800 cursor-pointer">
                        <svg class="lucide w-4 h-4"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <span>파티 관리</span>
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="relative group aspect-[2/3] bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border hover:border-red-500">
                        <img src="https://image.tmdb.org/t/p/w500/TkTPELv4kC3u1lkloush8skOjE.jpg" class="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity">
                        <div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                            <span class="px-2 py-0.5 bg-red-600 rounded text-[10px] font-bold">OTT</span>
                            <div class="text-sm font-bold mt-1 shadow-sm">하울의 움직이는 성</div>
                            <div class="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white/70">
                                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> 진행중
                            </div>
                        </div>
                    </div>
                    <div class="relative group aspect-[2/3] bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border hover:border-red-500">
                        <img src="https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg" class="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity">
                        <div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                            <span class="px-2 py-0.5 bg-red-600 rounded text-[10px] font-bold">OTT</span>
                            <div class="text-sm font-bold mt-1 shadow-sm">아케인 시즌 2</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- HistorySection Component -->
            <section class="border border-zinc-800 p-10 rounded-3xl shadow-sm bg-zinc-900 mb-20">
                <div class="flex items-center justify-between mb-10">
                    <h2 class="text-xl font-bold text-white">시청 기록</h2>
                    <div class="flex gap-2">
                        <button class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]">Netflix</button>
                        <button class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700">YouTube</button>
                    </div>
                </div>

                <div class="space-y-12">
                    <!-- Date Group -->
                    <div>
                        <div class="flex items-center justify-between border-b border-zinc-800 pb-2 mb-8">
                            <h3 class="text-lg font-bold text-white">2026-04-01</h3>
                            <span class="text-zinc-500 text-sm font-bold">3개</span>
                        </div>
                        <div class="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-5">
                            <div class="flex flex-col gap-3 group relative cursor-pointer">
                                <div class="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-800 relative shadow-xl">
                                    <img src="https://image.tmdb.org/t/p/w500/TkTPELv4kC3u1lkloush8skOjE.jpg" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-70">
                                    <!-- Progress Bar -->
                                    <div class="absolute bottom-0 left-0 w-full h-1 bg-zinc-700">
                                        <div class="h-full bg-red-600" style="width: 100%;"></div>
                                    </div>
                                </div>
                                <div class="px-1">
                                    <h3 class="font-bold text-base text-white/90 truncate group-hover:text-white mb-1">하울의 움직이는 성</h3>
                                    <p class="text-xs font-semibold text-zinc-500">시청 완료 (100%)</p>
                                </div>
                            </div>

                            <div class="flex flex-col gap-3 group relative cursor-pointer">
                                <div class="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-800 relative shadow-xl">
                                    <img src="https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4v6EDvWtWQ.jpg" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-70">
                                    <div class="absolute bottom-0 left-0 w-full h-1 bg-zinc-700">
                                        <div class="h-full bg-red-600" style="width: 100%;"></div>
                                    </div>
                                </div>
                                <div class="px-1">
                                    <h3 class="font-bold text-base text-white/90 truncate group-hover:text-white mb-1">데드풀과 울버린</h3>
                                    <p class="text-xs font-semibold text-zinc-500">시청 완료 (100%)</p>
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-3 group relative cursor-pointer">
                                <div class="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-800 relative shadow-xl">
                                    <img src="https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-70">
                                    <div class="absolute bottom-0 left-0 w-full h-1 bg-zinc-700">
                                        <div class="h-full bg-red-600" style="width: 45%;"></div>
                                    </div>
                                </div>
                                <div class="px-1">
                                    <h3 class="font-bold text-base text-white/90 truncate group-hover:text-white mb-1">아케인 시즌 2</h3>
                                    <p class="text-xs font-semibold text-zinc-500">진행 중 (45%)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</div>
