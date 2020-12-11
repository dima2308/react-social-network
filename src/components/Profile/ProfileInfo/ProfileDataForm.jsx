import { Field, reduxForm } from 'redux-form'
import { required } from '../../../utils/validators/validators'
import { Input } from '../../common/FormsControls/FormsControls'

const ProfileDataForm = ({ handleSubmit, profile }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Save</button>

      <div>
        <b>Full name</b>: <Field component={Input} name="fullName" validate={[required]} />
      </div>

      {Object.keys(profile.contacts)
        .map
        (key => {
          return (
          <div key={key}>
            <b>{key}: <Field component={Input} name={`contacts.${key}`} validate={[required]} /></b>
          </div>
          )
        }
        )
      }

    </form>
  )
}

const ProfileDataReduxForm = reduxForm({
  form: 'profileData'
})(ProfileDataForm)

export default ProfileDataReduxForm