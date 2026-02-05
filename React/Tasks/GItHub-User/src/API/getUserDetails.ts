import axios from "axios";
import { gitHubUserAPI, usersSearchAPI } from "./API";
import type { rep2Type, repType } from '../Utils/Types'




const getUserDetails = async (name: string) => {
  const URL: string = gitHubUserAPI + name;
  let DATA: repType = { success: false, data: undefined, error: 'Error' };

  DATA = await axios.get(URL)
    .then((response): repType => {
      DATA = { success: true, data: response.data, error: undefined }
      return DATA as repType;
    })
    .catch((error): repType => {

      DATA = { success: true, data: undefined, error: error.massage }
      return DATA as repType;
    })
  return DATA;
}



const getDataFromAPI = async (url:string) => {
  let DATA: rep2Type = { success: false, data: undefined, error: 'Error' };

  DATA = await axios.get(url)
  .then((response): rep2Type => {
    DATA = { success: true, data: response.data, error: undefined }
    return DATA as rep2Type;
    })
    .catch((error): rep2Type => {

      DATA = { success: true, data: undefined, error: error.massage }
      return DATA as rep2Type;
    })
  return DATA;
}  

const getUsersList = async (keyword:string) => {
  const URL: string = usersSearchAPI + keyword;
  let DATA:{success : boolean, data?:unknown , error?:string} = { success: false, data: undefined, error: 'Error' };
  
  DATA = await axios.get(URL)
  .then((response) => {
    DATA = { success: true, data: response.data, error: undefined }
    return DATA;
  })
  .catch((error) => {
    
      DATA = { success: true, data: undefined, error: error.massage }
      return DATA;
    })
  return DATA;
}  


export { getUserDetails , getDataFromAPI, getUsersList};