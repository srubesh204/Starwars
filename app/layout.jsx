"use client"
import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import Nav from "./components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgGradient: "linear(to-r, #2d2d2d, #3a0d0d, #520101)",
        color: "white",
      },
    },
  },
});



const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Nav />
         <main>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
         </main>
        </body>
    </html>
  )
}

export default RootLayout