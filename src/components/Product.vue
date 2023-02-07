<template>
  <figure class="product">
    <img
        class="product__image"
         :src="image"
         loading="lazy"
         :alt="description"
    >
    <figcaption>
      <p>
        <span class="bold">Brand: </span>
        {{ brand }}
      </p>
      <p>
        <span class="bold">Category: </span>
        {{ category }}
      </p>
      <p class="product__description">
        <span class="bold">description: </span>
        {{ description }}
      </p>
      <p>
        <span class="bold">In stock: </span>
        {{ stock }}
      </p>
    </figcaption>
  </figure>
</template>

<script lang="ts">
export default {
  name: 'Product',
  props: {
    image: String,
    brand: String,
    category: String,
    description: String,
    stock: Number,
  }
};
</script>

<style lang="scss">
.product {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #FFFFFF;
  border: 1px solid $secondary-gray;
  padding: 0.5rem 0.5rem 0.2rem;
  margin-bottom: 0.8rem;

  &__image {
    object-fit: cover;
    width: 100%;
    height: 17.7rem;
    margin-bottom: 0.2rem;
  }

  &__description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}

/* обычно я не фанат так делать, однозначно бы обсудил карточку с дизайнером при реальной задаче
    здесь беру паддинги из макета и вычитаю 1px из-за бордера
  */
@media (min-width: map_get($breakpoints, 'xs')) {
  .product {
    padding: 0.6rem 0.8rem 0.5rem;

    &__image {
      height: 20.8rem;
      margin-bottom: 0.4rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'sm')) {
  .product {
    padding: 0.9rem 0.9rem 1.2rem;

    &__image {
      height: 26.4rem;
      margin-bottom: 0.8rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'md')) {
  .product {
    padding: 0.6rem 0.6rem 3rem;
    margin-bottom: 1.6rem;

    &__image {
      height: 20.1rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'lg')) {
  .product {
    padding: 0.6rem 0.6rem 2.4rem;

    &__image {
      height: 16.1rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xl')) {
  .product {
    &__image {
      height: 18rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xxl')) {
  .product {
    padding: 0.6rem 0.6rem 1.9rem;

    &__image {
      height: 17.6rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xxxl')) {
  .product {
    padding: 0.7rem 0.7rem 3.3rem;
    margin-bottom: 2.4rem;

    &__image {
      height: 19.1rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xxxxl')) {
  .product {
    padding: 0.8rem 0.8rem 3.4rem;

    &__image {
      height: 20.6rem;
      margin-bottom: 0.9rem;
    }
  }
}
</style>
