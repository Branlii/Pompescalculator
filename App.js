import * as React from 'react';
import HomeNavigation from './navigation/HomeNavigation';
import store from './store/store';
import { Provider } from 'react-redux';

export default function App() {
    return (
        <Provider store={store}>
            <HomeNavigation />
        </Provider>
    );
}