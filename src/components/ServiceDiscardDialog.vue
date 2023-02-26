<script setup>
import { useStore } from "vuex";

const store = useStore();

function onCancel() {
  store.commit("SET_DISCARD_DIALOG_OPENED", false);
}

function onDiscard() {
  store.dispatch("CONFIRM_DISCARD_CHANGES");
}
</script>

<template>
  <div class="z-20 absolute inset-0 flex flex-col items-center justify-center">
    <div class="z-30 absolute inset-0 bg-violetgray-300 opacity-90"></div>
    <div
      class="z-40 flex flex-col space-y-3 pt-7.5 pb-5 px-5 rounded-2.5xl bg-white"
    >
      <span>Are you sure want to delete data?</span>
      <div class="flex space-x-2.5">
        <button
          type="button"
          class="py-4 w-full rounded-2.5xl border border-violetgray-100 text-violetgray-200"
          @click="onCancel"
        >
          Cancel
        </button>
        <button
          type="button"
          class="py-4 w-full rounded-2.5xl bg-juicyred-50 text-white"
          @click="onDiscard"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
