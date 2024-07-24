"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useRegisterModal } from "@/hooks/useRegisterModal";

export const RegisterModal = () => {
  const { isOpen, onClose } = useRegisterModal();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>登録用モーダル（仮）</DialogContent>
    </Dialog>
  );
};
