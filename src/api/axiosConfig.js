import axios, { CancelToken } from 'axios';
import qs from 'qs';
import { Toast } from 'antd-mobile';

const pendingUrl = {};
const createApi = (options = {}) => {
  const formData = typeof options.formData === 'boolean' ? options.formData : true;
  const conf = Object.assign(
    {},
    {
      transformRequest: [
        data => {
          if (formData) {
            return qs.stringify(data);
          }
          return data;
        },
      ],
    },
    options
  );
  const instance = axios.create(conf);

  instance.interceptors.request.use(config => {
    if (config.url) {
      const url = config.url;
      if (config.canCancel) {
        removePending(url);
        config.cancelToken = new CancelToken(cancel => {
          pendingUrl[url] = cancel;
        });
      }
    }
    return config;
  });

  instance.interceptors.response.use(response => {
    const status = response.status;
    const url = response.config.url;
    if (response.config.canCancel && url && pendingUrl[url]) {
      delete pendingUrl[url];
    }
    if (status >= 200 && status < 300) {
      const code = response.data.value.code;
      if (code && code === '000000') {
        response.data = response.data.value.data;
      } else if (code === '000990' || code === '000995' || code === ' ') {
        response.data = { msg: response.data.value.message };
      } else {
        response.data = response.data.value;
      }
    }
    return response;
  });
  return instance;
};

function removePending(url) {
  if (pendingUrl[url]) {
    pendingUrl[url]();
    delete pendingUrl[url];
  }
}

const request = (() => {
  const axiosInstance = createApi();
  return {
    get: async (url, params) => {
      try {
        const res = await axiosInstance.get(url, {
          params: params,
        });
        return res.data;
      } catch (e) {
        Toast.hide();
      }
    },
    post: async (url, params, flag) => {
      try {
        const res = await axiosInstance.post(url, params);
        return !!flag ? res : res.data;
      } catch (e) {
        Toast.hide();
      }
    }
  };
})();

const normalRequest = {};
normalRequest.get = async (url, param) => {
  const result = await axios({
    url: url,
    method: 'get',
    params: param,
  });
  return result.data;
};
normalRequest.post = async (url, param) => {
  const result = await axios({
    url: url,
    method: 'post',
    data: param,
  });
  return result.data;
};
export default request;
export { normalRequest };
