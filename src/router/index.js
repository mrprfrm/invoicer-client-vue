import { createRouter, createWebHistory } from "vue-router";
import InvoiceEditor from "../views/InvoiceEditor.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: InvoiceEditor,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
