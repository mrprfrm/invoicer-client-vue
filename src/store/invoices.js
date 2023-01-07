export default {
  state: () => ({
    invoiceName: null,
    invoiceDate: null,
    contractName: null,
    contractDate: null,
    contractor: null,
    client: null,
    services: [],
    terms: null,
  }),
  mutations: {
    SET_SERVICES(state, value) {
      state.services = value;
    },
  },
  actions: {
    GET_INVOICE({ commit }) {
      const services = [
        {
          id: 1,
          description: "Payment by contract NTK-AP-1",
          quantity: 2,
          range: "month",
          amount: 1,
          price: 9873.0,
        },
      ];
      commit("SET_SERVICES", services);
    },
  },
};
