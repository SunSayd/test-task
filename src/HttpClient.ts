import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from 'axios';

/** Базовый сервис для запросов к api */
class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async get<
    Response,
    Request extends Record<string, any> = Record<string, any>
  >(url: string, params?: Request, config: AxiosRequestConfig = {}) {
    return this.request<Response>({
      url,
      params,
      method: 'GET',
      ...config,
    });
  }

  async post<
    Response,
    Request extends Record<string, any> = Record<string, any>
  >(url: string, data?: Request, config: AxiosRequestConfig = {}) {
    return this.request<Response>({
      url,
      data,
      method: 'POST',
      ...config,
    });
  }

  private async request<Response>(config: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.request<Response>(config);

      return response.data;
    } catch (e) {
      const error = e as AxiosError;

      if (error.response) {
        const { data: response } = error.response;

        return Promise.reject(response);
      }

      if (error.message) {
        return Promise.reject(error.message);
      }

      return Promise.reject(error);
    }
  }
}

export default HttpClient;
