import axiosClient from "network/apiClient"

export const getUsers = (page?: number) => {
    let PageNumber = page ? page : ""
    return axiosClient.get(`/users/${PageNumber}`).then(response => response.data)
}
export const getUser = (id: number) => {
    return axiosClient.get(`/users/${id}`).then(response => response.data)
}
export const deleteUser = (id: number) => {
    return axiosClient.delete(`/users/${id}`)
}