export default {
  state: () => ({
    services: [],
  }),
  mutations: {
    SET_SERVICES(state, value) {
      state.services = value;
    },
  },
};
