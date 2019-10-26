import React from "react"
// import { API_URL, API_KEY_3 } from "../../../api/api";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm"
import AppContextHOC from "../../HOC/AppContextHOC";


// `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
// `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
// `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`

class Login extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     showModal: false
  //   };
  // }
  //
  // toggleModal = () => {
  //   this.setState(prevState => ({
  //     showModal: !prevState.showModal
  //   }));
  //
  // }
  //
  // componentDidMount() {
  //   if (!cookies.get("session_id")) {
  //     this.setState({
  //       showModal: true
  //     })
  //   }
  // }

  render() {
    const {showLoginModal, toggleLoginModal} = this.props
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginModal}
        >
          Login
        </button>
        <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default AppContextHOC(Login)