import axios, {AxiosResponse } from 'axios';
import MessageModel from '../Models/MessageModel';

axios.defaults.baseURL = 'https://igeb8chw4f.execute-api.eu-north-1.amazonaws.com/';

const responseBody = <T> (response:AxiosResponse<T>) => response.data;


const requests = {
    get: <T> (url:string) =>            axios.get<T>(`${url}`).then(responseBody),
    post: <T> (url:string, body:{}) =>  axios.post<T>(`${url}`, body).then(responseBody),
    put: <T> (url:string, body:{}) =>   axios.put<T>(`${url}`, body).then(responseBody),
    delete: <T> (url:string) =>         axios.delete<T>(`${url}`).then(responseBody),
}

const Messages = {
    list: () =>                                             requests.get<MessageModel[]>(`messages`),
    get: (id: string) =>                                    requests.get<MessageModel>(`messages/${id}`),
    create: (message: {text:string, username:string}) =>    requests.post<string>(`messages`, message),
    update: (id: string, message: MessageModel) =>          requests.put<string>(`messages/${id}`, message),
    delete: (id: string) =>                                 requests.delete<string>(`messages/${id}`),
}

const agent = {
    Messages
}

export default agent;