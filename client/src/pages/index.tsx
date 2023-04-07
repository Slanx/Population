import ResidentsTree from '@/components/residentsTree';
import { levels } from '@/data/treeInitialData';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <main>
      <ResidentsTree levels={levels} />
    </main>
  );
};

export default Home;
