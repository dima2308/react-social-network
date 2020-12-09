import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li>
          <NavLink activeClassName={styles.activeLink} to="/profile">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.activeLink} to="/dialogs">
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.activeLink} to="/news">
            News
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.activeLink} to="/music">
            Music
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.activeLink} to="/users">
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar