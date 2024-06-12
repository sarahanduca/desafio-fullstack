import { Container } from "@/package/components/container";
import { Header } from "@/package/components/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <Header />
      <div>{children}</div>
    </Container>
  );
}
