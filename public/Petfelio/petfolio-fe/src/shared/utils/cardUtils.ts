/**
 * 카드 관련 입력 유틸리티 함수
 *
 * - 카드번호: 숫자만 허용, 4자리 그룹 자동 포맷 (1234-5678-9012-3456)
 * - CVC: 숫자만, 3자리 제한
 * - 유효기간: 숫자만, MM/YY 자동 포맷
 * - 은행명: 특수문자 제거(한글/영문/숫자만)
 */

/** 숫자 외 문자를 모두 제거 */
export const digitsOnly = (value: string): string =>
  value.replace(/\D/g, '');

/**
 * 카드번호 포맷 (0000-0000-0000-0000)
 * - 숫자만 허용, 최대 16자리
 * - 4자리마다 '-' 자동 삽입
 */
export const formatCardNumber = (raw: string): string => {
  const nums = digitsOnly(raw).slice(0, 16);
  const groups: string[] = [];
  for (let i = 0; i < nums.length; i += 4) {
    groups.push(nums.slice(i, i + 4));
  }
  return groups.join('-');
};

/**
 * 카드번호 마스킹 (1234-****-****-5678)
 * - 앞 4자리, 뒤 4자리만 노출
 */
export const maskCardNumber = (cardNo: string): string => {
  const nums = digitsOnly(cardNo);
  if (nums.length < 8) return formatCardNumber(nums);
  const first = nums.slice(0, 4);
  const last = nums.slice(-4);
  const masked = `${first}-****-****-${last}`;
  return masked;
};

/**
 * 카드번호 유효성 검사
 * - 16자리 숫자인지 확인
 */
export const isValidCardNumber = (raw: string): boolean => {
  const nums = digitsOnly(raw);
  return nums.length === 16;
};

/**
 * CVC 포맷 (숫자만, 최대 3자리)
 */
export const formatCVC = (raw: string): string =>
  digitsOnly(raw).slice(0, 3);

/**
 * CVC 유효성 검사 (3자리 숫자)
 */
export const isValidCVC = (raw: string): boolean =>
  digitsOnly(raw).length === 3;

/**
 * 유효기간 포맷 (MM/YY)
 * - 숫자만 허용, 최대 4자리
 * - 2자리 이상이면 자동으로 '/' 삽입
 * - 월(MM)은 01~12로 보정
 */
export const formatValidThru = (raw: string): string => {
  const nums = digitsOnly(raw).slice(0, 4);
  if (nums.length <= 2) return nums;
  let mm = nums.slice(0, 2);
  const mmNum = parseInt(mm, 10);
  if (mmNum > 12) mm = '12';
  if (mmNum < 1 && nums.length >= 2) mm = '01';
  return `${mm}/${nums.slice(2)}`;
};

/**
 * 유효기간 유효성 검사
 * - MM/YY 형태, 01~12 월
 */
export const isValidThru = (raw: string): boolean => {
  const match = raw.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const mm = parseInt(match[1], 10);
  return mm >= 1 && mm <= 12;
};

/**
 * 은행/카드 이름 입력 필터
 * - 한글, 영문, 숫자, 공백만 허용
 */
export const sanitizeName = (raw: string): string =>
  raw.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]/g, '');
