import {configureStore} from '@reduxjs/toolkit';
import todostate from './state/todostate';
export const store=configureStore({
    reducer:{todolist:todostate}
})