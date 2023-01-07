import { createStore } from "vuex";

import clients from "./clients";
import invoices from "./invoices";
import contractors from "./contractors";

export default createStore({
  modules: {
    clients,
    invoices,
    contractors,
  },
});
