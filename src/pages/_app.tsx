import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/CartProvider";
import { NextComponentType, NextPageContext } from "next";
import { UserProvider } from "@/contexts/UserProvider";
import { MessagesProvider } from "@/contexts/ChatMessagesProvider";
import { useEffect } from "react";
import { appWithTranslation } from "next-i18next";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
});

type CustomComponentType<P = {}, IP = P> = NextComponentType<
  NextPageContext,
  IP,
  P
> & {
  getLayout?: (page: JSX.Element) => JSX.Element;
};

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const getLayout =
    (Component as CustomComponentType).getLayout ?? ((page) => page);
  const theme = createTheme({
    typography: {
      fontFamily: "inherit",
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.color === "secondary"
              ? {
                  border: "1px solid #BDBDBD",
                  color: "#000",
                  "&:hover": {
                    border: "1px solid #BDBDBD",
                  },
                }
              : ownerState.color === "primary"
              ? {
                  backgroundColor: "#A71653",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#A71653",
                  },
                }
              : ownerState.color === "info" && {
                  backgroundColor: "#2D005E",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#2D005E",
                  },
                }),
          }),
        },
      },
    },
  });

  return (
    <main className={montserrat.className}>
      {" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MessagesProvider>
          <UserProvider>
            <SessionProvider session={session}>
              <CartProvider>
                {getLayout(<Component {...pageProps} />)}
              </CartProvider>
            </SessionProvider>
          </UserProvider>
        </MessagesProvider>
      </ThemeProvider>
    </main>
  );
}

export default appWithTranslation(App);
