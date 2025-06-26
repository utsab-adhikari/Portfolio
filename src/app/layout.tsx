import { AppSidebar } from "@/mycomponents/AppSidebar";
import "./globals.css";
import Footer from "@/mycomponents/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
            <AppSidebar>{children}</AppSidebar>
        <div className="">
          <main className="">
            <Toaster position="top-right" reverseOrder={false} />
          </main>
        </div>
      </body>
    </html>
  );
}
