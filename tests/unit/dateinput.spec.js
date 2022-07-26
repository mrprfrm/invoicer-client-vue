import { shallowMount } from "@vue/test-utils";
import DateInput from "@/components/DateInput.vue";
import store from "@/store";

function factory() {
  return shallowMount(DateInput, {
    props: {
      name: "test-date",
      label: "Test date",
      modelValue: "",
    },
    globals: {
      plugins: [store],
    },
  });
}

describe("Date tests", () => {
  it("Input day", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");

    await input.trigger("keydown", { key: "0", keyCode: 48 });
    expect(input.element.value).toBe("00-__-____");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("01-__-____");

    await input.trigger("keydown.shift.tab");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("01-__-____");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("11-__-____");
  });

  it("Input month", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");

    await input.trigger("keydown", { key: "0", keyCode: 48 });
    expect(input.element.value).toBe("__-00-____");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("__-01-____");

    await input.trigger("keydown.shift.tab");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("__-01-____");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("__-11-____");
  });

  it("Input year", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");
    await input.trigger("keydown.tab");

    await input.trigger("keydown", { key: "0", keyCode: 48 });
    expect(input.element.value).toBe("__-__-0000");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("__-__-0001");

    await input.trigger("keydown", { key: "0", keyCode: 48 });
    expect(input.element.value).toBe("__-__-0010");

    await input.trigger("keydown", { key: "1", keyCode: 49 });
    expect(input.element.value).toBe("__-__-0101");

    await input.trigger("keydown", { key: "0", keyCode: 48 });
    expect(input.element.value).toBe("__-__-1010");
  });

  it("Press up day", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");

    for (let i = 1; i < 32; i++) {
      const day = `0${i}`.slice(-2);
      await input.trigger("keydown.up");
      expect(input.element.value).toBe(`${day}-__-____`);
    }

    await input.trigger("keydown.up");
    expect(input.element.value).toBe("01-__-____");
  });

  it("Press up month", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");

    for (let i = 1; i < 13; i++) {
      const month = `0${i}`.slice(-2);
      await input.trigger("keydown.up");
      expect(input.element.value).toBe(`__-${month}-____`);
    }

    await input.trigger("keydown.up");
    expect(input.element.value).toBe("__-01-____");
  });

  it("Press up year", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");
    await input.trigger("keydown.tab");

    await input.trigger("keydown.up");
    expect(input.element.value).toBe("__-__-0001");

    await input.trigger("keydown.up");
    expect(input.element.value).toBe("__-__-0002");
  });

  it("Press down day", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");

    for (let i = 31; i > 0; i--) {
      const day = `0${i}`.slice(-2);
      await input.trigger("keydown.down");
      expect(input.element.value).toBe(`${day}-__-____`);
    }

    await input.trigger("keydown.down");
    expect(input.element.value).toBe("31-__-____");
  });

  it("Press down month", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");

    for (let i = 12; i > 0; i--) {
      const month = `0${i}`.slice(-2);
      await input.trigger("keydown.down");
      expect(input.element.value).toBe(`__-${month}-____`);
    }

    await input.trigger("keydown.down");
    expect(input.element.value).toBe("__-12-____");
  });

  it("Press down year", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");
    await input.trigger("keydown.tab");

    await input.trigger("keydown.down");
    expect(input.element.value).toBe("__-__-2022");

    await input.trigger("keydown.down");
    expect(input.element.value).toBe("__-__-2021");
  });

  it("Press backspace day", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");

    await input.trigger("keydown.up");
    expect(input.element.value).toBe("01-__-____");

    await input.trigger("keydown.backspace");
    expect(input.element.value).toBe("__-__-____");
  });

  it("Press backspace month", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");

    await input.trigger("keydown.up");
    expect(input.element.value).toBe("__-01-____");

    await input.trigger("keydown.backspace");
    expect(input.element.value).toBe("__-__-____");
  });

  it("Press backspace year", async () => {
    const wrapper = factory();
    const input = wrapper.find("input");

    await input.trigger("focus");
    await input.trigger("keydown.tab");
    await input.trigger("keydown.tab");

    await input.trigger("keydown.up");
    expect(input.element.value).toBe("__-__-0001");

    await input.trigger("keydown.backspace");
    expect(input.element.value).toBe("__-__-____");
  });

  // TODO backspace tests
});

describe("Datepicker tests", () => {
  it("Date input focused", async () => {
    const wrapper = factory();
    await wrapper.find("input#test-date").trigger("focus");
    expect(wrapper.find(".datepicker-days").exists()).toBe(true);
    expect(wrapper.find(".datepicker-months").exists()).toBe(true);
    expect(wrapper.find(".datepicker-years").exists()).toBe(true);
  });

  it("Date input lost focus", async () => {
    const wrapper = factory();
    await wrapper.find("input").trigger("focus");
    await wrapper.find("input").trigger("blur");
    expect(wrapper.find(".datepicker-days").isVisible()).toBe(false);
    expect(wrapper.find(".datepicker-months").isVisible()).toBe(false);
    expect(wrapper.find(".datepicker-years").isVisible()).toBe(false);
  });

  // it("Date input select date", async () => {
  //   const wrapper = factory();
  //   await wrapper.find("input").trigger("focus");
  //   // await wrapper
  //   //   .find(".datepicker")
  //   //   .find(".datepicker__days")
  //   //   .findAll("button")[0]
  //   //   .trigger("click");
  //   // expect(wrapper.find("input").element.value).toBe("01.mm.yyyy");
  // });
});
