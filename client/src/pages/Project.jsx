import { useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import { FaEdit } from "react-icons/fa";

const Project = () => {
	const [editMode, setEditMode] = useState(false);

	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_PROJECT, {
		variables: { id },
	});

	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong</p>;

	return (
		<>
			{!loading && !error && (
				<Card className="my-4">
					<Card.Header as="h2" className="d-flex justify-content-between">
						{data.project.name}
					</Card.Header>
					{editMode ? (
						<EditProjectForm project={data.project} setEditMode={setEditMode} />
					) : (
						<Card.Body>
							<Card.Text>{data.project.description}</Card.Text>
							<Card.Text as="h5" className=" mt-5">
								Project Status
							</Card.Text>
							{data.project.status === "Completed" ? (
								<Badge as="span" pill bg="success" className="badge">
									In Progress
								</Badge>
							) : data.project.status === "In Progress" ? (
								<Badge pill bg="warning">
									In Progress
								</Badge>
							) : data.project.status === "Not Started" ? (
								<Badge pill bg="danger">
									Not Started
								</Badge>
							) : (
								""
							)}
							<ClientInfo client={data.project.client} />

							<div className="d-flex justify-content-between mt-5">
								<Button className="moreBtn" variant="light" href="/">
									Go back...
								</Button>
								<div className="d-flex justify-content-between gap-3">
									<Button
										className="btn btn-secondary"
										href="/"
										onClick={e => {
											e.preventDefault();
											setEditMode(true);
										}}
									>
										<FaEdit className="me-2" /> Edit Project
									</Button>
									<DeleteProjectButton projectId={data.project.id} />
								</div>
							</div>
						</Card.Body>
					)}
				</Card>
			)}
		</>
	);
};

export default Project;
