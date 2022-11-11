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

describe("Input date value tests without initial value", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DtInput },
      template: `<DtInput v-model="value" />`,
      data: () => ({ value: null }),
    });
  });

  it("Input 00 should set day value as 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    expect(wrapper.vm.value).toStrictEqual({ day: 1 });
  });

  it("Input 9 should set day value as 9", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    expect(wrapper.vm.value).toStrictEqual({ day: 9 });
  });

  it("Input 24 should set day value as 24", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "2", keyCode: 48 + 2 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    expect(wrapper.vm.value).toStrictEqual({ day: 24 });
  });

  it("Input 34 should set day value as 31", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "3", keyCode: 48 + 3 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    expect(wrapper.vm.value).toStrictEqual({ day: 31 });
  });

  it("Input 46 should set day value as 4 and month value as 6", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "6", keyCode: 48 + 6 });
    expect(wrapper.vm.value).toStrictEqual({ day: 4, month: 6 });
  });

  it("Input 588 should set day value as 5, month value as 8 and year value as 8", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "5", keyCode: 48 + 8 });
    await wrapper.trigger("keydown", { key: "8", keyCode: 48 + 8 });
    await wrapper.trigger("keydown", { key: "8", keyCode: 48 + 8 });
    expect(wrapper.vm.value).toStrictEqual({ day: 5, month: 8, year: 8 });
  });

  it("Input 2437 should set day value as 24, month value as 3 and year value as 7", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "2", keyCode: 48 + 2 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "3", keyCode: 48 + 3 });
    await wrapper.trigger("keydown", { key: "7", keyCode: 48 + 7 });
    expect(wrapper.vm.value).toStrictEqual({ day: 24, month: 3, year: 7 });
  });

  it("Input 8400 should set day value as 8, month value as 4 and year value as 0", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "8", keyCode: 48 + 8 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    expect(wrapper.vm.value).toStrictEqual({ day: 8, month: 4, year: 0 });
  });

  it("Input 28043 should set day value as 28, month value as 4 and year value as 3", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "2", keyCode: 48 + 2 });
    await wrapper.trigger("keydown", { key: "8", keyCode: 48 + 8 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "3", keyCode: 48 + 3 });
    expect(wrapper.vm.value).toStrictEqual({ day: 28, month: 4, year: 3 });
  });

  it("Input 24004 should set day value as 24, month value as 1 and year value as 4", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "2", keyCode: 48 + 2 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    expect(wrapper.vm.value).toStrictEqual({ day: 24, month: 1, year: 4 });
  });

  it("Input 37944 should set day value as 31, month value as 9 and year value as 44", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "3", keyCode: 48 + 3 });
    await wrapper.trigger("keydown", { key: "7", keyCode: 48 + 7 });
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    expect(wrapper.vm.value).toStrictEqual({ day: 31, month: 9, year: 44 });
  });

  it("Input 38169 should set day value as 31, month value as 12 and year value as 9", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "3", keyCode: 48 + 3 });
    await wrapper.trigger("keydown", { key: "8", keyCode: 48 + 8 });
    await wrapper.trigger("keydown", { key: "1", keyCode: 48 + 1 });
    await wrapper.trigger("keydown", { key: "6", keyCode: 48 + 6 });
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    expect(wrapper.vm.value).toStrictEqual({ day: 31, month: 12, year: 9 });
  });

  it("Input 642743 sholud set day value as 6, month value as 4 and year value as 2743", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "6", keyCode: 48 + 5 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "2", keyCode: 48 + 2 });
    await wrapper.trigger("keydown", { key: "7", keyCode: 48 + 7 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "3", keyCode: 48 + 3 });
    expect(wrapper.vm.value).toStrictEqual({ day: 6, month: 4, year: 2743 });
  });

  it("input 420000 should set day value as 4, month value as 2 and year value as 1", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "2", keyCode: 48 + 2 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    expect(wrapper.vm.value).toStrictEqual({ day: 4, month: 2, year: 0 });
  });

  it("Input 58000014 should set day value as 5, month value as 8 and year value as 4", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "5", keyCode: 48 + 5 });
    await wrapper.trigger("keydown", { key: "8", keyCode: 48 + 8 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "0", keyCode: 48 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    expect(wrapper.vm.value).toStrictEqual({ day: 5, month: 8, year: 4 });
  });

  it("Input 9499998 should set day value as 9, month value as 4 and year value as 9998", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    await wrapper.trigger("keydown", { key: "4", keyCode: 48 + 4 });
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    await wrapper.trigger("keydown", { key: "9", keyCode: 48 + 9 });
    await wrapper.trigger("keydown", { key: "8", keyCode: 48 + 8 });
    expect(wrapper.vm.value).toStrictEqual({ day: 9, month: 4, year: 9998 });
  });
});

describe("Clean all tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DtInput },
      template: `<DtInput v-model="value" />`,
      data: () => ({ value: { day: 1, month: 4, year: 2010 } }),
    });
  });

  it("c button click sholud clean whole date values", async () => {
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "c", keyCode: 67 });
    expect(wrapper.vm.value).toBe(null);
  });
});

describe("Set current date tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DtInput },
      template: `<DtInput v-model="value" />`,
      data: () => ({ value: null }),
    });
  });

  it("n button click sholud set input value as current date", async () => {
    const dt = new Date();
    await wrapper.trigger("focus");
    await wrapper.trigger("keydown", { key: "n", keyCode: 78 });
    expect(wrapper.vm.value).toStrictEqual({
      day: dt.getDate(),
      month: dt.getMonth() + 1,
      year: dt.getFullYear(),
    });
  });
});

describe("Paste date string tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DtInput },
      template: `<DtInput v-model="value" />`,
      data: () => ({ value: null }),
    });
  });

  it("Paste from clipboard text 2.1.2000 should set day as 1, month as 2 and year as 2000", async () => {
    await wrapper.trigger("paste", {
      clipboardData: {
        getData: () => "2.1.2000",
      },
    });
    expect(wrapper.vm.value).toStrictEqual({ day: 1, month: 2, year: 2000 });
  });

  it("Paste from clipboard text 02.01.2000 should set day as 1, month as 2 and year as 2000", async () => {
    await wrapper.trigger("paste", {
      clipboardData: {
        getData: () => "02.01.2000",
      },
    });
    expect(wrapper.vm.value).toStrictEqual({ day: 1, month: 2, year: 2000 });
  });

  it("Paste from clipboard text Feb.01.2000 should set day as 1, month as 2 and year as 2000", async () => {
    await wrapper.trigger("paste", {
      clipboardData: {
        getData: () => "Feb 01, 2000",
      },
    });
    expect(wrapper.vm.value).toStrictEqual({ day: 1, month: 2, year: 2000 });
  });

  it("Paste from clipboard text Feb 01, 2000 should set day as 1, month as 2 and year as 2000", async () => {
    await wrapper.trigger("paste", {
      clipboardData: {
        getData: () => "Feb 01, 2000",
      },
    });
    expect(wrapper.vm.value).toStrictEqual({ day: 1, month: 2, year: 2000 });
  });

  it("Paste from clipboard text 2000.02.01 should set day as 1, month as 2 and year as 2000", async () => {
    await wrapper.trigger("paste", {
      clipboardData: {
        getData: () => "2000.02.01",
      },
    });
    expect(wrapper.vm.value).toStrictEqual({ day: 1, month: 2, year: 2000 });
  });
});
