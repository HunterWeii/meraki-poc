import './globals.css';
import Providers from '@/utils/react-query/provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HydratedAppConfig from './HydrateAppConfig';

export const metadata = {
  title: 'Meraki Test Title',
  description: 'Meraki test description',
};

/**
 * Fetch App config on Client side
 * open console to see the different
 */

// export default async function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           <Header />
//           { children }
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   );
// }

/**
 * Fetch App config on Server side
 * open console to see the different
 */

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <HydratedAppConfig>
            { children }
          </HydratedAppConfig>
        </Providers>
      </body>
    </html>
  );
}
