import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import NavnDropdown from '../NavDropdown';
import { ModalTypes } from '../../../types/modalType';
import * as reactRouterDom from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('<NavnDropdown />', () => {
  const mockUser = {
    username: 'TestUser',
    _id: '123',
  };

  const openModalMock = vi.fn();
  const updateUserMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.mocked(reactRouterDom.useNavigate).mockReturnValue(navigateMock);
  });

  it('renders user information when user is provided', () => {
    const { queryByText } = render(
      <NavnDropdown
        user={mockUser}
        openModal={openModalMock}
        updateUser={updateUserMock}
      />
    );
    expect(queryByText(mockUser.username)).not.toBeNull();
  });

  it('displays correct items when user is logged in', () => {
    const { getByRole, queryByText } = render(
      <NavnDropdown
        user={mockUser}
        openModal={openModalMock}
        updateUser={updateUserMock}
      />
    );

    fireEvent.click(getByRole('button'));

    expect(queryByText('Watchlist')).toBeTruthy();
    expect(queryByText('Logout')).toBeTruthy();
    expect(queryByText('Login')).toBeFalsy();
    expect(queryByText('Register')).toBeFalsy();
  });

  it('displays correct items when no user is logged in', () => {
    const { getByRole, queryByText } = render(
      <NavnDropdown user={null} openModal={openModalMock} updateUser={updateUserMock} />
    );

    fireEvent.click(getByRole('button'));

    expect(queryByText('Watchlist')).toBeFalsy();
    expect(queryByText('Logout')).toBeFalsy();
    expect(queryByText('Login')).toBeTruthy();
    expect(queryByText('Register')).toBeTruthy();
  });

  it('navigates to watchlist on click', () => {
    const { getByRole } = render(
      <NavnDropdown
        user={mockUser}
        openModal={openModalMock}
        updateUser={updateUserMock}
      />
    );
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('menuitem', { name: 'Watchlist' }));
    expect(navigateMock).toHaveBeenCalledWith('/watchlist');
  });

  it('calls updateUser with null on logout', () => {
    const { getByRole } = render(
      <NavnDropdown
        user={mockUser}
        openModal={openModalMock}
        updateUser={updateUserMock}
      />
    );
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('menuitem', { name: 'Logout' }));
    expect(updateUserMock).toHaveBeenCalledWith(null);
  });

  it('opens login modal on login click', () => {
    const { getByRole } = render(
      <NavnDropdown user={null} openModal={openModalMock} updateUser={updateUserMock} />
    );
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('menuitem', { name: 'Login' }));
    expect(openModalMock).toHaveBeenCalledWith(ModalTypes.LOGIN);
  });

  it('opens register modal on register click', () => {
    const { getByRole } = render(
      <NavnDropdown user={null} openModal={openModalMock} updateUser={updateUserMock} />
    );
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('menuitem', { name: 'Register' }));
    expect(openModalMock).toHaveBeenCalledWith(ModalTypes.REGISTER);
  });
});
