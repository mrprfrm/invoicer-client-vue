import { shallowMount } from "@vue/test-utils";
import DateInput from "@/components/DateInput.vue";
import store from "@/store";

function factory() {
  return shallowMount(DateInput, {
    props: {
      name: "test",
    },
    globals: {
      plugins: [store],
    },
  });
}

describe("Date input tests", () => {
  it("Date input focused", async () => {
    const wrapper = factory();
    await wrapper.find("input").trigger("focus");
    expect(wrapper.find(".datepicker").exists()).toBe(true);
  });

  it("Date input lost focus", async () => {
    const wrapper = factory();
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("blur");
    expect(wrapper.find(".datepicker").exists()).toBe(false);
  });

  it("Date input select date", async () => {
    const wrapper = factory();
    await wrapper.find("input").trigger("focus");
    await wrapper
      .find(".datepicker")
      .find(".datepicker__days")
      .findAll("buttons")[0]
      .trigger("click");
    expect(wrapper.find("input").element.value).toBe("01.mm.yyyy");
  });
});
