import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { FaUser } from "react-icons/fa";

const AddClientModel = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const handleSubmit = e => {
		e.preventDefault();
		addClient(name, email, phone);
		handleClose();
	};

	return (
		<>
			<button
				onClick={handleShow}
				className="btn btn-primary text-light mt-4 mb-2"
				data-bs-toggle="modal"
				data-bs-target="#addClientModal"
			>
				<div className="d-flex align-items-center">
					<FaUser />
					<div className="ms-2">Add Client</div>
				</div>
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Client</Modal.Title>
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
							<Form.Label htmlFor="email">Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								id="email"
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label htmlFor="phone">Phone</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter phone"
								id="phone"
								onChange={e => setPhone(e.target.value)}
								required
							/>
						</Form.Group>

						<Button className="btn btn-danger text-light mt-2" type="submit">
							Submit
						</Button>
					</Form>
					{/* <Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="name">Name</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter name"
								id="name"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="email">Email address</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter email"
								id="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="name">Phone</Form.Label>
							<Form.Control
								required
								type="number"
								placeholder="Enter phone"
								id="phone"
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>
						</Form.Group>

						<Button type="submit" className="btn mt-4 mb-2">
							Submit
						</Button>
					</Form> */}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default AddClientModel;
