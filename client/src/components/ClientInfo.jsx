import React from "react";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

const ClientInfo = ({ client }) => {
	return (
		<>
			<h5 className="mt-5">Client Information</h5>
			<ul className="list-group">
				<li className="list-group-item ">
					<FaIdBadge className="me-2" size="1.2em" /> {client.name}
				</li>
				<li className="list-group-item">
					<FaEnvelope className="me-2" size="1.2em" /> {client.email}
				</li>
				<li className="list-group-item">
					<FaPhone className="me-2" size="1.2em" /> {client.phone}
				</li>
			</ul>
		</>
	);
};

export default ClientInfo;
