export default function InfoHost({ nickname, profile }: { nickname: string; profile: string }) {
  return (
    <div className="flex items-center gap-2">
      <img src={profile} alt={nickname} className="w-6 h-6 rounded-full object-cover" />
      <span className="text-sm font-semibold text-foreground">{nickname}</span>
    </div>
  );
}
