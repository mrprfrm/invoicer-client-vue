import { mount } from "@vue/test-utils";
import IntegerField from "@/components/IntegerField.vue";

describe("Integer field input tests without initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { IntegerField },
      template: `<IntegerField v-model="value" v-model:error="error" :required="true" />`,
      data: () => ({ value: null, error: null }),
    });
  });

  it("Input 0 should set value as 0", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("0");
    expect(wrapper.element.value).toBe("0");
  });

  it("Input .12 should set value as 0.12", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("12");
    expect(wrapper.element.value).toBe("12");
  });

  it("Input 1 should set value as 1.00", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("1");
    expect(wrapper.element.value).toBe("1");
  });

  it("If required field blured with empty value then filed should be highlighted", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("blur");
    expect(wrapper.vm.error).not.toBeNull();
  });

  it("Up key press should increment value as 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value).toBe(1);
  });

  it("Down key press should set value as 0", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value).toBe(0);
  });
});

describe("Integer field input tests with value in initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { IntegerField },
      template: `<IntegerField v-model="value" v-model:error="error" :required="true" />`,
      data: () => ({ value: 3, error: null }),
    });
  });

  it("Up key press should set value as 4", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value).toBe(4);
  });

  it("Down key press should set value as 2", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value).toBe(2);
  });
});

describe("Integer field input tests with error in initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { IntegerField },
      template: `<IntegerField v-model="value" v-model:error="error" :required="true" />`,
      data: () => ({ value: null, error: "Field required" }),
    });
  });

  it("Input 1 for field with error should remove an error", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("1");
    expect(wrapper.vm.error).toBeNull();
  });
});
