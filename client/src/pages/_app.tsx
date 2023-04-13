import '@/styles/global.scss';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { ResidentsContextProvider } from '@/context/residentsContext';

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' } }}>
    <ResidentsContextProvider>
      <Component {...pageProps} />
    </ResidentsContextProvider>
  </ChakraProvider>
);

export default App;
