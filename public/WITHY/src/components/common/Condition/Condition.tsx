interface Condition {
  isValid: boolean;
  text: string;
}

interface PasswordConditionProps {
  newPassword: string;
}

function ConditionItem({ isValid, text }: Condition) {
  return (
    <div className={`flex items-center gap-2 text-sm transition-colors ${isValid ? "text-red-500 font-bold" : "text-gray-400"}`}>
      {isValid ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span>{text}</span>
    </div>
  );
}

/**
 * 전체 비밀번호 조건 리스트 컴포넌트
 */
export default function PasswordCondition({ newPassword }: PasswordConditionProps) {
  const conditions = [
    { isValid: newPassword.length >= 8, text: "최소 8자 이상" },
    { isValid: /[A-Z]/.test(newPassword), text: "대문자 하나 이상" },
    { isValid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword), text: "특수문자 하나 이상" },
  ];

  return (
    <div className="mt-3 space-y-1 pl-1">
      {conditions.map((condition, index) => (
        <ConditionItem
          key={index}
          isValid={condition.isValid}
          text={condition.text}
        />
      ))}
    </div>
  );
}