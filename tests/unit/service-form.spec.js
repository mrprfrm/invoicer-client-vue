import { mount } from "@vue/test-utils";
import ServiceForm from "@/components/ServiceForm.vue";

describe("Emply service form fill tests without initial state", () => {
  let wrapper;

  // TODO: Add store injection
  beforeEach(() => {
    wrapper = mount({
      components: { ServiceForm },
      template: `<ServiceForm />`,
    });
  });

  it("If all fields are set, 'Save' button should be enabled", async () => {
    // Set description field value and then go to the next one
    const description = wrapper.find("[name='description']");
    await description.setValue("Contract-Name#1");
    await description.trigger("blur");

    // Set quantity field value and then go to the next one
    const quantity = wrapper.find("[name='quantity']");
    await quantity.setValue("1");
    await quantity.trigger("blur");

    // Set price field value and then go to the next one
    const price = wrapper.find("[name='price']");
    await price.setValue("1");
    await price.trigger("blur");

    // Set amount field value and then go to the next one
    const amount = wrapper.find("[name='amount']");
    await amount.setValue("1");
    await amount.trigger("blur");

    expect(wrapper.find("#save-service-btn").element.disabled).toBe(false);
  });

  it("If all fields but amout are set, 'Save' should be enabled", async () => {
    /**
     * Amount is not required field, and without it fourm still
     * should allow user to save service instance
     */

    const description = wrapper.find("[name='description']");
    await description.setValue("Contract-Name#1");
    await description.trigger("blur");

    const quantity = wrapper.find("[name='quantity']");
    await quantity.setValue("1");
    await quantity.trigger("blur");

    const price = wrapper.find("[name='price']");
    await price.setValue("1");
    await price.trigger("blur");

    expect(wrapper.find("#save-service-btn").element.disabled).toBe(false);
  });

  it("If only description is set, 'Save' button should be disabled", async () => {
    // Set description field value and then go to the next one
    const description = wrapper.find("[name='description']");
    await description.setValue("Contract-Name#1");
    await description.trigger("blur");
    expect(wrapper.find("#save-service-btn").element.disabled).toBe(true);
  });

  it("If only quantity is set, 'Save' button should be disabled", async () => {
    // Set quantity field value and then go to the next one
    const quantity = wrapper.find("[name='quantity']");
    await quantity.setValue("1");
    await quantity.trigger("blur");
    expect(wrapper.find("#save-service-btn").element.disabled).toBe(true);
  });

  it("If only price is set, 'Save' button should be disabled", async () => {
    // Set price field value and then go to the next one
    const price = wrapper.find("[name='price']");
    await price.setValue("1");
    await price.trigger("blur");
    expect(wrapper.find("#save-service-btn").element.disabled).toBe(true);
  });

  it("If only amount is set, 'Save' button should be disabled", async () => {
    // Set amount field value and then go to the next one
    const amount = wrapper.find("[name='amount']");
    await amount.setValue("1");
    await amount.trigger("blur");
    expect(wrapper.find("#save-service-btn").element.disabled).toBe(true);
  });
});
