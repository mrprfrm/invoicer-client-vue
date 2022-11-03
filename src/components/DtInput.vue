<script setup>
import { reactive, computed, defineProps } from "vue";

const state = reactive({
  currentSection: null,
  reveseFocus: false,
});

const props = defineProps(["modelValue"]);

const day = computed(() => {
  return props.modelValue ? props.modelValue.getDate() : null;
});
const month = computed(() => {
  return props.modelValue ? props.modelValue.getMonth() + 1 : null;
});
const year = computed(() => {
  return props.modelValue ? props.modelValue.getFullYear() : null;
});

window.addEventListener("keydown", (evt) => {
  if (state.currentSection === null) {
    state.reveseFocus = evt.shiftKey;
  }
});

function onFocus() {
  if (!state.currentSection) {
    state.currentSection = state.reveseFocus ? 2 : 0;
  }
}

function onBlur() {
  state.currentSection = null;
}

function onClick(evt, idx) {
  evt.stopPropagation();
  state.currentSection = idx;
  state.reveseFocus = false;
}

function incrementSelection(evt) {
  if (state.currentSection < 2) {
    evt.preventDefault();
    state.currentSection += 1;
  }
}

function decrementSelection(evt) {
  if (state.currentSection > 0) {
    evt.preventDefault();
    state.currentSection -= 1;
  }
}
</script>

<template>
  <div
    @click="(evt) => onClick(evt, 0)"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.right="incrementSelection"
    @keydown.left="decrementSelection"
    @keydown.tab.exact="incrementSelection"
    @keydown.shift.tab="decrementSelection"
    :class="{ 'text-brand-100': !(day || month || year) }"
    tabindex="0"
    class="dateinput relative flex py-5 px-4.5 shadow-inner-brand rounded-2.5xl cursor-default focus:ring-1 focus:ring-juicyblue-100 outline-none"
  >
    <div class="flex w-full h-full text-base">
      <span
        @click="(evt) => onClick(evt, 0)"
        :class="{ 'selected bg-brand-50': state.currentSection === 0 }"
        class="day"
        >{{ `0${day}`.slice(-2) || "__" }}</span
      >
      <span>-</span>
      <span
        @click="(evt) => onClick(evt, 1)"
        :class="{ 'selected bg-brand-50': state.currentSection === 1 }"
        class="month"
        >{{ `0${month}`.slice(-2) || "__" }}</span
      >
      <span>-</span>
      <span
        @click="(evt) => onClick(evt, 2)"
        :class="{ 'selected bg-brand-50': state.currentSection === 2 }"
        class="year"
        >{{ `000${year}`.slice(-4) || "____" }}</span
      >
    </div>
  </div>
</template>
