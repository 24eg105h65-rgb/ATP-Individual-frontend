function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 MovieFlix. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4 text-slate-500">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
