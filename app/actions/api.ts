import axios from "axios"
import { createUser, loggedInUser, login,resetPass,changePass, reportQuery } from "./type"

// sign up

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl)

export const signUp = async (data:createUser) => {
        const res = await axios.post(`${apiUrl}/auth/signup`, data)
        return res.data
}


export const signIn = async (data:login):Promise<loggedInUser> =>{
        const res = await axios.post(`${apiUrl}/auth/login`, data)
        return res.data 
}


export const forgotPassword = async (data:string) =>{
        const res = await axios.post('',data)
        return res.data
}


export const resetPassword = async (data:resetPass) =>{
        const res = await axios.post('',data)
        return res.data
}

export const changePassword = async (data:changePass) =>{
        const res = await axios.post('',data)
        return res.data
}

export const fetchReports = async (queryKey : reportQuery) => {
        const { status, page, limit, token } = queryKey;
        console.log(queryKey)
      
        const response = await axios.get(
          `${apiUrl}/experience/admin/report`,
          {
            params: { status, page, limit }, 
            headers: {
              Authorization:token, 
            },
          }
        );
        console.log(response)
      
        return response.data;
};