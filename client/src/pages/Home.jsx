import React from "react";
import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModel from "../components/AddClientModel";
import AddProjectModal from "../components/AddProjectModal";

const Home = () => {
	return (
		<>
			<AddClientModel />
			<AddProjectModal />
			<Projects />
			<br />
			<Clients />
		</>
	);
};

export default Home;
