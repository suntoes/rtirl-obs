import { createTheme } from "@mui/material/styles";
import OskariBook from "../fonts/OskariG2-Book.ttf";
import OskariSemiBold from "../fonts/OskariG2-SemiBold.ttf";

const editorTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#262626",
      contrastText: "white",
    },
    secondary: {
      main: "#262626",
      text: "white",
      contrastText: "white",
    },
    background: {
      default: "black",
      contrastText: "white",
    },
    error: {
      main: "rgba(255, 68, 68, 0.4)",
    },
    text: {
      primary: "rgba(246, 243, 237, 1)",
    },
  },
  typography: {
    fontFamily: "Oskari G2, Arial",
    allVariants: {
      color: "rgba(246, 243, 237, 0.8)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Oskari G2';
          src: url(${OskariBook});
        }

        @font-face {
          font-family: 'Oskari G2 SemiBold';
          src: url(${OskariSemiBold});
        }
      `,
    },
  },
});

export default editorTheme;
