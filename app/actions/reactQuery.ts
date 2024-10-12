import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { signIn, signUp,resetPassword, forgotPassword, changePassword, fetchReports, fetchReportsById, declineReport, removeReport, restoreReport, fetchUser, fetchPost, fetchPostById, declinePost, approvePost } from "./api";
import { ApprovePostType, changePass, createUser, DeclinePostType, Declinetype, Experience_Query_Keys, loggedInUser, login, postQuery, Query_Keys, reportQuery, resetPass, userProfile } from "./type";
import { toast } from "react-toastify";





// Create a custom hook to use the useMutation hook

export const useCreateAccount = () =>{
    return useMutation({
        mutationFn: async (data :createUser) => signUp (data),
        onSuccess: () => {
          // Show success toast notification
          toast.success(`Account created successfully`);
        },
        onError: (error: any) => {
          // Show error toast notification
          if (error.response && error.response.data && error.response.data.message) {
            // If the server returned a specific message, display it
            toast.error(`Error: ${error.response.data.message}`);
          } else {
            // If the error does not have a response message, display the generic error message
            toast.error(`Error occurred: ${error.message}`);
          }
        },
    })
}

export const useSigninAccount = () => {
    return useMutation<loggedInUser, Error, login>({
      mutationFn: async (data:login)=> signIn(data),
      onSuccess: () => {
        // Show success toast notification
        // console.log(data)
        toast.success(`Welcome back!`);
      },
      onError: (error: any) => {
        // Show error toast notification
        if (error.response && error.response.data && error.response.data.message) {
          // If the server returned a specific message, display it
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          // If the error does not have a response message, display the generic error message
          toast.error(`Error occurred: ${error.message}`);
        }
      },
    });
};


export const useResetPassword =()=>{
    return useMutation({
        mutationFn: async (data:resetPass) => resetPassword(data),
        onSuccess: () => {
          // Show success toast notification
          toast.success(`Password reset successfully`);
        },
        onError: (error: any) => {
          // Show error toast notification
          if (error.response && error.response.data && error.response.data.message) {
            // If the server returned a specific message, display it
            toast.error(`Error: ${error.response.data.message}`);
          } else {
            // If the error does not have a response message, display the generic error message
            toast.error(`Error occurred: ${error.message}`);
          }
        },
    })
}

export const useForgotPassword =()=>{
    return useMutation({
        mutationFn: async (data:string) => forgotPassword(data),
        onSuccess: () => {
          // Show success toast notification
          toast.success(`Password reset link sent to your email`);
        },
        onError: (error: any) => {
          // Show error toast notification
          if (error.response && error.response.data && error.response.data.message) {
            // If the server returned a specific message, display it
            toast.error(`Error: ${error.response.data.message}`);
          } else {
            // If the error does not have a response message, display the generic error message
            toast.error(`Error occurred: ${error.message}`);
          }
        },
    })
}

export const useChangePassword = () =>{
    return useMutation({
        mutationFn: async (data:changePass) => changePassword(data),
        onSuccess: () => {
          // Show success toast notification
          toast.success(`Password changed successfully`);
        },
        onError: (error) => {
          // Show error toast notification
         return toast.error(`Error occurred: ${error.message}`);
    
        },
    })
}


export const useReports = (query: reportQuery) => {
  return useQuery({
    queryKey: [Query_Keys.REPORTS, query],
    queryFn: () => fetchReports(query),
  });
};


export const useReportId = (id:string, token:string) =>{
    return useQuery({
        queryKey: [Query_Keys.REPORTS_ID, id],
        queryFn: () => fetchReportsById(id,token),
    })
}


export const useReportDecline = () =>{
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ( data: Declinetype) => declineReport(data),
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
    })
}


export const useReportRemove = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => removeReport(id, token),
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
    })
}


export const useReportRestore = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Declinetype ) => restoreReport(data),
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
    })
}

//========= Fetch user details =========
export const useUser = (token: string) => {
  return useQuery<userProfile>({
    queryKey: ['user'],
    queryFn: () => fetchUser(token),
    enabled: !!token,  // only run if token exists
  });
};

//===========get user posts (experience) =====
export const useExperience = (query: postQuery) => {
  return useQuery({
    queryKey: [Experience_Query_Keys.POST, query],
    queryFn: () => fetchPost(query),
  });
};

export const useExperienceId = (id:string, token:string) =>{
  return useQuery({
      queryKey: [Experience_Query_Keys.POST_ID, id],
      queryFn: () => fetchPostById(id,token),
  })
}

export const usePostDecline = () =>{
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ( data: DeclinePostType) => declinePost(data),
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
    })
}

export const usePostApprove = () =>{
  const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, token }: { id: string; token: string }) => approvePost(id, token),
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
    })
}