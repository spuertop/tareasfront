import { defineStore } from 'pinia'
import { api } from "boot/axios";

export const useSettingsStore = defineStore('useSettingsStore', {
  state: () => ({
    workplaces: [],
    customers: [],
    tasksGroups: [],
    tasks: [],
  }),
  getters: {

  },
  actions: {
    //WORKPLACES
    async getWorkPlaces() {
      try {
        const res = await api.get("/workplaces/all");
        this.workplaces = res.data
      } catch (error) {
        return error.response.data.error
      }
    },
    async postWorkPlace(ob) {
      try {
        const res = await api.post("/workplaces/new", ob);
        this.workplaces.push(res.data)
      } catch (error) {
        console.log('first', error)
        return error.response.data.error
      }
    },
    async putWorkPlace(ob) {
      try {
        await api.put("/workplaces/update", ob);
        this.getWorkPlaces();
      } catch (error) {
        return error.response.data.error
      }
    },
    async deleteWorkPlace(ob) {
      try {
        await api.delete("/workplaces/delete/" + ob.id);
        this.getWorkPlaces();
      } catch (error) {
        return error.response.data.error
      }
    },
    //CUSTOMERS
    async getCustomers() {
      try {
        const res = await api.get("/customers/all");
        this.customers = res.data
      } catch (error) {
        return error.response.data.error
      }
    },
    async postCustomer(ob) {
      try {
        const res = await api.post("/customers/new", ob);
        this.customers.push(res.data)
      } catch (error) {
        return error.response.data.error
      }
    },
    async putCustomer(ob) {
      try {
        await api.put("/customers/update", ob);
        this.getCustomers();
      } catch (error) {
        return error.response.data.error
      }
    },
    async deleteCustomer(ob) {
      try {
        await api.delete("/customers/delete/" + ob.id);
        this.getCustomers();
      } catch (error) {
        return error.response.data.error
      }
    },
    //TasksGroups
    async getTasksGroups() {
      try {
        const res = await api.get("/tasks/groups");
        this.tasksGroups = res.data;
      } catch (error) {
        return error.response.data.error
      }
    },
    async postTaskGroup(ob) {
      try {
        const res = await api.post("/tasks/groups", ob);
        this.tasksGroups.push(res.data)
      } catch (error) {
        return error.response.data.error
      }
    },
    async putTaskGroup(ob) {
      try {
        await api.put("/tasks/groups", ob);
        this.getTasksGroups();
      } catch (error) {
        return error.response.data.error
      }
    },
    async deleteTaskGroup(id) {
      try {
        await api.delete("/tasks/groups/" + id);
        this.getTasksGroups();
      } catch (error) {
        return error.response.data.error
      }
    },
    //Tasks
    async getTasks() {
      try {
        const res = await api.get("/tasks/tasks");
        this.tasks = res.data;
      } catch (error) {
        return error.response.data.error
      }
    },
    async postTask(ob) {
      try {
        const res = await api.post("/tasks/tasks", ob);
        this.tasks.push(res.data)
      } catch (error) {
        return error.response.data.error
      }
    },
    async putTask(ob) {
      try {
        await api.put("/tasks/tasks", ob);
        this.getTasks();
      } catch (error) {
        return error.response.data.error
      }
    },
    async deleteTask(id) {
      try {
        await api.delete("/tasks/tasks/" + id);
        this.getTasks();
      } catch (error) {
        return error.response.data.error
      }
    }
  }
})
