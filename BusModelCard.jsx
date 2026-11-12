import { useState } from "react";
import { ExternalLink, Users2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function BusModelCard({ model }) {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-border bg-card transition-shadow hover:shadow-[0_24px_60px_-40px_rgba(14,42,46,0.65)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {failed || !model.image ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[radial-gradient(circle_at_30%_20%,rgba(31,111,107,0.18),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(226,75,50,0.16),transparent_55%)] px-4 text-center">
            <span className="font-display text-lg font-bold text-foreground">{model.name}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {model.body}
            </span>
          </div>
        ) : (
          <img
            src={model.image}
            alt={model.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur">
          {model.deck === "double" ? t("double_deck") : t("single_deck")}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">
          {model.name}
        </h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {model.operators.join(" · ")}
        </p>

        <dl className="mt-4 space-y-1.5 text-xs">
          {[
            [t("length"), model.length],
            [t("engine"), model.engine],
            [t("capacity"), model.capacity],
            [t("body"), model.body],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <dt className="w-24 shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
                {label}
              </dt>
              <dd className="flex-1 font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold text-accent">
          <Users2 className="h-3.5 w-3.5" />
          {t("units")}: {model.units}
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{model.notes}</p>

        <a
          href={model.source}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
        >
          {t("learn_more")}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

export default BusModelCard;
