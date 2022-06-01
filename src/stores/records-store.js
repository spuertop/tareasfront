import { defineStore } from 'pinia'
import { api } from "boot/axios";

export const useRecordsStore = defineStore('records', {
  state: () => ({
    nowrecords: []
  }),
  getters: {

  },
  actions: {
    async getNowRecords() {
      try {
        const res = await api.get("/records/now");
        this.nowrecords = res.data
      } catch (error) {
        return error.response.data.error
      }
    }
  }
})
