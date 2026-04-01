import React from 'react';

export default function EmptyState() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-24">
            <div className="">
                <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-500 mb-2 mt-4">
                진행 중인 방송이 없습니다
            </h3>
            <p className="text-gray-500 text-center max-w-md font-medium">
                현재 이 카테고리에서 진행 중인 워치파티가 없습니다.<br />
                새로운 파티를 만들어 첫 번째 호스트가 되어보세요!
            </p>
        </div>
    );
}
