<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed, defineProps, defineEmits } from "vue";

import ScrollPicker from "@/components/ScrollPicker.vue";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const years = [...Array(30).keys()].map((itm) => currentYear - itm);

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const pickerKey = computed(() => {
  return uuidv4();
});

const day = computed({
  get() {
    return props.modelValue?.day - 1 || 0;
  },
  set(newValue) {
    emit("update:modelValue", { ...props.modelValue, day: newValue + 1 });
  },
});

const month = computed({
  get() {
    return props.modelValue?.month - 1 || 0;
  },
  set(newValue) {
    emit("update:modelValue", {
      ...props.modelValue,
      month: newValue + 1,
    });
  },
});

const year = computed({
  get() {
    const yearIndex = years.indexOf(props.modelValue?.year);
    return yearIndex >= 0 ? yearIndex : 0;
  },
  set(newValue) {
    emit("update:modelValue", { ...props.modelValue, year: years[newValue] });
  },
});
</script>

<template>
  <div
    class="datepicker inline-flex space-x-7.5 p-7.5 h-42 rounded-2.5xl overflow-hidden ahadow-dark bg-white shadow-dark before:bg-gradient-to-b before:absolute before:inset-0 before:bottom-auto before:from-white before:to-transparent before:h-18.5 before:pointer-events-none after:bg-gradient-to-t after:absolute after:inset-0 after:top-auto after:from-white after:to-transparent after:h-18.5 after:pointer-events-none"
  >
    <ScrollPicker v-model="day" :parentKey="pickerKey" :values="31" />
    <ScrollPicker v-model="month" :parentKey="pickerKey" :values="months" />
    <ScrollPicker v-model="year" :parentKey="pickerKey" :values="years" />
  </div>
</template>
