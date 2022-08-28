import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

const ProjectCard = ({ project }) => {
	console.log(project);
	return (
		<div className="col-md-4 ">
			<Card className="my-2">
				<Card.Header as="h5" className="d-flex justify-content-between">
					{project.name}

					{project.status === "Completed" ? (
						<Badge as="span" pill bg="success" className="badge">
							In Progress
						</Badge>
					) : project.status === "In Progress" ? (
						<Badge pill bg="warning">
							In Progress
						</Badge>
					) : project.status === "Not Started" ? (
						<Badge pill bg="danger">
							Not Started
						</Badge>
					) : (
						""
					)}
				</Card.Header>
				<Card.Body>
					<Card.Text className="limitedPara">{project.description}</Card.Text>

					<div>
						<Button
							className="moreBtn"
							variant="light"
							href={`/projects/${project.id}`}
						>
							More...
						</Button>
						{/* <span>{project.client.name}</span> */}
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ProjectCard;
