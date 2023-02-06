export default {
  state: () => ({
    invoiceName: null,
    invoiceDate: null,
    contractName: null,
    contractDate: null,
    contractor: null,
    client: null,
    terms: null,
  }),
  mutations: {
    SET_INVOICE({ state, value }) {
      state.invoiceName = value.invoiceName;
      state.invoiceDate = value.invoiceDate;
      state.contractName = value.contractName;
      state.contractDate = value.contractDate;
      state.contractor = value.contractor;
      state.client = value.client;
      state.terms = value.terms;
    },
  },
};
