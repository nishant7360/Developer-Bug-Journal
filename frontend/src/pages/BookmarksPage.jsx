import useGetBookmarks from "@/hooks/queries/useGetBookmarks";
import QuestionList from "@/components/question/QuestionList";

export default function BookmarksPage() {
  const { bookmarks, isLoading, error } = useGetBookmarks();

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Your bookmarks</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Questions you&apos;ve saved to come back to.
      </p>

      <div className="mt-6">
        <QuestionList
          questions={bookmarks}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
