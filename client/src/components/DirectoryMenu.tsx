import { CreateResidentContext } from '@/context/createResidentContext';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { useState, FC } from 'react';
import CityAddForm from './CityAddForm';
import CitySearch from './CitySearch';
import ResidentForm from './ResidentForm';

interface DirectoryMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const DirectoryMenu: FC<DirectoryMenuProps> = ({ onClose, isOpen }) => {
  return (
    <>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <ResidentForm />
            <Divider my={2} />
            <CityAddForm />
            <Divider my={2} />
            <CitySearch />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DirectoryMenu;
