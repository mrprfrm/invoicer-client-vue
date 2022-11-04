<script setup>
import { ref, defineProps, defineEmits, reactive, onMounted, watch } from "vue";

const container = ref(null);
const values = ref([]);
const state = reactive({
  ignoreScroll: false,
});

const props = defineProps(["parentKey", "values", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

let isScrolling = null;

onMounted(() => {
  container.value.scrollTop =
    values.value[props.modelValue || 0].offsetTop -
    container.value.offsetTop -
    44;
});

watch(
  () => props.modelValue,
  (newValue) => {
    container.value.scrollTop =
      values.value[newValue >= 0 ? newValue : 0].offsetTop -
      container.value.offsetTop -
      44;
  }
);

function onClick(evt, idx) {
  container.value.scrollTop =
    evt.target.offsetTop - container.value.offsetTop - 44;
  emit("update:modelValue", idx);
}

function onScroll() {
  clearTimeout(isScrolling);

  if (state.ignoreScroll) {
    state.ignoreScroll = false;
    return;
  }

  isScrolling = setTimeout(function () {
    state.ignoreScroll = true;
    const valueIndex = Math.round(container.value.scrollTop / 44);
    container.value.scrollTop =
      values.value[valueIndex].offsetTop - container.value.offsetTop - 44;
    emit("update:modelValue", valueIndex);
  }, 100);
}
</script>

<template>
  <div
    @scroll="onScroll"
    class="scrollpicker flex flex-col space-y-6 overflow-y-scroll scroll-hidden leading-5 scroll-smooth"
    ref="container"
  >
    <button
      @click="(evt) => onClick(evt, index)"
      :key="`${parentKey}-${value}`"
      v-for="(value, index) in props.values"
      tabindex="-1"
      class="first:mt-11 last:!mb-11"
      type="button"
      ref="values"
    >
      {{ value }}
    </button>
  </div>
</template>
