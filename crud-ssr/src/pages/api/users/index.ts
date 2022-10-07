import axiosClient from "network/apiClient"

export const getUsers =() => {
return axiosClient.get('/users')
}