import React from "react";
import HomeDashboard from "./components/HomeDashboard";

export default function HomeTestPage() {
    return (
        <main className="min-h-screen bg-neutral-100">
            {/* Optional NavBar Placeholder */}
            <div className="h-16 border-b border-black/5 flex items-center px-8 bg-white sticky top-0 z-50">
                <span className="font-bold text-xl">Widdy Home Beta</span>
            </div>

            <HomeDashboard />
        </main>
    );
}
