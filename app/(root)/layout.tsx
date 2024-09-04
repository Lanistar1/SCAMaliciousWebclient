import SideNav from "../components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-screen">
      <SideNav />
      {children}
    </main>
  );
}
