import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../contexts/SidebarContext";
import { MobileNav } from "../components/nav/mobile/MobileNav";
import { SortingProvider } from "../contexts/SortingContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <SortingProvider>
        <MobileNav />
        <div className={`font-sans antialiased`}>
          <Component {...pageProps} />
        </div>
      </SortingProvider>
    </SidebarProvider>
  );
}
export default MyApp;
