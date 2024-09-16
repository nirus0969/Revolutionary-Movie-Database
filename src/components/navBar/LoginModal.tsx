import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { verifyUser } from '../../api/services/userService.ts';
import { useAuthContext } from '../../contexts/useAuthContext.ts';

type LoginModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { updateUser } = useAuthContext();

  const handleLoginAttempt = async () => {
    const user = await verifyUser({ username: email, password: password });

    if (!user) {
      setErrorMessage('Invalid username and password');

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return;
    }

    updateUser(user);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <Input
                data-testid="email-login-field"
                autoFocus
                label="Username"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                data-testid="password-login-field"
                label="Password"
                type="password"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                data-testid="loginmodal-loginbutton"
                className="bg-navbar text-white"
                onPress={handleLoginAttempt}
              >
                Log in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
