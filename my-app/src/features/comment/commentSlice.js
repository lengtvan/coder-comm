import {createSlice} from "@reduxjs/toolkit"
import apiService from "../../app/apiService"

const initialState={
    isLoading:false,
    error:null,
    commentsById:{},
    commentsByPost:{
    },
    currentPageByPost:{},
    totalCommentsByPost:{}
}

const slice= createSlice({
    name:"comment",
    initialState,
    reducers:{
        startLoading(state){
            state.isLoading=true;
        },
        hasError(state,action){
            state.isLoading=false;
            state.error=action.payload;
        },
        createCommentSuccess(state,action){
            state.isLoading=false;
            state.error=null;
        },
        getCommentSuccess(state,action){
            console.log("ahihi")
            state.isLoading=false;
            state.error=null;
            console.log("get comment", action.payload);
            const {postId,comments,count,page}=action.payload;
            comments.forEach((comment)=>(state.commentsById[comment._id]=comment))
            state.commentsByPost[postId]=comments
            .map((comment)=>comment._id)
            .reverse();
            state.totalCommentsByPost[postId]=count;
            state.currentPageByPost[postId]=page;
            console.log(count)
        },
       sendCommentReactionSuccess(state,action){
        state.isLoading=false;
        state.error=null;
        const {commentId,reactions}=action.payload;
        state.commentsById[commentId].reactions=reactions;
       },
       deleteCommentSuccess(state,action){
        state.isLoading=false;
        state.error=null;
        const commentId=action.payload._id;
        const postId=action.payload.post
        state.commentsById[commentId]="";
        state.commentsByPost[postId].shift(commentId);
        state.totalCommentsByPost[postId]=  state.totalCommentsByPost[postId]-1;
       }
},
});

export default slice.reducer;
export const deleteComment=({commentId})=>
async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try{
        const response= await apiService.delete(`comments/${commentId}`)
        dispatch(slice.actions.deleteCommentSuccess(response.data.data))
        console.log("comment deleted",response.data.data)
    }
    catch(error){
        slice.actions.hasError(error.message)
    }
}
export const createComment=({postId,content})=>
async(dispatch)=>{
dispatch(slice.actions.startLoading());
try{
    const response=await apiService.post("/comments",{
        content,
        postId,
    })
    dispatch(slice.actions.createCommentSuccess(response.data));
    dispatch(getComments({postId}))
}
catch(error){
dispatch(slice.actions.hasError(error.message))
}
}

export const getComments=
({postId,page = 1, limit = 3})=>
async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try{
        const params=
        {page:page,
            limit:limit};
         console.log("hum")
         const response=await apiService.get(`/posts/${postId}/comments`,{params})
         console.log("okay")   
        dispatch(slice.actions.getCommentSuccess(
           {...response.data.data,postId,page}))
       
    }
    catch(error){
        dispatch(slice.actions.hasError(error.message))
    }
}

export const sendCommentReaction=({commentId,emoji})=>
async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try{
        const response=await apiService.post(`Reactions`,{
            targetType:"Comment",
            targetId:commentId,
            emoji,
        });
        dispatch(
            slice.actions.sendCommentReactionSuccess({
                commentId,
                reactions:response.data.data
            })
        )

    }
    catch(error)
    {
        dispatch(slice.actions.hasError(error.message))
    }
}