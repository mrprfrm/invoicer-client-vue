<script setup>
import { useStore } from "vuex";
import { computed, watch, reactive, defineProps } from "vue";

import FieldGroup from "@/components/FieldGroup.vue";

import DecimalField from "@/components/DecimalField.vue";
import IntegerField from "@/components/IntegerField.vue";
import DropdownSelect from "@/components/DropdownSelect.vue";
import TextArea from "@/components/TextArea.vue";

// Constants which used as currencies and dates values
const CURRENCIES = ["USD", "RUB", "EUR"];
const DATES = ["year", "month", "week", "day"];

const props = defineProps(["index"]);
const store = useStore();

const state = reactive({
  service: {},
  errors: {},
});

const editIndex = computed(() => store.state.services.editIndex);
const errors = computed(() => store.state.services.errors);

const enabled = computed(() => {
  /**
   * Boolean computed field, which used as a condition
   * for "Save" button disabled attribute
   */

  const { description, quantity, date, price, currency } = state.service;
  const requiredSet = description && quantity && date && price && currency;
  const hasErrors = Object.values(state.errors).some((el) => el);
  return requiredSet && !hasErrors;
});

watch(
  () => editIndex.value,
  (value) => {
    if (value === props.index) {
      state.service = store.getters.services.editService;
    }
  }
);

watch(
  () => errors.value,
  (value) => {
    if (editIndex.value === props.index) {
      state.errors = value;
    }
  }
);

function onCancel() {
  store.dispatch("DISCARD_CHANGES", state.service);
}

function onSave() {
  store.dispatch("SAVE_CHANGES", state.service);
}
</script>

<template>
  <form
    class="pt-6 pb-5 px-4 space-y-3 rounded-2.5xl text-violetgray-300 bg-juicyblue-gradient"
  >
    <FieldGroup label="Description" :error="state.errors.description">
      <TextArea
        name="description"
        placeholder="Enter description"
        v-model="state.service.description"
        v-model:error="state.errors.description"
        :class="state.errors.description ? '!rounded-b-none' : ''"
        :allow-new-lines="false"
        :required="true"
      />
    </FieldGroup>

    <FieldGroup label="Quantity" :error="state.errors.quantity">
      <div
        class="relative flex w-full bg-white rounded-2.5xl shadow-inner-violetgray"
      >
        <IntegerField
          name="quantity"
          class="w-full !rounded-r-none !shadow-none !bg-transparent"
          placeholder="Enter quantity"
          v-model="state.service.quantity"
          v-model:error="state.errors.quantity"
          :class="state.errors.quantity ? '!rounded-b-none' : ''"
          :required="true"
        />
        <DropdownSelect
          name="date"
          class="right-0 bg-transparent"
          v-model="state.service.date"
          :class="state.errors.quantity ? '!rounded-b-none' : ''"
          :default="DATES[0]"
          :options="DATES"
        />
      </div>
    </FieldGroup>

    <FieldGroup label="Price" :error="state.errors.price">
      <div
        class="'relative flex w-full bg-white rounded-2.5xl shadow-inner-violetgray',"
      >
        <DecimalField
          name="price"
          class="w-full !rounded-r-none !shadow-none !bg-transparent"
          placeholder="Enter price"
          v-model="state.service.price"
          v-model:error="state.errors.price"
          :class="state.errors.price ? '!rounded-bl-none' : ''"
          :required="true"
        />
        <DropdownSelect
          name="currency"
          class="right-0 bg-transparent"
          v-model="state.service.currency"
          :class="state.errors.quantity ? '!rounded-b-none' : ''"
          :options="CURRENCIES"
          :default="CURRENCIES[0]"
        />
      </div>
    </FieldGroup>

    <FieldGroup label="Amount" :error="state.errors.amount">
      <IntegerField
        name="amount"
        class="w-full"
        placeholder="Enter amount"
        v-model="state.service.amount"
        v-model:error="state.errors.amount"
        :class="state.errors.amount ? '!rounded-b-none' : ''"
      />
    </FieldGroup>

    <div class="flex space-x-2.5">
      <button
        type="button"
        class="flex flex-1 py-3.5 justify-center border rounded-2.5xl border-white text-white"
        @click="onCancel"
      >
        Cancel
      </button>
      <button
        type="button"
        id="save-service-btn"
        class="flex flex-1 py-3.5 justify-center border-none rounded-2.5xl text-white bg-juicygreen-100 disabled:bg-juicygreen-50"
        @click="onSave"
        :disabled="!enabled"
      >
        Save
      </button>
    </div>
  </form>
</template>
