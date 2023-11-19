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

  const [createAuth0User, { data: mutationData }] =
    useMutation(CREATE_AUTH0_USER);

  useEffect(() => {
    const handleUserLogin = async () => {
      if (user) {
        const result = await createAuth0User({
          variables: {
            email: user.email,
            nickname: user.nickname,
          },
        });

        setUserData(result?.data?.createAuth0User);
      }
    };

    if (user) {
      handleUserLogin();
    }
  }, [user]);

  const logout = () => {
    setUserData(null);
  };

  return (
    <StoreContext.Provider value={{ userData, setUserData, logout, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
};
