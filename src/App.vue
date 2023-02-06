<template>
  <div class="container">
      <Header/>
      <div class="row">
        <div
            class="column-xxs-12"
        >
          <slider
              style="height: 200px"
          />
        </div>
        <product
            style="height: 200px"
            class="column-xxs-12 column-md-6 column-lg-4 column-xxl-3"
        />
        <product
            style="height: 200px"
            class="column-xxs-12 column-md-6 column-lg-4 column-xxl-3"
        />
        <product
            style="height: 200px"
            class="column-xxs-12 column-md-6 column-lg-4 column-xxl-3"
        />
        <product
            style="height: 200px"
            class="column-xxs-12 column-md-6 column-lg-4 column-xxl-3"
        />
      </div>
    </div>
</template>

<script lang="ts">
import Header from "@/components/header.vue";
import Slider from "@/components/slider.vue";
import Product from "@/components/product.vue";
export default {
  name: 'App',
  components: {Product, Slider, Header},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
