import axios, { AxiosResponse } from "axios";


export interface TaskType {
    title: string;
}

const instance = axios.create({
	baseURL: "http://localhost:3000/api/"
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
   get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
}

export const TaskProvider = {
	getAllTask: (): Promise<TaskType[]> => requests.get('tasks'),
    // getTask: (taskId: number): Promise<TaskType> => requests.get(`tasks/${taskId}`),
	createTask: (task: TaskType): Promise<TaskType> =>
		requests.post('tasks', task),
	updateTask: (task: TaskType, taskId: number): Promise<TaskType> =>
		requests.put(`tasks/${taskId}`, task),
	deleteTask: (taskId: number): Promise<void> => requests.delete(`tasks/${taskId}`),
};



