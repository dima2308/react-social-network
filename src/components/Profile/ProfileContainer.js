import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto } from '../../redux/profileReducer'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'


class ProfileContainer extends React.Component {
  refreshProfile() {
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
  
  componentDidMount() {
    this.refreshProfile() 
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return <Profile
      {...this.props}
      isOwner={!!this.props.match.params.userId}
      profile={this.props.profile}
      updateStatus={this.props.updateUserStatus}
      savePhoto={this.props.savePhoto} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  userLogined: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto }),
  withRouter,
  WithAuthRedirect
)
  (ProfileContainer)