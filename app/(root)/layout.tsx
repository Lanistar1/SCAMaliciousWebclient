import SideNav from "../components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex h-screen w-screen">
      <SideNav />
      {children}
    </main>
  );
}
