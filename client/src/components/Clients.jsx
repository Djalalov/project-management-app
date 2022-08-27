import Table from "react-bootstrap/Table";
import ClientRow from "./ClientRow";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./SpinnerComp";

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);
	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong!</p>;
	return (
		<>
			{!loading && !error && (
				<Table bordered hover className="mt-2">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Actions</th>
						</tr>
					</thead>
					{
						<tbody>
							{data.clients.map(client => (
								<ClientRow key={client.id} client={client} />
							))}
						</tbody>
					}
				</Table>
			)}
		</>
	);
};

export default Clients;
