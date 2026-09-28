import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/ui/ConsentBanner";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { Analytics } from "@/components/ui/Analytics";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ScrollProgress />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <ConsentBanner />
      <Analytics />
    </>
  );
}
