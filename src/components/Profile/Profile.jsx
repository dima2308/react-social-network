import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import styles from './Profile.module.css'

const Profile = (props) => {
  return (
    <div className={styles.profile}>
      <ProfileInfo
        profile={props.profile.profile}
        status={props.profile.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile