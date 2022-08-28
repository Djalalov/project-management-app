import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client }) {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
		// we want to delete client and releted projects at the same time thatis why refetching is preferred
		// Instead of fetching data again we can use cached data here
		/* update(cache, { data: { deleteClient } }) {
			const { clients } = cache.readQuery({
				query: GET_CLIENTS,
			});
			cache.writeQuery({
				query: GET_CLIENTS,
				data: {
					clients: clients.filter(client => client.id !== deleteClient.id),
				},
			});
		}, */
	});

	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className="btn btn-danger btn-sm" onClick={deleteClient}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
}
