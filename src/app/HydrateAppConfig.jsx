import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '@/utils/react-query/getQueryClient'
import { getConfigQueryFn } from '@/services/api/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default async function HydratedAppConfig(props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(['app_config'], getConfigQueryFn);

  const appConfig = queryClient.getQueryData(['app_config']);
  queryClient.setQueryData(['pages_config'], appConfig.pages);
  
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Header />
      { props.children }
      <Footer />
    </Hydrate>
  )
}