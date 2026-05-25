export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/8 mt-auto">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        <p className="font-mono text-xs text-black/30 dark:text-white/25">
          © 2026 Vishal Kumar Singh
        </p>
        <a
          href="https://vishalvoid.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-black/30 dark:text-white/25 hover:text-black/70 dark:hover:text-white/60 transition-colors"
        >
          vishalvoid.com
        </a>
      </div>
    </footer>
  );
}
