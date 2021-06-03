import axios from 'axios'

// const api = axios.create({
//     // baseURL: 'http://localhost:8080/api/v1',
//     baseURL: 'https://moviesapi.eu-gb.mybluemix.net/api/v1'
// });


const api = axios.create({
    // baseURL: 'http://localhost:8080'
});

export const register = payload => api.post(`/api/v1/auth/register`, payload)
export const login = payload => api.post(`/api/v1/auth/login`, payload)
export const logout = () => api.post(`/api/v1/auth/logout`)

export const getChannel = id => api.get(`/api/v1/channel/${id}`)
export const createChannel = payload => api.post(`/api/v1/channel`, payload)
export const deleteChannel = id => api.delete(`/api/v1/channel/${id}`)
export const getAllChannel = id => api.get(`/api/v1/channel/user/${id}`)

export const uploadVideo = payload => api.post(`/api/v1/video/upload`, payload)
export const getAllVideo = () => api.get(`/api/v1/video`)
export const getVideo = id => api.get(`/api/v1/video/${id}`)
export const getAllVideosOfChannel = id => api.get(`/api/v1/video/channel/${id}`)
export const deleteVideo = id => api.delete(`/api/v1/video/${id}`)



const apis = {
    register,
    login,
    logout,
    getChannel,
    createChannel,
    uploadVideo,
    getAllChannel,
    getAllVideo,
    getVideo,
    deleteChannel,
    getAllVideosOfChannel,
    deleteVideo
}

export default apis