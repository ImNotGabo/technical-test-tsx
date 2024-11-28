import { useUsers } from '../hooks/useUser';

export const Results = () => {
	const { users } = useUsers();

	return <h3>Results: {users.length}</h3>;
};
