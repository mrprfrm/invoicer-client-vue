import { mount } from "@vue/test-utils";
import ScrollPickrer from "@/components/ScrollPicker.vue";

describe("Pick option tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { ScrollPickrer },
      template: `<ScrollPickrer v-model="value" :values="values" />`,
      data: () => ({ values: [1, 2, 3, 4, 5, 6, 7, 8, 9], value: null }),
    });
  });

  it("Option click should change the store value with it's index", async () => {
    expect(wrapper.vm.value).toBe(null);
    await wrapper.findAll("button")[4].trigger("click");
    expect(wrapper.vm.value).toBe(4);
  });
});
