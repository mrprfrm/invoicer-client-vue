import { mount } from "@vue/test-utils";
import DecimalField from "@/components/DecimalField.vue";

describe("Decimal field input test without initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DecimalField },
      template: `<DecimalField v-model="value" />`,
      data: () => ({ value: null }),
    });
  });

  it('Input " " should have no effect', async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue(" ");
    expect(wrapper.element.value).toBe("");
  });

  it('Input "test" should have no effect', async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("test");
    expect(wrapper.element.value).toBe("");
  });

  it("Input 0 should set value as 0.00", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("0");
    expect(wrapper.element.value).toBe("0.00");
  });

  it("Input . should set value as 0.00", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue(".");
    expect(wrapper.element.value).toBe("0.00");
  });

  it("Input ..1 should set value as 0.10", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("..1");
    expect(wrapper.element.value).toBe("0.10");
  });

  it("Input .12 should set value as 0.12", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("0.12");
    expect(wrapper.element.value).toBe("0.12");
  });

  it("Input 1 should set value as 0.00", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("1");
    expect(wrapper.element.value).toBe("1.00");
  });

  it("Input 1.1 should set value as 1.10", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("1.1");
    expect(wrapper.element.value).toBe("1.10");
  });

  it("Input 1.01 should set value as 1.01", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("1.01");
    expect(wrapper.element.value).toBe("1.01");
  });
});
