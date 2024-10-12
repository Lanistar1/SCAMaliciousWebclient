export type User = {
  memeberId: string;
  username: string;
  email: string;
  isVerified: string;
  role: string;
  firstname: string;
  lastname: string;
  profileImgeUrl: string;
};

export type createUser = {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  ageBracket: string;
};

export type login = {
  email: string;
  password: string;
};

export type loggedInUser = {
  data: {
    profile: User;
    token: string;
  };
  message: string;
  status: number;
};

export type resetPass = {
  code: string;
  newPassword: string;
};

export type changePass = {
  oldPassword: string;
  newPassword: string;
  token: string;
};

export type reportQuery = {
  status: string;
  page: number;
  limit: number;
  token: string;
};

export enum Query_Keys {
  REPORTS = "reports",
  ACTIVE_REPORT = "active-report",
  REMOVED_REPORTS = "removed-reports",
  REPORTS_ID = "id",
}

interface ExperienceDetails {
  _id: string;
  message: string;
  title: string;
}

export interface Report {
  _id: string;
  email: string;
  reasonReportedTitle: string;
  reasonReportedBody: string;
  firstname: string;
  lastname: string;
  userId: string;
  userDetails: string | null;
  experienceId: string;
  experienceDetails: ExperienceDetails;
  adminId: string;
  adminReasonDecision: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  keywordCount?: number;
  unwantedKeywords?: string[];
}

export type Declinetype = {
  id: string;
  reason: string;
  description: string;
  token: string;
};

export interface userProfile {
  firstname: string;
  lastname: string;
  _id: string;
  email: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

//========== for get experience posts =====================
export enum Experience_Query_Keys {
  POST = "posts",
  ACTIVE_POST = "active-post",
  REMOVED_POST = "removed-post",
  POST_ID = "id",
}

export type postQuery = {
  status: string;
  page: number;
  limit: number;
  token: string;
};

export interface ExperiencePost {
  _id: string;
  email: string;
  message: string;
  title: string;
  firstname: string;
  lastname: string;
  userId: string;
  experienceId: string;
  userDetails: UserDetails;
  adminId: string;
  reasonDecline: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  keywordCount: number;
  reportCount: number;
}

interface UserDetails {
  _id: string;
  username: string;
  firstname: string;
  lastname: string
}

export interface ExperiencePostDetail {
  _id: string;
  email: string;
  message: string;
  title: string;
  firstname: string;
  lastname: string;
  userId: string;
  experienceId: string;
  userDetails: UserDetails;
  adminId: string;
  reasonDecline: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  unwantedKeywords: [];
  unwantedKeywordCount: number;
}

export type DeclinePostType = {
  id: string;
  reason: string;
  description: string;
  token: string;
};

export type ApprovePostType = {
  id: string;
  token: string;
};
