import { connect } from 'react-redux'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import { addMessage } from '../../redux/messagesReducer'
import Dialogs from './Dialogs'

let mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default compose(
  connect(mapStateToProps, { addMessage }),
  WithAuthRedirect
)
  (Dialogs)