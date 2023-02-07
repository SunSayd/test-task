import HttpClient from './HttpClient';

import axios, { AxiosInstance } from 'axios';

const AXIOS_INSTANCE_CONFIG = {
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
};

const DOGS_API_CONFIG = {
  ...AXIOS_INSTANCE_CONFIG,
  baseURL :'https://random.dog',
};

const PRODUCT_API_CONFIG = {
  ...AXIOS_INSTANCE_CONFIG,
  baseURL :'https://dummyjson.com',
};

class BaseApi  {
  httpClient: HttpClient;

  constructor(axiosInstance: AxiosInstance) {
    this.httpClient = new HttpClient(axiosInstance);
  }
}

class DogsApi extends BaseApi {
  async getDog() {
    return this.httpClient.get<any>(
      '/woof.json',
    );
  }
}

class ProductsApi extends BaseApi {
  async getProducts (limit: number, skip?: number) {
    return this.httpClient.get<any>(
      '/products',
      {
        limit: limit,
        skip: skip,
      },
    );
  }
}

const dogsApi = new DogsApi(axios.create(DOGS_API_CONFIG));
const productsApi = new ProductsApi(axios.create(PRODUCT_API_CONFIG));

export {
  dogsApi,
  productsApi,
};
