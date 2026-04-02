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
<div class="screen-view active-screen flex flex-col h-full w-full relative overflow-hidden bg-[#0a0a0c] text-white" id="screen-home">
    
    <!-- Authentic Header -->
    <header class="pl-0 pr-8 py-4 bg-[#0a0a0c] z-50 sticky top-0 border-b border-white/5 w-full flex-shrink-0">
        <div class="flex items-center gap-4 justify-between">
            <!-- Left: Navigation Toggle & Logo -->
            <div class="flex items-center flex-shrink-0">
                <!-- Hamburger aligns with Navbar (w-20) -->
                <div class="w-20 flex justify-center items-center">
                    <button class="cursor-pointer p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all" onclick="document.getElementById('sidebar-nav').classList.toggle('w-64'); document.getElementById('sidebar-nav').classList.toggle('w-20'); Array.from(document.querySelectorAll('.nav-label')).forEach(el => el.classList.toggle('hidden'));">
                        <svg class="lucide w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                    </button>
                </div>

                <button class="w-48 h-14 relative overflow-hidden flex items-center justify-center rounded-lg transition-all hover:bg-white/5 cursor-pointer" onclick="window.switchScreen('screen-home')">
                    <img src="/WITHY/public/withy/Withy_logo.png" alt="Withy Logo" class="h-10 w-auto object-contain">
                </button>
            </div>

            <div class="flex-1">
                <div class="relative w-full max-w-2xl">
                    <svg class="lucide absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
                    <input type="text" placeholder="파티 검색..." class="w-full pl-12 pr-6 py-3 rounded-xl bg-[#1f1f1f] border border-white/5 text-sm text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder-neutral-600">
                </div>
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center gap-3 flex-shrink-0 relative">
                <button class="cursor-pointer px-6 py-3 rounded-xl font-bold bg-[#500000] text-neutral-200 hover:bg-[#700000] text-sm transition-all shadow-sm" onclick="window.switchScreen('screen-room')">+ 만들기</button>
                <button class="cursor-pointer p-3 rounded-xl font-semibold transition-all shadow-sm border border-white/5 bg-[#1f1f1f] text-neutral-300 hover:bg-neutral-800 hover:text-white" onclick="document.getElementById('friends-panel').classList.toggle('hidden'); document.getElementById('chat-panel').classList.add('hidden');">
                    <svg class="lucide w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </button>
                <button class="cursor-pointer p-3 rounded-xl font-semibold transition-all shadow-sm border border-white/5 bg-[#1f1f1f] text-neutral-300 hover:bg-neutral-800 hover:text-white" onclick="document.getElementById('chat-panel').classList.toggle('hidden'); document.getElementById('friends-panel').classList.add('hidden');">
                    <svg class="lucide w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </button>
                <button id="nav-mypage" class="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-[#27272a] cursor-pointer hover:border-red-500 transition-colors ml-2" onclick="window.switchScreen('screen-mypage')">
                    <img src="https://ui-avatars.com/api/?name=GUEST&background=dc2626&color=fff&bold=true" onerror="this.src='https://ui-avatars.com/api/?name=User&background=random';" class="w-full h-full object-cover">
                </button>
            </div>
        </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
        <!-- Navbar (Sidebar) Component — mirrors Navbar.tsx exactly -->
        <aside id="sidebar-nav" class="transition-all duration-300 w-20 bg-[#0a0a0c] h-full overflow-y-auto scrollbar-hide z-40 relative flex-shrink-0 border-r border-white/5 border-t-0">
            <div class="p-4 space-y-2">
                <!-- 1. 홈 버튼 -->
                <button class="transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto transition-colors bg-neutral-800 text-white cursor-pointer" onclick="window.filterPlatform('all')">
                    <svg class="lucide w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">홈</span>
                </button>

                <div class="my-4"></div>

                <!-- 2. 활성 플랫폼: Netflix (OTT) -->
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer" title="NETFLIX" onclick="window.filterPlatform('netflix')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black" style="padding:6px;">
                        <img src="/WITHY/public/logo/NETFLIX.png" alt="Netflix" style="width:22px;height:22px;object-fit:contain;">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">NETFLIX</span>
                </button>

                <!-- 2. 활성 플랫폼: YouTube -->
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1" title="YouTube" onclick="window.filterPlatform('youtube')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/Youtube.png" alt="YouTube" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">YouTube</span>
                </button>

                <!-- 3. 준비 중인 서비스 (opacity-60 grayscale) — matches Navbar.tsx -->
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1 opacity-60 grayscale hover:opacity-100 hover:grayscale-0" title="Tving" onclick="window.showComingSoon('Tving')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/Tving.png" alt="Tving" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">Tving</span>
                </button>
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1 opacity-60 grayscale hover:opacity-100 hover:grayscale-0" title="쿠팡플레이" onclick="window.showComingSoon('쿠팡플레이')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/coupangplay.png" alt="쿠팡플레이" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">쿠팡플레이</span>
                </button>
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1 opacity-60 grayscale hover:opacity-100 hover:grayscale-0" title="Wavve" onclick="window.showComingSoon('Wavve')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/Wavve.png" alt="Wavve" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">Wavve</span>
                </button>
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1 opacity-60 grayscale hover:opacity-100 hover:grayscale-0" title="왓챠" onclick="window.showComingSoon('왓챠')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/watcha.png" alt="왓챠" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">왓챠</span>
                </button>
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1 opacity-60 grayscale hover:opacity-100 hover:grayscale-0" title="Laftel" onclick="window.showComingSoon('Laftel')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/Laftel.jpg" alt="Laftel" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">Laftel</span>
                </button>
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1 opacity-60 grayscale hover:opacity-100 hover:grayscale-0" title="디즈니 플러스" onclick="window.showComingSoon('디즈니 플러스')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/disneyplus.jpg" alt="디즈니 플러스" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">디즈니 플러스</span>
                </button>
                <button class="nav-platform-btn transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl mx-auto bg-transparent cursor-pointer mt-1 opacity-60 grayscale hover:opacity-100 hover:grayscale-0" title="애플 TV+" onclick="window.showComingSoon('애플 TV+')">
                    <div class="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black">
                        <img src="/WITHY/public/logo/appletvplus.png" alt="애플 TV+" class="w-full h-full object-cover">
                    </div>
                    <span class="nav-label hidden font-semibold text-sm ml-3 whitespace-nowrap grow text-left text-white">애플 TV+</span>
                </button>
            </div>
            <style>
                #sidebar-nav.w-64 button { justify-content: flex-start; width: 100%; height: 40px; border-radius: 12px; padding-left: 0.5rem; padding-right: 0.5rem; background-color: transparent; }
                #sidebar-nav.w-64 button div { width: 40px; height: 40px; margin-right: 0.75rem;}
            </style>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto p-8 px-10 pt-6 pb-12 bg-[#0a0a0c]">
            <!-- 카테고리 셀렉터 -->
            <div id="category-filters" class="mb-8 flex gap-3 pb-4 border-b border-white/10">
                <button class="category-btn px-5 py-2 font-black rounded-full bg-red-600 text-white text-sm cursor-pointer shadow-sm border border-red-600 transition-colors" onclick="setActiveFilter(this, 'all')">전체 파티</button>
                <button class="category-btn px-5 py-2 font-bold rounded-full bg-[#18181b] border border-white/5 text-neutral-400 text-sm cursor-pointer hover:bg-[#27272a] hover:text-white transition-colors" onclick="setActiveFilter(this, 'live')">진행중 LIVE</button>
                <button class="category-btn px-5 py-2 font-bold rounded-full bg-[#18181b] border border-white/5 text-neutral-400 text-sm cursor-pointer hover:bg-[#27272a] hover:text-white transition-colors" onclick="setActiveFilter(this, 'waiting')">대기중</button>
            </div>
            
            <script>
                function setActiveFilter(btn, status) {
                    const filters = document.querySelectorAll('.category-btn');
                    filters.forEach(f => {
                        f.className = 'category-btn px-5 py-2 font-bold rounded-full bg-[#18181b] border border-white/5 text-neutral-400 text-sm cursor-pointer hover:bg-[#27272a] hover:text-white transition-colors';
                    });
                    btn.className = 'category-btn px-5 py-2 font-black rounded-full bg-red-600 text-white text-sm cursor-pointer shadow-sm border border-red-600 transition-colors';
                    
                    const cards = document.querySelectorAll('.party-card');
                    cards.forEach(card => {
                        if (status === 'all') {
                            card.classList.remove('hidden');
                        } else if (card.dataset.status === status) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                }
            </script>

            <section id="section-youtube" class="mb-10">
                <h2 class="text-xl font-bold mb-5 tracking-tight flex items-center gap-2"><img src="/WITHY/public/logo/Youtube.png" alt="YouTube" style="height:20px;width:auto;"> YouTube 인기 파티</h2>
                <!-- YouTube Card Grid (aspect-video, 3-col like real app) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    
                    <!-- PartyCard 1 (Music / YouTube LIVE) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="live" onclick="window.switchScreen('screen-room')">
                        <div class="relative w-full aspect-video bg-neutral-900 border-b border-white/5">
                            <img src="/WITHY/docs/assets/images/jpop.jpg" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-red-600 text-white">
                                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>LIVE
                                </div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>2 / 4</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-4 gap-2">
                            <div class="flex justify-between items-start gap-2 mb-1">
                                <h3 class="text-[16px] font-bold text-neutral-100 leading-snug truncate flex-1">J-POP 신곡 같이 들어요</h3>
                            </div>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="w-8 h-6 flex items-center justify-center"><img src="/WITHY/public/logo/Youtube.png" alt="YouTube" class="h-4 w-auto object-contain select-none"></span>
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-6 flex items-center">음악</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard (YouTube WAITING - 게임) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="waiting">
                        <div class="relative w-full aspect-video bg-neutral-900 border-b border-white/5">
                            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-neutral-600 text-white">WAITING</div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>3 / 6</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-4 gap-2">
                            <div class="flex justify-between items-start gap-2 mb-1">
                                <h3 class="text-[16px] font-bold text-neutral-100 leading-snug truncate flex-1">발로란트 같이 보기</h3>
                                <span class="text-[12px] text-red-500 font-medium whitespace-nowrap mt-0.5">30분 후 시작</span>
                            </div>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="w-8 h-6 flex items-center justify-center"><img src="/WITHY/public/logo/Youtube.png" alt="YouTube" class="h-4 w-auto object-contain select-none"></span>
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-6 flex items-center">게임</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard (YouTube LIVE - 먹방) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="live">
                        <div class="relative w-full aspect-video bg-neutral-900 border-b border-white/5">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-red-600 text-white">
                                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>LIVE
                                </div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>5 / 8</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-4 gap-2">
                            <div class="flex justify-between items-start gap-2 mb-1">
                                <h3 class="text-[16px] font-bold text-neutral-100 leading-snug truncate flex-1">심야 먹방 라이브 같이 봐요</h3>
                            </div>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="w-8 h-6 flex items-center justify-center"><img src="/WITHY/public/logo/Youtube.png" alt="YouTube" class="h-4 w-auto object-contain select-none"></span>
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-6 flex items-center">먹방</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <!-- ========== Netflix Section (aspect-[2/3], 5-col) ========== -->
            <section id="section-netflix" class="mb-10">
                <h2 class="text-xl font-bold mb-5 tracking-tight flex items-center gap-2"><img src="/WITHY/public/logo/NETFLIX.png" alt="Netflix" style="height:18px;width:auto;"> Netflix 인기 파티</h2>
                <!-- Netflix Card Grid (aspect-[2/3] portrait, 5-col like real app) -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

                    <!-- PartyCard (Howl's Moving Castle / Netflix WAITING) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="waiting" onclick="window.switchScreen('screen-room')">
                        <div class="relative w-full aspect-[2/3] bg-neutral-900 border-b border-white/5">
                            <img src="https://image.tmdb.org/t/p/w500/TkTPELv4kC3u1lkloush8skOjE.jpg" onerror="this.src='https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" alt="Howl" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-neutral-600 text-white">WAITING</div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>1 / 4</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-3 gap-1.5">
                            <div class="flex justify-between items-start gap-2">
                                <h3 class="text-[14px] font-bold text-neutral-100 leading-snug truncate flex-1">하울의 움직이는 성</h3>
                            </div>
                            <span class="text-[11px] text-red-500 font-medium">10분 후 시작</span>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-5 flex items-center text-[10px]">애니메이션</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard (Arcane / Netflix Private WAITING) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="waiting" onclick="document.getElementById('password-modal').classList.remove('hidden')">
                        <div class="relative w-full aspect-[2/3] bg-neutral-900 border-b border-white/5">
                            <img src="https://image.tmdb.org/t/p/w500/fAAmMZMbIGMFhmOZkCaLRjSHbml.jpg" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-neutral-600 text-white">WAITING</div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>2 / 8</span>
                                </div>
                            </div>
                            <!-- isPrivate Lock Icon -->
                            <div class="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-10">
                                <svg class="lucide w-3.5 h-3.5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                        </div>
                        <div class="flex flex-col p-3 gap-1.5">
                            <div class="flex justify-between items-start gap-2">
                                <h3 class="text-[14px] font-bold text-neutral-100 leading-snug truncate flex-1">아케인 정주행</h3>
                            </div>
                            <span class="text-[11px] text-red-500 font-medium">1일 후 시작</span>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-5 flex items-center text-[10px]">애니메이션</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard (기생충 / Netflix LIVE) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="live">
                        <div class="relative w-full aspect-[2/3] bg-neutral-900 border-b border-white/5">
                            <img src="https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-red-600 text-white">
                                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>LIVE
                                </div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>4 / 4</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-3 gap-1.5">
                            <h3 class="text-[14px] font-bold text-neutral-100 leading-snug truncate">기생충</h3>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-5 flex items-center text-[10px]">드라마</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard (이상한 변호사 우영우 / Netflix WAITING) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="waiting">
                        <div class="relative w-full aspect-[2/3] bg-neutral-900 border-b border-white/5">
                            <img src="https://image.tmdb.org/t/p/w500/sGMKTOi6CZZCffjOmMQRFjWBcGt.jpg" onerror="this.src='https://image.tmdb.org/t/p/w500/wWhkCmqWEEA81GAlqGbCMUN44CN.jpg';" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-neutral-600 text-white">WAITING</div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>2 / 6</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-3 gap-1.5">
                            <h3 class="text-[14px] font-bold text-neutral-100 leading-snug truncate">이상한 변호사 우영우</h3>
                            <span class="text-[11px] text-red-500 font-medium">2시간 후 시작</span>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-5 flex items-center text-[10px]">드라마</span>
                            </div>
                        </div>
                    </div>

                    <!-- PartyCard (오징어 게임 / Netflix LIVE) -->
                    <div class="party-card group flex flex-col w-full h-full bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-none" data-status="live">
                        <div class="relative w-full aspect-[2/3] bg-neutral-900 border-b border-white/5">
                            <img src="https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg" class="object-cover w-full h-full">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                            <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                                <div class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm bg-red-600 text-white">
                                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>LIVE
                                </div>
                                <div class="flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10">
                                    <svg class="lucide w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>6 / 8</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col p-3 gap-1.5">
                            <h3 class="text-[14px] font-bold text-neutral-100 leading-snug truncate">오징어 게임 시즌2</h3>
                            <div class="flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                <span class="bg-neutral-800 px-2 py-0.5 rounded-md border border-white/5 h-5 flex items-center text-[10px]">스릴러</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>

        <!-- Coming Soon Modal -->
        <div id="coming-soon-modal" class="hidden fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onclick="if(event.target===this)this.classList.add('hidden')">
            <div class="bg-[#1f1f22] w-full max-w-md rounded-[28px] shadow-2xl border border-white/10 overflow-hidden text-center p-10">
                <div style="font-size:64px;margin-bottom:16px;">🚧</div>
                <h3 class="text-2xl font-bold text-white mb-3"><span id="coming-soon-name"></span></h3>
                <p class="text-neutral-400 text-base mb-2">서비스 준비 중입니다</p>
                <p class="text-neutral-500 text-sm mb-8">빠른 시일 내에 만나볼 수 있도록 준비하겠습니다!</p>
                <button class="px-8 py-3 rounded-xl bg-[#500000] hover:bg-[#700000] text-white font-bold text-sm transition-colors cursor-pointer" onclick="document.getElementById('coming-soon-modal').classList.add('hidden')">확인</button>
            </div>
        </div>

        <script>
            // Platform filtering: show only the clicked platform section
            window.filterPlatform = function(platform) {
                var yt = document.getElementById('section-youtube');
                var nf = document.getElementById('section-netflix');
                if (!yt || !nf) return;
                if (platform === 'youtube') {
                    yt.style.display = '';
                    nf.style.display = 'none';
                } else if (platform === 'netflix') {
                    yt.style.display = 'none';
                    nf.style.display = '';
                } else {
                    yt.style.display = '';
                    nf.style.display = '';
                }
            };
            // Coming soon modal for inactive platforms
            window.showComingSoon = function(name) {
                var modal = document.getElementById('coming-soon-modal');
                var nameEl = document.getElementById('coming-soon-name');
                if (nameEl) nameEl.textContent = name;
                if (modal) modal.classList.remove('hidden');
            };
        </script>

        <!-- Password Modal Component (Hidden by default) -->
        <div id="password-modal" class="hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div class="bg-[#1f1f22] w-full max-w-sm rounded-[32px] shadow-2xl border border-white/10 overflow-hidden transform scale-95 transition-transform duration-300">
                <!-- Header -->
                <div class="px-6 py-4 bg-[#1f1f22] flex justify-between items-center border-b border-white/10">
                    <div class="flex items-center gap-2.5">
                        <div class="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center">
                            <svg class="lucide w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <h2 class="text-lg font-bold text-white tracking-tight">아케인 정주행</h2>
                    </div>
                    <button onclick="document.getElementById('password-modal').classList.add('hidden')" class="p-2 bg-neutral-800 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer">
                        <svg class="lucide w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
                    </button>
                </div>

                <!-- Body -->
                <div class="p-6 space-y-6">
                    <div class="space-y-2 relative">
                        <label class="text-[11px] font-bold text-neutral-400 uppercase tracking-wider ml-1">
                            Enter Passcode
                        </label>
                        <div class="flex items-center bg-black/40 rounded-[20px] px-4 py-3 border-2 border-white/10 focus-within:border-red-600/50 focus-within:bg-black/60 focus-within:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] transition-all">
                            <svg class="lucide w-5 h-5 text-neutral-500 mr-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>
                            <input type="password" placeholder="비밀번호 입력" class="bg-transparent border-none focus:ring-0 w-full font-bold text-lg text-white placeholder-neutral-500 py-2 outline-none">
                        </div>
                        <p class="text-[11px] text-neutral-500 px-1 pt-1">
                            호스트가 설정한 비밀번호를 입력해주세요.
                        </p>
                    </div>

                    <button onclick="window.switchScreen('screen-room')" class="cursor-pointer w-full py-4 bg-white text-black rounded-[20px] text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg hover:bg-gray-100">
                        <span class="mt-0.5">입장하기</span>
                        <svg class="lucide w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- =======================
             SLIDING PANELS 
        ======================== -->
        <!-- Chat Panel -->
        <div id="chat-panel" class="hidden absolute top-[80px] right-6 w-[420px] h-[600px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden ring-1 ring-black/5">
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
                    <button onclick="document.getElementById('chat-panel').classList.add('hidden')" class="p-1.5 hover:bg-red-500/20 rounded-lg text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"><svg class="lucide w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg></button>
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
        <div id="friends-panel" class="hidden absolute top-[80px] right-6 w-[380px] h-[580px] bg-[#141416] border border-white/5 rounded-xl shadow-2xl flex flex-col z-[100] overflow-hidden">
            <!-- Header section (Profile) -->
            <div class="p-4 pb-2 shrink-0">
                <div class="bg-[#202022] border border-white/5 p-4 rounded-xl relative">
                    <button onclick="document.getElementById('friends-panel').classList.add('hidden')" class="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
                    </button>
                    
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-14 h-14 rounded-full bg-[#dc2626] flex items-center justify-center text-white font-bold text-xl border-2 border-transparent">
                            GU
                        </div>
                        <div class="flex-1 min-w-0 pr-6">
                            <p class="font-bold text-white text-base truncate">GUEST</p>
                            <p class="text-xs text-zinc-400 truncate mt-0.5">guest@withy.com</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-2 w-full">
                        <button onclick="window.switchScreen('screen-mypage')" class="flex-1 py-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-zinc-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/5">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> 프로필
                        </button>
                        <button class="flex-1 py-2 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#b91c1c]">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> 로그아웃
                        </button>
                    </div>
                </div>

                <!-- Search -->
                <div class="flex gap-2 mt-4">
                    <div class="relative flex-1">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
                        <input type="text" placeholder="친구 검색..." class="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#202022] border border-white/5 text-zinc-200 text-sm outline-none focus:border-zinc-500 transition-colors">
                    </div>
                    <button class="w-[42px] rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] flex items-center justify-center text-white cursor-pointer transition-colors shadow-sm">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                    </button>
                </div>
            </div>

            <!-- Scrollable Area -->
            <div class="flex-1 overflow-y-auto w-full px-4 scrollbar-hide pb-4">
                <style>
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                </style>
                
                <!-- Main Tabs -->
                <div class="flex border-b border-zinc-700/50 mb-4 sticky top-0 bg-[#141416] z-10 pt-2">
                    <button class="flex-1 pb-3 text-sm font-bold border-b-2 border-white text-white">친구 (2)</button>
                    <button class="flex-1 pb-3 text-sm font-bold text-zinc-500 hover:text-zinc-300 transition-colors">신청 (0)</button>
                    <button class="flex-1 pb-3 text-sm font-bold text-zinc-500 hover:text-zinc-300 transition-colors">차단 (0)</button>
                </div>

                <!-- Sub Tabs (온라인/오프라인) -->
                <div class="flex gap-2 mb-4">
                    <button class="flex-1 py-1.5 rounded-md text-xs font-bold border border-[#7f1d1d] bg-[#450a0a]/40 text-[#fca5a5]">온라인 (2)</button>
                    <button class="flex-1 py-1.5 rounded-md text-xs font-bold bg-[#27272a] text-zinc-500 hover:text-zinc-400 transition-colors">오프라인 (0)</button>
                </div>

                <!-- List Items -->
                <div class="space-y-2">
                    <!-- Jiwon -->
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-[#202022] hover:bg-[#27272a] group cursor-pointer transition-colors border border-transparent hover:border-white/5">
                        <div class="relative w-12 h-12 shrink-0">
                            <div class="w-full h-full rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-lg">JI</div>
                            <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#ef4444] rounded-full border-2 border-[#202022] group-hover:border-[#27272a]"></div>
                        </div>
                        <div class="flex-1 min-w-0 pr-2">
                            <p class="font-bold text-[15px] text-white truncate mb-0.5">Jiwon</p>
                            <p class="text-[12px] text-zinc-500 truncate">Netflix 시청 중</p>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button class="p-1.5 rounded-md hover:bg-white/10 text-zinc-300 hover:text-white transition-colors" title="메시지" onclick="document.getElementById('friends-panel').classList.add('hidden'); document.getElementById('chat-panel').classList.remove('hidden');">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </button>
                            <button class="p-1.5 rounded-md hover:bg-white/10 text-zinc-500 hover:text-white transition-colors" title="삭제">
                                <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </div>

                    <!-- MinKyu -->
                    <div class="flex items-center gap-3 p-3 rounded-xl bg-[#202022] hover:bg-[#27272a] group cursor-pointer transition-colors border border-transparent hover:border-white/5">
                        <div class="relative w-12 h-12 shrink-0">
                            <div class="w-full h-full rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-lg">MI</div>
                            <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#ef4444] rounded-full border-2 border-[#202022] group-hover:border-[#27272a]"></div>
                        </div>
                        <div class="flex-1 min-w-0 pr-2">
                            <p class="font-bold text-[15px] text-white truncate mb-0.5">MinKyu</p>
                            <p class="text-[12px] text-zinc-500 truncate">접속 중</p>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button class="p-1.5 rounded-md hover:bg-white/10 text-zinc-300 hover:text-white transition-colors" title="메시지" onclick="document.getElementById('friends-panel').classList.add('hidden'); document.getElementById('chat-panel').classList.remove('hidden');">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </button>
                            <button class="p-1.5 rounded-md hover:bg-white/10 text-zinc-500 hover:text-white transition-colors" title="삭제">
                                <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            // Outside click closer for the side panels
            document.addEventListener('click', function(event) {
                const friendsPanel = document.getElementById('friends-panel');
                const chatPanel = document.getElementById('chat-panel');
                
                // If the user clicks outside both panels AND outside the toggle buttons, hide them.
                // We identify the toggle buttons by making sure the click doesn't bubble from them.
                const isClickInsideFriends = friendsPanel && friendsPanel.contains(event.target);
                const isClickInsideChat = chatPanel && chatPanel.contains(event.target);
                // Hardcoding standard selector heuristic for the header buttons
                const isClickInsideButtons = event.target.closest('header button');

                if (!isClickInsideFriends && !isClickInsideChat && !isClickInsideButtons) {
                    if (friendsPanel && !friendsPanel.classList.contains('hidden')) {
                        friendsPanel.classList.add('hidden');
                    }
                    if (chatPanel && !chatPanel.classList.contains('hidden')) {
                        chatPanel.classList.add('hidden');
                    }
                }
            });
        </script>

    </div>
</div>

<!-- =======================
     SCREEN 2: ROOM ENTRY (Actual Withy Waiting Room Structure)
======================== -->
<div class="screen-view t-screen w-full h-full bg-black relative overflow-hidden hidden" id="screen-room">
    <!-- Background Video Layer -->
    <div class="absolute inset-0 w-full h-full z-0">
        <!-- 대기 상태 - 전체 화면 YouTube -->
        <div class="w-full h-full flex flex-col items-center justify-center text-white">
            <div class="absolute inset-0 w-full h-full pointer-events-none">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/8QE3y-ws7ew?autoplay=1&mute=1&loop=1&playlist=8QE3y-ws7ew&controls=0&showinfo=0&modestbranding=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="object-cover w-full h-full"></iframe>
                <div class="absolute inset-0 bg-black/30"></div>
            </div>
            
            <!-- Overlay for activation button -->
            <div id="room-activate-btn-container" class="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-6 z-50">
                <button onclick="activatePartyUI()" class="flex items-center gap-3 px-12 py-6 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-2xl transition-all shadow-2xl cursor-pointer">
                    <svg class="lucide w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
                    파티 시작하기
                </button>
            </div>
        </div>
        
        <!-- 파티 활성화 상태 UI 모달 (숨김) -->
        <div id="room-active-modal" class="hidden absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-white p-6 z-20 animate-in fade-in duration-700">
            <div class="w-full max-w-2xl bg-neutral-900/80 border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                <!-- Icon & Title -->
                <div class="flex flex-col items-center gap-6 mb-10">
                    <div class="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                        <svg class="lucide w-10 h-10 text-red-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">잠시만요!</h2>
                </div>

                <!-- Divider with glow -->
                <div class="w-24 h-1.5 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full opacity-50 mb-10"></div>

                <!-- Content -->
                <div class="space-y-8 text-xl md:text-2xl font-bold text-gray-200 leading-relaxed">
                    <p>현재 페이지를 <span class="text-red-500 underline underline-offset-8 decoration-4 decoration-red-500/50">나가야</span><br>파티에서 완전히 퇴장됩니다.</p>
                    <div class="bg-white/5 rounded-2xl p-6 border border-white/5 mx-4">
                        <p class="text-base md:text-lg text-gray-400 font-medium mb-3">파티 유지 중 다른 앱 실행 시</p>
                        <div class="flex items-center justify-center gap-3 flex-wrap">
                            <span class="px-4 py-2 bg-[#FF0000]/20 text-[#FF0000] rounded-lg border border-[#FF0000]/20 flex items-center gap-2">
                                <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"></path></svg>
                                YouTube
                            </span>
                            <span class="px-4 py-2 bg-[#E50914]/20 text-[#E50914] rounded-lg border border-[#E50914]/20 flex items-center gap-2">
                                <span class="font-black text-lg leading-none">N</span>
                                Netflix
                            </span>
                        </div>
                        <p class="mt-4 text-red-400 font-bold">원격 조작이 될 수 있으니 주의해주세요.</p>
                    </div>
                </div>

                <div class="mt-12 flex justify-center">
                    <button onclick="window.switchScreen('screen-home')" class="flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-xl transition-all shadow-2xl cursor-pointer">
                        <svg class="lucide w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
                        파티 다시 참여하기
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Overlay: Top Info Bar -->
    <div class="absolute top-0 left-0 w-full z-10 p-8 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between">
        <div class="flex items-start gap-4">
            <div class="text-white">
                <div class="flex items-center gap-3">
                    <button class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 cursor-pointer" onclick="window.switchScreen('screen-home')">
                        <svg class="lucide w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <h1 class="text-3xl font-bold drop-shadow-md">하울의 움직이는 성 방</h1>
                </div>
                <p id="room-time-left" class="text-red-500 text-xl font-bold mt-2 ml-11 drop-shadow-md">
                    10분 후 시작 예정
                </p>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <button class="flex items-center justify-center w-[34px] h-[34px] rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer" title="파티 삭제" onclick="window.switchScreen('screen-home')">
                <svg class="lucide w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
            <div id="room-status-badge" class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wider uppercase shadow-sm bg-neutral-600 text-white">
                WAITING
            </div>
        </div>
    </div>
</div>

<script>
    function activatePartyUI() {
        document.getElementById('room-activate-btn-container').classList.add('hidden');
        document.getElementById('room-time-left').classList.add('hidden');
        
        const badge = document.getElementById('room-status-badge');
        badge.className = 'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wider uppercase shadow-sm bg-red-600 text-white';
        badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> LIVE';

        const modal = document.getElementById('room-active-modal');
        modal.classList.remove('hidden');
    }
</script>

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
                    <button onclick="document.getElementById('logout-modal').classList.remove('hidden')" class="flex items-center justify-center gap-2 px-4 py-[11px] bg-red-900/40 hover:bg-red-900/60 rounded-xl text-sm font-bold text-red-200 transition-colors border border-red-900/30 whitespace-nowrap cursor-pointer">
                        로그아웃
                    </button>
                </div>
            </div>
        </section>

        <!-- Logout Modal -->
        <div id="logout-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div class="bg-zinc-900 w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden border border-zinc-800 animate-in zoom-in-95 duration-300">
                <div class="px-6 py-4 bg-zinc-800/50 flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-4 bg-red-600 rounded-full"></div>
                        <h2 class="text-lg font-black text-white tracking-tight">알림</h2>
                    </div>
                    <button onclick="document.getElementById('logout-modal').classList.add('hidden')" class="p-2 bg-zinc-700/50 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer">
                        <svg class="lucide w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 6 6 18"></polyline><polyline points="6 6 18 18"></polyline></svg>
                    </button>
                </div>
                <div class="p-8 flex flex-col items-center text-center gap-4">
                    <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                        <svg class="lucide w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <div class="space-y-2">
                        <h3 class="text-xl font-bold text-white">로그아웃</h3>
                        <p class="text-zinc-400">정말 로그아웃 하시겠습니까?</p>
                    </div>
                </div>
                <div class="p-4 bg-black/20 flex gap-3">
                    <button onclick="document.getElementById('logout-modal').classList.add('hidden')" class="flex-1 py-4 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 rounded-[20px] font-bold transition-all cursor-pointer">
                        취소
                    </button>
                    <button onclick="window.location.reload()" class="flex-1 py-4 bg-red-600 text-white hover:bg-red-700 rounded-[20px] font-bold shadow-lg transition-all cursor-pointer">
                        로그아웃
                    </button>
                </div>
            </div>
        </div>

        <div class="space-y-12">
            <!-- HostedPartySection Component -->
            <section class="border border-zinc-800 p-10 rounded-3xl shadow-sm bg-zinc-900 relative overflow-hidden">
                <div class="flex flex-wrap items-center justify-between mb-8 gap-4">
                    <div class="flex items-center gap-4">
                        <h2 class="text-xl font-bold text-white">내가 만든 파티</h2>
                        <div class="text-gray-400 text-sm font-bold bg-zinc-800 px-3 py-1 rounded-full">2개</div>
                    </div>
                    <div class="flex gap-2">
                        <button id="hosted-btn-netflix" onclick="toggleHosted('netflix')" class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)] cursor-pointer">Netflix</button>
                        <button id="hosted-btn-youtube" onclick="toggleHosted('youtube')" class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700 cursor-pointer">YouTube</button>
                    </div>
                </div>

                <div class="flex gap-2 mb-6">
                    <button class="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 text-gray-400 hover:bg-zinc-800 hover:text-white rounded-xl transition-all font-bold text-sm border border-zinc-800 cursor-pointer">
                        <svg class="lucide w-4 h-4"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <span>파티 관리</span>
                    </button>
                </div>

                <div id="hosted-cards-netflix" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                
                <div id="hosted-cards-youtube" class="hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="py-20 col-span-full text-center text-zinc-500 font-medium">YouTube 파티가 없습니다.</div>
                </div>
            </section>

            <!-- HistorySection Component -->
            <section class="border border-zinc-800 p-10 rounded-3xl shadow-sm bg-zinc-900 mb-20">
                <div class="flex items-center justify-between mb-10">
                    <h2 class="text-xl font-bold text-white">시청 기록</h2>
                    <div class="flex gap-2">
                        <button id="history-btn-netflix" onclick="toggleHistory('netflix')" class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)] cursor-pointer">Netflix</button>
                        <button id="history-btn-youtube" onclick="toggleHistory('youtube')" class="px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700 cursor-pointer">YouTube</button>
                    </div>
                </div>

                <div class="space-y-12">
                    <!-- Netflix Group -->
                    <div id="history-content-netflix">
                        <div class="flex items-center justify-between border-b border-zinc-800 pb-2 mb-8">
                            <h3 class="text-lg font-bold text-white">2026-04-01</h3>
                            <span class="text-zinc-500 text-sm font-bold">3개</span>
                        </div>
                        <div class="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-5">
                            <div class="flex flex-col gap-3 group relative cursor-pointer">
                                <div class="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-800 relative shadow-xl">
                                    <img src="https://image.tmdb.org/t/p/w500/TkTPELv4kC3u1lkloush8skOjE.jpg" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-70">
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
                    
                    <!-- YouTube Group (Hidden initially) -->
                    <div id="history-content-youtube" class="hidden">
                        <div class="py-20 text-center text-zinc-500 font-medium">
                            YouTube 시청 기록이 없습니다.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</div>

<script>
    function toggleHosted(platform) {
        const btnN = document.getElementById('hosted-btn-netflix');
        const btnY = document.getElementById('hosted-btn-youtube');
        const cardsN = document.getElementById('hosted-cards-netflix');
        const cardsY = document.getElementById('hosted-cards-youtube');
        
        if (platform === 'netflix') {
            btnN.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)] cursor-pointer';
            btnY.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700 cursor-pointer';
            cardsN.classList.remove('hidden');
            cardsN.classList.add('grid');
            cardsY.classList.add('hidden');
            cardsY.classList.remove('grid');
        } else {
            btnY.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)] cursor-pointer';
            btnN.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700 cursor-pointer';
            cardsY.classList.remove('hidden');
            cardsY.classList.add('grid');
            cardsN.classList.add('hidden');
            cardsN.classList.remove('grid');
        }
    }
    
    function toggleHistory(platform) {
        const btnN = document.getElementById('history-btn-netflix');
        const btnY = document.getElementById('history-btn-youtube');
        const contentN = document.getElementById('history-content-netflix');
        const contentY = document.getElementById('history-content-youtube');
        
        if (platform === 'netflix') {
            btnN.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)] cursor-pointer';
            btnY.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700 cursor-pointer';
            contentN.classList.remove('hidden');
            contentY.classList.add('hidden');
        } else {
            btnY.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)] cursor-pointer';
            btnN.className = 'px-6 py-2 rounded-full font-bold text-sm transition-all bg-zinc-800 text-zinc-500 hover:bg-zinc-700 cursor-pointer';
            contentY.classList.remove('hidden');
            contentN.classList.add('hidden');
        }
    }
</script>
</div>
