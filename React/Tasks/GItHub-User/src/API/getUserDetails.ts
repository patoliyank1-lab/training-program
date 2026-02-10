import axios from "axios";
import { gitHubUserAPI, usersSearchAPI } from "./API";
import type { getUserType, rep2Type, repoDataType, resType, searchUserType, userDataType } from '../Utils/Types'




const getUserDetails = async (name: string) => {
  const URL: string = gitHubUserAPI + name;
  let DATA: resType = { success: false, data: undefined, error: 'Error' };


  const tempData: string | null = sessionStorage.getItem(name+'-user-details');
  let dataFromSession: userDataType | undefined;

  if (tempData) {
    dataFromSession = JSON.parse(tempData);
    if (dataFromSession) {
      DATA = { success: true, data: dataFromSession, error: undefined }
      return DATA as resType;
    }
  }

  DATA = await axios.get(URL)
    .then((response): resType => {
      DATA = { success: true, data: response.data, error: undefined }
      sessionStorage.setItem(name+'-user-details', JSON.stringify(response.data))
      return DATA as resType;
    })
    .catch((error): resType => {

      DATA = { success: true, data: undefined, error: error.massage }
      return DATA as resType;
    })
  return DATA;
}



const getRepoDataFromAPI = async (url: string) => {
  let DATA: rep2Type = { success: false, data: undefined, error: 'Error' };

  const tempData: string | null = sessionStorage.getItem(url+'-repo');
  let dataFromSession: repoDataType[] | undefined;

  if (tempData) {
    dataFromSession = JSON.parse(tempData);
    if (dataFromSession) {
      DATA = { success: true, data: dataFromSession, error: undefined }
      return DATA as rep2Type;
    }
  }



  DATA = await axios.get(url)
    .then((response): rep2Type => {
      DATA = { success: true, data: response.data, error: undefined }
      sessionStorage.setItem(url+'-repo', JSON.stringify(response.data))
      return DATA as rep2Type;
    })
    .catch((error): rep2Type => {

      DATA = { success: true, data: undefined, error: error.massage }
      return DATA as rep2Type;
    })
  return DATA;
}




const getUsersList = async (keyword: string) => {
  const URL: string = usersSearchAPI + keyword;
  let DATA: getUserType = { success: false, data: undefined, error: 'Error' };


   const tempData: string | null = sessionStorage.getItem(keyword+'-search');
  let dataFromSession: {items : searchUserType[]} | undefined ;

  if (tempData) {
    dataFromSession = JSON.parse(tempData);
    if (dataFromSession) {
      DATA = { success: true, data: dataFromSession, error: undefined }
      return DATA;
    }
  }

  DATA = await axios.get(URL)
    .then((response) => {
      DATA = { success: true, data: response.data, error: undefined }
      sessionStorage.setItem(keyword+'-search', JSON.stringify(response.data))
      return DATA;
    })
    .catch((error) => {

      DATA = { success: true, data: undefined, error: error.massage }
      return DATA;
    })
  return DATA;
}


export { getUserDetails, getRepoDataFromAPI, getUsersList };