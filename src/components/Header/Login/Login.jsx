import React from "react"
// import { API_URL, API_KEY_3 } from "../../../api/api";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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

  componentDidMount() {
    if (!cookies.get("session_id")) {
      this.setState({
        showModal: true
      })
    }
  }

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
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}