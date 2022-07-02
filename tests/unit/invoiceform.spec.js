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
    expect(wrapper.find("[name=name]").exists()).toBe(true);
    expect(wrapper.find("[name=date]").exists()).toBe(true);
  });

  it("New contract fieldset is shown by default", () => {
    const wrapper = factory();
    expect(wrapper.find(".new-contract-fieldset").exists()).toBe(true);
    expect(wrapper.find(".current-contract-fieldset").exists()).toBe(false);
  });

  it("New contract fieldset fields are exists", () => {
    const wrapper = factory();
    expect(wrapper.find("[name=contractName]").exists()).toBe(true);
    expect(wrapper.find("[name=contractDate]").exists()).toBe(true);
    expect(wrapper.find("[name=contractClient]").exists()).toBe(true);
    expect(wrapper.find("[name=contractContractor]").exists()).toBe(true);
  });

  it("Goods and services section is empty", () => {
    const wrapper = factory();
    expect(wrapper.find(".services").exists()).toBe(true);
    expect(wrapper.find(".services__add").exists()).toBe(true);
  });

  it("Invoice for buttons are exists", () => {
    const wrapper = factory();
    expect(wrapper.find(".invoice-form__cancel").exists()).toBe(true);
    expect(wrapper.find(".invoice-form__save").exists()).toBe(true);
  });
});
