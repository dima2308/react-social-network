import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/images/user.jpg'
import Pagination from "react-js-pagination";

const Users = (props) => {
  let updateFollow = (id) => {
    props.setFollowOrUnfollow(id)
  }

  return (
    <div>
      <Pagination activePage={props.currentPage}
        itemsCountPerPage={props.pageSize}
        totalItemsCount={props.totalUsersCount}
        pageRangeDisplayed={5}
        onChange={props.onPageChanged}
      />

      {
        props.users.map(u =>
          <div key={u.id}>
            <div>
              {u.followed ?
                <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => updateFollow(u.id)}>Unfollow</button> :
                <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => updateFollow(u.id)}>Follow</button>
              }
            </div>
            <div>
              <p>{u.name}</p>
              <p>{u.status}</p>
              <NavLink to={'/profile/' + u.id}>
                <img width="80" height="60" alt="avatar"
                  src={u.photos.small != null ? u.photos.small : userPhoto}>
                </img>
              </NavLink>
            </div>
          </div>)
      }
    </div>
  )
}

export default Users