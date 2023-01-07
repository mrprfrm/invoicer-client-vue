<script setup>
import { reactive, ref, watch, computed, defineProps, defineEmits } from "vue";

import DatePicker from "@/components/DatePicker.vue";
import DateInput from "@/components/DateInput.vue";

const field = ref(null);
const state = reactive({
  fieldValue: null,
  lastNonEmptySection: null,
  currentSection: null,
  blurable: true,
  opened: false,
});

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue
      ? {
          day: props.modelValue.getDate(),
          month: props.modelValue.getMonth() + 1,
          year: props.modelValue.getFullYear(),
        }
      : state.fieldValue || null;
  },
  set(value) {
    if (value.day && value.month && value.year) {
      emit(
        "update:modelValue",
        new Date(value.year, value.month - 1, value.day)
      );
      state.fieldValue = null;
    } else {
      state.fieldValue = value;
    }
  },
});

watch(
  () => state.currentSection,
  (value) => {
    if (value) {
      state.lastNonEmptySection = value;
    }
  }
);

function onBlur() {
  if (!state.blurable) {
    field.value.querySelector(".dateinput").focus();
    state.currentSection = state.lastNonEmptySection;
  } else {
    state.opened = false;
  }
}

function onMouseDown() {
  if (state.currentSection !== null) {
    state.opened = !state.opened;
  }
}
</script>

<template>
  <div class="relative" ref="field">
    <DateInput
      @blur="onBlur"
      @focus="state.opened = true"
      @keydown.esc="state.opened = !state.opened"
      @mousedown="onMouseDown"
      v-model="value"
      v-model:currentSection="state.currentSection"
    />
    <DatePicker
      @mousedown="state.blurable = false"
      @mouseup="state.blurable = true"
      v-show="state.opened"
      v-model="value"
      class="z-20 absolute top-full mt-1"
    />
  </div>
</template>
