import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/authReducer'

class HeaderContainer extends React.Component {
  logout = () => {
    console.log(this.props)
    this.props.logout()
  }

  render() {
    return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.logout} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect(mapStateToProps, { logout })(HeaderContainer)