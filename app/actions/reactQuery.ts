import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import {
  signIn,
  signUp,
  resetPassword,
  forgotPassword,
  changePassword,
  fetchReports,
  fetchReportsById,
  declineReport,
  removeReport,
  restoreReport,
  fetchUser,
  fetchPost,
  fetchPostById,
  declinePost,
  approvePost,
  fetchMember,
  fetchAdmin,
  blockUser,
  unblockUser,
  blockAdmin,
  unblockAdmin,
  createAdmin,
  fetchUnwantedKeyword,
  createKeywords,
  fetchUserById,
  fetchAdminById,
  fetchUserPostById,
  fetchFetchDashboard,
  fetchFetchDashboardGraph,
  fetchEnquiry,
  fetchEnquiryReply,
  addChatReply,
} from "./api";
import {
  addAdmin,
  addKeywords,
  addReply,
  ApprovePostType,
  BlockUserType,
  changePass,
  createUser,
  DeclinePostType,
  Declinetype,
  Experience_Query_Keys,
  forgotPass,
  loggedInUser,
  login,
  Post_Query_Keys,
  postQuery,
  Query_Keys,
  reportQuery,
  resetPass,
  User_Query_Keys,
  userProfile,
  userQuery,
} from "./type";
import { toast } from "react-toastify";

// Create a custom hook to use the useMutation hook

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: async (data: createUser) => signUp(data),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Account created successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

export const useSigninAccount = () => {
  return useMutation<loggedInUser, Error, login>({
    mutationFn: async (data: login) => signIn(data),
    onSuccess: () => {
      // Show success toast notification
      // console.log(data)
      toast.success(`Welcome back!`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: resetPass) => resetPassword(data),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Password reset successfully`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: forgotPass) => forgotPassword(data),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Password reset link sent to your email`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: changePass) => changePassword(data),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Password changed successfully`);

    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

export const useReports = (query: reportQuery) => {
  return useQuery({
    queryKey: [Query_Keys.REPORTS, query],
    queryFn: () => fetchReports(query),
  });
};

export const useReportId = (id: string, token: string) => {
  return useQuery({
    queryKey: [Query_Keys.REPORTS_ID, id],
    queryFn: () => fetchReportsById(id, token),
  });
};

export const useReportDecline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Declinetype) => declineReport(data),
    onSuccess: () => {
      toast.success(`Report Declined`);
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.REPORTS_ID],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

export const useReportRemove = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) =>
      removeReport(id, token),
    onSuccess: () => {
      toast.success(`Report Removed`);
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.REPORTS_ID],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

export const useReportRestore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Declinetype) => restoreReport(data),
    onSuccess: () => {
      toast.success(`Report Restored`);
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.REPORTS_ID],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

//========= Fetch user details =========
export const useUser = (token: string) => {
  return useQuery<userProfile>({
    queryKey: ["user"],
    queryFn: () => fetchUser(token),
    enabled: !!token, // only run if token exists
    
  });
};

//===========get user posts (experience) =====
export const useExperience = (query: postQuery) => {
  return useQuery({
    queryKey: [Experience_Query_Keys.POST, query],
    queryFn: () => fetchPost(query),
  });
};

export const useExperienceId = (id: string, token: string) => {
  return useQuery({
    queryKey: [Experience_Query_Keys.POST_ID, id],
    queryFn: () => fetchPostById(id, token),
  });
};

export const usePostDecline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeclinePostType) => declinePost(data),
    onSuccess: () => {
      toast.success(`Post Declined`);
      queryClient.invalidateQueries({
        queryKey: [Experience_Query_Keys.POST_ID],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

export const usePostApprove = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) =>
      approvePost(id, token),
    // mutationFn: async ( data: ApprovePostType) => approvePost(data),
    onSuccess: () => {
      toast.success(`Post Approved`);
      queryClient.invalidateQueries({
        queryKey: [Experience_Query_Keys.POST_ID],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

//========= Fetch all user =========
export const useMember = (query: userQuery) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchMember(query), 
    placeholderData: keepPreviousData,
  });
};

//========= Fetch all admin =========
export const useAdmin = (query: userQuery) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchAdmin(query),
  });
};

// ========= Block user =========
export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BlockUserType) => blockUser(data),
    onSuccess: () => {
      toast.success(`User Successfully Blocked`);
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

// ========= Unblock user =========
export const useUnblockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BlockUserType) => unblockUser(data),
    onSuccess: () => {
      toast.success(`User Successfully Unblocked`);
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

// ========= Block admin =========
export const useBlockAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BlockUserType) => blockAdmin(data),
    onSuccess: () => {
      toast.success(`Admin Successfully Blocked`);
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

// ========= Unblock admin =========
export const useUnblockAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BlockUserType) => unblockAdmin(data),
    onSuccess: () => {
      toast.success(`Admin Successfully Unblocked`);
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (error) => {
      // Show error toast notification
      return toast.error(`Error occurred: ${error.message}`);
    },
  });
};

// ======= create new admin =========
export const useCreateAdmin = (token: string) => {
  return useMutation({
    mutationFn: async (data: addAdmin) => createAdmin(data, token),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Admin added successfully.`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};


// ======= fetch admin unwanted keyword =========
export const useUnwantedKeyword = (query: userQuery) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchUnwantedKeyword(query),
  });
};

// ======= create unwanted keywords =========
export const useCreateKeywords = (token: string) => {
  return useMutation({
    mutationFn: async (data: addKeywords) => createKeywords(data, token),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Unwanted keywords added successfully.`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};


// =========== get user by ID ===============
export const useUserId = (id: string, token: string) => {
  return useQuery({
    queryKey: [User_Query_Keys.USER_ID, id],
    queryFn: () => fetchUserById(id, token),
  });
};

// =========== get admin by ID ===============
export const useAdminId = (id: string, token: string) => {
  return useQuery({
    queryKey: [User_Query_Keys.USER_ID, id],
    queryFn: () => fetchAdminById(id, token),
  });
};


//======= get user post by ID =========
export const useUserPostId = (id: string, token: string) => {
  console.log("show me hate");
  console.log("id:", id, "token:", token);
  return useQuery({
    queryKey: [Post_Query_Keys.Id, id],
    queryFn: () => fetchUserPostById(id, token),
  });
};

// ======= fetch admin dashboard =========
export const useFetchDashboard = (token: string) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchFetchDashboard(token),
  });
};

// ======= fetch admin dashboard graph =========
export const useFetchDashboardGraph = (token: string) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchFetchDashboardGraph(token),
  });
};

// ======= fetch enquiry =========
export const useFetchEnquiry = (token: string) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchEnquiry(token),
  });
};

// ======= fetch enquiry reply =========
export const useFetchEnquiryReply = (token: string, id: string) => {
  return useQuery({
    queryKey: ['enquiryReply', id], // Dynamic queryKey based on id
    queryFn: () => fetchEnquiryReply(token, id), // Fetch function
    enabled: !!id, // Only run the query if id is truthy
    retry: false, // Disable retries for failed requests
  });
};

// ======= Add chat reply =========
export const useAddReply = (token: string) => {
  return useMutation({
    mutationFn: async (data: addReply) => addChatReply(data, token),
    onSuccess: () => {
      // Show success toast notification
      toast.success(`Admin added successfully.`);
    },
    onError: (error: any) => {
      // Show error toast notification
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server returned a specific message, display it
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // If the error does not have a response message, display the generic error message
        toast.error(`Error occurred: ${error.message}`);
      }
    },
  });
};