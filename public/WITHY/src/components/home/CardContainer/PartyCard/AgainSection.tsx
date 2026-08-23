export const AgainSection = ({ progress }: { progress: any }) => (
  <div className="p-4 bg-card border-t border-border space-y-4 animate-in fade-in">
    {/* 내 진행률 & 파티 진행률 반복 렌더링 */}
    {[
      { label: "내 진행률", value: progress.me, color: "bg-blue-500", bgColor: "bg-blue-50" },
      { label: "파티 진행률", value: progress.party, color: "bg-purple-500", bgColor: "bg-purple-50" }
    ].map((item, idx) => (
      <div key={idx} className="space-y-2">
        <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
          <span>{item.label}</span>
          <span>{item.value}%</span>
        </div>
        <div className={`w-full h-1.5 ${item.bgColor} rounded-full overflow-hidden`}>
          <div className={`h-full ${item.color} transition-all duration-700`} style={{ width: `${item.value}%` }} />
        </div>
      </div>
    ))}
  </div>
);

export default AgainSection;