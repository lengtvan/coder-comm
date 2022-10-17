import React, { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Card, Stack, Avatar, Typography, CardHeader, IconButton, } from "@mui/material"
import Button from '@mui/material/Button';
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { fDate } from "../../utilities/formatTime"
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import PostReaction from "./PostReaction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../../hooks/useAuth";
import { Divider } from "@mui/material";
import Modal from '@mui/material/Modal';
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deletePost, editPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicModal from "../../components/DeleteConfirmation";


function PostCard({ post }) {
  const { user } = useAuth();

  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("author", post)
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = async () => {
    try {
      handleProfileMenuClose();
      dispatch(deletePost({ postId: post._id }))
    } catch (error) {
      console.error(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const defaultValues = {
    content: post.content,
    image: post.image,
  }

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        content: post.content,
        image: post.image,
      });
      console.log("hello VL", {
        content: post.content,
        image: post.image,
      })
    }
  }, [formState, reset]);

  const onSubmit = async ({ content, image }) => {

    await dispatch(editPost({ content, image, postId: post._id, postAuthor: post.author }))

    handleClose();

  }
  console.log("edit post", post)
  const fileInput = useRef()
  const handleFile = (e) => {
    const file = fileInput.current.files[0]
    if (file) {
      setValue("image", file)
    }
  }
  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
    >

      <MenuItem
        onClick={handleOpenDeleteModal}
        sx={{ mx: 1 }}
      >
        Delete Post
      </MenuItem>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this ?
          </Typography>
          <Button onClick={handleDeletePost}>Yes</Button>
          <Button onClick={handleCloseDeleteModal}>No</Button>

        </Box>
      </Modal>
      <Divider sx={{ boderyStyle: "dashed" }}></Divider>
      <MenuItem onClick={handleOpen} sx={{ mx: 1 }}>
        Edit Post
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit Post"
        aria-describedby="Edit Post"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Post
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                name="content"
                multiline
                fullWidth
                rows={4}
                // placeholder={post.content}
                sx={{
                  "& fieldset": {
                    borderWidth: '1px !important',

                  }
                }} />
              {/* <FTextField name="image" placeholder="image"></FTextField>        */}
              <input type="file" ref={fileInput} onChange={handleFile} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end"
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
        </Box>
      </Modal>

    </Menu>
  );
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >{post?.author?.name}</Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}>
            {fDate(post.createdAt)}</Typography>}
        action={
          <IconButton>
            <MoreVertIcon sx={{ fontSize: 30 }} onClick={handleProfileMenuOpen} />
            {post.author._id === user._id &&
              renderMenu
            }



          </IconButton>
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 }
            }}>
            <img src={post.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>

    </Card>

  )
}
export default PostCard;