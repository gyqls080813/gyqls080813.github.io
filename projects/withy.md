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
                <button class="px-5 py-2.5 rounded-xl font-bold bg-[#500000] text-neutral-200 hover:bg-[#700000] text-sm">+ 만들기</button>
                <button class="p-2.5 rounded-xl border border-white/5 bg-[#1f1f1f] text-neutral-300">
                    <svg class="lucide"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </button>
                <button class="p-2.5 rounded-xl border border-white/5 bg-[#1f1f1f] text-neutral-300">
                    <svg class="lucide"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
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
     SCREEN 3: MY PAGE MOCKUP
======================== -->
<div class="screen-view t-screen w-full h-full bg-[#111116] overflow-y-auto" id="screen-mypage">
    <div class="max-w-5xl mx-auto text-white font-sans p-10 pb-20">
        
        <div class="flex items-center gap-4 mb-8 pb-5 border-b border-white/10">
            <!-- Back Button to Home -->
            <button class="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer" onclick="window.switchScreen('screen-home')">
                <svg class="lucide w-6 h-6 text-white"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <h1 class="text-3xl font-black">마이페이지</h1>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Profile Section -->
                <div class="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                    <img src="https://ui-avatars.com/api/?name=GUEST&background=dc2626&color=fff&size=200&bold=true" class="w-32 h-32 rounded-full object-cover mb-5 border-4 border-red-600 shadow-xl" onerror="this.src='https://ui-avatars.com/api/?name=User&background=random';">
                    <h2 class="text-2xl font-bold mb-2">GUEST 님</h2>
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
                                    <div class="w-10 h-10 rounded-md bg-neutral-800 flex items-center justify-center shrink-0 border border-white/10">
                                        <svg class="lucide w-5 h-5 text-red-500"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    </div>
                                    <div>
                                        <div class="font-bold mb-1">하울의 움직이는 성 같이보기</div>
                                        <div class="text-xs text-neutral-500">어제 · 플랫폼: Netflix · 15명 참여</div>
                                    </div>
                                </div>
                                <div class="text-teal-400 font-bold text-sm bg-teal-400/10 px-3 py-1 rounded-full">시청 완료</div>
                            </div>
                            <div class="p-4 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition cursor-pointer">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-md bg-neutral-800 flex items-center justify-center shrink-0 border border-white/10">
                                        <svg class="lucide w-5 h-5 text-red-500"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    </div>
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
