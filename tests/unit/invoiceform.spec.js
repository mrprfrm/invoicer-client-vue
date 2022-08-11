import { shallowMount } from "@vue/test-utils";
import store from "@/store";
import InvoiceFormView from "@/views/InvoiceFormView.vue";

function factory() {
  return shallowMount(InvoiceFormView, {
    globals: {
      plugins: [store],
    },
  });
}

describe("New invoice form", () => {
  it("Invoice fields are exist", () => {
    const wrapper = factory();
    const invoiceFieldSet = wrapper.find("#invoice-fields");
    expect(invoiceFieldSet.exists()).toBe(true);
    expect(invoiceFieldSet.find("[name=invoice-name]").exists()).toBe(true);
    expect(invoiceFieldSet.find("[name=invoice-date]").exists()).toBe(true);
  });

  it("Goods and services section is empty", () => {
    const wrapper = factory();
    const invoiceServices = wrapper.find("#invoice-services");
    expect(invoiceServices.exists()).toBe(true);
    expect(invoiceServices.find("button#add-service").exists()).toBe(true);
  });

  it("Invoice for buttons are exists", () => {
    const wrapper = factory();
    const invoiceButtons = wrapper.find("#invoice-buttons");
    expect(invoiceButtons.exists()).toBe(true);
    expect(wrapper.find("button#invoice-cancel").exists()).toBe(true);
    expect(wrapper.find("button#invoice-save").exists()).toBe(true);
  });
});
