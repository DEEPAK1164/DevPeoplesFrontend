import {createSlice} from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
      
    },
    removeUser: (state) => {
      return null
    },
    logoutUser(state) {
      return null;
    },
  },
});

export const {addUser, removeUser,logoutUser } = userSlice.actions;
export default userSlice.reducer;

// This code defines a Redux slice for managing user state in a React application.
// The `userSlice` contains an initial state of `null`, indicating no user is logged in by default.
// It provides two reducers: `addUser` to set the user state with the payload (user data),
// and `removeUser` to reset the user state to `null`, effectively logging out the user.
// The `addUser` reducer updates the state with the user data passed in the action payload,
// while the `removeUser` reducer clears the user state.
// The slice is exported with its actions (`addUser` and `removeUser`) and the reducer itself,
// allowing it to be used in the Redux store configuration and dispatched in components.
// This slice can be integrated into a Redux store to manage user authentication state across the application.