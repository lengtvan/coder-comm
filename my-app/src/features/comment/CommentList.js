import { Pagination,Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import CommentCard from "./CommentCard";
import {getComments} from "./commentSlice";
import LoadingScreen from "../../components/LoadingScreen";

function CommentList({postId}){
    const dispatch=useDispatch();
    const {commentsByPost, 
        commentsById,
        totalComments,
        isLoading,currentPage}=useSelector((state)=>({
    commentsByPost:state.comment.commentsByPost[postId],
    totalComments:state.comment.totalCommentsByPost[postId],
    currentPage:state.comment.currentPageByPost[postId],
    commentsById:state.comment.commentsById,
    isLoading:state.comment.isLoading,
}), shallowEqual);
const totalPages=Math.ceil(totalComments/3);

    useEffect(()=>{
        if(postId) dispatch(getComments({postId}))
        console.log("comments",postId)

    },[postId,dispatch]);
    let renderComments;
    if (commentsByPost){
        const comments=commentsByPost.map((commentId)=>commentsById[commentId])
        renderComments=(
            <Stack spacing={1.5}>
                {comments.map((comment)=>
                (<CommentCard key={comment._id} comment={comment}/>))}
            </Stack>
        );
    } else if (isLoading) {
        renderComments = 
        <LoadingScreen/>;
    }
    return(
       <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle" sx={{color:"text.secondary"}}>
                {totalComments>1
                ?`${totalComments} comments`
            : totalComments===1
            ?`${totalComments} comment`
            : "No comment"}
            </Typography>
            {totalComments>3 && (
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e,page)=>
                    dispatch(getComments({postId,page}))}/>
            )}
        </Stack>
        {renderComments}
       </Stack>
    )
}
export default CommentList;