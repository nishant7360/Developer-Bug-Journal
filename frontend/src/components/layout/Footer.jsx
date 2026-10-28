import { Link } from "react-router-dom";
import { APP_NAME, GITHUB_URL } from "@/lib/constants";

const columns = [
  {
    title: "Explore",
    links: [
      { to: "/questions", label: "Questions" },
      { to: "/tags", label: "Tags" },
      { to: "/ask", label: "Ask a question" },
    ],
  },
  {
    title: "Project",
    links: [{ to: "/about", label: "About" }],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              to="/"
              className="font-mono text-lg font-semibold tracking-tight text-foreground"
            >
              {APP_NAME}
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              A place for developers to post the bugs they&apos;re stuck on and
              the fixes that worked.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-semibold text-foreground">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
