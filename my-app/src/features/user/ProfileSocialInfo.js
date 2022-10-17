import React from 'react';
import {styled} from "@mui/material/styles"
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import {Link, Card, Typography, CardHeader,Stack, Box} from "@mui/material";
const IconStyle=styled(Box)(({theme})=>({
    width:20,
    height:20,
    marginTop:1,
    flexShrink:0,
    marginRight: theme.spacing(2)
}))
function ProfileSocialInfo({profile}){
    const {facebookLink,instagramLink,linkedinLink,twitterLink}=profile;
    const SOCIALS=[
        {
            name:"Linkedin",
            icon:(
                <IconStyle color="#006097">
                    <LinkedInIcon/>
                </IconStyle>
            ),
            href:linkedinLink,
        },
        {
            name:"Twitter",
            icon:(
                <IconStyle color="#006097">
                    <TwitterIcon/>
                </IconStyle>
            ),
            href:twitterLink,
        },
        {
            name:"Facebook",
            icon:(
                <IconStyle color="#006097">
                    <FacebookIcon/>
                </IconStyle>
            ),
            href: facebookLink,
        },
        {
            name:"Instagram",
            icon:(
                <IconStyle color="#006097">
                    <InstagramIcon/>
                </IconStyle>
            ),
            href: instagramLink,
        },

    ]
    return(
        <Card>
            <CardHeader title="Social"/>
            <Stack spacing={2} sx={{p:3}}>
                {SOCIALS.map((link)=>(
                    <Stack key={link.name} direction="row" alignItems="center">
                        {link.icon}
                        <Link component="span" variant="body2" color="text.primary" noWrap>
                        {link.href}
                        </Link>
                    </Stack>
                ))}
            </Stack>
        </Card>
    )
}
export default ProfileSocialInfo
