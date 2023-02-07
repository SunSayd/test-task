<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'MainButton',
};
</script>

<style lang="scss">
.button {
  font-family: $primary-font;
  font-weight: $font-weight-bold;
  appearance: none;
  border: none;
  padding: 8px 16px;
  border-radius: 100px;
  color: $main-dark;

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
