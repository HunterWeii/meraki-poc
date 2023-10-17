import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getConfig } from '@/services/api/config';
import RecoilRootWrapper from '@/components/RecoilRootWrapper';
import Providers from '@/utils/react-query/provider';

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

  const headerConfig = config.filter((i) => i.key === 'header').pop();
  const footerConfig = config.filter((i) => i.key === 'footer').pop();

  return (
    <html lang="en">
      <body>
        {/* <RecoilRootWrapper> */}
        <Providers>
          <Header data={headerConfig.value.navigation.items} />
          {children}
          <Footer data={footerConfig.value.navigation.items} />
        </Providers>
        {/* </RecoilRootWrapper> */}
      </body>
    </html>
  );
}
