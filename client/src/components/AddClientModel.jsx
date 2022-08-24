import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { FaUser } from "react-icons/fa";

const AddClientModel = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = e => {
		e.preventDefault();
		console.log(name, email, phone);
		handleClose();
	};

	return (
		<>
			<button
				onClick={handleShow}
				className="btn text-light mt-4 mb-2"
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
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>
						<Button variant="primary" type="submit">
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
