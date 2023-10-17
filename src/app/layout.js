import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getConfig } from '@/services/api/config';
import RecoilRootWrapper from '@/components/RecoilRootWrapper';
import Providers from '@/utils/react-query/provider';
import PersistGate from '@/components/PersistGate';

// Fetch real DF for DF config
// Fetch header config from DF config
// Store DF config to state (server), for subsequent use do not call API

export const metadata = {
  title: 'Meraki Test Title',
  description: 'Meraki test description',
};

export default async function RootLayout({ children }) {
  const config = await getConfig(
    'https://digital-fortress-dev.eco.astro.com.my/dev/config/XdovZqB9Rg/config.json',
  );

  return (
    <html lang="en">
      <body>
        {/* <RecoilRootWrapper> */}
        <PersistGate config={config} />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        {/* </RecoilRootWrapper> */}
      </body>
    </html>
  );
}
