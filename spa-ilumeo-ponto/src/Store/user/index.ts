import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'user',
  initialState: {
    userCode: localStorage.getItem('user-code')?.trim() || '',
  },
  reducers: {
    setUserCode(state, action) {
      state.userCode = action.payload?.trim() ?? '';
      localStorage.setItem('user-code', action.payload?.trim() ?? '');
    },

    resetUserCode(state) {
      localStorage.removeItem('user-code');
      state.userCode = '';
    },
  },
});

export const { setUserCode, resetUserCode } = slice.actions;
export default slice.reducer;
