import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center">
      <p className="font-mono text-6xl font-semibold tracking-tight text-primary sm:text-7xl">
        404
      </p>

      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The link may be broken, or the page may have been moved or deleted.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-xs leading-relaxed sm:text-sm">
        <p className="text-muted-foreground">
          <span className="text-primary">$</span> GET{" "}
          <span className="break-all text-foreground">{pathname}</span>
        </p>
        <p className="mt-1 text-destructive">Error 404: route not found</p>
        <p className="text-muted-foreground">
          &nbsp;&nbsp;at bug_journal/router
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          to="/"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to home
        </Link>
        <Link
          to="/questions"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Browse questions
        </Link>
      </div>
    </div>
  );
}
