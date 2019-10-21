import qs from 'query-string';

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "0319680a47cad44caab915185985f27f";

export const API_KEY_4 = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzE5NjgwYTQ3Y2FkNDRjYWFiOTE1MTg1OTg1ZjI3ZiIsInN1YiI6IjVkN2YyOWQwYzU0MzA0MDAxMTk2NzExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ojdnLdbvLizMMBRJpU_XnBPDrTc26NCqI2EGA54L5Q";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => {
        resolve(data)
      })
      .catch(response => {
        response.json().then(error => {
          reject(error)
        })
      })
  })
}

export default class CallApi {
  static get(url, options = {}) {
    const {params = {}} = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    }

    // url = "/discover/movie"
    // params = {
    //   language: "ru-RU",
    //   page: page,
    //   sort_by: sort_by,
    //   primary_release_year: year_by,
    //   with_genres: with_genres
    // }

    return fetchApi(`${API_URL}${url}?${qs.stringify(
      queryStringParams, {arrayFormat: 'comma'})}`,
      {
      mode: "cors",
      "headers": {
        "Content-type": "application/json"
      }
    })
  }
  static post(url, options = {}) {
    const {params = {},body = {}} = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    }
    return fetchApi(`${API_URL}${url}?${qs.stringify(
      queryStringParams, {arrayFormat: 'comma'})}`,
      {
        method: "POST",
        mode: "cors",
        "headers": {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
  }

  static delete(url, options = {}) {
    const {params = {},body = {}} = options
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    }
    return fetchApi(`${API_URL}${url}?${qs.stringify(
      queryStringParams, {arrayFormat: 'comma'})}`,
      {
        method: "DELETE",
        mode: "cors",
        "headers": {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
  }
}