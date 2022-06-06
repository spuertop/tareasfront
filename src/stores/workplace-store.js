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
    }
  }
})
