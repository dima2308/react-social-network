import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { getUserProfile, getUserStatus, updateUserStatus } from '../../redux/profileReducer'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'


class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.userLogined
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }

  render() {
    return <Profile
      {...this.props}
      profile={this.props.profile}
      updateStatus={this.props.updateUserStatus} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  userLogined: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  WithAuthRedirect
)
  (ProfileContainer)