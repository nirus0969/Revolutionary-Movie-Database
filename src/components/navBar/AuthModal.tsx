import LoginModal from './LoginModal.tsx';
import RegisterModal from './RegisterModal.tsx';
import { ModalTypes } from '../../types/modalType.ts';

type AuthModalProps = {
  type: ModalTypes;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const AuthModal = ({ type, isOpen, onOpenChange }: AuthModalProps) => {
  return (
    <>
      {type === ModalTypes.LOGIN && (
        <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
      {type === ModalTypes.REGISTER && (
        <RegisterModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </>
  );
};

export default AuthModal;
