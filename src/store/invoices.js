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
    SET_INVOICE_NAME(state, value) {
      state.invoiceName = value;
    },
    SET_INVOICE_DATE(state, value) {
      state.invoiceDate = value;
    },
    SET_CONTRACT_NAME(state, value) {
      state.contractName = value;
    },
    SET_CONTRACT_DATE(state, value) {
      state.contractDate = value;
    },
    SET_INVOICE_CONTRACTOR(state, value) {
      state.contractor = value;
    },
    SET_INVOICE_CLIENT(state, value) {
      state.client = value;
    },
    SET_INVOICE_TERMS(state, value) {
      state.terms = value;
    },
  },
};
