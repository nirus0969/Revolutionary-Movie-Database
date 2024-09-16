import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import * as reactRouterDom from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { AuthenticatedUserContext } from '../../../contexts/useAuthContext';
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('<NavBar />', () => {
  const navigateMock = vi.fn();
  const setIsDarkModeMock = vi.fn();
  const updateUserMock = vi.fn();

  const themeProviderValue = {
    isDarkMode: false,
    setIsDarkMode: setIsDarkModeMock,
  };

  const authProviderValue = {
    user: null,
    updateUser: updateUserMock,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(reactRouterDom.useNavigate).mockReturnValue(navigateMock);
  });

  it('renders application title and components', () => {
    render(
      <ThemeContext.Provider value={themeProviderValue}>
        <AuthenticatedUserContext.Provider value={authProviderValue}>
          <NavBar />
        </AuthenticatedUserContext.Provider>
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId('application-title').textContent).toBe('RMDB');
    expect(screen.getByRole('switch')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Home/i })).toBeTruthy();
  });

  it('navigates to home on NavbarBrand click', () => {
    render(
      <ThemeContext.Provider value={themeProviderValue}>
        <AuthenticatedUserContext.Provider value={authProviderValue}>
          <NavBar />
        </AuthenticatedUserContext.Provider>
      </ThemeContext.Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Home/i }));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('toggles theme mode on switch click', () => {
    render(
      <ThemeContext.Provider value={themeProviderValue}>
        <AuthenticatedUserContext.Provider value={authProviderValue}>
          <NavBar />
        </AuthenticatedUserContext.Provider>
      </ThemeContext.Provider>
    );
    fireEvent.click(screen.getByRole('switch'));
    expect(setIsDarkModeMock).toHaveBeenCalledWith(true);
  });
});
