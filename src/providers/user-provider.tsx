import React, { ReactNode, useContext, useEffect } from "react";
import { iUser } from "../models/user";
import { UserService } from "../services/user-service";
import { AuthContext } from "./auth-provider";

type UserProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  getUserFromEmail: (userEmail: string) => Promise<iUser | null>;
}

export const UserContext = React.createContext({} as UserContextProps);

const UserProvider = ({ children }: UserProviderProps) => {
  const _userService = new UserService();
  const { currentUser } = useContext(AuthContext);

  const getUserFromEmail = async (userEmail: string) => {
    return await _userService.getUserByEmail(userEmail);
  }

  //Checks to see if the user already exists on the DB. If not, adds user
  const addNewUserToDb = async () => {
    if (currentUser && currentUser.email) {
      const getUser = _userService.getUserByEmail(currentUser.email);
      
      if (await getUser) {
        _userService.addUserToDb(currentUser);
      }     
    }   
  }

  //If current user changes, adds that user to the DB
  useEffect(() => {
    addNewUserToDb();
  }, [currentUser])
  
  return (
    <UserContext.Provider
      value={{
        getUserFromEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider