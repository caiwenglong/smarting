import { defineStore } from "pinia";
export const useCurrentRoutePath = defineStore("currentRoutePath", {
  state: () => ({
    currentRoutePath: ''
  }),
  actions: {
    setCurrentRoutePath(currentPath) {
      console.log(currentPath)
        this.currentRoutePath = currentPath;
    },

    getCurrentRoutePath() {
      console.log(this.currentRoutePath)
      return this.currentRoutePath
    },
  }
});
