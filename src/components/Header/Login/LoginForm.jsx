import React from "react";
import {API_KEY_3, API_URL, fetchApi} from "../../../api/api";

export default class LoginForm extends React.Component {
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
    // const errors = this.state.errors
    // let result = Object.keys(errors).reduce((total, key) =>{
    //   if (errors[key] !== null) {
    //     total[key] = errors[key]
    //   }
    //   return total
    // }, {})
    // this.setState({
    //   errors: result
    // });
    // console.log('result', result)
  }

  handleBlur = (event) => {
    const errors = this.validateFields(event.target.name);

    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,       // копируем все что там было
          ...errors                   // плюс новые
        }
      }));
    }
  }

  validateFields = (name) => {
    const errors = {};
    switch (name) {
      case 'username':
        if (this.state.username === '') {
          errors.username = 'Not empty';
        }
        break;
      case 'password':
        if (this.state.password.length < 6) {
          errors.password = "Must be 6 characters or more"
        }
        break;
      case 'repeatPassword':
        if (this.state.password !==  this.state.repeatPassword) {
          errors.repeatPassword = "Must be equal password"
        }
        break;
      default:
        break;
    }

    return errors;
  }

  validateFieldsSubmit() {
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
      const data = await fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)

      const result = await fetchApi(
        `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          "headers": {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          })
        })

      const {session_id} = await fetchApi(
        `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          "headers": {
            "Content-type": "application/json"
          },
          body: JSON.stringify({                // объект превращаем в строку
            request_token: result.request_token
          })
        })
      console.log('session_id => ', session_id)
      this.props.updateSessionId(session_id)

      const user = await fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
      this.props.updateUser(user)
      console.log('user => ', user)

      this.setState({
        submitting: false
      });

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
    const errors = this.validateFieldsSubmit();
    // console.log('Object.keys(errors).length =>', Object.keys(errors).length)
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

  render() {
    const { username, password, repeatPassword, errors, submitting } = this.state;
    // console.log('Object.keys(errors).length =>', Object.keys(errors).length)
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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