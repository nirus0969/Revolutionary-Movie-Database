import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User as UserComponent,
} from '@nextui-org/react';
import { ModalTypes } from '../../types/modalType';
import { useNavigate } from 'react-router-dom';
import { User as userType } from '../../types/gqlResponses.ts';

interface NavDropdownProps {
  openModal: (type: ModalTypes) => void;
  user: userType | null;
  updateUser: (user: userType | null) => void;
}

const NavDropdown = ({ openModal, user, updateUser }: NavDropdownProps) => {
  const navigate = useNavigate();

  const navigateToWatchList = () => {
    navigate('/watchlist');
  };

  return (
    <Dropdown>
      <DropdownTrigger data-testid="user-dropdown-menu">
        {user ? (
          <UserComponent
            as="button"
            avatarProps={{
              isBordered: true,
              showFallback: true,
              icon: <AvatarIcon />,
            }}
            name={user.username}
          />
        ) : (
          <Avatar
            isBordered
            showFallback
            as="button"
            className="transition-transform"
            icon={<AvatarIcon />}
          />
        )}
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Profile Actions">
        {user
          ? [
              <DropdownItem
                data-testid="navigate-to-watchlist-button"
                key="watchlist"
                onPress={navigateToWatchList}
              >
                Watchlist
              </DropdownItem>,
              <DropdownItem
                data-testid="logout-button"
                color="danger"
                key="logout"
                onPress={() => updateUser(null)}
              >
                Logout
              </DropdownItem>,
            ]
          : [
              <DropdownItem
                data-testid="login-button"
                key="login"
                onPress={() => openModal(ModalTypes.LOGIN)}
              >
                Login
              </DropdownItem>,
              <DropdownItem
                data-testid="register-button"
                key="register"
                onPress={() => openModal(ModalTypes.REGISTER)}
              >
                Register
              </DropdownItem>,
            ]}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropdown;
