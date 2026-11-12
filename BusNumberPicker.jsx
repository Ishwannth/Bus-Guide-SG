import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { ROUTES, getOperator } from "@/data/routes";
import { useI18n } from "@/lib/i18n";

export function BusNumberPicker({ onSelect, large = false }) {
  const { t } = useI18n();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    const seen = new Set();
    return ROUTES.filter((r) => {
      const hit =
        !q ||
        r.no.toLowerCase().includes(q) ||
        r.from.toLowerCase().includes(q) ||
        r.to.toLowerCase().includes(q);
      if (!hit) return false;
      const key = `${r.op}-${r.no}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 8);
  }, [value]);

  const choose = (route) => {
    setValue("");
    setOpen(false);
    onSelect(route);
  };

  return (
    <div className="relative">
      <div
        className={
          large
            ? "flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm"
            : "flex items-center gap-2 rounded-xl border border-input bg-card px-3 py-2"
        }
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && matches[0]) choose(matches[0]);
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={t("search_placeholder")}
          aria-label={t("search_label")}
          className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {value && (
          <button
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
            aria-label="Clear"
            className="-my-2 flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && value && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
          {matches.length === 0 && (
            <p className="px-4 py-3 text-sm text-muted-foreground">{t("no_results")}</p>
          )}
          {matches.map((route) => {
            const operator = getOperator(route.op);
            return (
              <button
                key={`${route.op}-${route.no}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(route)}
                className="flex min-h-11 w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-secondary"
              >
                <span
                  className="flex h-8 min-w-[2.4rem] items-center justify-center rounded-lg px-1 font-display text-sm font-bold text-white"
                  style={{ backgroundColor: operator.color }}
                >
                  {route.no}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {route.from} {route.loop ? "↺" : "⇄"} {route.to}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">{operator.name}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BusNumberPicker;
