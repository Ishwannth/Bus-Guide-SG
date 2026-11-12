import { LANGUAGES, useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";
import { BottomSheetPicker } from "@/components/BottomSheetPicker";

export function LanguageSelect() {
  const { lang, setLang, t } = useI18n();
  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <BottomSheetPicker
      value={lang}
      onChange={setLang}
      title={t("language")}
      ariaLabel={t("language")}
      options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))}
      leading={<Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
      className="flex max-w-[8.5rem] items-center gap-1.5 rounded-full border border-border bg-card py-2 pl-2.5 pr-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary"
      valueClassName="text-xs font-semibold"
    />
  );
}

export default LanguageSelect;
