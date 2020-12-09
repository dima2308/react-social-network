import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { getAllUsers, getCurrentPage, getIsFetching, getisFollowing, getPageSize, getTotalUsersCount } from '../../redux/usersSelectors'
const { getUsers, followToggle, toggleIsFetching, toggleIsFollowing, setFollowOrUnfollow } = require("../../redux/usersReducer")


class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        isFollowing={this.props.isFollowing}
        setFollowOrUnfollow={this.props.setFollowOrUnfollow} />
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    users: getAllUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowing: getisFollowing(state)
  }
}

export default connect(mapStateToProps, {
  getUsers, followToggle, toggleIsFetching, toggleIsFollowing, setFollowOrUnfollow
})(UsersContainer)