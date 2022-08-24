import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import AddClientModel from "./components/AddClientModel";
const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Header />
				<Container>
					<AddClientModel />
					<Clients />
				</Container>
			</ApolloProvider>
		</>
	);
}

export default App;
