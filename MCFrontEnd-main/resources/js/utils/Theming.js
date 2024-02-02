import {createTheme} from "@mui/material";
import {appColors} from "./AppColors";

export const themeApp = createTheme({
    typography: {
        fontFamily: [
            'AbeeZee'
        ].join(','),
    },
    palette: {
        primary: {
            main: appColors.primary,
            contrastText: appColors.white,
        },
        secondary: {
            main: appColors.secondary,
        }
    }
});
