import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
  useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import AuthModal from './AuthModal.tsx';
import { ModalTypes } from '../../types/modalType.ts';
import { useAuthContext } from '../../contexts/useAuthContext.ts';
import { useTheme } from '../../hooks/useTheme.ts';
import { MoonIcon } from '../Icons/MoonIcon.tsx';
import { SunIcon } from '../Icons/SunIcon.tsx';
import NavDropdown from './NavDropdown.tsx';

const NavBar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState(ModalTypes.LOGIN);
  const { user, updateUser } = useAuthContext();
  const { isDarkMode, setIsDarkMode } = useTheme();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  };

  const goHome = () => {
    navigate('/');
  };

  const openModal = (type: ModalTypes) => {
    setModalType(type);
    onOpen();
  };

  return (
    <>
      <Navbar
        maxWidth="full"
        className="justify-between bg-transparent border-b-2 border-navbar"
      >
        <NavbarBrand>
          <button
            onClick={goHome}
            className="bg-transparent border-0 flex-row flex items-center gap-0 sm:gap-5 p-0 sm:pr-14"
          >
            <img className="w-10 sm:w-14" src="/logo.png" alt="Home" />
            <p data-testid="application-title" className="font-bold text-md sm:text-4xl">
              RMDB
            </p>
          </button>
        </NavbarBrand>
        <NavbarContent className="" justify="end">
          <NavbarItem>
            <Switch
              defaultSelected={isDarkMode}
              onChange={toggleDarkMode}
              size="md"
              color="primary"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <MoonIcon className={className} />
                ) : (
                  <SunIcon className={className} />
                )
              }
            ></Switch>
          </NavbarItem>
          <NavbarItem data-testid="user-dropdown-item">
            <NavDropdown openModal={openModal} user={user} updateUser={updateUser} />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <AuthModal type={modalType} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default NavBar;
