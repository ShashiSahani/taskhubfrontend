import { configureStore } from "@reduxjs/toolkit";

import blogReducer from './blogSlice';
import taskReducer from './taskSlice';
import authReducer from './loginSlice';
import passwordReducer from './passwordSlice';
import newsletterReducer   from "./newsletterSlice";


export const store=configureStore({
    reducer:{
        blogs:blogReducer,
        tasks:taskReducer,
        auth:authReducer,
        password: passwordReducer,
        newsletter: newsletterReducer ,
    }
})