import { defineStore } from 'pinia'
import { api } from "boot/axios";

export const useWorkplaceStore = defineStore('useWorkplaceStore', {
  state: () => ({
    workplaces: []
  }),
  getters: {

  },
  actions: {
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
    }
  }
})
