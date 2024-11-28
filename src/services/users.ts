import { FetchUsersResponse, PageParams } from '../types';

const MAX_PAGES = 4; // Número máximo de páginas que deseas cargar

export const fetchUsers = async ({ pageParam = 1 }: PageParams) => {
	const res = await fetch(
		`https://randomuser.me/api/?results=10&seed=gabriel&page=${pageParam}`
	);
	if (!res.ok) throw new Error('Request error');
	const data: FetchUsersResponse = await res.json();
	const currentPage = Number(data.info.page);
	const nextCursor = pageParam < MAX_PAGES ? currentPage + 1 : undefined;

	return {
		users: data.results,
		nextCursor,
	};
};
