export default {
  state: () => ({
    services: [],
    discardOpened: false,
    editIndex: null,
  }),
  mutations: {
    SET_SERVICES(state, value) {
      state.services = value;
    },
    SET_DISCARD_DIALOG_OPENED(state, value) {
      state.discardOpened = value;
    },
    SET_EDIT_INDEX(state, value) {
      state.editIndex = value;
    },
    SET_SERVICE_VALUE(state, value) {
      state.services[state.editIndex] = value;
    },
  },
  actions: {
    DISCARD_CHANGES({ commit, getters }, payload) {
      if (getters.editService != payload) {
        commit("SET_DISCARD_DIALOG_OPENED", true);
      } else {
        commit("SET_EDIT_INDEX", null);
      }
    },
    CONFIRM_DISCARD_CHANGES({ commit }) {
      commit("SET_EDIT_INDEX", null);
      commit("SET_DISCARD_DIALOG_OPENED", false);
    },
    SAVE_CHANGES({ commit }, payload) {
      commit("SET_SERVICE_VALUE", payload);
      commit("SET_EDIT_INDEX", null);
    },
  },
  getters: {
    editService(state) {
      return state.services[state.editIndex] || {};
    },
  },
};
