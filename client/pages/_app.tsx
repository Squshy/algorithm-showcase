import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../contexts/SidebarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <div className={`font-sans antialiased`}>
        <Component {...pageProps} />
      </div>
    </SidebarProvider>
  );
}
export default MyApp;
