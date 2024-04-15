export class AdminModel {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  workPhone: string;
  roleLabel: string;
  role: string;
}

export class DoctorModel {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  workPhone: string;
  specialty: string;
  subscribedOn: Date;
  subscriptionEndsAt: Date;
  roleLabel: string;
  role: string;
}



export interface ApplicationUser {
  id: number;
  userId: number;
  token: string;
  refreshToken: string;
  email: string;
  fullName: string;
  role: string;
  roleLabel: string;
  roleName: string;
  firstName: string;
  expiresIn: Date;
  isLoggedIn: boolean;
}

export interface GenomedicaLoginInformation {
  authResult: AuthorizationResult;
  userInfo: ApplicationUser;
}

export interface AuthorizationResult {
  userId: number;
  token: string;
  refreshToken: string;
  email: string;
  role: string;
  lastName: string;
  firstName: string;
  expiresIn: Date;
  isLoggedIn: boolean;
}
