export type User = {
  memeberId: string;
  username: string;
  email: string;
  isVerified: string;
  role: string;
  firstname: string;
  lastname: string;
  profileImgeUrl: string;
  isTempPassword: boolean; // Add this property
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

export type forgotPass = {
  email: string;
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

export type Restoretype = {
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
  lastname: string;
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

export interface userList {
  _id: string;
  email: string;
  username: string;
  role: string;
  firstname: string;
  lastname: string;
  isVerified: boolean;
  isEnabled: boolean;
  createdAt: string;
  profileImgeUrl: string;
  updatedAt: string;
  ageBracket: string;
  __v: number;
}

export type userQuery = {
  status: string;
  page: number;
  limit: number;
  token: string;
  dateRegisteredfrom: string;
  dateRegisteredto: string;
};

export type BlockUserType = {
  userId: string;
  token: string;
};

export type addAdmin = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
};

export type KeywordResponse = {
  status: number;
  message: string;
  data: {
    keyword: string[];
  };
};

export type addKeywords = {
  keyword: string[];
};

// ========== query key for get user and admin by ID =======
export enum User_Query_Keys {
  USER_ID = "id",
}

export interface postList {
  data: [];
}

export enum Post_Query_Keys {
  Id = "id",
}

export type DashboardResponse = {
  status: number;
  message: string;
  data: {
    allUserCount: number;
    activeUserCount: number;
    inactiveUserCount: number;
    allReportedExperienceCount: number;
    pendingReportedExperienceCount: number;
    allExperienceCount: number;
    pendingExperienceCount: number;
    getUserDemographics: {
      count: number;
      ageBracket: string;
    }[];
    finalRating: {
      rating: number;
      count: number;
    }[];
  };
};

// Define the structure for a single graph data entry
interface GraphDataEntry {
  month: string;
  year: number;
  experienceCount: number;
  reportedExperienceCount: number;
  usersCount: number;
}

// Define the structure for the "data" object
export interface FinalGraphData {
  finalGraph: GraphDataEntry[];
}

// enquiry
export type EnquiryResponse = {
  status: number;
  message: string;
  data: Enquiry[];
  totalCount: number;
};

export type Enquiry = {
  _id: string;
  email: string;
  message: string;
  name: string;
  userId: string;
  userDetails: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type addReply = {
  message: string;
  name: string;
  enquiryId: string;
};

//======== video response type =============
interface Video {
  _id: string;
  url: string;
  title: string;
  status: "ACTIVE" | "INACTIVE"; // Assuming only these two statuses exist
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface VideoResponse {
  status: number;
  message: string;
  data: Video[];
}

export type Post_ArchiveVideo = {
  id: string;
};
