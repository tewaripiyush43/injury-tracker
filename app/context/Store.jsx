"use client";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_AUTH0_USER } from "@/app/api/graphql/queries";
import { useUser } from "@auth0/nextjs-auth0/client";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { user, error, isLoading } = useUser();

  const [
    createAuth0User,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_AUTH0_USER);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    const handleUserLogin = async () => {
      if (user) {
        const result = await createAuth0User({
          variables: {
            email: user.email,
            nickname: user.nickname,
          },
        });
        console.log("Created new user:", result?.data?.createAuth0User);
        setUserData(result?.data?.createAuth0User);
      }
    };

    if (user) {
      handleUserLogin();
    }
    console.log("User data:", userData);
  }, [user]);

  const logout = () => {
    setUserData(null);
    console.log("Logging out", user, userData);
  };

  return (
    <StoreContext.Provider
      value={{ userData, setUserData, logout, isLoading, mutationLoading }}
    >
      {children}
    </StoreContext.Provider>
  );
};
