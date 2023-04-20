import { configureStore } from '@reduxjs/toolkit'

import boardReducer from './boardSlice/boardSlice'
import conditionsReducer from './gameSettingsSlice'

export default configureStore({
    reducer: {
        board: boardReducer,
        gameSettings: conditionsReducer,
    },
})
