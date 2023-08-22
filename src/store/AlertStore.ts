import { defineStore } from "pinia";

export const useAlertStore = defineStore('alerts', {
  state: () => ({
    alerts: [],
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
