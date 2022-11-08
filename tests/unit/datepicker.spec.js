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

  it("Selecting day option should update only day section", async () => {
    await wrapper
      .findAll(".scrollpicker")[0]
      .findAll("button")[9]
      .trigger("click");
    expect(wrapper.vm.value.day).toBe(10);
  });

  it("Selecting month option should update only month section", async () => {
    await wrapper
      .findAll(".scrollpicker")[1]
      .findAll("button")[3]
      .trigger("click");
    expect(wrapper.vm.value.month).toBe(4);
  });

  it("Selecting year option should update only year section", async () => {
    await wrapper
      .findAll(".scrollpicker")[2]
      .findAll("button")[9]
      .trigger("click");
    expect(wrapper.vm.value.year).toBe(new Date().getFullYear() + 4);
  });
});

describe("Pick options tests with initial value", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount({
      components: { DatePicker },
      template: `<DatePicker v-model="value" />`,
      data: () => ({ value: { day: 1, month: 4, year: 2010 } }),
    });
  });

  it("Selecting day option should update only day section", async () => {
    await wrapper
      .findAll(".scrollpicker")[0]
      .findAll("button")[9]
      .trigger("click");
    expect(wrapper.vm.value).toStrictEqual({ day: 10, month: 4, year: 2010 });
  });

  it("Selecting month option should update only month section", async () => {
    await wrapper
      .findAll(".scrollpicker")[1]
      .findAll("button")[6]
      .trigger("click");
    expect(wrapper.vm.value).toStrictEqual({ day: 1, month: 7, year: 2010 });
  });

  it("Selecting year option should update only year section", async () => {
    await wrapper
      .findAll(".scrollpicker")[2]
      .findAll("button")[9]
      .trigger("click");
    // value should be equal 2031-04-01 if current year 2022
    expect(wrapper.vm.value.day).toBe(1);
    expect(wrapper.vm.value.month).toBe(4);
    expect(wrapper.vm.value.year).toBe(new Date().getFullYear() + 4);
  });
});
