'use client';

// Removed NextButton and useRouter as we are now inside the dashboard.
// The user asked to show this "next to the main part", implying it's a content area.
// We don't need a "Back to Home" button if the sidebar works to navigate back.

export default function ServicePrepare() {
    return (
        <div className="flex w-full h-full flex-col items-center justify-center text-white p-4 min-h-[600px]">
            <div className="flex flex-col items-center max-w-md text-center space-y-8 animate-in fade-in zoom-in duration-500">

                {/* Visual Icon (Construction/Prepare) */}
                <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-10 h-10 text-zinc-400"
                    >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                        서비스 준비 중입니다
                    </h1>
                    <p className="text-zinc-500 leading-relaxed">
                        더 나은 서비스를 위해 준비하고 있습니다.<br />
                        조금만 기다려주세요!
                    </p>
                </div>
            </div>
        </div>
    );
}
