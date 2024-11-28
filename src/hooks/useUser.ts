import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/users';
import { FetchUsersResult } from '../types';

export const useUsers = () => {
	const {
		data,
		isError,
		isLoading,
		isFetching,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useInfiniteQuery<FetchUsersResult, Error>({
		queryKey: ['users'],
		queryFn: ({ pageParam = 1 }) =>
			fetchUsers({ pageParam: pageParam as number }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextCursor, // Deja de cargar cuando nextCursor sea undefined
		refetchOnWindowFocus: false,
	});

	return {
		users: data?.pages.flatMap((page) => page.users) ?? [],
		isError,
		isLoading,
		isFetching,
		hasNextPage,
		fetchNextPage,
		refetch,
	};
};
