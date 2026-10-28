import { Link } from "react-router-dom";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/constants";

const steps = [
  {
    title: "Post the bug",
    body: "Describe what went wrong. Add the exact error message, the relevant code, and a screenshot if it helps, then tag the technologies involved.",
  },
  {
    title: "Get answers",
    body: "Other developers answer and comment. You can ask for details in the comments without cluttering the answers.",
  },
  {
    title: "Mark it solved",
    body: "When an answer fixes it, accept it. The question is marked solved, so the next person with the same bug can find the fix.",
  },
];

const features = [
  {
    title: "Built for errors and code",
    body: "Questions have dedicated fields for the error message and a code snippet, so the details that matter aren't buried in a paragraph.",
  },
  {
    title: "Search and filter",
    body: "Search across titles, descriptions, errors, and code. Narrow by tag, technology, or solved status.",
  },
  {
    title: "Bookmarks",
    body: "Save questions you want to come back to and find them in one list on your account.",
  },
  {
    title: "Notifications",
    body: "Get told when someone answers or comments on your question, or accepts your answer.",
  },
];

const stack = ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS"];

const linkButton =
  "inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        A journal for the bugs you&apos;ve fixed, and the ones you haven&apos;t.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        bug_journal is a community where developers post the problems
        they&apos;re stuck on, share what worked, and leave a record that saves
        the next person the same hours of debugging.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">How it works</h2>
        <ol className="mt-5 divide-y divide-border rounded-lg border border-border">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 p-4 sm:p-5">
              <span className="font-mono text-sm font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          What you can do
        </h2>
        <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title}>
              <dt className="text-sm font-semibold text-foreground">
                {feature.title}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {feature.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">Built with</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          The code is open on{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </section>

      <section className="mt-12 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Stuck on something right now?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Search for it first, then ask if nobody has.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/ask"
            className={`${linkButton} bg-primary text-primary-foreground hover:bg-primary/90`}
          >
            Ask a question
          </Link>
          <Link
            to="/questions"
            className={`${linkButton} border border-border text-foreground hover:bg-accent`}
          >
            Browse questions
          </Link>
        </div>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        Found a bug in bug_journal itself, or have an idea? Write to{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-primary hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
