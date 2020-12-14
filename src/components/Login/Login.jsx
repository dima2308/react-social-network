import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Input } from '../common/FormsControls/FormsControls'
import { login } from '../../redux/authReducer'
import { Redirect } from 'react-router-dom'

const Login = (props) => {
  const onSubmit = (formData) => {
    let email = formData.email
    let password = formData.password
    let rememberMe = formData.rememberMe
    let captcha = formData.captcha
    props.login(email, password, rememberMe, captcha)
  }

  if (props.isAuth) {
    return <Redirect to='/profile' />
  } else {
    return (
      <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha} />
      </div>
    )
  }
}

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Input} validate={[required]} name="email" placeholder="email" />
      <Field component={Input} type="password" validate={[required]} name="password" placeholder="Password" />
      <div>
        <Field component="input" name="rememberMe" type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me?</label>
      </div>
      { props.captcha ? <img src={props.captcha} alt="captcha" /> : null}
      { props.captcha ? <Field component={Input} validate={[required]} name="captcha" placeholder="Enter captcha" /> : null}
      
      { props.error && <div>{props.error}</div>}
      <button type="submit">Submit</button>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captcha: state.auth.captcha
})


export default connect(mapStateToProps, { login })(Login)