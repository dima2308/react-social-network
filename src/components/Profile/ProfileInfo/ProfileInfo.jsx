import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import avatar from '../../../assets/images/user.jpg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
  console.log(props)
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{props.profile.fullName}</div>
      <img src={props.profile.photos.small ? props.profile.photos.small : avatar}
        alt="avatar" width="240" height="320">
      </img>
      { !props.isOwner && <input onChange={onMainPhotoSelected} type="file"></input>}
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
    </div>
  )
}

export default ProfileInfo