import { defineStore } from "pinia";
import { Alert } from "@/models/Alert";

export const useAlertStore = defineStore('alerts', {
  state: () => ({
    alerts: [] as Alert[],
  }),

  actions: {
    addNotification( alert : any) {
      this.alerts.push(alert);
    },
    removeNotification(alert : any) {
      this.alerts = this.alerts.filter((n) => n !== alert);
    },
  },
});
