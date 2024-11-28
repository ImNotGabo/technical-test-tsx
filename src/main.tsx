import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools />
	</QueryClientProvider>
);
