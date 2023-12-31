import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { user } from '../../types/user';

import {
  createNewUserAsync,
  getAllUsersAsync,
  updateUserAsync,
  loginUserAsync,
  authenticateUserAsync,
} from '../thunks/userThunk';

type userStateType = {
  users: user[];
  currentUser?: user;
  loading: boolean;
  error?: string;
};

const initialState: userStateType = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = undefined;
    },
  },

  extraReducers: (builder) => {
    /*LOGIN USER USING LOGIN CREDENTIAL */

    builder.addCase(loginUserAsync.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = '';
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser = undefined;
    });

    /*FETCHING USER USING ACCESS TOKEN */

    builder.addCase(authenticateUserAsync.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(authenticateUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = '';
    });
    builder.addCase(authenticateUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.error = '';
    });

    /* GET ALL USER REDUCER */

    builder.addCase(getAllUsersAsync.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });

    builder.addCase(getAllUsersAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /* CREATE A USER REDUCER */

    builder.addCase(createNewUserAsync.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(createNewUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.users = [...state.users, action.payload];
      state.currentUser = action.payload;
      state.error = '';
    });

    builder.addCase(createNewUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /* UPDATE USER REDUCER */

    builder.addCase(updateUserAsync.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      updateUserAsync.fulfilled,
      (state, action: PayloadAction<user>) => {
        const updatedUser = action.payload;

        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.currentUser = action.payload;
        state.loading = false;
        state.error = '';
      }
    );

    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const userReducer = userSlice.reducer;
export const { logOut } = userSlice.actions;
export default userReducer;
