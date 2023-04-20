import { combineReducers } from 'redux'
import survivingConditionsSlice from '../ConditionsSlice/survivingConditionsSlice'
import creationConditionsSlice from '../ConditionsSlice/creationConditionsSlice'
import shouldShowNumberOfAliveNeighborsSlice from './shouldShowSlice'

export default combineReducers({
    [survivingConditionsSlice.name]: survivingConditionsSlice.reducer,
    [creationConditionsSlice.name]: creationConditionsSlice.reducer,
    [shouldShowNumberOfAliveNeighborsSlice.name]:
        shouldShowNumberOfAliveNeighborsSlice.reducer,
})
