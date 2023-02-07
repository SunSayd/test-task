<template>
  <figure class="product">
    <div
      :class="['product__image-box', {
        'product__image-box--top': isTop,
        'product__image-box--sale': isSale,
        'product__image-box--popular': isPopular,
      }]"
    >
      <img
        class="product__image"
        :src="image"
        loading="lazy"
        :alt="description"
      />
    </div>

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
    isTop: Boolean,
    isSale: Boolean,
    isPopular: Boolean,
  },
};
</script>

<style lang="scss">
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #FFFFFF;
  border: 1px solid $secondary-gray;
  padding: 0.5rem 0.5rem 0.2rem;
  margin-bottom: 0.8rem;

  &__image-box {
    position: relative;
    width: 100%;
    height: 17.7rem;
    margin-bottom: 0.2rem;
    /* забыл уточнить может ли быть несколько бейджей
      поэтому решил показывать один по следующему приоритету
    */
    &::after {
      content: attr(data-after);
      position: absolute;
      display: inline-block;
      padding: 0.4rem 1.6rem;
      color: #FFFFFF;
      font-weight: $font-weight-bold;
      font-size: 1.2rem;
      border-radius: 100px;
    }
    &--top::after {
      content: 'TOP';
      background: $main-green;
      top: 8px;
      left: 8px;
    }
    &--sale::after {
      content: 'SALE';
      background: $main-brown;
      top: 8px;
      left: 50%;
      transform: translate(-50%);
    }
    &--popular::after {
      content: 'POPULAR';
      background: $main-violet;
      bottom: 8px;
      right: 8px;
    }
  }

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
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

    &__image-box {
      height: 20.8rem;
      margin-bottom: 0.4rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'sm')) {
  .product {
    padding: 0.9rem 0.9rem 1.2rem;

    &__image-box {
      height: 26.4rem;
      margin-bottom: 0.8rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'md')) {
  .product {
    padding: 0.6rem 0.6rem 3rem;
    margin-bottom: 1.6rem;

    &__image-box {
      height: 20.1rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'lg')) {
  .product {
    padding: 0.6rem 0.6rem 2.4rem;

    &__image-box {
      height: 16.1rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xl')) {
  .product {
    &__image-box {
      height: 18rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xxl')) {
  .product {
    padding: 0.6rem 0.6rem 1.9rem;

    &__image-box {
      height: 17.6rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xxxl')) {
  .product {
    padding: 0.7rem 0.7rem 3.3rem;
    margin-bottom: 2.4rem;

    &__image-box {
      height: 19.1rem;
    }
  }
}

@media (min-width: map_get($breakpoints, 'xxxxl')) {
  .product {
    padding: 0.8rem 0.8rem 3.4rem;

    &__image-box {
      height: 20.6rem;
      margin-bottom: 0.9rem;
    }
  }
}
</style>
