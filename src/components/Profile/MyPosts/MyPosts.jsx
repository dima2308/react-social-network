import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import { maxLengthCreator, required } from './../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'

const maxLength = maxLengthCreator(10)

const MyPosts = React.memo(props => {

  let postsElements = props.posts
    .map(p => <Post message={p.message} author={p.author} key={p.id} />)

  let addPost = (formData) => {
    props.addPost(formData.post)
    formData.post = ''
  }

  return (
    <div className={styles.posts}>
      { postsElements}
      <PostFormRedux onSubmit={addPost} />
    </div>
  )
})

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name="post" placeholder="Text" validate={[required, maxLength]} />
      <button>Add post</button>
    </form>
  )
}

const PostFormRedux = reduxForm({
  form: "post"
})(PostForm)

export default MyPosts