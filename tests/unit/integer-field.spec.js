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
});

describe("Integer field input tests with error set in initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { IntegerField },
      template: `<IntegerField v-model="value" v-model:error="error" :required="true" />`,
      data: () => ({ value: null, error: "Field required" }),
    });
  });

  it("Input 1 for field with error should remove an arror until blur", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("input").setValue("1");
    expect(wrapper.vm.error).toBeNull();
  });
});
