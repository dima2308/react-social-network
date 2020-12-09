const Post = (props) => {
  return (
    <div className="post">
      <p><b>{props.author}</b></p>
      <p>{props.message}</p>
    </div>
  )
}

export default Post