import { Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetTags from "@/hooks/queries/useGetTags";

const MAX_TAGS = 5;

export default function TagSelector({ value = [], onChange }) {
  const { tags, isLoading } = useGetTags();

  function toggleTag(tagId) {
    if (value.includes(tagId)) {
      onChange(value.filter((id) => id !== tagId));
    } else if (value.length < MAX_TAGS) {
      onChange([...value, tagId]);
    }
  }

  const selectedTags = (tags ?? []).filter((tag) => value.includes(tag._id));

  return (
    <div>
      <Popover>
        <PopoverTrigger className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
          <span className="text-muted-foreground">
            {value.length > 0
              ? `${value.length}/${MAX_TAGS} tags selected`
              : "Select tags"}
          </span>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </PopoverTrigger>

        <PopoverContent className="w-72 p-2" align="start">
          {isLoading ? (
            <p className="p-2 text-sm text-muted-foreground">Loading tags...</p>
          ) : (
            <div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
              {tags.map((tag) => {
                const checked = value.includes(tag._id);
                const disabled = !checked && value.length >= MAX_TAGS;

                return (
                  <label
                    key={tag._id}
                    className={`flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm ${
                      disabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-accent"
                    }`}
                  >
                    <Checkbox
                      checked={checked}
                      disabled={disabled}
                      onCheckedChange={() => toggleTag(tag._id)}
                    />
                    {tag.name}
                  </label>
                );
              })}
            </div>
          )}
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedTags.map((tag) => (
            <Badge key={tag._id} variant="secondary">
              {tag.name}
              <button
                type="button"
                onClick={() => toggleTag(tag._id)}
                className="ml-1 hover:text-destructive"
              >
                <Check className="hidden" />×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
