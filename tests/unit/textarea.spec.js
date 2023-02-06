import { mount } from "@vue/test-utils";
import TextArea from "@/components/TextArea.vue";

describe("Textarea field input test without initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { TextArea },
      template: `<TextArea v-model="value" v-model:error="error" :required="true" />`,
      data: () => ({ value: null, error: null }),
    });
  });

  it("If required field blured with empty value then filed should be highlighted", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("textarea").trigger("blur");
    expect(wrapper.vm.error).not.toBeNull();
  });
});

describe("Textarea field input test with error in initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { TextArea },
      template: `<TextArea v-model="value" v-model:error="error" :required="true" />`,
      data: () => ({ value: null, error: "Field required" }),
    });
  });

  it("Input 1 for field with error should remove an arror until blur", async () => {
    await wrapper.trigger("focus");
    await wrapper.find("textarea").setValue("1");
    expect(wrapper.vm.error).toBeNull();
  });
});
