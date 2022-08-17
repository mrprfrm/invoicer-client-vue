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
  it("Dropdown options displayed", async () => {
    const wrapper = factory();

    const select = wrapper.find("button");
    await select.trigger("click");

    expect(wrapper.find("options").exists()).toBe(true);
  });

  it("Select an option", async () => {
    const wrapper = factory();

    const select = wrapper.find("button");
    await select.trigger("click");

    const options = wrapper.find("options");
    await options.findAll("button")[1].trigger();
    expect(select.text()).toBe(options[1]);
  });

  it("Select another option", async () => {
    const wrapper = factory();

    const select = wrapper.find("button");
    await select.trigger("click");

    const options = wrapper.find("options");
    await options.findAll("button")[2].trigger();
    expect(select.text()).toBe(options[2]);
  });
});

describe("Keys press selection test", () => {
  it("Select focus lost", async () => {});
  it("Select select an option", async () => {});
  it("Select another option", async () => {});
});
