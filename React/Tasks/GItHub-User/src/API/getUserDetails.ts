import axios from "axios";
import { gitHubUserAPI } from "./API";


interface response {
  success: boolean;
  data: unknown | null;
  error: unknown | null;
}

const getUserDetails = async (name: string) => {
  const URL: string = gitHubUserAPI + name;
  let DATA: response = { success: false, data: null, error: 'Error' };

  DATA = await axios.get(URL)
    .then((response): response => {
      DATA = { success: true, data: response.data, error: null }
      return DATA as response;
    })
    .catch((error): response => {

      DATA = { success: true, data: null, error: error.massage }
      return DATA as response;
    })
  return DATA;
}



const getDataFromAPI = async (url:string) => {
  let DATA: response = { success: false, data: null, error: 'Error' };

  DATA = await axios.get(url)
  .then((response): response => {
    DATA = { success: true, data: response.data, error: null }
    return DATA as response;
    })
    .catch((error): response => {

      DATA = { success: true, data: null, error: error.massage }
      return DATA as response;
    })
  return DATA;
}  

    export { getUserDetails , getDataFromAPI};