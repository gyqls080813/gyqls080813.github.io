import React, { useState } from 'react';
import Image from 'next/image';
import { registerPet } from '@/features/group/api/pet';
import { Card } from '@/shared/components/common/Card';
import { Box } from '@/shared/components/common/Box';
import { Button } from '@/shared/components/common/Button';
import { Select } from '@/shared/components/common/Select';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { ApiError } from '@/api/request';
import dogDefaultImg from '@/shared/components/ui/default/dog_default.png';
import catDefaultImg from '@/shared/components/ui/default/cat_default.png';

interface Props {
  onRegistered: () => void;
  onSkip: () => void;
}

const inputCls = (hasError = false) =>
  `w-full px-4 py-3.5 text-[15px] outline-none rounded-xl text-[var(--color-pet-text-dark)] transition-all duration-200 font-[inherit] box-border ${
    hasError
      ? 'bg-[#fef8f8] border-[1.5px] border-[#dc2626]'
      : 'bg-[var(--color-pet-input-bg)] border-[1.5px] border-transparent'
  }`;

const speciesOptions = [
  { label: '🐶 강아지', value: 'DOG' },
  { label: '🐱 고양이', value: 'CAT' },
];

const genderOptions = [
  { label: '♂ 남아', value: 'MALE' },
  { label: '♀ 여아', value: 'FEMALE' },
];

const StepRegisterPet: React.FC<Props> = ({ onRegistered, onSkip }) => {
  const [form, setForm] = useState({
    name: '', species: 'DOG' as 'DOG' | 'CAT',
    breed: '', gender: 'MALE' as 'MALE' | 'FEMALE',
    birthdate: '', weight: '', memo: '', is_neutered: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (key: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('반려동물 이름을 입력해주세요.'); return; }
    if (!form.breed.trim()) { setError('품종을 입력해주세요.'); return; }

    setIsLoading(true);
    try {
      await registerPet([{
        name: form.name.trim(),
        species: form.species,
        breed: form.breed.trim(),
        gender: form.gender,
        birthdate: form.birthdate || '2020-01-01',
        weight: parseFloat(form.weight) || 0,
        memo: form.memo,
        is_neutered: form.is_neutered,
      }]);
      onRegistered();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.getDataMessage() || '등록에 실패했습니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card elevation="medium" radius="large" padding="large">
      <Box direction="column" gap="large" alignItems="center">
        {}
        <Box direction="column" gap="xsmall" alignItems="center">
          <Image
            src={form.species === 'DOG' ? dogDefaultImg : catDefaultImg}
            alt="Default Pet Profile"
            width={120}
            height={120}
            className="object-contain"
          />
          <Paragraph typography="t3" fontWeight="bold" textAlign="center">
            <Paragraph.Text>반려동물 등록</Paragraph.Text>
          </Paragraph>
          <Paragraph typography="t6" color="var(--color-pet-text-secondary)" textAlign="center">
            <Paragraph.Text>우리 아이 정보를 입력해주세요</Paragraph.Text>
          </Paragraph>
        </Box>

        {}
        <form onSubmit={handleSubmit} noValidate className="w-full">
          <Box direction="column" gap="small" fullWidth>
            {}
            <input type="text" value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="이름 (예: 초코)" className={inputCls()}
            />

            {}
            <Box direction="row" gap="small" fullWidth>
              <Select
                options={speciesOptions}
                value={form.species}
                onChange={(val) => update('species', val)}
                size="large" fullWidth
              />
              <Select
                options={genderOptions}
                value={form.gender}
                onChange={(val) => update('gender', val)}
                size="large" fullWidth
              />
            </Box>

            {}
            <input type="text" value={form.breed}
              onChange={(e) => update('breed', e.target.value)}
              placeholder="품종 (예: 푸들)" className={inputCls()}
            />

            {}
            <Box direction="row" gap="small" fullWidth>
              <input type="date" value={form.birthdate}
                onChange={(e) => update('birthdate', e.target.value)}
                className={`${inputCls()} flex-1`}
              />
              <input type="text" inputMode="decimal" value={form.weight}
                onChange={(e) => {
                  let val = e.target.value.replace(/[^0-9.]/g, '');
                  const dots = val.match(/\./g);
                  if (dots && dots.length > 1) val = val.substring(0, val.lastIndexOf('.'));
                  if (/^\d{0,2}(\.\d{0,2})?$/.test(val)) {
                    update('weight', val);
                  }
                }}
                placeholder="몸무게 (kg)"
                className={`${inputCls()} flex-1`}
              />
            </Box>

            {}
            <input type="text" value={form.memo}
              onChange={(e) => update('memo', e.target.value)}
              placeholder="메모 (선택, 예: 알레르기 있음)" className={inputCls()}
            />

            {}
            <label className="flex items-center gap-2 px-4 py-3 bg-[var(--color-pet-input-bg)] rounded-xl cursor-pointer text-[15px] text-[var(--color-pet-text-dark)]">
              <input type="checkbox" checked={form.is_neutered}
                onChange={(e) => update('is_neutered', e.target.checked)}
                className="w-[18px] h-[18px] accent-[#FF9500]"
              />
              중성화 완료
            </label>

            {error && (
              <Paragraph typography="t7" color="#dc2626">
                <Paragraph.Text>{error}</Paragraph.Text>
              </Paragraph>
            )}

            <Button display="block" size="xlarge" color="primary" loading={isLoading} type="submit">
              등록하기
            </Button>
          </Box>
        </form>

        <Paragraph typography="t6" color="var(--color-pet-text-secondary)" textAlign="center">
          <span onClick={onSkip} className="cursor-pointer">나중에 할게요 →</span>
        </Paragraph>
      </Box>
    </Card>
  );
};

export default StepRegisterPet;
undefined