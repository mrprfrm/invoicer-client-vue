import { shallowMount } from "@vue/test-utils";
import FlatSelect from "@/components/FlatSelect.vue";
import store from "@/store";

function factory() {
  return shallowMount(FlatSelect, {
    props: {
      options: [
        {
          id: 1,
          name: "IE Petrov Anton Sergeevich",
        },
        {
          id: 2,
          name: "IE Petrov",
        },
      ],
    },
    globals: {
      globals: {
        plugins: [store],
      },
    },
  });
}

describe("Mouse click selection test", () => {
  it("Select an option", async () => {
    const wrapper = factory();
    const option = wrapper.findAll("button")[0];

    await option.trigger("click");
    expect(option.classes("selected")).toBe(true);
  });

  it("Select another option", async () => {
    const wrapper = factory();
    const option = wrapper.findAll("button")[0];
    const option1 = wrapper.findAll("button")[1];

    await option.trigger("click");
    await option1.trigger("click");

    expect(option.classes("selected")).toBe(false);
    expect(option1.classes("selected")).toBe(true);
  });

  it("Remove selection", async () => {
    const wrapper = factory();
    const option = wrapper.findAll("button")[0];

    await option.trigger("click");
    expect(option.classes("selected")).toBe(true);

    await option.trigger("click");
    expect(option.classes("selected")).toBe(false);
  });

  // TODO: test store changed
});

describe("Keys press selection test", () => {
  it("Toggle option selection", async () => {
    const wrapper = factory();
    const option = wrapper.findAll("button")[0];

    await option.trigger("focus");
    await option.trigger("keydown.space");
    expect(option.classes("selected")).toBe(true);

    await option.trigger("keydown.space");
    expect(option.classes("selected")).toBe(false);
  });

  it("Toggle another option selection", async () => {
    const wrapper = factory();
    const option = wrapper.findAll("button")[0];
    const option1 = wrapper.findAll("button")[1];

    await option.trigger("focus");
    await option.trigger("keydown.down");
    await option1.trigger("keydown.space");

    expect(option.classes("selected")).toBe(false);
    expect(option1.classes("selected")).toBe(true);

    await option1.trigger("keydown.space");
    expect(option1.classes("selected")).toBe(false);
  });

  it("Select an option", async () => {
    const wrapper = factory();
    const option = wrapper.findAll("button")[0];

    await option.trigger("focus");
    await option.trigger("keydown.right");
    expect(option.classes("selected")).toBe(true);

    await option.trigger("keydown.right");
    expect(option.classes("selected")).toBe(true);
  });

  it("Remove option selection", async () => {
    const wrapper = factory();
    const option = wrapper.findAll("button")[0];

    await option.trigger("focus");
    await option.trigger("keydown.right");
    expect(option.classes("selected")).toBe(true);

    await option.trigger("keydown.left");
    expect(option.classes("selected")).toBe(false);

    await option.trigger("keydown.left");
    expect(option.classes("selected")).toBe(false);
  });

  // TODO: test store changed
});
