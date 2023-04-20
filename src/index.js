import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './store/store'

import { TheLifeGame } from './compoonents/TheLifeGame/TheLifeGame'

const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <TheLifeGame />
    </Provider>
)

if (module.hot) {
    module.hot.accept()
}
