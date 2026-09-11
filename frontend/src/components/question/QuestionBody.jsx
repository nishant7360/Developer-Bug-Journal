export default function QuestionBody({
  description,
  errorMessage,
  code,
  image,
}) {
  return (
    <>
      {image && (
        <img
          src={image.url}
          alt="Question attachment"
          className="mt-4 max-h-96 rounded-md border border-border object-contain"
        />
      )}

      <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
        {description}
      </p>

      {errorMessage && (
        <div className="mt-4 rounded-md border-l-4 border-destructive/50 bg-destructive/5 px-4 py-3">
          <p className="font-mono text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      {code && (
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code className="font-mono">{code}</code>
        </pre>
      )}
    </>
  );
}
