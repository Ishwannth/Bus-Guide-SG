import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

/** A tap target that opens a vaul bottom sheet of options (replaces native <select>). */
export function BottomSheetPicker({
  value,
  options,
  onChange,
  title,
  ariaLabel,
  className,
  valueClassName,
  leading = null,
  chevron = true,
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={ariaLabel || title}
        className={cn("min-h-11", className)}
      >
        {leading}
        <span className={cn("min-w-0 flex-1 truncate text-left", valueClassName)}>
          {current?.label ?? ""}
        </span>
        {chevron && <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />}
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[80vh] select-none">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {title}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto overscroll-contain px-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                    selected ? "bg-secondary" : "hover:bg-muted"
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {option.label}
                    </span>
                    {option.sub && (
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {option.sub}
                      </span>
                    )}
                  </span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-primary" />}
                </button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default BottomSheetPicker;
