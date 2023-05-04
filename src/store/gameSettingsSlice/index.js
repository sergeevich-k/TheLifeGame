import { combineReducers } from 'redux'
import survivalConditionsSlice from '../ConditionsSlice/survivalConditionsSlice'
import revivalConditionsSlice from '../ConditionsSlice/revivalConditionsSlice'
import shouldShowNumberOfAliveNeighborsSlice from './shouldShowSlice'

export default combineReducers({
    [survivalConditionsSlice.name]: survivalConditionsSlice.reducer,
    [revivalConditionsSlice.name]: revivalConditionsSlice.reducer,
    [shouldShowNumberOfAliveNeighborsSlice.name]:
        shouldShowNumberOfAliveNeighborsSlice.reducer
})
