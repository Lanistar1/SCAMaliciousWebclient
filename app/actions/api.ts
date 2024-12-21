import axios from "axios";
import {
  createUser,
  loggedInUser,
  login,
  resetPass,
  changePass,
  reportQuery,
  Declinetype,
  userProfile,
  postQuery,
  DeclinePostType,
  ApprovePostType,
  userQuery,
  BlockUserType,
  addAdmin,
  addKeywords,
  forgotPass,
  addReply,
} from "./type";

// sign up

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);

export const signUp = async (data: createUser) => {
  const res = await axios.post(`${apiUrl}/auth/signup`, data);
  return res.data;
};

export const signIn = async (data: login): Promise<loggedInUser> => {
  const res = await axios.post(`${apiUrl}/auth/login`, data);
  return res.data;
};

export const forgotPassword = async (data: forgotPass) => {
  const res = await axios.post(`${apiUrl}/auth/forgot-password`, data);
  return res.data;
};

export const resetPassword = async (data: resetPass) => {
  const res = await axios.post("", data);
  return res.data;
};



export const fetchReports = async (queryKey: reportQuery) => {
  const { status, page, limit, token } = queryKey;
  console.log(queryKey);

  const response = await axios.get(`${apiUrl}/experience/admin/report`, {
    params: { status, page, limit },
    headers: {
      Authorization: token,
    },
  });
  console.log(response);

  return response.data;
};

export const fetchReportsById = async (id: string, token: string) => {
  const response = await axios.get(`${apiUrl}/experience/admin/report/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const declineReport = async (decline: Declinetype) => {
  const response = await axios.post(
    `${apiUrl}/experience/admin/report/decline/${decline.id}`,
    {
      adminReasonDeclineTitle: decline.reason,
      adminReasonDeclineDescription: decline.description,
    },
    {
      headers: {
        Authorization: decline.token,
      },
    }
  );
  return response.data;
};

//change password=======
export const changePassword = async (data: changePass) => {
  // const res = await axios.put(`${apiUrl}/auth/change-password`, data);
  // return res.data;

  const response = await axios.put(
    `${apiUrl}/auth/change-password`,
    {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    },
    {
      headers: {
        Authorization: data.token,
      },
    }
  );
  return response.data;
};

export const removeReport = async (id: string, token: string) => {
  const response = await axios.post(
    `${apiUrl}/experience/admin/report/remove/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const restoreReport = async (decline: Declinetype) => {
  const response = await axios.post(
    `${apiUrl}/experience/admin/report/restore/${decline.id}`,
    {
      adminRestoreDecisionTitle: decline.reason,
      adminRestoreDecisionDescription: decline.description,
    },
    {
      headers: {
        Authorization: decline.token,
      },
    }
  );
  return response.data;
};

//=====fetching user details ========
export const fetchUser = async (token: string): Promise<userProfile> => {
  const response = await axios.get(`${apiUrl}/auth/user`, {
    headers: {
      Authorization: token, // include token in the headers
    },
  });

  return response.data.data; // access the 'data' field inside response
};

//======== fetching user post/experience =======
export const fetchPost = async (queryKey: postQuery) => {
  const { status, page, limit, token } = queryKey;
  console.log(queryKey);

  const response = await axios.get(`${apiUrl}/experience/admin/all`, {
    params: { status, page, limit },
    headers: {
      Authorization: token,
    },
  });
  console.log(response);

  return response.data;
};

export const fetchPostById = async (id: string, token: string) => {
  const response = await axios.get(`${apiUrl}/experience/admin/all/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const declinePost = async (decline: DeclinePostType) => {
  const response = await axios.post(
    `${apiUrl}/experience/admin/decline/${decline.id}`,
    {
      reasonDeclineTitle: decline.reason,
      reasonDeclineDescription: decline.description,
    },
    {
      headers: {
        Authorization: decline.token,
      },
    }
  );
  return response.data;
};

export const approvePost = async (id: string, token: string) => {
  const response = await axios.post(
    `${apiUrl}/experience/admin/approve/${id}`, // First argument: URL
    {}, // Second argument: Payload (empty object because there's no payload)
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

//===========fetching user list ==============
export const fetchMember = async (queryKey: userQuery) => {
  const { status, page, limit, token, dateRegisteredfrom, dateRegisteredto } =
    queryKey;
  console.log(queryKey);

  const response = await axios.get(`${apiUrl}/auth/admin/users`, {
    params: { status, page, limit, dateRegisteredfrom, dateRegisteredto },
    headers: {
      Authorization: token,
    },
  });
  console.log(response);

  return response.data;
};

//===========fetching admin list ==============
export const fetchAdmin = async (queryKey: userQuery) => {
  const { status, page, limit, token, dateRegisteredfrom, dateRegisteredto } =
    queryKey;
  console.log(queryKey);

  const response = await axios.get(`${apiUrl}/auth/admins`, {
    params: { status, page, limit, dateRegisteredfrom, dateRegisteredto },
    headers: {
      Authorization: token,
    },
  });
  console.log(response);

  return response.data;
};

//======== blocking user =========
export const blockUser = async (user: BlockUserType) => {
  const response = await axios.post(
    `${apiUrl}/auth/admin/block-user`,
    {
      userId: user.userId,
    },
    {
      headers: {
        Authorization: user.token,
      },
    }
  );
  return response.data;
};

//======== unblocking user =========
export const unblockUser = async (user: BlockUserType) => {
  const response = await axios.post(
    `${apiUrl}/auth/admin/unblock-user`,
    {
      userId: user.userId,
    },
    {
      headers: {
        Authorization: user.token,
      },
    }
  );
  return response.data;
};

//======== blocking admin =========
export const blockAdmin = async (user: BlockUserType) => {
  const response = await axios.post(
    `${apiUrl}/auth/admin/block-admin`,
    {
      userId: user.userId,
    },
    {
      headers: {
        Authorization: user.token,
      },
    }
  );
  return response.data;
};

//======== unblocking admin =========
export const unblockAdmin = async (user: BlockUserType) => {
  const response = await axios.post(
    `${apiUrl}/auth/admin/unblock-admin`,
    {
      userId: user.userId,
    },
    {
      headers: {
        Authorization: user.token,
      },
    }
  );
  return response.data;
};

// =========== create admin =======
export const createAdmin = async (adminRequest: addAdmin, token: string) => {
  const res = await axios.post(`${apiUrl}/auth/add-admin`, adminRequest, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

//===========fetching unwanted keyword  ==============
export const fetchUnwantedKeyword = async (queryKey: userQuery) => {
  const { status, page, limit, token } = queryKey;
  console.log(queryKey);

  const response = await axios.get(
    `${apiUrl}/feedback/admin/unwanted/keywords`,
    {
      params: { status, page, limit },
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(response);

  return response.data;
};

// =========== create unwanted keywords =======
export const createKeywords = async (
  keywordRequest: addKeywords,
  token: string
) => {
  const res = await axios.post(
    `${apiUrl}/feedback/admin/unwanted/keywords`,
    keywordRequest,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
};

// ====== fetch user by ID =========
export const fetchUserById = async (id: string, token: string) => {
  const response = await axios.get(`${apiUrl}/auth/admin/users/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// ====== fetch admin by ID =========
export const fetchAdminById = async (id: string, token: string) => {
  const response = await axios.get(`${apiUrl}/auth/admins/one/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

//======= get user post by ID =========
export const fetchUserPostById = async (id: string, token: string) => {
  console.log("show me love");
  const response = await axios.get(`${apiUrl}/experience/admin/user/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response);
  return response.data;
};


//======= get admin dashboard =========
export const fetchFetchDashboard = async (token: string) => {
  const response = await axios.get(`${apiUrl}/auth/admin/dashboard`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response);
  return response.data;
};

//======= get admin dashboard graph =========
export const fetchFetchDashboardGraph = async (token: string) => {
  const response = await axios.get(`${apiUrl}/auth/admin/dashboard/graph`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response);
  return response.data;
};

//======= get quiry =========
export const fetchEnquiry = async (token: string) => {
  const response = await axios.get(`${apiUrl}/feedback/admin/enquiry/all`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response);
  return response.data;
};

//======= get quiry reply =========
export const fetchEnquiryReply = async (token: string, id: string) => {
  const response = await axios.get(`${apiUrl}/feedback/admin/replies/enquiries/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response);
  return response.data;
};


// =========== add reply =======
export const addChatReply = async (replyRequest: addReply, token: string) => {
  const res = await axios.post(`${apiUrl}/feedback/admin/enquiry/reply`, replyRequest, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
