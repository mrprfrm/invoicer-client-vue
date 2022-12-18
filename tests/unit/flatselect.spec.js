import { mount } from "@vue/test-utils";
import FlatSelect from "@/components/FlatSelect.vue";

describe("Pick options without initial state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { FlatSelect },
      template: `<FlatSelect v-model="value" :options="options" />`,
      data: () => ({
        options: [
          {
            id: 1,
            value: "IE Jones",
          },
          {
            id: 2,
            value: "IE Petrov",
          },
        ],
        value: null,
      }),
    });
  });

  it("If select focused then first option should be hovered", async () => {
    await wrapper.trigger("focus");
    expect(wrapper.findAll("button")[0].classes("focused")).toBe(true);
  });

  it("Click on an option should set select value", async () => {
    const option = wrapper.findAll("button")[0];
    await option.trigger("click");
    expect(wrapper.vm.value).toBe(wrapper.vm.options[0]);
  });

  it("Space key press on an option should set select value", async () => {
    const option = wrapper.findAll("button")[0];
    await option.trigger("keydown.space");
    expect(wrapper.vm.value).toBe(wrapper.vm.options[0]);
  });

  it("Right key press on focused should select this optiion", async () => {
    const option = wrapper.findAll("button")[0];
    await option.trigger("keydown.right");
    expect(wrapper.vm.value).toBe(wrapper.vm.options[0]);
  });

  it("Down key press should set next option focused", async () => {
    const option = wrapper.findAll("button")[0];
    await option.trigger("keydown.down");
    expect(wrapper.findAll("button")[1].classes("focused")).toBe(true);
  });
});

describe("Pick options with initial state", () => {
  let wrapper;

  const options = [
    {
      id: 1,
      value: "IE Jones",
    },
    {
      id: 2,
      value: "IE Petrov",
    },
  ];

  beforeEach(() => {
    wrapper = mount({
      components: { FlatSelect },
      template: `<FlatSelect v-model="value" :options="options" />`,
      data: () => ({
        options,
        value: options[1],
      }),
    });
  });

  it("If select blured then no one option should be hovered", async () => {
    await wrapper.trigger("blur");
    expect(wrapper.find("button.focused").exists()).toBe(false);
  });

  it("Click on a selected option should clean select value", async () => {
    const option = wrapper.findAll("button")[1];
    await option.trigger("click");
    expect(wrapper.vm.value).toBe(null);
  });

  it("Space key press on a selected option should clean select value", async () => {
    await wrapper.trigger("keydown.down");
    await wrapper.trigger("keydown.space");
    expect(wrapper.vm.value).toBe(null);
  });

  it("Left key press on selected optiion should clean select value", async () => {
    await wrapper.trigger("keydown.left");
    expect(wrapper.vm.value).toBe(null);
  });

  it("Up key press should set next option focused", async () => {
    await wrapper.trigger("keydown.up");
    expect(wrapper.findAll("button")[0].classes("focused")).toBe(true);
  });
});
