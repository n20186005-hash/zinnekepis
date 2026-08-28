import { useTranslations, useMessages } from 'next-intl';

export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as Array<{ question: string; answer: string }>;

  if (items.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="px-5 sm:px-6 py-4 flex items-start gap-4 border-b border-dashed"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  Q
                </span>
                <h3
                  className="font-semibold text-base sm:text-lg leading-relaxed pt-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.question}
                </h3>
              </div>
              <div className="px-5 sm:px-6 py-4 flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ color: 'var(--accent)', background: 'var(--bg-secondary)' }}
                >
                  A
                </span>
                <p
                  className="text-base leading-relaxed pt-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
