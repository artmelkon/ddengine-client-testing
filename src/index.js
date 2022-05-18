import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./store/auth-context";
import App from "./App";
import "./style.scss";

/**
 * 
 * Do not delte this code it helps to upload files
 * over HTTP pipeline
 */
// const httpLink = createUploadLink({
//   uri: "http://localhost:4040/graphql",
// });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    possibleTypes: {
      Directory: ["File", "Folder"],
    },
  }),
});

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById("root")
);
