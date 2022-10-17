import React from 'react';
import {Chip} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded"

export default function FriendStatus({currentUserId,targetUserId, friendship,sx}
){
    if (currentUserId===targetUserId) return null;
    if (!friendship) return null;
    if (friendship.status==="accepted"){
        return (
            <Chip
            sx={{...sx}}
            icon={<CheckCircleOutlineRoundedIcon/>}
            label="Friend"
            color="success"
            />
        )
    }
    if (friendship.status==="declined"){
        return (
            <Chip
            sx={{...sx}}
            icon={<DoNotDisturbAltRoundedIcon/>}
            label="Declined"
            color="error"
            />
        )
    }
    if  (friendship.status==="pending"){
        const {from,to}=friendship;
        if (from===currentUserId && to===targetUserId){
            return (
                <Chip
                sx={{...sx}}
                icon={<MarkEmailReadRoundedIcon/>}
                label="Waiting for response"
                color="warning"

                />
            )
        }
    }
}