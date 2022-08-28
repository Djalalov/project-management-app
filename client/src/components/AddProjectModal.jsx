import { useState } from "react";
import { FaList } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { ADD_PROJECT } from "../mutations/ProjectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddProjectModal = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [clientId, setClientId] = useState("");
	const [status, setStatus] = useState("new");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//adding a project
	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, clientId, status },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS });
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	//Get Cilents for select
	const { loading, error, data } = useQuery(GET_CLIENTS);

	const handleSubmit = e => {
		e.preventDefault();
		addProject(name, description, clientId, status);
		handleClose();
		console.log(name, "+", description, "+", clientId, "+", status);

		setName("");
		setDescription("");
		setStatus("new");
		setClientId("");
	};
	if (loading) return null;
	if (error) return <p>Something went wrong</p>;

	return (
		<>
			{!loading && !error && (
				<>
					<button
						onClick={handleShow}
						className="btn btn-secondary text-light mt-4 mb-2 mx-2"
					>
						<div className="d-flex align-items-center">
							<FaList />
							<div className="ms-2">New Project</div>
						</div>
					</button>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>New Project</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3">
									<Form.Label htmlFor="name">Project name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter project name"
										id="name"
										value={name}
										onChange={e => setName(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label htmlFor="description">Description</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										placeholder="Enter description"
										id="description"
										value={description}
										onChange={e => setDescription(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label htmlFor="status">Status</Form.Label>
									<Form.Select
										id="status"
										value={status}
										onChange={e => setStatus(e.target.value)}
										required
									>
										<option value="new">Not Started</option>
										<option value="progress">In Progress</option>
										<option value="completed">Completed</option>
									</Form.Select>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label htmlFor="status">Client</Form.Label>
									<Form.Select
										id="status"
										value={clientId}
										onChange={e => setClientId(e.target.value)}
										required
									>
										<option value="">Select Client</option>
										{data.clients.map(client => (
											<option key={client.id} value={client.id}>
												{client.name}
											</option>
										))}
									</Form.Select>
								</Form.Group>

								<Button
									className="btn btn-secondary text-light mt-2"
									type="submit"
								>
									Submit
								</Button>
							</Form>
						</Modal.Body>
					</Modal>
				</>
			)}
		</>
	);
};

export default AddProjectModal;
