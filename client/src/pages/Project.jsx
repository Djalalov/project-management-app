import { Link, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ClientInfo from "../components/ClientInfo";

const Project = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_PROJECT, {
		variables: { id },
	});

	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong</p>;
	console.log(data);
	return (
		<>
			{!loading && !error && (
				<Card className="my-4">
					<Card.Header as="h2" className="d-flex justify-content-between">
						{data.project.name}
					</Card.Header>
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
						<Button className="moreBtn mt-5" variant="light" href="/">
							Go back...
						</Button>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default Project;
