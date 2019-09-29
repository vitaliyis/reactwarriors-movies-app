import React from "react"
// import { API_URL, API_KEY_3 } from "../../../api/api";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm"

// `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
// `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
// `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));

  }

  // sendPromises = async () => {
    // START 2 VARIANT
    // const getRequestToken = () => {
    //   return new Promise((resolve, reject) => {
    //     fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json()
    //         } else {
    //           throw response
    //         }
    //       })
    //       .then(data => {
    //         resolve(data)
    //         console.log('data', data)
    //       })
    //       .catch(response => {
    //         response.json().then(error => {
    //           reject(error)
    //         })
    //     })
    //   })
    // }
    //
    // const validateWithLogin = (body) => {
    //   return new Promise((resolve, reject) => {
    //     fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //       method: "POST",
    //       mode: "cors",
    //       "headers": {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify(body)
    //     })
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json()
    //         } else {
    //           throw response
    //         }
    //       })
    //       .then(data => {
    //         resolve(data)
    //         console.log('data', data)
    //       })
    //       .catch(response => {
    //         response.json().then(error => {
    //           reject(error)
    //         })
    //       })
    //   })
    // }
    // END 2 VARIANT

    // START 4 VARIANT
    // const fetchApi = (url, options = {}) => {
    //   return new Promise((resolve, reject) => {
    //     fetch(url, options)
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json()
    //         } else {
    //           throw response
    //         }
    //       })
    //       .then(data => {
    //         resolve(data)
    //       })
    //       .catch(response => {
    //         response.json().then(error => {
    //           reject(error)
    //         })
    //       })
    //   })
    // }
    //
    // try {
    //   const data = await fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   const result = await fetchApi(
    //     `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //     {
    //       method: "POST",
    //       mode: "cors",
    //       "headers": {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         username: "vetal.friend@gmail.com",
    //         password: "lapiovra",
    //         request_token: data.request_token
    //       })
    //     })
    //   const {session_id} = await fetchApi(
    //     `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //     {
    //       method: "POST",
    //       mode: "cors",
    //       "headers": {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify({                // объект превращаем в строку
    //         request_token: result.request_token
    //       })
    //     })
    //   console.log('session_id => ', session_id)
    // } catch(error) {
    //   console.log('error => ', error)
    // }
    // END 4 VARIANT

//*********************************************
// START 3 VARIANT
//     fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
//       .then(data => {
//         return fetchApi(
//           `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
//           {
//             method: "POST",
//             mode: "cors",
//             "headers": {
//               "Content-type": "application/json"
//             },
//             body: JSON.stringify({
//               username: "vetal.friend@gmail.com",
//               password: "lapiovra",
//               request_token: data.request_token
//             })
//           })
//       })
//       .then(data => {
//         return fetchApi(
//           `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
//           {
//             method: "POST",
//             mode: "cors",
//             "headers": {
//               "Content-type": "application/json"
//             },
//             body: JSON.stringify({                // объект превращаем в строку
//               request_token: data.request_token
//             })
//           })
//       })
//       .then(data => {
//         console.log('session data => ', data)
//       })
//       .catch(error => {
//         console.log('error', error)
//       })
// END 3 VARIANT
//*********************************************
    // START 1 VARIANT
    // fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //       method: "POST",
    //       mode: "cors",
    //       "headers": {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify({                // объект превращаем в строку
    //         username: "vetal.friend@gmail.com",
    //         password: "lapiovra",
    //         request_token: data.request_token
    //       })
    //     })
    //       .then(response => response.json())
    //       .then(data => {
    //         // console.log('data 2 => ', data)
    //         fetch(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //           {
    //             method: "POST",
    //             mode: "cors",
    //             "headers": {
    //               "Content-type": "application/json"
    //             },
    //             body: JSON.stringify({                // объект превращаем в строку
    //               request_token: data.request_token
    //             })
    //           })
    //           .then(response => response.json())
    //           .then(data => {
    //             console.log('session => ', data)
    //           })
    //       })
    //   })
    // END 1 VARIANT
  // }
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm
              updateUser={this.props.updateUser}
              updateSessionId={this.props.updateSessionId}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}