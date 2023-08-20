import { createSlice } from "@reduxjs/toolkit";
export let initialState = {
    userDetailsData:{},
    isLoggedIn:false,
    deviceToken:''
}


const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUserDetails: (state, actions) => {
        debugger
        return {
          ...state,
          userDetailsData:actions.payload.userDetails,
          deviceToken: actions.payload.token,
          isLoggedIn: true

        }
     
      },
      handleLogout: (state,actions) =>{
        state.isLoggedIn = false;
        state.userDetailsData = {}

      }
    }
  });


export const {setUserDetails, handleLogout} = UserSlice.actions;
export default UserSlice.reducer;