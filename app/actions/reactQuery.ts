import { useMutation, useQuery } from "@tanstack/react-query";
import { signIn, signUp,resetPassword, forgotPassword, changePassword, fetchReports } from "./api";
import { changePass, createUser, loggedInUser, login, Query_Keys, reportQuery, resetPass } from "./type";
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



