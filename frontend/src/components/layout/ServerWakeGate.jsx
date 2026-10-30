import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const HEALTH_URL = `${new URL(import.meta.env.VITE_API_URL).origin}/api/v1/health`;

const MESSAGES = [
  "Waking the server up…",
  "Dusting off the database…",
  "Reading the error logs…",
  "Brewing coffee for the backend…",
  "Almost there…",
];

async function isServerUp() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(HEALTH_URL, {
      signal: controller.signal,
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export default function ServerWakeGate({ children }) {
  const [ready, setReady] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);

    (async () => {
      while (!cancelled) {
        if (await isServerUp()) {
          if (!cancelled) setReady(true);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    })();

    return () => {
      cancelled = true;
      clearInterval(tick);
    };
  }, []);

  if (ready) return children;
  if (seconds < 2) return <div className="min-h-screen bg-background" />;

  const message = MESSAGES[Math.floor(seconds / 4) % MESSAGES.length];

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground"
    >
      <div className="w-full max-w-md text-center">
        <p className="font-mono text-lg font-semibold tracking-tight">
          bug_journal
        </p>

        <Loader2 className="mx-auto mt-8 h-7 w-7 animate-spin text-primary motion-reduce:animate-none" />

        <h1 className="mt-5 text-xl font-semibold">Your server is waking up</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This app runs on free hosting that naps when nobody&apos;s around, so
          the first visit can take up to a minute. After that, everything is
          fast. Your bugs are worth the wait.
        </p>

        <div className="mt-6 rounded-lg border border-border bg-muted p-4 text-left font-mono text-xs">
          <p className="text-muted-foreground">
            <span className="text-primary">$</span> connect --server
          </p>
          <p
            key={message}
            className="mt-1 text-foreground animate-in fade-in duration-500"
          >
            {message}
            <span className="animate-pulse motion-reduce:animate-none">_</span>
          </p>
        </div>

        <p className="mt-4 min-h-5 text-xs text-muted-foreground">
          {seconds >= 45
            ? "Taking a little longer than usual. Hang tight, it's still on its way."
            : `${seconds}s`}
        </p>
      </div>
    </div>
  );
}
