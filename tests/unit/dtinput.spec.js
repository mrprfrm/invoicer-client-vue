import { shallowMount } from "@vue/test-utils";
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
