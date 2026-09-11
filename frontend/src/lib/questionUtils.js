export function normalizeTechnologies(technologies = []) {
  return technologies
    .flatMap((tech) => tech.split(","))
    .map((t) => t.replace(/[[\]"]/g, "").trim())
    .filter(Boolean);
}

export function getAuthorInitial(author) {
  return author?.username?.charAt(0).toUpperCase() ?? "?";
}

export function formatRelativeTime(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;

  return new Date(dateString).toLocaleDateString();
}

export function truncate(text = "", maxLength = 140) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function formatFullDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
