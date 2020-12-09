import { useEffect, useState } from 'react'

const ProfileStatusWithHooks = (props) => {
  let [ editMode, setEditMode ] = useState(false)
  let [ status, setStatus ] = useState(props.status)

  useEffect( () => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = (value) => {
    setEditMode(value)
    if (!value) {
      props.updateStatus(status)
    }
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      { !editMode &&
        <div>
          {<span onDoubleClick={() => activateEditMode(true)} >{props.status || '-----'}</span>}
        </div>
      }

      { editMode &&
        <div>
          <input
            autoFocus
            onChange={onStatusChange}
            onBlur={() => activateEditMode(false)}
            value={status}
             />
        </div>
      }
    </div>
  )
}

export default ProfileStatusWithHooks