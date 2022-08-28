import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/ProjectMutations";
import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";

const DeleteProjectButton = ({ projectId }) => {
	const navigate = useNavigate();

	const [deleteProject] = useMutation(DELETE_PROJECT, {
		variables: { id: projectId },
		onCompleted: () => navigate("/"),
		refetchQueries: [{ query: GET_PROJECTS }],
	});

	return (
		<div>
			<Button className="btn" href="/" onClick={deleteProject}>
				<FaTrash className="me-2" /> Delete Project
			</Button>
		</div>
	);
};

export default DeleteProjectButton;
