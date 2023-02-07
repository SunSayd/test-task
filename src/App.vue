<template>
  <div>
    <MainHeader
    @update:products="loadProducts"
    />
    <div class="container">
      <div class="row">
        <div
            class="column-xxs-12"
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
              :brand="product.brand"
              :descripion="product.description"
              :thumbnail="product.thumbnail"
              :stock="product.stock"
          />
          {{ product.stock }}
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import Slider from '@/components/slider.vue';
import Product from '@/components/product.vue';
import { dogsApi, productsApi } from "@/Api";
import { isImageUrl } from "@/helpers/isImageUrl";
import { ArrayOfUrlsToCookie } from "@/helpers/ArrayOfUrlsToCookie";
import  Cookie from 'js-cookie'

export default {
  name: 'App',
  components: { Product, Slider, MainHeader },
  created() {
    this.getDogsImages();
    this.initProducts();
  },
  data () {
    return {
      dogImages: [],
      productsInfo: {},
      productsStockCounts: {
        '1': [],
        '2': [],
        '3': [],
        '4': []
      },
      productTickCount: 1,
      isProductsLoading: true,
    };
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
        if(isImageUrl(response.url)) {
          this.$data.dogImages.push(response.url);
          return response.url
        }
       return getOnlyImageDog();
      })
      for (let i = 0; i < 10; i++) {
        promises.push(getOnlyImageDog())
      }
      Promise.all(promises)
          .then(async() => {
            ArrayOfUrlsToCookie(this.$data.dogImages);
          })
          .catch(error => {
            console.log(error);
          });
    },
    setProductsCountTimer: function() {
      console.log(this.$data.productsStockCounts);
      let reduceProductStock;

      if(reduceProductStock){
        clearInterval(reduceProductStock);
      }

      for (let i=0; i < this.$data.productsInfo.total; i++) {
        // получаем случайное число от 1 до 4 которое служит ключом
        let count = Math.floor(Math.random() * 4) + 1;
        // добавляем по этому ключу в массив обьекта текущий индекс
        this.$data.productsStockCounts[count.toString()].push(i.toString());
      }

      reduceProductStock = setInterval(() => {
        let candidatesToUpdate = []
        for(const key of Object.keys(this.$data.productsStockCounts)) {
          if(this.$data.productTickCount % key === 0){
            candidatesToUpdate.push(key);
          }
        }
        console.log(candidatesToUpdate);
        for(const candidate of candidatesToUpdate) {
          let indexesToDelete = [];
          for(let index = 0; index < this.$data.productsStockCounts[candidate].length; index++) {
            let productStock =  this.$data.productsInfo.products[this.$data.productsStockCounts[candidate][index]].stock;

            if(productStock === 0) {
              indexesToDelete.push(index)
            } else {
              this.$data.productsInfo.products[this.$data.productsStockCounts[candidate][index]].stock = productStock - 1;
            }
          }
          if(indexesToDelete.length) {
            indexesToDelete.reverse()
            for(const indexToDelete of indexesToDelete) {
              this.$data.productsStockCounts[candidate].splice(indexToDelete, 1);
            }
          }
          if(Object.values(this.$data.productsStockCounts).length === 0) {
            clearInterval(reduceProductStock);
            return;
          }
        }

        this.$data.productTickCount++;
        console.log('INTERVAL is',this.$data.productTickCount, new Date().toUTCString());
      }, 1000)
    },
    loadProducts: async function() {
      this.$data.isProductsLoading = true;
      this.$data.productsInfo = await productsApi.getProducts(100);
      for (let index = 0; index < this.$data.productsInfo.total; index++) {
        // получаем случайное число от 1 до 4 которое служит ключом
        let count = Math.floor(Math.random() * 4) + 1;
        // добавляем по этому ключу в массив обьекта текущий индекс
        this.$data.productsStockCounts[count.toString()].push(index);
      }
      localStorage.setItem("products", JSON.stringify(this.$data.products));
      this.$data.isProductsLoading = false;
    },
    initProducts: async function () {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        this.$data.productsInfo = JSON.parse(storedProducts);
        this.setProductsCountTimer();
        return;
      }
      await this.loadProducts();
      this.setProductsCountTimer();
    }
  },
};
</script>
