import { mount } from "@vue/test-utils";
import DateField from "@/components/DateField.vue";

describe("DateField datepicker visibility tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DateField);
  });

  it("If input focused then datepicker should be opened", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);
  });

  it("If input blured then datepicker should be closed", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);

    await wrapper.find(".dateinput").trigger("blur");
    expect(wrapper.find(".datepicker").isVisible()).toBe(false);
  });

  it("Mousedown on focused input should hide datepicker", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);

    await wrapper.find(".dateinput").trigger("mousedown");
    expect(wrapper.find(".datepicker").isVisible()).toBe(false);
  });

  it("Mousedown on focused input with closed datepicker should open datepicker", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);

    await wrapper.find(".dateinput").trigger("mousedown");
    expect(wrapper.find(".datepicker").isVisible()).toBe(false);

    await wrapper.find(".dateinput").trigger("mousedown");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);
  });

  it("Esc key press with opened datepicker should close datepicker", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);

    await wrapper.find(".dateinput").trigger("keydown.esc");
    expect(wrapper.find(".datepicker").isVisible()).toBe(false);
  });

  it("Esc key press with closed datepicker should open datepicker", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);

    await wrapper.find(".dateinput").trigger("keydown.esc");
    expect(wrapper.find(".datepicker").isVisible()).toBe(false);

    await wrapper.find(".dateinput").trigger("keydown.esc");
    expect(wrapper.find(".datepicker").isVisible()).toBe(true);
  });
});

describe("DateField input focus tests with datepicker clicks", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DateField);
  });

  it("Datepicker click with input day selected should not change input section", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    expect(wrapper.find(".dateinput").find(".day").classes("selected")).toBe(
      true
    );

    await wrapper
      .find(".datepicker")
      .findAll(".scrollpicker")[0]
      .findAll("button")[3]
      .trigger("click");

    expect(wrapper.find(".dateinput").find(".day").classes("selected")).toBe(
      true
    );
  });

  it("Datepicker click with input month selected should not change input section", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    await wrapper.find(".dateinput").trigger("keydown.right");
    expect(wrapper.find(".dateinput").find(".month").classes("selected")).toBe(
      true
    );

    await wrapper
      .find(".datepicker")
      .findAll(".scrollpicker")[0]
      .findAll("button")[3]
      .trigger("click");

    expect(wrapper.find(".dateinput").find(".month").classes("selected")).toBe(
      true
    );
  });

  it("Datepicker click with input year sectiion selected should not change input sectiion selection", async () => {
    await wrapper.find(".dateinput").trigger("focus");
    await wrapper.find(".dateinput").trigger("keydown.right");
    await wrapper.find(".dateinput").trigger("keydown.right");
    expect(wrapper.find(".dateinput").find(".year").classes("selected")).toBe(
      true
    );

    await wrapper
      .find(".datepicker")
      .findAll(".scrollpicker")[0]
      .findAll("button")[3]
      .trigger("click");

    expect(wrapper.find(".dateinput").find(".year").classes("selected")).toBe(
      true
    );
  });
});
