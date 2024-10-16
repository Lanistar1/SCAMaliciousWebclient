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

export const forgotPassword = async (data: string) => {
  const res = await axios.post("", data);
  return res.data;
};

export const resetPassword = async (data: resetPass) => {
  const res = await axios.post("", data);
  return res.data;
};

export const changePassword = async (data: changePass) => {
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
  const { status, page, limit, token } = queryKey;
  console.log(queryKey);

  const response = await axios.get(`${apiUrl}/auth/admin/users`, {
    params: { status, page, limit },
    headers: {
      Authorization: token,
    },
  });
  console.log(response);

  return response.data;
};


//===========fetching admin list ==============
export const fetchAdmin = async (queryKey: userQuery) => {
  const { status, page, limit, token } = queryKey;
  console.log(queryKey);

  const response = await axios.get(`${apiUrl}/auth/admins`, {
    params: { status, page, limit },
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