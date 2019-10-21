import React from "react";
// import CallApi, {API_KEY_3, API_URL, fetchApi} from "../../../api/api";
import CallApi from "../../../api/api";
import classNames from "classnames"
// import { AppContext } from "../../App";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    repeatPassword: '',
    errors: {},
    submitting: false
  }

  onChange = e => {
    const name = e.target.name
    const value = e.target.value


    this.setState(prevState =>({
      [name]: value,
      errors: {               // для удаления ошибки во время набора в инпуте
        ...prevState.errors,  // копируем все что там было
        base: null,
        [name]: null
      }
    }));
  }

  handleBlur = (event) => {
    const errors = this.validateFields();

    const name = event.target.name
    if (errors[name]) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,       // копируем все что там было
            [name]: errors[name]
          }
        }));
    }
  }

  validateFields() {
    const errors = {};

    if (this.state.username === '') {
      errors.username = 'Not empty';
    }

    if (this.state.password.length < 6) {
      errors.password = "Must be 6 characters or more"
    }

    if (this.state.password !==  this.state.repeatPassword) {
      errors.repeatPassword = "Must be equal password"
    }

    return errors
  }

  onSubmit = async () => {
    this.setState({
      submitting: true
    });

    try {

      const data = await CallApi.get("/authentication/token/new")

      const result = await CallApi.post("/authentication/token/validate_with_login", {
        body: {
          username: this.state.username,
          password: this.state.password,
          request_token: data.request_token
        }
      })
      // const result = await fetchApi(
      //   `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     "headers": {
      //       "Content-type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       username: this.state.username,
      //       password: this.state.password,
      //       request_token: data.request_token
      //     })
      //   })

      const {session_id} = await CallApi.post("/authentication/session/new", {
        body: {
          request_token: result.request_token
        }
      })
      // const {session_id} = await fetchApi(
      //   `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     "headers": {
      //       "Content-type": "application/json"
      //     },
      //     body: JSON.stringify({                // объект превращаем в строку
      //       request_token: result.request_token
      //     })
      //   })

      this.props.updateSessionId(session_id)

      const user = await CallApi.get("/account", {
        params: {
          session_id
        }
      })
      // const user = await fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
      console.log('user.id =>', user.id)

      // const moviesFavorite = await CallApi.get(`/account/${user.id}/favorite/movies`, {
      //   params: {
      //     session_id
      //   }
      // })
      // console.log('moviesFavorite =>', moviesFavorite)

      this.setState(
        {
        submitting: false
        },
        () => {
          this.props.updateUser(user)
          console.log('user => ', user)
        }
      );

    } catch(error) {
      this.setState({
        submitting: false,
        errors: {
          base: error.status_message
        }
      })
      console.log('error => ', error)
    }
  }

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {  // если ошибок нет
      this.onSubmit()
    }
  }

  getClassForInput = key => (
    classNames("form-control", {
      "invalid" : this.state.errors[key]
    })
  )

  render() {
    const { username, password, repeatPassword, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              // className={errors.username ? "form-control invalid" : "form-control" }
              className={this.getClassForInput('username')}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className={this.getClassForInput('password')}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Повторите пароль</label>
            <input
              type="password"
              className={this.getClassForInput('repeatPassword')}
              id="repeatPassword"
              placeholder="Пароль"
              name="repeatPassword"
              value={repeatPassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatPassword && (
              <div className="invalid-feedback">{errors.repeatPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting }
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    )
  }
}

export default AppContextHOC(LoginForm)