import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../contexts/SidebarContext";
import { PathfindingProvider } from "../contexts/PathfindingContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <PathfindingProvider>
        <div className={`font-sans antialiased`}>
          <Component {...pageProps} />
        </div>
      </PathfindingProvider>
    </SidebarProvider>
  );
}
export default MyApp;
