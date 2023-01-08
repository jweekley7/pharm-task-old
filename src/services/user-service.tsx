import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';
import { iUser } from '../models/user';
import { DBCollections } from '../utils/constants';
import { DBApp } from './firebase-core';

export class UserService {
  private _DBUsersCollection = collection(DBApp, DBCollections.users);

  public async getUserByEmail(email: string): Promise<iUser | null> {
    const userByEmailQuery = query(
      this._DBUsersCollection,
      where('email', '==', email)
    );

    const userSnapshotList = await getDocs(userByEmailQuery);

    if (userSnapshotList.empty) {
      return null;
    }

    let userProfile;
    userSnapshotList.forEach((doc) => {
      if (doc.exists()) {
        userProfile = doc.data() as iUser;
      }
    });

    return userProfile ? userProfile : null;
  }

  public async addOrUpdateUserProfile(userDetails: iUser, userId?: string) {
    const userRef = userId
      ? doc(this._DBUsersCollection, userId)
      : doc(this._DBUsersCollection);

    userDetails.id = userRef.id;

    return await setDoc(userRef, userDetails);
  }
}