import React, { ReactNode, useEffect, useState } from "react";
import { iFacility } from "../models/facility";
import { FacilityService } from "../services/facility-service";
import {
  Auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  User,
  UserCredential,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from "firebase/firestore";
import { iUser } from "../models/user";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  // DBFirebaseApp: FirebaseApp;
  // DBFirebaseDB: Firestore;
  // DBAuth: Auth;
  // isLoggedIn: boolean;
  // logOut: () => Promise<void>;
  // currentUser: User | null;
  // isUserProfileComplete: (user: User) => Promise<boolean>;
  // getUserLoginMethods: (loginEmail: string) => Promise<string[]>;
  // signInWithGoogle: () => void;
  // signupWithEmailAndPasssword: (
  //   email: string,
  //   password: string
  // ) => Promise<UserCredential>;
  // loginWithEmailAndPasssword: (
  //   email: string,
  //   password: string
  // ) => Promise<UserCredential>;
  // sendResetPasswordEmail: (email: string) => Promise<void>;
  // verifyResetPasswordCode: (code: string) => Promise<string>;
  // resetPassword: (code: string, password: string) => Promise<void>;
  // updateLoginStatus: (user: User) => Promise<void>;
  // userDetails: iUser | null;
  // getUserRole: () => void;
  // superAdminStatus: boolean;
  // leagueOwnerStatus: boolean;
};

export const AuthContext = React.createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentFacility, setCurrentFacility] = useState<iFacility | null>(null);
  // const [isFacilityLoggedIn, setIsFacilityLoggedIn] = useState(false);
  
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const [userDetails, setUserDetails] = useState<iUser | null>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [superAdminStatus, setSuperAdminStatus] = useState(false);
  // const [leagueOwnerStatus, setLeagueOwnerStatus] = useState(false);
  
  // const facilityLogOut = async () => {
  //   await userLogOut();
  //   setCurrentFacility(null);
  //   setIsFacilityLoggedIn(false);
  // }
  
  // const userLogOut = async () => {
  //   await signOut(DBAuth);
  //   setIsLoggedIn(false);
  //   setCurrentUser(null);
  //   setUserDetails(null);
  // };

  // const loginWithEmailAndPasssword = async (
  //   email: string,
  //   password: string
  // ) => {
  //   const signinCreds = await signInWithEmailAndPassword(
  //     DBAuth,
  //     email,
  //     password
  //   );
  //   updateLoginStatus(signinCreds.user);
  //   return signinCreds;
  // };
  
  return (
    <AuthContext.Provider
      value={{
        //currentFacility,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider