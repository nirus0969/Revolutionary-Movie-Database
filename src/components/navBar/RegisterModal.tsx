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
import { createUser, verifyUser } from '../../api/services/userService.ts';
import { useErrorMessage } from '../../hooks/useErrorMessage.ts';
import { useAuthContext } from '../../contexts/useAuthContext.ts';

type RegisterModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onOpenChange }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { errorMessage, setErrorMessage } = useErrorMessage(3000);

  const { updateUser } = useAuthContext();

  const handleRegisterAttempt = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    try {
      const newUser = await createUser({ username: username, password: password });

      if (!newUser) {
        setErrorMessage('User already exists.');
        return;
      }

      const user = await verifyUser({ username: username, password: password });

      if (user) {
        updateUser(user);
        onOpenChange(false);
      } else {
        setErrorMessage('Failed to sign in after registration.');
      }
    } catch (e) {
      setErrorMessage('Something went wrong during user creation.');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
            <ModalBody>
              {errorMessage && (
                <div data-testid="registeruser-error-message" style={{ color: 'red' }}>
                  {errorMessage}
                </div>
              )}
              <Input
                data-testid="registeruser-username-input"
                autoFocus
                label="Username"
                variant="bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                data-testid="registeruser-password-input"
                label="Password"
                type="password"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                data-testid="registeruser-confirm-password-input"
                label="Confirm Password"
                type="password"
                variant="bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                data-testid="registeruser-confirm-button"
                color="primary"
                onPress={handleRegisterAttempt}
              >
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
