import React from 'react'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = (value) => {
    this.setState({
      editMode: value
    })
    if (!value) {
      this.props.updateStatus(this.state.status)
    }
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        { !this.state.editMode &&
          <div>
            <span onDoubleClick={ () => this.activateEditMode(true) }>{this.props.status || '-----'}</span>
          </div>
        }

        { this.state.editMode === true &&
          <div>
            <input 
             autoFocus
             onChange={this.onStatusChange}
             onBlur={ () => this.activateEditMode(false) }
             value={this.state.status}></input>
          </div>
        } 
      </div>
    )
  }
}

export default ProfileStatus