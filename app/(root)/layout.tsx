import SideNav from "../components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full">
      <SideNav />
      {children}
    </main>
  );
}
