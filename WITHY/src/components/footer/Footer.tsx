"use client";

export default function Footer() {
    return (
        <footer className="bg-[#0f0f0f] text-[#a0a0a0] py-12 px-6 border-t border-[#222]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-white text-2xl font-bold mb-4 tracking-tighter">WITHY</h2>
                    <p className="text-sm leading-6 max-w-sm">
                        좋아하는 콘텐츠를 사람들과 함께 즐기는 공간, 위디.<br />
                        지금 바로 파티에 참여해 소통하며 시청해 보세요.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a className="hover:text-white transition">고객센터</a></li>
                        <li><a className="hover:text-white transition">공지사항</a></li>
                        <li><a className="hover:text-white transition">제휴 및 문의</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Policy</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a className="hover:text-white transition">이용약관</a></li>
                        <li><a className="hover:text-white transition text-[#e50914]">개인정보처리방침</a></li>
                        <li><a className="hover:text-white transition">청소년보호정책</a></li>
                    </ul>
                </div>
            </div>

            <hr className="my-8 border-[#222]" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-[12px] gap-4">
                <div className="space-y-1">
                    <p>서울 1반 A107팀 | 팀장: 정정교 | 팀원 : 정승호, 김건희, 송영주, 이민엽, 강영욱</p>
                    <p>주소: 서울특별시 강남구 테헤란로 212, 8층 7팀</p>
                    <p className="mt-4 opacity-50">&copy; 2026 WITHY. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}