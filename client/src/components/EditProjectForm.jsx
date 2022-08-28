import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/ProjectMutations";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditProjectForm = ({ project, setEditMode }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState(() => {
		switch (project.status) {
			case "Not Started":
				return "new";
			case "In Progress":
				return "progress";
			case "Completed":
				return "completed";
			default:
				throw new Error(`Unknown status: ${project.status}`);
		}
	});

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
	});

	const handleSubmit = e => {
		e.preventDefault();
		updateProject(name, description, status);
		setEditMode(false);
	};

	return (
		<div className="mt-5 mx-3">
			<h5>Update project</h5>
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

					<Button className="btn btn-secondary text-light mt-5" type="submit">
						Update
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default EditProjectForm;
/* */
