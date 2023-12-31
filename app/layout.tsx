import "./globals.css";
import type { Metadata } from "next";
import { Baloo_Bhai_2 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/model-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const bhai = Baloo_Bhai_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Converso",
  description:
    "This application shall be used for real time chatting and video calling.",
  manifest: "/manifest.json",
  icons: { apple: "/icon-192x192.png" },
  themeColor: "#1E1F22",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(bhai.className, "bg-white dark:bg-[#313338] ")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="realtime-chat-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
