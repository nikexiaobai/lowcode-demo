import { createSlice } from '@reduxjs/toolkit'
const INIT_STATE = {
    title: '',
    desc: '',
    js: '',
    css: '',
}

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: INIT_STATE,
    reducers: {
        resetPageInfo: (state, action) => {
            return action.payload
        },
        changePageTitle: (state, action) => {
            state.title = action.payload
        }
    }
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
