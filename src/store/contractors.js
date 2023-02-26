export default {
  state: () => ({
    opened: false,
    contractors: [],
  }),
  mutations: {
    SET_CONTRACTORS(state, value) {
      state.contractors = value;
    },
    SET_CONTRACTOR_OPENED(state, value) {
      state.opened = value;
    },
  },
  actions: {
    GET_CONTRACTORS({ commit }) {
      /* TODO: replace with get request */
      const contractors = [
        {
          id: 1,
          name: "IE Petrov Anton Sergeevich",
        },
        {
          id: 2,
          name: "IE Petrov",
        },
      ];
      commit("SET_CONTRACTORS", contractors);
    },
    CLEAN_CONTRACTORS({ commit }) {
      commit("SET_CONTRACTORS", []);
    },
    TOGGLE_CONTRACTOR_DIALOG({ state, commit }) {
      commit("SET_CONTRACTOR_OPENED", !state.opened);
    },
    CLOSE_CONTRACTOR_DIALOG({ commit }) {
      commit("SET_CONTRACTOR_OPENED", false);
    },
  },
};
