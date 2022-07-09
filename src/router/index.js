import { createRouter, createWebHistory } from "vue-router";
import InvoiceFormView from "../views/InvoiceFormView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: InvoiceFormView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
