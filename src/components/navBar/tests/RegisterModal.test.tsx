import { describe, test, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import RegisterModal from '../RegisterModal.tsx';
import { AuthProvider } from '../../../contexts/AuthProvider.tsx';

describe('RegisterModal', () => {
  test('renders correct labels', () => {
    const { getByTestId } = render(
      <AuthProvider>
        {' '}
        <RegisterModal isOpen={true} onOpenChange={() => {}} />{' '}
      </AuthProvider>
    );
    const usernameLabel = getByTestId('registeruser-username-input').getAttribute(
      'aria-label'
    );
    const passwordLabel = getByTestId('registeruser-password-input').getAttribute(
      'aria-label'
    );
    const confirmPasswordLabel = getByTestId(
      'registeruser-confirm-password-input'
    ).getAttribute('aria-label');

    expect(usernameLabel).toBe('Username');
    expect(passwordLabel).toBe('Password');
    expect(confirmPasswordLabel).toBe('Confirm Password');
  });

  test('Can write on the input fields', () => {
    const { getByTestId } = render(
      <AuthProvider>
        {' '}
        <RegisterModal isOpen={true} onOpenChange={() => {}} />{' '}
      </AuthProvider>
    );
    const usernameInput = getByTestId('registeruser-username-input');
    fireEvent.change(usernameInput, { target: { value: 'gordonlovesbjj' } });
    expect(usernameInput.getAttribute('value')).toBe('gordonlovesbjj');

    const passwordInput = getByTestId('registeruser-password-input');
    fireEvent.change(passwordInput, { target: { value: 'gordon' } });
    expect(passwordInput.getAttribute('value')).toBe('gordon');

    const confirmPassword = getByTestId('registeruser-confirm-password-input');
    fireEvent.change(confirmPassword, { target: { value: 'gordon' } });
    expect(confirmPassword.getAttribute('value')).toBe('gordon');
  });

  test('Get error message with not matching password', () => {
    const { getByTestId } = render(
      <AuthProvider>
        {' '}
        <RegisterModal isOpen={true} onOpenChange={() => {}} />{' '}
      </AuthProvider>
    );
    const usernameInput = getByTestId('registeruser-username-input');
    fireEvent.change(usernameInput, { target: { value: 'gordonlovesbjj' } });
    const passwordInput = getByTestId('registeruser-password-input');
    fireEvent.change(passwordInput, { target: { value: 'gordon' } });
    const confirmPassword = getByTestId('registeruser-confirm-password-input');
    fireEvent.change(confirmPassword, { target: { value: 'gords' } });
    const registerButton = getByTestId('registeruser-confirm-button');
    fireEvent.click(registerButton);

    const errorMessage = getByTestId('registeruser-error-message').textContent;
    expect(errorMessage).toBe('Password and Confirm Password do not match');
  });

  test('Get error message with password not long enough', () => {
    const { getByTestId } = render(
      <AuthProvider>
        {' '}
        <RegisterModal isOpen={true} onOpenChange={() => {}} />{' '}
      </AuthProvider>
    );
    const usernameInput = getByTestId('registeruser-username-input');
    fireEvent.change(usernameInput, { target: { value: 'gordonlovesbjj' } });
    const passwordInput = getByTestId('registeruser-password-input');
    fireEvent.change(passwordInput, { target: { value: 'god' } });
    const confirmPassword = getByTestId('registeruser-confirm-password-input');
    fireEvent.change(confirmPassword, { target: { value: 'god' } });
    const registerButton = getByTestId('registeruser-confirm-button');
    fireEvent.click(registerButton);

    const errorMessage = getByTestId('registeruser-error-message').textContent;
    expect(errorMessage).toBe('Password must be at least 4 characters long.');
  });
});
