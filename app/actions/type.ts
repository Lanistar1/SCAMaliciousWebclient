

export type User = {
    memeberId: string;
    username:string;
    email:string;
    isVerified:string;
    role:string;
    firstname:string;
    lastname:string;    
    profileImgeUrl:string
}


export type createUser = {
    username:string;
    email:string;
    password:string;
    firstname:string;
    lastname:string;
    ageBracket:string
}


export type login = {
    email:string;
    password:string;
}


export type loggedInUser = {
    data: {
    profile:User;
    token:string;};
    message:string;
    status:number;

}

export type resetPass = {
    code:string;
    newPassword:string;
}


export type changePass = {
    oldPassword:string;
    newPassword:string;
    token:string
}


export type reportQuery ={
    status:string;
    page:number;
    limit:number;
    token:string;
}


export enum Query_Keys {
    REPORTS = 'reports',
    ACTIVE_REPORT = 'active-report',
    REMOVED_REPORTS = 'removed-reports',
    REPORTS_ID = 'id'
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
    id:string;
    reason:string;
    description:string;
    token:string
  }
 