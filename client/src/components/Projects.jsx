import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./SpinnerComp";
import ProjectCard from "./ProjectCard";

const Projects = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return null;
	if (error) return <p>Something is wrong!</p>;
	return (
		<>
			{data.projects.length > 0 ? (
				<div className="row">
					{data.projects.map(project => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<p>No Projects</p>
			)}
		</>
	);
};

export default Projects;
