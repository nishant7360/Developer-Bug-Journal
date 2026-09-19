export default function ProfileBio({ bio }) {
  return (
    <p className="mt-4 text-sm text-foreground">
      {bio || <span className="text-muted-foreground">No bio yet.</span>}
    </p>
  );
}
