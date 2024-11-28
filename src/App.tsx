import { useMemo, useState } from 'react';
import { UsersList } from './components/UsersList';
import { SortBy, type User } from './types.d';
import './App.css';
import { useUsers } from './hooks/useUser';
import { Results } from './components/Results';

function App() {
	const [showColors, setShowColors] = useState(false);
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
	const [filterCountry, setFilterCountry] = useState<string | null>(null);

	const {
		users,
		isLoading,
		isError,
		isFetching,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useUsers();

	const toggleColors = () => {
		setShowColors(!showColors);
	};

	const toggleSortByCountry = () => {
		const newSortingValue =
			sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
		setSorting(newSortingValue);
	};

	const handleDelete = (email: string) => {
		const filteredUsers = users.filter((user) => user.email !== email);
		console.log(filteredUsers);
		// setUsers(filteredUsers);
	};

	const handleReset = async () => {
		refetch();
	};

	const handleChangeSort = (sort: SortBy) => {
		setSorting(sort);
	};

	const filteredUsers = useMemo(() => {
		// console.log('calculate filteredUsers', users);
		return typeof filterCountry === 'string' && filterCountry.length > 0
			? users.filter((user) => {
					return user.location.country
						.toLowerCase()
						.includes(filterCountry.toLowerCase());
			  })
			: users;
	}, [users, filterCountry]);

	const sortedUsers = useMemo(() => {
		// console.log('calculate sortedUsers');

		if (sorting === SortBy.NONE) return filteredUsers;

		const compareProperties: Record<string, (user: User) => string> = {
			[SortBy.COUNTRY]: (user) => user.location.country,
			[SortBy.NAME]: (user) => user.name.first,
			[SortBy.LAST]: (user) => user.name.last,
		};

		return filteredUsers.toSorted((a, b) => {
			const extractProperty = compareProperties[sorting];
			return extractProperty(a).localeCompare(extractProperty(b));
		});
	}, [filteredUsers, sorting]);

	return (
		<div className='App'>
			<h1>Technical Test</h1>
			<Results />
			<header>
				<button onClick={toggleColors}>Change row's colors</button>
				<button onClick={toggleSortByCountry}>
					{sorting === SortBy.COUNTRY
						? 'No filter by country'
						: 'Filter by country'}
				</button>
				<button onClick={handleReset}>Reset state</button>
				<input
					type='text'
					placeholder='Filter by country'
					onChange={(event) => {
						setFilterCountry(event.target.value);
					}}
				/>
			</header>
			<main>
				{users.length > 0 && (
					<UsersList
						showColors={showColors}
						users={sortedUsers}
						deleteUser={handleDelete}
						changeSorting={handleChangeSort}
					/>
				)}
				{isLoading && <p>Loading...</p>}
				{isError && <p>Something went wrong.</p>}
				{!isError && users.length === 0 && <p>There's no users</p>}

				{!isFetching && hasNextPage === true && (
					<button onClick={() => fetchNextPage()}>Load more results</button>
				)}
				{!isLoading && !isError && hasNextPage === false && (
					<p>No more results</p>
				)}
			</main>
		</div>
	);
}

export default App;
