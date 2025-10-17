import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import Navigation from "@/components/navigation";
import StoreProvider from "@/components/store-provider";
import ThemeProvider from "@/components/theme-provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoice Management System",
  description: "A comprehensive invoice management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <main>
              <Navigation />
              <Container
                maxWidth="lg"
                sx={{
                  py: { xs: 2, sm: 3, md: 4 },
                  px: { xs: 2, sm: 3, md: 3 },
                }}
              >
                <StoreProvider>{children}</StoreProvider>
              </Container>
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
