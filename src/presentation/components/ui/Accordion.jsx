import React, { useId, useState } from "react";

/**
 * أكورديون قابل للتشغيل بلوحة المفاتيح.
 *
 * كان السؤال في صفحة التواصل عنصر `<div onClick>` بلا دور ولا `tabindex`
 * ولا `aria-expanded` — لا يُفتح إلا بالفأرة، ولا يعلن قارئ الشاشة أنه
 * قابل للطي أصلاً. والنسخة الأخرى في صفحة التطبيق كانت معكوسة الخطأ:
 * `<button>` يحوي نص الإجابة داخله، فيُقرأ السؤال والجواب معاً كاسم للزر.
 *
 * هنا: الزر يحمل السؤال وحده، والإجابة في لوحة منفصلة مرتبطة به عبر
 * `aria-controls`، وحالة الطي معلنة بـ `aria-expanded`.
 */
function AccordionItem({ question, answer, isOpen, onToggle }) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className={`accordion-item ${isOpen ? "is-open" : ""}`}>
      <h3 className="accordion-heading">
        <button
          type="button"
          id={buttonId}
          className="accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="accordion-question">{question}</span>
          <span className="accordion-icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="accordion-panel"
        hidden={!isOpen}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function Accordion({ items, className = "" }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.q}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
