import axios from "axios"
import { createUser, loggedInUser, login,resetPass,changePass, reportQuery, Declinetype } from "./type"

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


export const fetchReportsById = async (id:string,token:string)=>{
        const response = await axios.get(`${apiUrl}/experience/admin/report/${id}`,
                {                
                        headers: {
                          Authorization:token, 
                        },
                      }
        )
        return response.data
}

export const declineReport = async (decline :Declinetype)=>{
        const response = await axios.post(`${apiUrl}/experience/admin/report/decline/${decline.id}`,{adminReasonDeclineTitle:decline.reason,adminReasonDeclineDescription:decline.description},
                {
                        headers: {
                          Authorization:decline.token, 
                        },
                      }
        )
        return response.data
}


export const removeReport = async (id:string,token:string)=>{
        const response = await axios.post(`${apiUrl}/experience/admin/report/remove/${id}`,
        {
                headers: {
                  Authorization:token, 
                },
              }
        )
        return response.data
}


export const restoreReport = async (decline :Declinetype)=>{
        const response = await axios.post(`${apiUrl}/experience/admin/report/restore/${decline.id}`,{adminReasonDeclineTitle:decline.reason,adminReasonDeclineDescription:decline.description},
                {
                        headers: {
                          Authorization:decline.token, 
                        },
                      }
        )
        return response.data
}