export default {
  state: () => ({
    opened: false,
    clients: [],
  }),
  mutations: {
    SET_CLIENTS(state, value) {
      state.clients = value;
    },
    SET_OPENED(state, value) {
      state.opened = value;
    },
  },
  actions: {
    GET_CLIENT({ commit }) {
      /* TODO: replace with get request */
      const clients = [
        {
          id: 1,
          name: "NITKA, INC., Virgin Islands, British",
        },
      ];
      commit("SET_CLIENTS", clients);
    },
    CLEAN_CLIENTS({ commit }) {
      commit("SET_CLIENTS", []);
    },
    TOGGLE_OPENED({ state, commit }) {
      commit("SET_OPENED", !state.opened);
    },
    CLOSE({ commit }) {
      commit("SET_OPENED", false);
    },
  },
};
