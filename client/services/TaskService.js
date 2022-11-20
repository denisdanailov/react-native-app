import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks/";

class TaskService {
  create(taskName, createdDate) {
    return axios.post(API_URL + "create", {
      taskName,
      createdDate,
    });
  }

  getAllTasks() {
    return axios.get(API_URL + "all");
  }

  editTask(taskId, data) {
    return axios.put(`${API_URL}${taskId}`, data);
  }

  deleteTask(taskId) {
    return axios.delete(API_URL + taskId);
  }
}

export default new TaskService();
