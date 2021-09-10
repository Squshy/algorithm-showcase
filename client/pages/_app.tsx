import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../contexts/SidebarContext";
import { MobileNav } from "../components/nav/mobile/MobileNav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <MobileNav/>
        <div className={`font-sans antialiased`}>
          <Component {...pageProps} />
        </div>
    </SidebarProvider>
  );
}
export default MyApp;
