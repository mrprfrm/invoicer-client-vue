<script setup>
import { defineProps } from "vue";

defineProps(["name", "placeholder", "label", "inputClass"]);
</script>

<template>
  <div class="flex flex-col space-y-1 text-base">
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      class="py-3.5 px-4 border-none rounded-xl text-brand-400 placeholder:text-brand-200 selection:text-brand-400 selection:bg-brand-100"
      type="text"
    />
  </div>
</template>
