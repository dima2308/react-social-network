import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import avatar from '../../../assets/images/user.jpg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{props.profile.fullName}</div>
      <img src={props.profile.photos.small ? props.profile.photos.small : avatar}
        alt="avatar" width="240" height="320">
      </img>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
    </div>
  )
}

export default ProfileInfo