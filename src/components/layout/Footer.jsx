export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/95 py-4 text-slate-600">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-medium text-slate-700">© {currentYear} أكاديمية الأدهم. جميع الحقوق محفوظة.</p>
        <p className="text-slate-500">واجهة SaaS عربية حديثة مع تصميم متناسق وقابل للتوسع.</p>
      </div>
    </footer>
  );
}
