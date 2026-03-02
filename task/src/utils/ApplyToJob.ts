'use client'
import axios from "axios";

  export const ApplyToJob = 
    async (U_id:string, J_id:string) => {

        try {
            const response = await axios.patch(`http://localhost:4000/users/${U_id}`)

            
            
                
                // const response = await axios.post('http://localhost:4000/application', {uId:U_id,jId:J_id})
                if (response) {
                    return response.data.data;
            }
            throw new Error(response)
        } catch (error) {
            return error;
        }
    }
