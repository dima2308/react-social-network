import { connect } from 'react-redux'
import { addPost } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'


let mapStateToProps = (state) => {
  return {
    posts: state.profile.posts
  }
}

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts)

export default MyPostsContainer