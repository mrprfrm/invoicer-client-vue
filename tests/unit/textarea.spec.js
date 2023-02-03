import { mount } from "@vue/test-utils";
import TextArea from "@/components/TextArea.vue";

describe("Decimal field input test without initial state", () => {
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
