import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define proper types for better type safety
interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  role: string;
  isVerified: boolean;
  courses: any[];
  // Add other user properties as needed
}

interface AuthState {
  token: string;
  user: User | null; // ✅ Changed from string to User | null
}

const initialState: AuthState = {
  token: "",
  user: null, // ✅ Changed from "" to null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }> // ✅ Changed user type
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = null; // ✅ Changed from "" to null
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;