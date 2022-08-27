import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { FaUser } from "react-icons/fa";

const AddProjectModal = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [clientId, setClientId] = useState("");
	const [status, setStatus] = useState("new");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	/* 
	const [addClient] = useMutation(ADD_CLIENT, {
		variables: { name, email, phone },
		update(cache, { data: { addClient } }) {
			const { clients } = cache.readQuery({ query: GET_CLIENTS });
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			});
		},
	});
 */
	const handleSubmit = e => {
		e.preventDefault();
		//addClient(name, email, phone);
		handleClose();
	};

	return (
		<>
			<button
				onClick={handleShow}
				className="btn btn-secondary text-light mt-4 mb-2 mx-2"
			>
				<div className="d-flex align-items-center">
					<FaUser />
					<div className="ms-2">Add Project</div>
				</div>
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="name">Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								id="name"
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
								onChange={e => description(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="status">Status</Form.Label>
							<Form.Select
								id="status"
								onChange={e => setStatus(e.target.value)}
								required
							>
								<option>Not Started</option>
								<option>In Progress</option>
								<option>Completed</option>
							</Form.Select>
						</Form.Group>

						<Button className="btn btn-danger text-light mt-2" type="submit">
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default AddProjectModal;
