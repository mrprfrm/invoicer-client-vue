import { shallowMount } from "@vue/test-utils";
import DropdownSelect from "@/components/DropdownSelect.vue";
import store from "@/store";

const options = ["year", "month", "week", "day"];

function factory() {
  return shallowMount(DropdownSelect, {
    props: {
      options: options,
      default: "year",
    },
    globals: {
      globals: {
        plugins: [store],
      },
    },
  });
}

describe("Mouse click selection test", () => {
  it("Select focused", async () => {
    const wrapper = factory();
    const select = wrapper.find("button");
    await select.trigger("focus");
    expect(wrapper.find(".options").exists()).toBe(false);
  });

  it("Select focus lost", async () => {
    const wrapper = factory();
    const select = wrapper.find("button");

    await select.trigger("click");
    expect(wrapper.find(".options").exists()).toBe(true);

    await select.trigger("blur");
    expect(wrapper.find(".options").exists()).toBe(false);
  });

  it("Dropdown options displayed", async () => {
    const wrapper = factory();

    const select = wrapper.find("button");
    await select.trigger("click");

    expect(wrapper.find(".options").exists()).toBe(true);
  });

  it("Options opened", async () => {
    const wrapper = factory();
    const select = wrapper.find("button");
    await select.trigger("focus");

    await select.trigger("click");
  });

  it("Select an option", async () => {
    const wrapper = factory();

    const select = wrapper.find("button");
    await select.trigger("click");

    await wrapper.find(".options").findAll("button")[1].trigger("click");
    expect(select.text()).toBe(options[1]);
    expect(wrapper.find(".options").exists()).toBe(false);
  });

  it("Select another option", async () => {
    const wrapper = factory();
    const select = wrapper.find("button");
    await select.trigger("click");

    await wrapper.find(".options").findAll("button")[2].trigger("click");
    expect(select.text()).toBe(options[2]);
    expect(wrapper.find(".options").exists()).toBe(false);
  });
});

describe("Keys press selection test", () => {
  it("Select focus lost", async () => {
    const wrapper = factory();

    const select = wrapper.find("button");

    await select.trigger("keydown.space");
    expect(wrapper.find(".options").exists()).toBe(true);

    await select.trigger("blur");
    expect(wrapper.find(".options").exists()).toBe(false);
  });

  it("Options opened", async () => {
    const wrapper = factory();
    const select = wrapper.find("button");

    await select.trigger("keydown.space");
    expect(wrapper.find(".options").exists()).toBe(true);
  });

  it("Select select an option", async () => {
    const wrapper = factory();
    const select = wrapper.find("button");

    await select.trigger("keydown.space");
    expect(wrapper.find(".options").exists()).toBe(true);

    await select.trigger("keydown.down");
    await select.trigger("keydown.space");

    expect(select.text()).toBe(options[1]);
    expect(wrapper.find(".options").exists()).toBe(false);
  });

  it("Select another option", async () => {
    const wrapper = factory();
    const select = wrapper.find("button");

    await select.trigger("focus");
    await select.trigger("keydown.space");
    expect(wrapper.find(".options").exists()).toBe(true);

    await select.trigger("keydown.down");
    await select.trigger("keydown.down");
    await select.trigger("keydown.space");

    expect(select.text()).toBe(options[2]);
    expect(wrapper.find(".options").exists()).toBe(false);
  });
});
