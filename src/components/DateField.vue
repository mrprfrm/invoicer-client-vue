<script setup>
import { ref } from "vue";

import DatePicker from "@/components/DatePicker";
import DtInput from "@/components/DtInput";

const value = ref(new Date());
</script>

<template>
  <div class="relative">
    <DtInput v-model="value" />
    <DatePicker v-model="value" class="z-20 absolute top-full mt-1" />
  </div>
</template>
