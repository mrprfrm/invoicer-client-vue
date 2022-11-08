import { mount, shallowMount } from "@vue/test-utils";
import DtInput from "@/components/DtInput.vue";

describe("Select date parts with tab press tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DtInput);
  });

  it("If input focused then date section should be selected", async () => {
    await wrapper.trigger("focus");
    expect(wrapper.find(".day").classes("selected")).toBe(true);
  });

  it("Tab key press with selected day section should move selection to month section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    expect(wrapper.find(".day").classes("selected")).toBe(false);
    expect(wrapper.find(".month").classes("selected")).toBe(true);
  });

  it("Tab key press with selected month section should move selection to year section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");
    expect(wrapper.find(".month").classes("selected")).toBe(false);
    expect(wrapper.find(".year").classes("selected")).toBe(true);
  });

  it("Shift tab key press with selected year section should move selection to month section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.shift.tab");
    expect(wrapper.find(".year").classes("selected")).toBe(false);
    expect(wrapper.find(".month").classes("selected")).toBe(true);
  });

  it("Shift tab key press with selected month section should move selection to day section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.shift.tab");
    expect(wrapper.find(".month").classes("selected")).toBe(false);
    expect(wrapper.find(".day").classes("selected")).toBe(true);
  });
});

describe("Select date parts with arrows keys press tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DtInput);
  });

  it("Right key press on focused input should move selection to month section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.right");
    expect(wrapper.find(".day").classes("selected")).toBe(false);
    expect(wrapper.find(".month").classes("selected")).toBe(true);
  });

  it("Right key press with selected month section should move selection to year section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.right");
    await wrapper.trigger("keydown.right");
    expect(wrapper.find(".month").classes("selected")).toBe(false);
    expect(wrapper.find(".year").classes("selected")).toBe(true);
  });

  it("Right key press with selected year section should do nothing", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.right");
    await wrapper.trigger("keydown.right");
    await wrapper.trigger("keydown.right");
    expect(wrapper.find(".year").classes("selected")).toBe(true);
  });

  it("Left key press on focused input should do nothing", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.left");
    expect(wrapper.find(".day").classes("selected")).toBe(true);
  });

  it("Left key press with selected month section should move selection to year section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");

    await wrapper.trigger("keydown.left");
    await wrapper.trigger("keydown.left");
    expect(wrapper.find(".month").classes("selected")).toBe(false);
    expect(wrapper.find(".day").classes("selected")).toBe(true);
  });

  it("Left key press with selected year section should move selection to month section", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");

    await wrapper.trigger("keydown.left");
    expect(wrapper.find(".month").classes("selected")).toBe(true);
  });
});

describe("Change date using arrows tests without initial value", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DtInput },
      template: `<DtInput v-model="value" />`,
      data: () => ({ value: null }),
    });
  });

  it("Up key press on focused input should increase the value of the day on 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value.day).toBe(1);
  });

  it("Down key press on focused input should set the value of the day as the last day number", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value.day).toBe(31);
  });

  it("Up key press with seslected month section should increase the value of the month on 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value.month).toBe(1);
  });

  it("Down key press with selected month section should set the value of the month as the last month number", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value.month).toBe(12);
  });

  it("Up key press with seslected year section should increase the value of the year on 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value.year).toBe(new Date().getFullYear());
  });

  it("Down key press with selected year section should set the value of the year as the current year number", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value.year).toBe(new Date().getFullYear());
  });
});

describe("Change date using arrows tests with initial value", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DtInput },
      template: `<DtInput v-model="value" />`,
      data: () => ({ value: { day: 1, month: 4, year: 2010 } }),
    });
  });

  it("Up key press on focused input should increase the value of the day on 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value).toStrictEqual({
      day: 2,
      month: 4,
      year: 2010,
    });
  });

  it("Down key press on focused input should set the value of the day as the last day number", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value).toStrictEqual({
      day: 31,
      month: 4,
      year: 2010,
    });
  });

  it("Up key press with seslected month section should increase the value of the month on 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value).toStrictEqual({
      day: 1,
      month: 5,
      year: 2010,
    });
  });

  it("Down key press with selected month section should set the value of the month as the last month number", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value).toStrictEqual({
      day: 1,
      month: 3,
      year: 2010,
    });
  });

  it("Up key press with seslected year section should increase the value of the year on 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.up");
    expect(wrapper.vm.value).toStrictEqual({
      day: 1,
      month: 4,
      year: 2011,
    });
  });

  it("Down key press with selected year section should set the value of the year as the current year number", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.down");
    expect(wrapper.vm.value).toStrictEqual({
      day: 1,
      month: 4,
      year: 2009,
    });
  });
});

describe("Clean date sections tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DtInput },
      template: `<DtInput v-model="value" />`,
      data: () => ({ value: { day: 1, month: 4, year: 2010 } }),
    });
  });

  it("Backspace key press with selected day section should delete day value", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.backspace");
    expect(wrapper.vm.value).toStrictEqual({
      day: null,
      month: 4,
      year: 2010,
    });
  });

  it("Backspace key press with selected month section should delete month value", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.backspace");
    expect(wrapper.vm.value).toStrictEqual({
      day: 1,
      month: null,
      year: 2010,
    });
  });

  it("Backspace key press with selected month section should delete month value", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.tab");
    await wrapper.trigger("keydown.backspace");
    expect(wrapper.vm.value).toStrictEqual({
      day: 1,
      month: 4,
      year: null,
    });
  });
});

describe("Input date tests without initial value", () => {});
