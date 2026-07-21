import "./globals.css";

export const metadata = {
  title: "أكاديمية الأدهم",
  description: "بوابة إدارة أكاديمية الأدهم",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}