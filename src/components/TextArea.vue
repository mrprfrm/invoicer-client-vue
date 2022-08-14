<script setup>
import { ref, defineProps } from "vue";

defineProps(["name", "placeholder", "label"]);

const content = ref(null);

function inputHandler(evt) {
  content.value = evt.target.value;
}
</script>

<template>
  <div class="flex flex-col space-y-1 text-base">
    <label :for="name">{{ label }}</label>
    <div class="relative flex">
      <span class="whitespace-pre-line break-all py-3.5 px-4 text-transparent">
        {{ content || placeholder }}
      </span>
      <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder"
        @input="inputHandler"
        @keypress.enter.prevent
        type="text"
        class="absolute inset-0 z-10 py-3.5 px-4 border-none rounded-xl focus:ring-brand-400 focus:border-brand-400 placeholder:text-brand-200 selection:text-brand-400 selection:bg-brand-100"
      />
    </div>
  </div>
</template>
