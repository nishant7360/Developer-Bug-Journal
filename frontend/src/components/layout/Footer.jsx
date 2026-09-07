import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 text-sm text-ink/60">
        <p>&copy; {new Date().getFullYear()} bug_journal</p>
        <div className="flex gap-6">
          <Link to="/terms" className="hover:text-ink">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-ink">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
