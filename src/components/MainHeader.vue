<template>
  <header class="main-header">
    <div class="container">
      <div class="main-header__line">
        <Logo class="main-header__logo"/>
        <MainButton
            class="button"
            @click="$emit('update:products')"
            type="button"
        >
          Update Products
        </MainButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Logo from "@/assets/svg/logo.svg";
import MainButton from "@/components/MainButton.vue";

export default {
  name: 'MainHeader',
  components: {
    Logo,
    MainButton
  },
};
</script>

<style lang="scss">
.main-header {
  margin-bottom: 0.8rem;
  background: $primary;
  height: 48px;
  width: 100%;

  &__line {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media (max-width: map_get($breakpoints, 'lg') - 1px) {
  .main-header {
    &__line {
      display: none;
    }
  }
}

@media (min-width: map_get($breakpoints, 'md')) {
  .main-header {
    margin-bottom: 1.6rem;
  }
}

// изменяем размеры лого
@media (min-width: map_get($breakpoints, 'lg')) {
  .main-header__logo {
    transform: scale(1.4);
  }
}

@media (min-width: map_get($breakpoints, 'xl')) {
  .main-header__logo {
    transform: scale(1.3);
  }
}

@media (min-width: map_get($breakpoints, 'xxl')) {
  .main-header__logo {
    transform: scale(1.2);
  }
}

@media (min-width: map_get($breakpoints, 'xxxl')) {
  .main-header__logo {
    transform: scale(1.1);
  }
}

@media (min-width: map_get($breakpoints, 'xxxxl')) {
  .main-header__logo {
    transform: unset;
  }
}
</style>
