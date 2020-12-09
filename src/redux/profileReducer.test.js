const { default: profileReducer, addPost, deletePost } = require("./profileReducer");

it('length of posts should be incremented', () => {
  // 1. Test data
  let action = addPost('test')
  let initialState = {
    posts: [
      { id: 1, message: "Hi, all is good", author: "Dima" },
      { id: 2, message: "How are you?", author: "Olya" },
      { id: 3, message: "What's up?", author: "Oleg" },
    ]
  }

  // 2. Action
  let newState = profileReducer(initialState, action)

  // 3. Expect result
  expect(newState.posts.length).toBe(4)
})

it('message of new post should be correct', () => {
  // 1. Test data
  let action = addPost('test')
  let initialState = {
    posts: [
      { id: 1, message: "Hi, all is good", author: "Dima" },
      { id: 2, message: "How are you?", author: "Olya" },
      { id: 3, message: "What's up?", author: "Oleg" },
    ]
  }

  // 2. Action
  let newState = profileReducer(initialState, action)

  // 3. Expect result
  expect(newState.posts[3].message).toBe('test')
})

it('after deleting length of messages should be decremented', () => {
  // 1. Test data
  let action = deletePost(3)
  let initialState = {
    posts: [
      { id: 1, message: "Hi, all is good", author: "Dima" },
      { id: 2, message: "How are you?", author: "Olya" },
      { id: 3, message: "What's up?", author: "Oleg" },
    ]
  }

  // 2. Action
  let newState = profileReducer(initialState, action)

  // 3. Expect result
  expect(newState.posts.length).toBe(2)
})