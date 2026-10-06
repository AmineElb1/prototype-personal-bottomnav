import { useState, type ReactNode } from "react"

// Section page as in the live app: a white header (same as the home navigation) with back arrow, the section title and the
// sub-sections in the header itself (no second bar under the home navigation).

const NAVY = "#000068"

export interface SectionSub {
  id: string
  label: string
}

function Chevron({ direction }: { direction: "left" | "down" }) {
  return direction === "left" ? (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden>
      <path d="M12 2L3 11l9 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
      <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SectionScreen({
  title,
  subs,
  moreLabel,
  moreSubs = [],
  activeSubId,
  onSelectSub,
  onBack,
  children,
}: {
  title: string
  subs: SectionSub[]
  moreLabel?: string
  moreSubs?: SectionSub[]
  activeSubId: string
  onSelectSub: (id: string) => void
  onBack: () => void
  children: ReactNode
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const moreActive = moreSubs.some(s => s.id === activeSubId)

  const subStyle = (active: boolean) => ({
    flexShrink: 0,
    height: 44,
    fontFamily: "'Roboto', sans-serif",
    fontSize: 17,
    fontWeight: active ? 500 : 400,
    color: NAVY,
    whiteSpace: "nowrap" as const,
    display: "flex",
    alignItems: "center",
    gap: 6,
    boxShadow: active ? `inset 0 -2px 0 ${NAVY}` : "none",
  })

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: "#fff" }}>
      <header style={{ position: "relative", zIndex: 40, flexShrink: 0, background: "#fff", color: NAVY, borderBottom: "1px solid #e0e0e0" }}>
        <div style={{ height: 54 }} />
        <div style={{ position: "relative", height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            onClick={onBack}
            aria-label="Terug"
            style={{ position: "absolute", left: 8, top: 2, width: 44, height: 44, color: NAVY, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Chevron direction="left" />
          </button>
          <span style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: 22 }}>{title}</span>
        </div>

        <nav
          aria-label="Subnavigatie"
          style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 16px 4px", overflowX: "auto" }}
        >
          {subs.map(s => (
            <button
              key={s.id}
              onClick={() => onSelectSub(s.id === activeSubId ? "alles" : s.id)}
              aria-current={s.id === activeSubId ? "true" : undefined}
              style={subStyle(s.id === activeSubId)}
            >
              {s.label}
            </button>
          ))}
          {moreLabel && moreSubs.length > 0 && (
            <button
              onClick={() => setMoreOpen(o => !o)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              style={subStyle(moreActive)}
            >
              {moreLabel}
              <span style={{ display: "flex", transform: moreOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <Chevron direction="down" />
              </span>
            </button>
          )}
        </nav>

        {moreOpen && (
          <>
            <div onClick={() => setMoreOpen(false)} style={{ position: "fixed", inset: 0, zIndex: -1 }} />
            <div
              role="menu"
              style={{
                position: "absolute",
                right: 16,
                top: "100%",
                marginTop: 4,
                minWidth: 200,
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0px 8px 40px rgba(0,0,0,0.2)",
                overflow: "hidden",
              }}
            >
              {moreSubs.map((s, i) => (
                <button
                  key={s.id}
                  role="menuitem"
                  onClick={() => {
                    setMoreOpen(false)
                    onSelectSub(s.id)
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 16px",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 16,
                    fontWeight: s.id === activeSubId ? 500 : 400,
                    color: NAVY,
                    borderTop: i > 0 ? "1px solid #ebebeb" : "none",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </>
        )}
      </header>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>{children}</div>
    </div>
  )
}
