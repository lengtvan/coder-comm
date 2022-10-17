import React from "react";
import {Avatar, Box, Paper, Stack, Typography,IconButton} from "@mui/material";
import {fDate, fDateTime} from "../../utilities/formatTime";
import CommentReaction from "./CommentReaction"
import useAuth from"../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from"@mui/icons-material/MoreVert";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


function CommentCard({comment}){
    const {user}=useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const dispatch=useDispatch();

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
      };
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
    const handleDeleteComment=async()=>{
        try{
            dispatch(deleteComment({commentId:comment._id}))

        }
        catch(error){
            console.log(error)
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
            Delete Comment
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
                      <Button onClick={handleDeleteComment}>Yes</Button>
                      <Button onClick={()=>{handleCloseDeleteModal();handleProfileMenuClose();}}>No</Button>

                    </Box>
      </Modal>  
          </Menu>)

    return (
      <Stack direction="row" 
      spacing={2}
      >
        <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl}/>
        <Paper sx={{p:1.5, flexGrow:1, bgcolor:"background.neutral"}}>
            <Stack
            direction="row"
            alignItems={{sm:"center"}}
            justifyContent="space-between"
            sx={{mb:0.5}}
            >
                <Stack direction="column">
                     <Typography variant="subtitle2" sx="fontWeight:600">
                    {comment.author?.name}
                </Typography>
                <Typography
                variant="caption"
                sx={{color:"text.disabled"}}>
                    {fDate(comment.createdAt)}
                </Typography>
                </Stack>
               
                <IconButton>
                <MoreVertIcon sx={{fontSize:30}} onClick={handleProfileMenuOpen} />
                {comment.author._id===user._id&&
                   renderMenu
                }
               
                
      
            </IconButton>
            </Stack>
            <Typography
            variant="body2"
            sx={{color:"text.secondary"}}
            >
                {comment.content}
            </Typography>
            <Box
            sx={{display:"flex",
        justifyContent:"flex-end"}}
            >
                
                <CommentReaction comment={comment}/>
            </Box>
        </Paper>
      </Stack>
        
    )
}

export default CommentCard;