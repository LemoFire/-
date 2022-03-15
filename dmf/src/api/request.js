class Request {
  constructor() {
    this._header = {
      "content-type": "application/x-www-form-urlencoded",
    };
    this._defaultConfig = {
      header: this._header,
      method: "GET",
      timeout: 60000,
      dataType: "json",
    };
  }

  request(config) {
    return new Promise((resolve, reject) => {
      if (!config.url) return reject({ msg: "请求 URL 为空" });

      let params = Object.assign(
        {
          success: (res) => {
            console.log(res.statusCode);
            if (![200].includes(res.statusCode)) {
              return reject(res.data || { msg: "请求失败" });
            } else if (res.data.code != 0) {
              return reject(res.data);
            } else {
              return resolve(res.data);
            }
          },
          fail: (error) => {
            return reject(error || { msg: "请求失败" });
          },
        },
        this._defaultConfig,
        config
      );

      this.requestTask = uni.request(params);
    });
  }

  get(url, data) {
    return this.request({ url, data });
  }

  post(url, data) {
    return this.request({ url, data, method: "POST" });
  }
}

export default Request;
