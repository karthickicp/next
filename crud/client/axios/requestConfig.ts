import { axiosClient } from ".";

export function getRequest(URL: string) {
    return axiosClient.get(`${URL}`).then(response => response.data).catch(err => console.error(err));
}

export function postRequest(URL: string, payload: any) {
    console.log(payload, "payload")
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL: string) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}