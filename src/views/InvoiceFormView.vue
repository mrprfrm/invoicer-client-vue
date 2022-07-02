<script></script>

<template>
  <div class="invoice-form">
    <h1 class="invoice-form__header">Invoice</h1>

    <form class="invoice-form__form" action="">
      <input type="text" name="name" class="invoice-form__name" />
      <input type="date" name="date" class="invoice-form__date" />

      <div class="contract-form">
        <div>
          <h2>New contract</h2>
          <button>Choose contract</button>
        </div>

        <fieldset class="new-contract-fieldset">
          <input
            type="text"
            name="contractName"
            class="new-contract-fieldset__name"
          />
          <input
            type="text"
            name="contractDate"
            class="new-contract-fieldset__name"
          />
          <select
            name="contractClient"
            class="new-contract-fieldset__client"
          ></select>
          <select
            name="contractContractor"
            class="new-contract-fieldset__contractor"
          ></select>
        </fieldset>
      </div>

      <div class="services">
        <h2 class="services__header">Goods and services</h2>
        <div class="services__description">
          <span>There is no added goods or services yet.</span>
          <span>
            Do you want to
            <button>Add new item</button>?
          </span>
        </div>
      </div>

      <div>
        <button type="button" class="invoice-form__cancel">Cancel</button>
        <button type="submit" class="invoice-form__save">Save</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.invoice-form {
  display: flex;
  flex-flow: column nowrap;

  &__form {
    display: flex;
    flex-flow: column nowrap;
  }
}
</style>
