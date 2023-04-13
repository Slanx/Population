import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import ResidentsTree from '@/components/ResidentsTree';
import { Inter } from 'next/font/google';
import { Resident } from '@/interfaces/resident.interface';
import DirectoryMenu from '@/components/DirectoryMenu';
import { Button, useDisclosure } from '@chakra-ui/react';
import { ResidentsContext } from '@/context/residentsContext';
import { useContext, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Home = ({ initialResidents }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { residents, setResidents } = useContext(ResidentsContext);

  useEffect(() => {
    setResidents(initialResidents);
  }, [setResidents, initialResidents]);

  return (
    <main>
      <ResidentsTree />
      <DirectoryMenu isOpen={isOpen} onClose={onClose} />

      <Button pos='absolute' top='1' right='1' colorScheme='blue' onClick={onOpen} hidden={isOpen}>
        Справочник
      </Button>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<{ initialResidents: Resident[] }> = async (
  context,
) => {
  try {
    const res = await axios.get<Resident[]>('http://server:7000/residents');
    const initialResidents = res.data;
    return {
      props: {
        initialResidents,
      },
    };
  } catch (e) {
    return {
      props: {
        initialResidents: [],
      },
    };
  }
};

export default Home;
