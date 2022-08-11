<script>
export default {
  props: ["name", "placeholder", "label"],

  setup() {},
};
</script>

<template>
  <div class="flex flex-col">
    <label :for="name" class="mb-1 text-base">
      {{ label }}
    </label>
    <input
      :id="name"
      :name="name"
      :placeholder="placeholder"
      type="text"
      class="text-base py-3.5 px-4 border-none rounded-xl focus:ring-brand focus:border-brand placeholder:text-brand-200 selection:text-brand-400 selection:bg-brand-100"
    />
  </div>
</template>
