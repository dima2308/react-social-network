import React from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './Dialog/DialogItem'
import MessageItem from './Message/MessageItem'
import { reduxForm, Field } from 'redux-form'
import { Textarea } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/validators'

const maxLength = maxLengthCreator(50)

const Dialogs = (props) => {
  let dialogsElements = props.messages.dialogs
    .map(d => <DialogItem id={d.id} name={d.name} key={d.id} />)

  let messagesElements = props.messages.messages
    .map(m => <MessageItem message={m.message} key={m.id} />)

  let addMessage = (formData) => {
    props.addMessage(formData.message)
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsElements}
      </div>

      <div className={styles.messages}>
        {messagesElements}
      </div>

      <MessagesReduxForm onSubmit={addMessage} />
    </div>
  )
}

const MessagesForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name="message" validate={[required, maxLength]} placeholder="message" />
      <button type="submit">Add</button>
    </form>
  )
}

const MessagesReduxForm = reduxForm({
  form: 'messages'
})(MessagesForm)

export default Dialogs