import React from 'react'
import {
    alpha, createTheme, ThemeProvider as MUIThemeProvider
} from "@mui/material/styles"
import {CssBaseline} from "@mui/material"
function ThemeProvider({children}){
    const themeOptions={
        palette:{
            primary: {
                light: '#ffcccb',
                main: '#ef9a9a',
                dark: '#ba6b6c',
                contrastText: '#fff',
              },
              secondary: {
                light: '#4fb3bf',
                main: '#00838f',
                dark: '#005662',
                contrastText: '#000',
              },
        }
    }
    const theme=createTheme(themeOptions)
    return(
       <MUIThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
       </MUIThemeProvider>
    )
}
export default ThemeProvider