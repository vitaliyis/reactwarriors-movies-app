import React from "react";
// import { AppContext } from "../App";
import AppContextHOC from "../HOC/AppContextHOC"
import UserMenu from "./UserMenu"

class User extends React.Component {
  render() {
    const {user} = this.props
    return (
      <UserMenu user={user}/>
    )
  }
}

export default AppContextHOC(User)