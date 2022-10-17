<script setup>
import { defineProps } from "vue";

defineProps(["name", "placeholder", "label", "inputClass"]);
</script>

<template>
  <div class="flex flex-col space-y-1.5 text-base">
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      class="py-3.5 px-4 border-none rounded-2xl placeholder:text-brand-50 text-brand-300 selection:bg-brand-100 shadow-inner-brand focus:ring-juicyblue-100"
      type="text"
    />
  </div>
</template>
