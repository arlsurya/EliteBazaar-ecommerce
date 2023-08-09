import {createSlice} from "@redux/toolkit"

export const initialState = {
    userDetails:{},
    isLoggedIn:false,
}


const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUserDetails: (state, actions) => {
        
      },
    }
  });


export const {setUserDetails} = UserSlice.actions;