import instance from "./instance";


export const setAuthToken = (token:string) => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = token;
    } else {
      delete instance.defaults.headers.common['Authorization']
    }
  };