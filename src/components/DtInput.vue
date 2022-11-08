<script setup>
import { reactive, computed, defineProps, defineEmits } from "vue";

const dateValues = {
  day: { max: 31, min: 1, initial: { min: 1, max: 31 } },
  month: { max: 12, min: 1, initial: { min: 1, max: 12 } },
  year: {
    max: 9999,
    min: 1,
    initial: { min: new Date().getFullYear(), max: new Date().getFullYear() },
  },
};

const state = reactive({
  currentSection: null,
  reveseFocus: false,
  date: null,
});

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const day = computed({
  get() {
    return props.modelValue?.day;
  },
});

const month = computed(() => {
  return props.modelValue?.month;
});

const year = computed(() => {
  return props.modelValue?.year;
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

function cleanValue() {
  const data = { ...props.modelValue };
  const sectionKey = Object.keys(dateValues)[state.currentSection];
  if (data[sectionKey]) {
    data[sectionKey] = null;
    emit("update:modelValue", data);
  }
}

function incrementValue() {
  const data = { ...props.modelValue };
  const sectionKey = Object.keys(dateValues)[state.currentSection];
  if (!data[sectionKey]) {
    data[sectionKey] = dateValues[sectionKey].initial.min;
  } else if (data[sectionKey] >= dateValues[sectionKey].max) {
    data[sectionKey] = dateValues[sectionKey].min;
  } else {
    data[sectionKey] += 1;
  }
  emit("update:modelValue", data);
}

function decrementValue() {
  const data = { ...props.modelValue };
  const sectionKey = Object.keys(dateValues)[state.currentSection];
  if (!data[sectionKey]) {
    data[sectionKey] = dateValues[sectionKey].initial.max;
  } else if (data[sectionKey] <= dateValues[sectionKey].min) {
    data[sectionKey] = dateValues[sectionKey].max;
  } else {
    data[sectionKey] -= 1;
  }
  emit("update:modelValue", data);
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
    @keydown.up.prevent="incrementValue"
    @keydown.down.prevent="decrementValue"
    @keydown.right.prevent="incrementSelection"
    @keydown.left.prevent="decrementSelection"
    @keydown.tab.exact="incrementSelection"
    @keydown.shift.tab="decrementSelection"
    @keydown.backspace="cleanValue"
    :class="{ 'text-brand-100': !(day || month || year) }"
    tabindex="0"
    class="dateinput relative flex py-5 px-4.5 shadow-inner-brand rounded-2.5xl cursor-default focus:ring-1 focus:ring-juicyblue-100 outline-none"
  >
    <div class="flex w-full h-full text-base">
      <span
        @click="(evt) => onClick(evt, 0)"
        :class="{ 'selected bg-brand-50': state.currentSection === 0 }"
        class="day"
        >{{ day ? `0${day}`.slice(-2) : "__" }}</span
      >
      <span>-</span>
      <span
        @click="(evt) => onClick(evt, 1)"
        :class="{ 'selected bg-brand-50': state.currentSection === 1 }"
        class="month"
        >{{ month ? `0${month}`.slice(-2) : "__" }}</span
      >
      <span>-</span>
      <span
        @click="(evt) => onClick(evt, 2)"
        :class="{ 'selected bg-brand-50': state.currentSection === 2 }"
        class="year"
        >{{ year ? `000${year}`.slice(-4) : "____" }}</span
      >
    </div>
  </div>
</template>
