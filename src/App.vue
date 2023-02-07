<template>
  <div>
    <MainHeader
      :isProductsLoading="isProductsLoading"
      @update:products="loadNewProducts"
    />
    <div class="container">
      <div class="row">
        <div
          class="column-xxs-12 slider-container"
        >
          <Slider
            :slides="dogImages"
          />
        </div>
        <div
          v-for="(product, index) in productsInfo.products"
          :key="index"
          class="column-xxs-12 column-md-6 column-lg-4 column-xxl-3"
        >
          <Product
            :image="product.thumbnail"
            :brand="product.brand"
            :category="product.category"
            :description="product.description"
            :thumbnail="product.thumbnail"
            :stock="product.stock"
            :isTop="product.isTop"
            :isSale="product.isSale"
            :isPopular="product.isPopular"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import Slider from '@/components/slider.vue';
import Product from '@/components/product.vue';
import { dogsApi, productsApi } from '@/Api';
import { isImageUrl } from '@/helpers/isImageUrl';
import { ArrayOfUrlsToCookie } from '@/helpers/ArrayOfUrlsToCookie';
import  Cookie from 'js-cookie';

export default {
  name: 'App',
  components: { Product, Slider, MainHeader },
  data () {
    return {
      dogImages: [],
      productsInfo: {},
      productsStockCounts: {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
      },
      productTickCount: 1,
      isProductsLoading: true,
      /* dummyJson отдает один и тот же фиксированный список товаров
        поэтому для удобства тестирования добавлен параметр skip
       */
      skipProductsCount: 0,
    };
  },
  created() {
    this.getDogsImages();
    this.initProducts();
  },
  methods: {
    getDogsImages: async function () {
      const dogsImages = Cookie.get('dogsImages');

      if (dogsImages) {
        this.$data.dogImages = JSON.parse(dogsImages);

        return;
      }
      let promises = [];
      const getOnlyImageDog = () => dogsApi.getDog().then(response => {
        if (isImageUrl(response.url)) {
          this.$data.dogImages.push(response.url);

          return response.url;
        }

        return getOnlyImageDog();
      });

      for (let i = 0; i < 10; i++) {
        promises.push(getOnlyImageDog());
      }
      Promise.all(promises)
        .then(async() => {
          ArrayOfUrlsToCookie(this.$data.dogImages);
        });
    },
    setProductsCountTimer: function() {
      let reduceProductStock;

      if (reduceProductStock) {
        clearInterval(reduceProductStock);
      }
      //  функция уменьшения количества остатков товаров
      reduceProductStock = setInterval(() => {
        let candidatesToUpdate = [];

        // считаем какие из групп товаров в productsStockCounts должны быть посчитаны в данную конкретную секунду и складываем в массив
        for (const key of Object.keys(this.$data.productsStockCounts)) {
          if (this.$data.productTickCount % key === 0) {
            candidatesToUpdate.push(key);
          }
        }
        // проходимся по этому массиву и уменьшаем количество товаров
        for (const candidate of candidatesToUpdate) {
          let indexesToDelete = [];

          for (let index = 0; index < this.$data.productsStockCounts[candidate].length; index++) {
            let productStock =  this.$data.productsInfo.products[this.$data.productsStockCounts[candidate][index]].stock;

            if (productStock === 0) {
              indexesToDelete.push(index);
            } else {
              this.$data.productsInfo.products[this.$data.productsStockCounts[candidate][index]].stock--;
            }
          }
          if (indexesToDelete.length) {
            indexesToDelete.reverse();
            for (const indexToDelete of indexesToDelete) {
              this.$data.productsStockCounts[candidate].splice(indexToDelete, 1);
            }
          }

          if (Object.values(this.$data.productsStockCounts).length === 0) {
            clearInterval(reduceProductStock);

            return;
          }
        }
        this.$data.productTickCount++;
      }, 1000);
    },
    // формируем обьект который хранит в себе информацию о том какие товары должны быть обновлены в определенную секунду
    randomizeProductsStockCounts: function () {
      this.$data.productsStockCounts = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
      };
      for (let index = 0; index < Number(this.$data.productsInfo.products.length); index++) {
        // получаем случайное число от 1 до 4 которое служит ключом
        let count = Math.floor(Math.random() * 4) + 1;

        // добавляем по этому ключу в массив обьекта текущий индекс
        this.$data.productsStockCounts[count].push(index);
      }
    },
    loadProducts: async function(skipProductsCount?: number) {
      this.$data.isProductsLoading = true;
      const productsInfo = await productsApi.getProducts(100, skipProductsCount);

      /* описание довольно часто бывает слишком короткое,
       для демонстрации обрезки текста меняю описание первого элемента
       */
      productsInfo.products[0].description = 'Возьмите меня на работу hire me pls' +
          'Возьмите меня на работу hire me pls Возьмите меня на работу hire me pls';
      // добавляем данные о бейджиках
      productsInfo.products[0].isTop = true;
      productsInfo.products[1].isSale = true;
      productsInfo.products[3].isPopular = true;
      this.$data.productsInfo = productsInfo;
      this.randomizeProductsStockCounts();
      localStorage.setItem('productsInfo', JSON.stringify(this.$data.productsInfo));

      this.$data.isProductsLoading = false;
    },
    initProducts: async function () {
      const storedProducts = localStorage.getItem('productsInfo');

      if (storedProducts) {
        this.$data.productsInfo = JSON.parse(storedProducts);
        this.randomizeProductsStockCounts();
        this.$data.isProductsLoading = false;
        this.setProductsCountTimer();

        return;
      }
      await this.loadProducts();
      this.setProductsCountTimer();
    },
    loadNewProducts: async function () {
      this.$data.skipProductsCount = this.$data.skipProductsCount >= 80 ? 0 : this.$data.skipProductsCount + 10;
      await this.loadProducts(this.$data.skipProductsCount);
    },
  },
};
</script>

<style lang="scss">
.slider-container {
  margin-bottom: 0.8rem;
  min-height: 19.7rem;
}

@media (min-width: map_get($breakpoints, 'xs')) {
  .slider-container {
    margin-bottom: 3.2rem;
  }
}

@media (min-width: map_get($breakpoints, 'sm')) {
  .slider-container {
    margin-bottom: 1.6rem;
  }
}

@media (min-width: map_get($breakpoints, 'lg')) {
  .slider-container {
    margin-bottom: 2.5rem;
  }
}

@media (min-width: map_get($breakpoints, 'xl')) {
  .slider-container {
    margin-bottom: 1.6rem;
  }
}

@media (min-width: map_get($breakpoints, 'xxl')) {
  .slider-container {
    margin-bottom: 2.4rem;
  }
}

@media (min-width: map_get($breakpoints, 'xxxxl')) {
  .slider-container {
    margin-bottom: 2.6rem;
  }
}
</style>
