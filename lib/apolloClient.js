"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//changed url
export const Provider = ({ children }) => {
  const APP_BASE_URL = process.env.APP_BASE_URL || "http://localhost:3000";

  const client = new ApolloClient({
    uri: `${APP_BASE_URL}/api/graphql`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
