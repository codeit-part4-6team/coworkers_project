import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/header/Header';
import '@/styles/calendar.css';
import { cleanupCookieOnUnload, clearCookies } from '@/utils/cookieStorageUtils';
import { useEffect } from 'react';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    cleanupCookieOnUnload();
    return () => {
      window.removeEventListener('beforeunload', clearCookies);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
