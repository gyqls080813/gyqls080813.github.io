import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/shared/components/common/Card';
import { Button } from '@/shared/components/common/Button';
import { Paragraph } from '@/shared/components/common/Paragraph';

export const DeleteConfirm = ({ name, onCancel, onConfirm }: {
  name: string; onCancel: () => void; onConfirm: () => void;
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
      className="w-full max-w-[340px]">
      <Card elevation="high" radius="large" padding="large">
        <Paragraph typography="t4" fontWeight="bold" textAlign="center" style={{ marginBottom: 8 }}>
          <Paragraph.Text>정말 삭제할까요?</Paragraph.Text>
        </Paragraph>
        <Paragraph typography="t6" color="var(--color-pet-text-secondary)" textAlign="center" style={{ marginBottom: 20 }}>
          <Paragraph.Text>{name}</Paragraph.Text>
        </Paragraph>
        <div className="flex gap-2">
          <Button display="block" size="medium" color="light" onClick={onCancel}>취소</Button>
          <Button display="block" size="medium" color="danger" onClick={onConfirm}>삭제</Button>
        </div>
      </Card>
    </motion.div>
  </motion.div>
);
