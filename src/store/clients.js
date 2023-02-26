export default {
  state: () => ({
    opened: false,
    clients: [],
  }),
  mutations: {
    SET_CLIENTS(state, value) {
      state.clients = value;
    },
    SET_CLIENT_OPENED(state, value) {
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
    TOGGLE_CLIENT_DIALOG({ state, commit }) {
      commit("SET_CLIENT_OPENED", !state.opened);
    },
    CLOSE_CLIENT_DIALOG({ commit }) {
      commit("SET_CLIENT_OPENED", false);
    },
  },
};
