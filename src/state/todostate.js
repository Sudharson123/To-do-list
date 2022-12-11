import {createSlice} from '@reduxjs/toolkit';

const initialState={
    todo:[]
}

const list=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        
       del(state,action){
         state.todo.splice(action.payload,1)
        
       },
       
        todo(state,action){
            state.todo=[...state.todo,action.payload]
       
        },
        strike(state,action){
           state.todo[action.payload]={...state.todo[action.payload],line:"line-through"}
        },
        nostrike(state,action){
            state.todo[action.payload]={...state.todo[action.payload],line:""}

        },
        edit(state,action){
            state.todo[action.payload.index]={...state.todo[action.payload.index],task:action.payload.value}
        },
        editborder(state,action){
            state.todo[action.payload.index]={...state.todo[action.payload.index],bcolor:action.payload.color}
        }
        }
    
})
export const {todo,del,strike,nostrike,edit,editborder}=list.actions
export default list.reducer