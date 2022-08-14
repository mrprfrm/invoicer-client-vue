import { createStore } from "vuex";

export default createStore({
  state: {
    clientModalOpened: false,
    contractorModalOpened: false,
  },
  getters: {},
  mutations: {
    SET_CLIENT_MODAL_OPENED(state, value) {
      state.clientModalOpened = value;
    },
    SET_CONTRACTOR_MODAL_OPENED(state, value) {
      state.contractorModalOpened = value;
    },
  },
  actions: {
    TOGGLE_CLIENT_MODAL({ state, commit }) {
      commit("SET_CLIENT_MODAL_OPENED", !state.clientModalOpened);
    },
    CLOSE_CLIENT_MODAL({ commit }) {
      commit("SET_CLIENT_MODAL_OPENED", false);
    },
    TOGGLE_CONTRACTOR_MODAL({ state, commit }) {
      commit("SET_CONTRACTOR_MODAL_OPENED", !state.contractorModalOpened);
    },
    CLOSE_CONTRACTOR_MODAL({ commit }) {
      commit("SET_CONTRACTOR_MODAL_OPENED", false);
    },
  },
  modules: {},
});
