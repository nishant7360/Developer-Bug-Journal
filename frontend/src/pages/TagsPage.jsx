import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useGetTags from "@/hooks/queries/useGetTags";
import TagCard from "@/components/tag/TagCard";

function TagCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-2/3" />
      <Skeleton className="mt-4 h-3 w-24" />
    </div>
  );
}

export default function TagsPage() {
  const { tags, isLoading, error } = useGetTags();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");

  const visibleTags = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = term
      ? tags.filter(
          (tag) =>
            tag.name.toLowerCase().includes(term) ||
            tag.description?.toLowerCase().includes(term),
        )
      : tags;

    return [...filtered].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : (b.questionCount ?? 0) - (a.questionCount ?? 0) ||
          a.name.localeCompare(b.name),
    );
  }, [tags, search, sort]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Tags</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        A tag groups questions by topic. Pick one to see everything asked about
        it.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by tag name"
            className="pl-8"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground sm:w-40"
        >
          <option value="popular">Popular</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      <div className="mt-6">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TagCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
            Couldn&apos;t load tags. {error.message}
          </div>
        )}

        {!isLoading && !error && visibleTags.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            {search ? `No tags match "${search}".` : "No tags yet."}
          </div>
        )}

        {!isLoading && !error && visibleTags.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTags.map((tag) => (
              <TagCard key={tag._id} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
