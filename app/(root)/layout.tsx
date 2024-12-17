import SideNav from "../components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex h-screen w-screen overflow-hidden">
      <SideNav />
      <div className="flex-1 overflow-auto max-w-full">
        <div className="w-full h-full overflow-x-hidden">{children}</div>
      </div>
    </main>
  );
}
