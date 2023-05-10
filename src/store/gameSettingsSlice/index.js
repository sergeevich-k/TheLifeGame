import { combineReducers } from 'redux'
import survivalConditionsSlice from '../ConditionsSlice/survivalConditionsSlice'
import revivalConditionsSlice from '../ConditionsSlice/revivalConditionsSlice'

export default combineReducers({
    [survivalConditionsSlice.name]: survivalConditionsSlice.reducer,
    [revivalConditionsSlice.name]: revivalConditionsSlice.reducer
})
