import { useEffect, useRef } from 'react';
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

// A typed number as an answer. Out-of-range answers stay in the box so the owner can correct them,
// but are not scored.
function numericAnswer(ind: ReadinessIndicator, text: string): Answer | undefined {
  const v = text === '' ? undefined : Number(text);
  const valid = v !== undefined && !Number.isNaN(v) && v >= 0 && (ind.max === undefined || v <= ind.max);
  return valid ? { value: v } : undefined;
}

// The page is prerendered, so on a slow connection the questions can be answered before React
// hydrates. React keeps what is in the inputs but starts with empty state, so without this the
// answers stay on screen but are not scored. Reads what is already entered, once, on hydration.
function readEntered(ind: ReadinessIndicator, el: HTMLFieldSetElement): { answer: Answer; raw?: string } | null {
  const q = (sel: string) => el.querySelector<HTMLInputElement>(sel);
  if (q('input[data-role="unsure"]')?.checked) return { answer: { unsure: true }, raw: '' };
  if (ind.type === 'category') {
    const picked = q('input[type="radio"]:checked')?.value;
    return picked && ind.options?.some((o) => o.key === picked) ? { answer: { option: picked } } : null;
  }
  if (ind.type === 'checklist') {
    if (q('input[data-role="none"]')?.checked) return { answer: { none: true } };
    const items = Array.from(el.querySelectorAll<HTMLInputElement>('input[data-item]:checked')).map((x) => x.dataset.item as string);
    return items.length ? { answer: { items } } : null;
  }
  if (ind.noneOption && q('input[data-role="none"]')?.checked) return { answer: { value: ind.noneOption.value }, raw: '' };
  const text = q('input[type="number"]')?.value ?? '';
  if (text === '') return null;
  const answer = numericAnswer(ind, text);
  // An out-of-range number is kept as text only, as when it is typed after hydration.
  return answer ? { answer, raw: text } : { answer: {}, raw: text };
}

// One question in the free Exit Readiness Score. Renders fully on the server so the question
// text and options are in the static HTML; state is held by the parent page.
export function QuestionField({ indicator: ind, number, answer, raw, onChange }: Props) {
  const id = `q-${ind.id}`;
  const unsure = !!answer?.unsure;
  const fieldset = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    if (!fieldset.current) return;
    const entered = readEntered(ind, fieldset.current);
    if (!entered) return;
    onChange(Object.keys(entered.answer).length ? entered.answer : undefined, entered.raw);
    // Once, on mount: after that the inputs are controlled and report their own changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              data-item={item}
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
            data-role="none"
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
    const typed = raw === '' ? undefined : Number(raw);
    const outOfRange =
      typed !== undefined && !Number.isNaN(typed) && (typed < 0 || (ind.max !== undefined && typed > ind.max));
    control = (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={0}
            max={ind.max}
            step="any"
            value={raw}
            disabled={unsure || noneChecked}
            aria-labelledby={`${id}-label`}
            aria-invalid={outOfRange || undefined}
            aria-describedby={outOfRange ? `${id}-range` : undefined}
            // Stop the mouse wheel changing a focused number box while the owner scrolls the page.
            onWheel={(e) => e.currentTarget.blur()}
            onChange={(e) => onChange(numericAnswer(ind, e.target.value), e.target.value)}
            className={`w-32 bg-white border rounded-md px-3 py-2 text-navy focus:outline-none focus:ring-2 disabled:opacity-50 ${
              outOfRange ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-navy/20 focus:border-accent focus:ring-accent/20'
            }`}
          />
          <span className="text-navy-light">{ind.unit}</span>
        </div>
        {outOfRange && (
          <p id={`${id}-range`} className="text-sm text-red-700">
            {ind.max !== undefined ? `Enter a number between 0 and ${ind.max}.` : 'Enter a number of 0 or more.'}
          </p>
        )}
        {ind.noneOption && (
          <label className={optionRow}>
            <input
              type="checkbox"
              data-role="none"
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
    <fieldset ref={fieldset} className="py-7 border-t border-navy/10 first:border-t-0">
      <legend id={`${id}-label`} className="float-left w-full mb-2">
        <span className="font-mono text-xs text-accent-dark tracking-widest mr-3">{String(number).padStart(2, '0')}</span>
        <span className="font-serif text-xl text-navy leading-snug">{ind.question}</span>
      </legend>
      <p className="clear-both text-sm text-navy-light/80 leading-relaxed mb-4">
        {ind.type === 'checklist' ? 'Tick all that apply.' : ind.measures}
      </p>
      {control}
      <label className={`${optionRow} mt-4 text-sm`}>
        <input type="checkbox" data-role="unsure" checked={unsure} onChange={(e) => setUnsure(e.target.checked)} className={box} />
        <span>Not sure</span>
      </label>
    </fieldset>
  );
}
