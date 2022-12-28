import { mount } from "@vue/test-utils";
import DropdownSelect from "@/components/DropdownSelect.vue";

const options = ["year", "month", "week", "day"];

describe("Pick options without initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DropdownSelect },
      template: `<DropdownSelect v-model="value" :options="options" />`,
      data: () => ({
        options,
        value: null,
      }),
    });
  });

  it("Click on DropdownSelect should display the dropdown", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.find(".options").exists()).toBe(true);
  });

  it("Click on an option should set select value", async () => {
    await wrapper.find("button").trigger("click");
    const options = wrapper.find(".options");
    await options.findAll("button")[0].trigger("click");
    expect(wrapper.vm.vallue).toStrictEqual(options[0]);
  });

  it("Space key press should select first option", async () => {
    await wrapper.find("button").trigger("click");
    await wrapper.trigger("keydown.space");
    expect(wrapper.vm.value).toStrictEqual(options[0]);
  });

  it("Right key press on selected options should  ", async () => {
    await wrapper.trigger("keydown.right");
    expect(wrapper.vm.value).toStrictEqual(options[0]);
  });

  it("Down key press should set next option focused", async () => {
    await wrapper.find("button").trigger("click");
    await wrapper.trigger("keydown.down");
    const options = wrapper.find(".options");
    expect(options.findAll("button")[1].classes("focused")).toBe(true);
  });
});

describe("Pick options with initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DropdownSelect },
      template: `<DropdownSelect v-model="value" :options="options" />`,
      data: () => ({
        options,
        value: options[1],
      }),
    });
  });

  it("If select blured then options list should be hidden", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.find(".options").exists()).toBe(true);
    await wrapper.find("button").trigger("blur");
    expect(wrapper.find(".options").exists()).toBe(false);
  });

  it("Up key press should set previous option focused", async () => {
    await wrapper.find("button").trigger("click");
    await wrapper.trigger("keydown.up");
    const options = wrapper.find(".options");
    expect(options.findAll("button")[0].classes("focused")).toBe(true);
  });
});
