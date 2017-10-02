export interface Authenticate {
  username: string;
  password: string;
}

export interface User {
  //name: string;
  displayName?: string;
  email?: string;
  city?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  phoneNumber?: string;
  photoURL?: string;
  providerId?: string;
  uid?: string;
}
