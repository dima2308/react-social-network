import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = (props) => {
  const logout = () => {
    props.logout()
  }

  console.log(props)

  return (
    <header className={styles.header}>
      <h1>Header</h1>
      <div className={styles.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
        <div>
          {props.isAuth ? <button onClick={logout}>Logout</button> : ''}
        </div>
      </div>
    </header>
  )
}

export default Header