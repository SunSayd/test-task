<template>
  <button
      @click="$emit('click')"
      :disabled="disabled"
      class="button"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'MainButton',
  props: {
    disabled: Boolean,
  }
};
</script>

<style lang="scss">
.button {
  cursor: pointer;
  font-family: $primary-font;
  font-weight: $font-weight-bold;
  background: #FFFFFF;
  appearance: none;
  border: none;
  padding: 8px 16px;
  border-radius: 100px;
  color: $main-dark;

  &:disabled {
    cursor: not-allowed;
  }
  @media (min-width: map_get($breakpoints, 'lg')) {
    font-size: 1.5rem;
    line-height: 1.8rem;
  }

  @media (min-width: map_get($breakpoints, 'xxl')) {
    font-size: 1.4rem;
    line-height: 1.7rem;
  }

  @media (min-width: map_get($breakpoints, 'xxxl')) {
    font-size: 1.3rem;
    line-height: 1.6rem;
  }

  @media (min-width: map_get($breakpoints, 'xxxxl')) {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
}

</style>
