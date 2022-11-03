import { mount } from "@vue/test-utils";
import DatePicker from "@/components/DatePicker.vue";

describe("Pick options tests without initial value", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DatePicker },
      template: `<DatePicker v-model="value" />`,
      data: () => ({ value: null }),
    });
  });

  it("Selecting day option should update whole date value", async () => {
    await wrapper
      .findAll(".scrollpicker")[0]
      .findAll("button")[9]
      .trigger("click");
    expect(wrapper.vm.value.getDate()).toBe(10);
  });

  it("Selecting month option should update whole date value", async () => {
    await wrapper
      .findAll(".scrollpicker")[1]
      .findAll("button")[3]
      .trigger("click");
    // month should be equal 3 instead of 4
    // getMonth returns month index instead of value
    expect(wrapper.vm.value.getMonth()).toBe(3);
  });

  it("Selecting year option should update whole date value", async () => {
    await wrapper
      .findAll(".scrollpicker")[2]
      .findAll("button")[9]
      .trigger("click");
    expect(wrapper.vm.value.getFullYear()).toBe(new Date().getFullYear() - 9);
  });
});

describe("Pick options tests with initial value", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DatePicker },
      template: `<DatePicker v-model="value" />`,
      data: () => ({ value: new Date("2010-04-01") }),
    });
  });

  it("Selecting day option should update only day", async () => {
    await wrapper
      .findAll(".scrollpicker")[0]
      .findAll("button")[9]
      .trigger("click");
    expect(wrapper.vm.value.toISOString()).toBe("2010-04-10T00:00:00.000Z");
  });

  it("Selecting month option should update only month", async () => {
    await wrapper
      .findAll(".scrollpicker")[1]
      .findAll("button")[6]
      .trigger("click");
    expect(wrapper.vm.value.toISOString()).toBe("2010-07-01T00:00:00.000Z");
  });

  it("Selecting year option should update only year", async () => {
    await wrapper
      .findAll(".scrollpicker")[2]
      .findAll("button")[9]
      .trigger("click");
    // value should be equal 2013-04-01 if current year 2022
    expect(wrapper.vm.value.getDate()).toBe(1);
    expect(wrapper.vm.value.getMonth()).toBe(3);
    expect(wrapper.vm.value.getFullYear()).toBe(new Date().getFullYear() - 9);
  });
});
