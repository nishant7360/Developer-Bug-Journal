import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function TechnologyInput({ value = [], onChange }) {
  const [draft, setDraft] = useState("");

  function addTech(raw) {
    const cleaned = raw.trim().toLowerCase();
    if (cleaned && !value.includes(cleaned)) {
      onChange([...value, cleaned]);
    }
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech(draft);
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTech(tech) {
    onChange(value.filter((t) => t !== tech));
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1.5">
      {value.map((tech) => (
        <Badge key={tech} variant="secondary" className="gap-1">
          {tech}
          <button type="button" onClick={() => removeTech(tech)}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTech(draft)}
        placeholder={value.length === 0 ? "node, express..." : ""}
        className="min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
