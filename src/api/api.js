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