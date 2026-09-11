export default function CommentsPreview() {
  return (
    <div className="mt-4 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Comments</span>
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
          >
            See all
          </button>
          <button
            type="button"
            className="font-medium text-primary hover:underline"
          >
            Add comment
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Comments coming next.
      </p>
    </div>
  );
}
