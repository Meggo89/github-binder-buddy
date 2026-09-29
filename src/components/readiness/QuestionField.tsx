import type { Answer } from '../../content/readiness/score';
import type { ReadinessIndicator } from '../../content/readiness/types';

interface Props {
  indicator: ReadinessIndicator;
  number: number;
  answer: Answer | undefined;
  raw: string;
  onChange: (next: Answer | undefined, raw?: string) => void;
}

const box =
  'h-4 w-4 mt-1 flex-shrink-0 rounded border-navy/30 text-navy focus:ring-2 focus:ring-accent/40 accent-navy';
const optionRow = 'flex items-start gap-3 text-navy-light leading-relaxed cursor-pointer';

// One question in the free Exit Readiness Score. Renders fully on the server so the question
// text and options are in the static HTML; state is held by the parent page.
export function QuestionField({ indicator: ind, number, answer, raw, onChange }: Props) {
  const id = `q-${ind.id}`;
  const unsure = !!answer?.unsure;

  const setUnsure = (checked: boolean) => onChange(checked ? { unsure: true } : undefined, '');

  let control: JSX.Element;
  if (ind.type === 'category') {
    control = (
      <div role="radiogroup" aria-labelledby={`${id}-label`} className="space-y-2.5">
        {ind.options!.map((o) => (
          <label key={o.key} className={optionRow}>
            <input
              type="radio"
              name={id}
              value={o.key}
              checked={!unsure && answer?.option === o.key}
              onChange={() => onChange({ option: o.key })}
              className={box}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    );
  } else if (ind.type === 'checklist') {
    const items = answer?.items ?? [];
    const toggle = (item: string, on: boolean) => {
      const next = on ? [...items.filter((x) => x !== item), item] : items.filter((x) => x !== item);
      onChange(next.length ? { items: next } : undefined);
    };
    control = (
      <div className="space-y-2.5">
        {ind.checklist!.map((item) => (
          <label key={item} className={optionRow}>
            <input
              type="checkbox"
              checked={!unsure && !answer?.none && items.includes(item)}
              onChange={(e) => toggle(item, e.target.checked)}
              className={box}
            />
            <span>{item}</span>
          </label>
        ))}
        <label className={optionRow}>
          <input
            type="checkbox"
            checked={!!answer?.none}
            onChange={(e) => onChange(e.target.checked ? { none: true } : undefined)}
            className={box}
          />
          <span className="font-medium text-navy">None of these</span>
        </label>
      </div>
    );
  } else {
    const noneChecked = !!ind.noneOption && answer?.value === ind.noneOption.value && raw === '';
    control = (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={raw}
            disabled={unsure || noneChecked}
            onChange={(e) => {
              const text = e.target.value;
              const v = text === '' ? undefined : Number(text);
              onChange(v === undefined || Number.isNaN(v) ? undefined : { value: v }, text);
            }}
            className="w-32 bg-white border border-navy/20 rounded-md px-3 py-2 text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
          />
          <span className="text-navy-light">{ind.unit}</span>
        </div>
        {ind.noneOption && (
          <label className={optionRow}>
            <input
              type="checkbox"
              checked={noneChecked}
              onChange={(e) => onChange(e.target.checked ? { value: ind.noneOption!.value } : undefined, '')}
              className={box}
            />
            <span>{ind.noneOption.label}</span>
          </label>
        )}
      </div>
    );
  }

  return (
    <fieldset className="py-7 border-t border-navy/10 first:border-t-0">
      <legend id={`${id}-label`} className="float-left w-full mb-2">
        <span className="font-mono text-xs text-accent-dark tracking-widest mr-3">{String(number).padStart(2, '0')}</span>
        <span className="font-serif text-xl text-navy leading-snug">{ind.question}</span>
      </legend>
      <p className="clear-both text-sm text-navy-light/80 leading-relaxed mb-4">
        {ind.type === 'checklist' ? 'Tick all that apply.' : ind.measures}
      </p>
      {control}
      <label className={`${optionRow} mt-4 text-sm`}>
        <input type="checkbox" checked={unsure} onChange={(e) => setUnsure(e.target.checked)} className={box} />
        <span>Not sure</span>
      </label>
    </fieldset>
  );
}
