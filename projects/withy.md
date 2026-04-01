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
      "desc": "WITHY는 넷플릭스, 유튜브 화면 공유의 끊김과 저화질을 해결하기 위해 탄생했습니다.<br><br>독자적인 <strong>타임라인 직접 동기화 기술</strong>로 완벽한 몰입감과 <strong>AI 클린 채팅</strong>을 선사하는 OTT 같이보기 서비스입니다.",
      "tooltipPos": { "top": "20%", "left": "50%", "transform": "translateX(-50%)" },
      "requiresClick": false
    },
    {
      "screenId": "screen-home",
      "title": "같이보기 파티 입장",
      "desc": "홈 화면에서는 현재 많은 사람들이 모여 시청 중인 <strong>인기 파티</strong> 목록을 장르별로 확인할 수 있습니다.<br><br>반짝이는 애니메이션 파티 <strong>[하울의 움직이는 성]</strong> 방을 클릭해서 진입해보세요!",
      "tooltipPos": { "top": "50%", "left": "25%" },
      "requiresClick": true,
      "hotspotBox": { "top": "46%", "left": "26.5%", "width": "23%", "height": "42%" }
    },
    {
      "screenId": "screen-room",
      "title": "실시간 파티방 동기화",
      "desc": "파티에 입장했습니다! 방장이 영상을 컨트롤하면 <strong>WebSocket</strong> 통신을 통해 <strong>밀리세컨드 단위</strong>로 모든 참여자의 영상 시점이 똑같이 제어됩니다.<br><br>또한, gRPC 기반의 AI가 채팅을 실시간으로 감시하여 욕설과 스포일러를 채팅창에서 원천 차단합니다.",
      "tooltipPos": { "bottom": "15%", "right": "10%" },
      "requiresClick": false
    },
    {
      "screenId": "screen-room",
      "title": "내 기록 확인하기",
      "desc": "같이보기 파티가 끝났다면, 내가 시청한 <strong>통계 및 기록</strong>을 확인해 볼까요?<br><br>우측 상단의 <strong>프로필 사진(마이페이지 아이콘)</strong>을 클릭해보세요!",
      "tooltipPos": { "top": "80px", "right": "80px" },
      "requiresClick": "mypage-nav"
    },
    {
      "screenId": "screen-mypage",
      "title": "마이페이지 대시보드",
      "desc": "나의 <strong>플랫폼별 시청 시간 통계</strong>와 참여했던 파티 <strong>히스토리</strong>가 깔끔하게 정리되어 보여집니다.<br><br>이 데이터를 기반으로 AI가 다음번에 참여할 만한 파티를 또 다시 추천해줍니다!",
      "tooltipPos": { "bottom": "15%", "left": "50%", "transform": "translateX(-50%)" },
      "requiresClick": false
    }
  ]
}
</script>

<!-- SCREEN 1: HOME HOT -->
<div class="screen-view t-screen" id="screen-home">
    <img src="/WITHY/docs/assets/images/home_hot.png" alt="Home Screen">
</div>

<!-- SCREEN 2: ROOM ENTRY (GIF) -->
<div class="screen-view t-screen" id="screen-room">
    <img src="/WITHY/docs/assets/gif/party_enter.gif" alt="Party Room Screenshot" style="object-fit: cover;">
</div>

<!-- SCREEN 3: MY PAGE MOCKUP (Hardcoded HTML/CSS since we lack the exact desktop screenshot) -->
<div class="screen-view t-screen" id="screen-mypage">
    <div class="mockup-container">
        <!-- Dashboard UI Mockup -->
        <div style="max-width: 1000px; margin: 0 auto; color: white; font-family: sans-serif;">
            
            <h1 style="font-size: 2rem; font-weight: 800; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 30px;">마이페이지</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
                
                <!-- Profile Section -->
                <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center;">
                    <img src="/WITHY/docs/assets/images/프로필사진_강영욱.jpg" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 3px solid #dc2626;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 10px 0;">강영욱 님</h2>
                    <p style="color: rgba(255,255,255,0.6); margin: 0 0 20px 0;">"함께 볼 때 더 즐거운 OTT 라이프"</p>
                    
                    <div style="display:flex; justify-content: center; gap: 15px; margin-bottom: 30px;">
                        <div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; width:45%;">
                            <div style="font-size: 0.85rem; color: #a1a1aa; margin-bottom: 5px;">팔로워</div>
                            <div style="font-size: 1.2rem; font-weight: 700;">1,240</div>
                        </div>
                        <div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; width:45%;">
                            <div style="font-size: 0.85rem; color: #a1a1aa; margin-bottom: 5px;">함께 본 파티</div>
                            <div style="font-size: 1.2rem; font-weight: 700;">38 회</div>
                        </div>
                    </div>
                </div>

                <!-- Stats Section -->
                <div style="display: flex; flex-direction: column; gap: 30px;">
                    <!-- Platform Stats -->
                    <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
                        <h3 style="font-size: 1.2rem; margin: 0 0 20px 0;">최근 시청 플랫폼 통계</h3>
                        <div style="display: flex; gap: 20px; align-items: flex-end; height: 150px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            
                            <!-- Graph Bars -->
                            <div style="flex: 1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; gap:10px;">
                                <div style="background: #E50914; width: 60px; height: 100px; border-radius: 6px 6px 0 0;"></div>
                                <span style="font-size: 0.85rem; color:#ccc;">Netflix</span>
                            </div>
                            <div style="flex: 1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; gap:10px;">
                                <div style="background: #FF0000; width: 60px; height: 60px; border-radius: 6px 6px 0 0;"></div>
                                <span style="font-size: 0.85rem; color:#ccc;">Youtube</span>
                            </div>
                            <div style="flex: 1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; gap:10px;">
                                <div style="background: #2563EB; width: 60px; height: 40px; border-radius: 6px 6px 0 0;"></div>
                                <span style="font-size: 0.85rem; color:#ccc;">Watcha</span>
                            </div>
                            <div style="flex: 1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; gap:10px;">
                                <div style="background: #9146FF; width: 60px; height: 20px; border-radius: 6px 6px 0 0;"></div>
                                <span style="font-size: 0.85rem; color:#ccc;">Twitch</span>
                            </div>

                        </div>
                    </div>
                    
                    <!-- History -->
                    <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
                        <h3 style="font-size: 1.2rem; margin: 0 0 20px 0;">최근 파티 히스토리</h3>
                        <div style="display:flex; flex-direction:column; gap:15px;">
                            <div style="padding: 15px 20px; background: rgba(0,0,0,0.3); border-radius: 8px; display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <div style="font-weight:700; margin-bottom:5px;">하울의 움직이는 성 같이보기</div>
                                    <div style="font-size:0.85rem; color:#999;">어제 · 애니메이션 · 15명 참여</div>
                                </div>
                                <div style="color: #6ee7b7; font-weight: 700;">시청 완료</div>
                            </div>
                            <div style="padding: 15px 20px; background: rgba(0,0,0,0.3); border-radius: 8px; display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <div style="font-weight:700; margin-bottom:5px;">아케인 정주행 파티</div>
                                    <div style="font-size:0.85rem; color:#999;">3일 전 · 애니메이션/LoL · 42명 참여</div>
                                </div>
                                <div style="color: #6ee7b7; font-weight: 700;">시청 완료</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
