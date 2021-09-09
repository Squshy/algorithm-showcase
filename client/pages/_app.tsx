import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../contexts/SidebarContext";
import { PathfindingProvider } from "../contexts/PathfindingContext";
import { MobileNav } from "../components/nav/mobile/MobileNav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <PathfindingProvider>
      <MobileNav/>
        <div className={`font-sans antialiased`}>
          <Component {...pageProps} />
        </div>
      </PathfindingProvider>
    </SidebarProvider>
  );
}
export default MyApp;
