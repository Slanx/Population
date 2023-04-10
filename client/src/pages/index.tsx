import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import ResidentsTree, { addResident, initalRoot } from '@/components/residentsTree';
import { Inter } from 'next/font/google';
import { RawNodeDatum } from 'react-d3-tree/lib/types/types/common';
import { Resident } from '@/interfaces/resident.interface';

const inter = Inter({ subsets: ['latin'] });

const Home = ({ initialTree }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <ResidentsTree initialTree={initialTree} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<{ initialTree: RawNodeDatum }> = async (
  context,
) => {
  const res = await axios.get<Resident[]>('http://server:7000/residents');
  const residents = res.data;

  const initialTree = residents.reduce<RawNodeDatum>((acc, resident) => {
    return addResident(acc, resident);
  }, initalRoot);

  return {
    props: {
      initialTree,
    },
  };
};

export default Home;
