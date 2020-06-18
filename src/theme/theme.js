import { createMuiTheme } from "@material-ui/core/styles";

const raleway = {
  fontFamily: "Raleway",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: "https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap",
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};

const primaryColor = "#CC444B";
const secondaryColor = "#FFC885";
const grey = "#E5E5E5";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor
    },
    default: {
      grey: grey
    }
  },
  typography: {
    fontFamily: "Raleway, Arial"
  },
  overrides: {
    MuiAvatar: {
      circle: {
        backgroundColor: primaryColor
      }
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": [raleway]
      }
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#FFDAAD"
        },
        "&:focus": {
          backgroundColor: "#FFDAAD",
          "&:hover": {
            backgroundColor: "#FFDAAD"
          }
        },
        "&$selected": {
          backgroundColor: "#FFDAAD"
        }
      }
    }
  }
});

export default theme;
