import { LoadingButton } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import PostCard from "./PostCard";
import {getPosts} from "./postSlice";
import {Box, Typography} from "@mui/material"
function PostList({userId}){
    const [page,setPage]=useState(1);
    const {currentPagePosts,postsById, totalPosts, isLoading}=useSelector(state=>state.post);
    const posts=currentPagePosts.map((postId)=>postsById[postId])
    console.log("post list", posts)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPosts({userId,page}))
    },[userId,page,dispatch])
    return(
        <>
         <div>
        {posts.map(post=>
            (<PostCard key={post._id} post={post}/>))}
           <Box sx={{display:"flex", justifyContent:"center"}}>
             </Box>
            {totalPosts ? 
            (<LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={()=>setPage((page)=>(page+1))}
            >Load more</LoadingButton>):(<Typography variant="h6">No Posts Yet</Typography>)}
       </div>
        </>
       
    )
}
export default PostList
