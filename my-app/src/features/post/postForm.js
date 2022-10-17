import React from 'react';
import {FormProvider, FTextField} from "../../components/form";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { alpha, Box, Stack, Card } from '@mui/material';
import {LoadingButton} from "@mui/lab"
import { createPost } from './postSlice';
import {useDispatch} from "react-redux"
import { useRef } from 'react';
const yupSchema=Yup.object().shape({
    content:Yup.string().required("Content is required")
})
const defaultValues={
    content:"",
    image:null,
}


function PostForm(){
    const dispatch=useDispatch();
    const onSubmit=(data)=>{
    dispatch(createPost(data)).then(()=>reset())
};

const methods=useForm({
        resolver:yupResolver(yupSchema),
        defaultValues,
    });
    const {
    handleSubmit,
    reset,
    setValue,
    formState:{isSubmitting},
}=methods;
const fileInput=useRef()
const handleFile=(e)=>{
    const file=fileInput.current.files[0]
    if(file){
        setValue("image",file)
    }
}
    return(
       <Card sx={{p:3}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <FTextField 
                name="content"
                multiline
                fullWidth
                rows={4}
                placeholder="Share what you are thinking here..."
                sx={{
                    "& fieldset":{
                        borderWidth: '1px !important',
                        
                    }
                }}/>
                 {/* <FTextField name="image" placeholder="image"></FTextField>        */}
                <input type="file" ref={fileInput} onChange={handleFile}/>
                <Box
                sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"flex-end"
                }}
                >
                    <LoadingButton
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={isSubmitting}
                    >Post</LoadingButton>
                </Box>
            </Stack>
        </FormProvider>
       </Card> 
    )
}
export default PostForm
