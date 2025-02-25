// 'use server'
// const { cookies } = require("next/headers");

// export const saveTokens =async(token)=>{
//     (await cookies()).set('token', token);
 
// }


// export const getCurrentUser = async () => {
//     const token = (await cookies()).get("token")?.value;
    
//     return token
//   };

//   export const logout = async () => {
//     (await cookies()).delete("token");
//   };

'use server'

import { cookies } from 'next/headers'

// Define a function to save the token in cookies
export const saveTokens = async (token: string): Promise<void> => {
  (await cookies()).set('token', token)
}

// Define a function to get the current user (token) from cookies
export const getCurrentUser = async (): Promise<string | undefined> => {
  const token = (await cookies()).get('token')?.value
  return token
}

// Define a function to logout by deleting the token from cookies
export const logout = async (): Promise<void> => {
  (await cookies()).delete('token')
}
