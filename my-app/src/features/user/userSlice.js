import {createSlice} from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import {toast} from "react-toastify"

const initialState={
    isLoading:false,
    error:null,
    updatedProfile:null,
    selectedUser:null,
}

const slice= createSlice({
    name:"user",
    initialState,
    reducers:{
        startLoading(state){
            state.isLoading=true;
        },
        hasError(state,action){
            state.isLoading=false;
            state.error=null;
            state.selectedUser=action.payload;
        },
        getUserSuccess(state,action){
            state.isLoading=false;
            state.error=null;
            state.selectedUser=action.payload;
            console.log("selectedUser", action.payload)
        },
        updateUserProfileSuccess(state,action){
            state.isLoading=false;
            state.error=null;
            state.updatedProfile=action.payload;
            
        }
    },
})
export const getUser=(id)=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try{
        const response=await apiService.get(`/users/${id}`);
        dispatch(slice.actions.getUserSuccess(response.data.data))
    }
    catch(error)
    {
        dispatch(slice.actions.hasError(error.message))
        toast.error(error.message)
    }
}
export const updateUserProfile=({userId,name,coverUrl,
    aboutMe,city,country,
    company,jobTitle,facebookLink,instagramLink,linkedinLink,twitterLink})=>
async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try{
        const data={
            userId,name,coverUrl,
            aboutMe,city,country,
            company,jobTitle,
            facebookLink,
            instagramLink,
            linkedinLink,
            twitterLink}
            const response=await apiService.put(`/users/${userId}`,data);
            dispatch(slice.actions.updateUserProfileSuccess(response.data));
    }
    catch(error){
            dispatch(slice.actions.hasError(error.message))
    }
}
export default slice.reducer;