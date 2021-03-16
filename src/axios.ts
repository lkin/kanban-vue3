import axios from 'axios'

axios.defaults.baseURL = 'https://trello.backend.tests.nekidaem.ru/api/v1'
//axios.defaults.headers.common['Authorisation'] = 'JWT ' + localStorage.getItem('token')


const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers = { 
      'Authorization': `JWT ${sessionStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});


function refreshAccessToken(originalRequest: any) {
    return axios.post('/users/refresh_token/',
           {
               "token": sessionStorage.getItem('token')
           })
           .then(res => {
               if (res.status === 201) {
                    sessionStorage.setItem('token', res.data.token)
                    axios.defaults.headers.common['Authorization'] = 'JWT ' + sessionStorage.getItem('token');
                    return axios(originalRequest);
               }
           })
}

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const accessToken = await refreshAccessToken(originalRequest);            
    axios.defaults.headers.common['Authorization'] = 'JWT ' + accessToken;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export { axiosApiInstance }