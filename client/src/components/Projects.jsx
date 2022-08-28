import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
//import { GET_PROJECT } from "../queries/projectQueries";

const Projects = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return null;
	if (error) return <p>Something is wrong!</p>;
	return (
		<>
			{data.projects.length > 0 ? (
				<div className="row">
					{data.projects.map(project => (
						<ProjectCard
							key={project.id}
							project={project}
							/* 							name={project.client.name}
							 */
						/>
					))}
				</div>
			) : (
				<p>No Projects</p>
			)}
		</>
	);
};

export default Projects;
