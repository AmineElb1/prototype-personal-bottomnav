import { useEffect, useRef } from "react"

// Tokens from the design system dump
const NAV_BACKGROUND = "#ffffff"
const NAV_FOREGROUND = "#000068" // --color-primary-90
const NAV_ACTIVE = "#000068"

// Nothing in here may also appear in the bottom nav (Home, Krant, Luister, Kijken, ...).
const NAV_ITEMS: { label: string; id: string }[] = [
  { label: "Net binnen", id: "net-binnen" },
  { label: "Mijn gemeente", id: "mijn-gemeente" },
  { label: "Sport", id: "sport" },
  { label: "Showbizz", id: "showbizz" },
  { label: "Misdaad", id: "misdaad" },
]

export default function SiteNav({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  const activeRef = useRef<HTMLButtonElement>(null)

  // Keep the active item visible when the tab changes (e.g. by swiping content).
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [activeId])

  return (
    <nav
      aria-label="Hoofdnavigatie"
      style={{
        background: NAV_BACKGROUND,
        overflowX: "auto",
        flexShrink: 0,
      }}
    >
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32, // --scale-10
          listStyle: "none",
          margin: 0,
          padding: "0 16px", // --scale-7
          minWidth: "max-content",
        }}
      >
        {NAV_ITEMS.map(item => {
          const isActive = item.id === activeId
          return (
            <li key={item.label}>
              <button
                ref={isActive ? activeRef : undefined}
                onClick={() => onSelect(item.id)}
                style={{
                  display: "block",
                  height: 44,
                  fontFamily: "'Roboto', 'Roboto Fallback', sans-serif", // --font-family-primary
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: 1.15, // --line-height-sm
                  color: isActive ? NAV_ACTIVE : NAV_FOREGROUND,
                  whiteSpace: "nowrap",
                  boxShadow: isActive ? `inset 0 -3px 0 ${NAV_ACTIVE}` : "none",
                }}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
