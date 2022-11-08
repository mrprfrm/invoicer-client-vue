<script setup>
import { ref, defineProps, defineEmits, reactive, onMounted, watch } from "vue";

const container = ref(null);
const values = ref([]);
const state = reactive({
  currentIndex: null,
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

watch(
  () => state.currentIndex,
  (newValue) => {
    if (newValue !== props.modelValue) {
      emit("update:modelValue", newValue);
    }
  }
);

function onClick(evt) {
  container.value.scrollTop =
    evt.target.offsetTop - container.value.offsetTop - 44;
  emit("update:modelValue", parseInt(evt.target.dataset.index));
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
    state.currentIndex = valueIndex;
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
      @click="onClick"
      :key="`${parentKey}-${value}`"
      :data-index="index"
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
