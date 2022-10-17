import {createSlice} from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { cloudinaryUpload } from "../../utilities/cloudinary";

const initialState={
    isLoading:false,
    error:null,
    postsById:{},
    currentPagePosts:[]
}
  
const slice= createSlice({
    name:"post",
    initialState,
    reducers:{
        startLoading(state){
            state.isLoading=true;
        },
        hasError(state,action){
            state.isLoading=false;
            state.error=action.payload;
        },
        createPostSuccess(state,action){
            state.isLoading=false;
            state.error=null
            const newPost=action.payload;
            if (state.currentPagePosts.length%2===0)
            state.currentPagePosts.pop();
            state.postsById[newPost._id]=newPost;
            state.currentPagePosts.unshift(newPost._id)

        },
        getPostSuccess(state,action){
            state.isLoading=false;
            state.error=null;
            const {count,posts}=action.payload;
            posts.forEach(post=>{
                state.postsById[post._id]=post;
                if (!state.currentPagePosts.includes(post._id))
                state.currentPagePosts.push(post._id);
            })
            
            state.totalPosts=count;
            
        },
        sendPostReactionSuccess(state,action){
            
            state.isLoading=false;
            state.error=null;
            const {postId,reactions}=action.payload;
            console.log("post reaction",action.payload)

            state.postsById[postId].reactions=reactions;
        },
        resetPosts(state,action){
            state.postsById={};
            state.currentPagePosts=[]
        },
        deletePostSuccess(state,action){
            state.isLoading=false;
            state.error=null;
            const deletedPost=action.payload;
            state.postsById[deletedPost._id]="";
            state.currentPagePosts.shift(deletedPost._id)
        },
        editPostSuccess(state,action){
            state.isLoading=false;
            state.error=null;
            const {postAuthor,_id,content,image}=action.payload
            state.postsById[_id].author=postAuthor;
            state.postsById[_id].content=content;
            state.postsById[_id].image=image;


            

            
        }
        
    }
});
export const editPost=({content,image,postId,postAuthor})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
        
        const response=await apiService.put(`/posts/${postId}`,{content,image}); 
        dispatch(slice.actions.editPostSuccess({...response.data.data,postAuthor}))
    }
    catch(
        error
    ){
        dispatch(slice.actions.hasError(error.message))
    }
}
export const deletePost=({postId})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try {
        const response=await apiService.delete(`/posts/${postId}`); 
        dispatch(slice.actions.deletePostSuccess(response.data.data))
    }
    catch(
        error
    ){
        dispatch(slice.actions.hasError(error.message))
    }
}
export const createPost=({content,image})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try{
        const imageUrl=await cloudinaryUpload(image)
        const response= await apiService.post(`/posts`,{
            content,
            image:imageUrl,
        });
        dispatch(slice.actions.createPostSuccess(response.data.data));
    }
    
    catch(error){
        dispatch(slice.actions.hasError(error.message))
    }
}

export const getPosts=({userId,page,limit=2})=>
    async(dispatch)=>{
        dispatch(slice.actions.startLoading());
        try{
            const params={page,limit}
            
            const response=await apiService.get(`/posts/user/${userId}`,
              {params});
            if (page===1) dispatch(slice.actions.resetPosts())

            dispatch(slice.actions.getPostSuccess(response.data.data));
        
        }
            
        catch(error){
            dispatch(slice.actions.hasError(error.message))
        }
    
}
export const sendPostReaction=({postId,emoji})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try{
        const response=await apiService.post(`/reactions`,{
            targetType:"Post",
            targetId:postId,
            emoji
        })
        dispatch(slice.actions.sendPostReactionSuccess({
            postId,reactions:response.data.data,
        }))
       
    }
    catch(error){
        dispatch(slice.actions.hasError(error.message))
    }
}
export default slice.reducer;