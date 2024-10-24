import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    seachProduct: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { seachProduct } = productSlide.actions

export default productSlide.reducer