import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import avatar from '../../../assets/images/user.jpg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import { useState } from 'react'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = (props) => {

  let [ editMode, setEditMode ] = useState(false)

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    let mockFormData = {...formData, aboutMe: 'aboutMe', lookingForAJobDescription: 'test' }
    props.saveProfile(mockFormData)
    setEditMode(false)
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

      { editMode && <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> }
      { !editMode && <ProfileData profile={props.profile} isOwner={props.isOwner} activateEditMode={() => setEditMode(true)} /> } 
      
    </div>
  )
}

const ProfileData = ({ profile, isOwner, activateEditMode }) => {
  return (
    <div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts)
          .map
          (key => <Contact
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key]} />
          )
        }
      </div>
      
      {!isOwner && <button onClick={() => activateEditMode()}>Edit</button>}

    </div>
  )
}

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
}

export default ProfileInfo