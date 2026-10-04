import { useState, type PointerEvent, type ReactNode } from "react"

// ─── Icons ───────────────────────────────────────────────────────────────────

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

const ICON_HOME = (
  <svg {...ICON_PROPS}>
    <path d="M5 10.5L12 4l7 6.5V19a1 1 0 0 1-1 1h-3.5v-6h-5v6H6a1 1 0 0 1-1-1z" />
  </svg>
)

const ICON_KRANT = (
  <svg {...ICON_PROPS}>
    <path d="M4 7v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8" />
    <path d="M4 7H2M4 7v0M8 5v13" />
    <path d="M11 10h6M11 14h6" />
  </svg>
)

const ICON_LUISTER = (
  <svg {...ICON_PROPS}>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    <path d="M4 15h3v5H5.5A1.5 1.5 0 0 1 4 18.5zM20 15h-3v5h1.5a1.5 1.5 0 0 0 1.5-1.5z" />
  </svg>
)

const ICON_KIJKEN = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const ICON_MIJN_NIEUWS = (
  <svg {...ICON_PROPS}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20v-1.5C5 16 8.5 14.5 12 14.5s7 1.5 7 4V20z" />
  </svg>
)

const ICON_ASSISTENT = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 7l1.8 4.7 4.7 1.8-4.7 1.8L14 20l-1.8-4.7-4.7-1.8 4.7-1.8z" />
    <path d="M6 2.5l.9 2.1 2.1.9-2.1.9L6 8.5l-.9-2.1L3 5.5l2.1-.9z" />
    <path d="M19 2l.6 1.4L21 4l-1.4.6L19 6l-.6-1.4L17 4l1.4-.6z" />
  </svg>
)

const ICON_RECENT = (
  <svg {...ICON_PROPS}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.5 2" />
  </svg>
)

const ICON_PUZZELS = (
  <svg {...ICON_PROPS}>
    <path d="M10 4a2 2 0 1 1 4 0v1h4a1 1 0 0 1 1 1v4h-1a2 2 0 1 0 0 4h1v4a1 1 0 0 1-1 1h-4v-1a2 2 0 1 0-4 0v1H6a1 1 0 0 1-1-1v-4h1a2 2 0 1 0 0-4H5V6a1 1 0 0 1 1-1h4z" />
  </svg>
)

const ICON_MENU = (
  <svg {...ICON_PROPS}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

// ─── Items & preferences ─────────────────────────────────────────────────────

export type NavItem = { id: string; label: string; icon: ReactNode }

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: ICON_HOME },
  { id: "krant", label: "Krant", icon: ICON_KRANT },
  { id: "luister", label: "Luister", icon: ICON_LUISTER },
  { id: "kijken", label: "Kijken", icon: ICON_KIJKEN },
  { id: "mijn-nieuws", label: "Mijn nieuws", icon: ICON_MIJN_NIEUWS },
  { id: "assistent", label: "Assistent", icon: ICON_ASSISTENT },
  { id: "recent", label: "Recent", icon: ICON_RECENT },
  { id: "puzzels", label: "Puzzels", icon: ICON_PUZZELS },
]

// The first BAR_SLOTS items of the order sit in the bar; the rest live under "Meer".
const BAR_SLOTS = 4
const ROW_HEIGHT = 48
const STORAGE_KEY = "bottomNavPrefs"
const PRIMARY = "#2766F5"
const SURFACE = "#EBF2FF"

export type NavPrefs = { order: string[]; opening: string }

const DEFAULT_PREFS: NavPrefs = { order: NAV_ITEMS.map(i => i.id), opening: "home" }

const itemById = (id: string) => NAV_ITEMS.find(i => i.id === id)!

export function loadNavPrefs(): NavPrefs {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as NavPrefs | null
    const valid =
      raw &&
      Array.isArray(raw.order) &&
      raw.order.length === NAV_ITEMS.length &&
      NAV_ITEMS.every(i => raw.order.includes(i.id)) &&
      raw.order.indexOf(raw.opening) >= 0 &&
      raw.order.indexOf(raw.opening) < BAR_SLOTS
    if (valid) return raw
  } catch {
    // fall through to defaults
  }
  return DEFAULT_PREFS
}

function saveNavPrefs(prefs: NavPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // storage unavailable (private mode) — preferences just won't persist
  }
}

// ─── Bar ─────────────────────────────────────────────────────────────────────

function BarButton({
  icon,
  label,
  active,
  expanded,
  onClick,
}: {
  icon: ReactNode
  label: string
  active: boolean
  expanded?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active && expanded === undefined ? "page" : undefined}
      aria-haspopup={expanded === undefined ? undefined : "menu"}
      aria-expanded={expanded}
      style={{
        flex: "1 0 0",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "6px 0",
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 56,
          height: 32,
          borderRadius: 16,
          background: active ? "#2b70e8" : "transparent",
          color: active ? "#ffffff" : "#000000",
          transition: "background-color 0.15s",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "16px",
          letterSpacing: 0.5,
          textAlign: "center",
          color: active ? "#1a1a1a" : "#49454F",
        }}
      >
        {label}
      </span>
    </button>
  )
}

export default function BottomNav({
  prefs,
  onPrefsChange,
  activeId,
  onSelect,
}: {
  prefs: NavPrefs
  onPrefsChange: (prefs: NavPrefs) => void
  activeId: string
  onSelect: (id: string) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [editing, setEditing] = useState(false)

  const barItems = prefs.order.slice(0, BAR_SLOTS).map(itemById)
  const moreItems = prefs.order.slice(BAR_SLOTS).map(itemById)
  const moreActive = menuOpen || moreItems.some(i => i.id === activeId)

  function select(id: string) {
    setMenuOpen(false)
    onSelect(id)
  }

  return (
    <>
      <nav
        aria-label="Hoofdnavigatie onderaan"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 64,
          flexShrink: 0,
          background: SURFACE,
          zIndex: 40,
        }}
      >
        {barItems.map(item => (
          <BarButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={item.id === activeId && !menuOpen}
            onClick={() => select(item.id)}
          />
        ))}
        <BarButton
          icon={ICON_MENU}
          label="Meer"
          active={moreActive}
          expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        />

        {menuOpen && (
          <>
            {/* Transparent backdrop: tap outside to close */}
            <div
              onClick={() => setMenuOpen(false)}
              style={{ position: "fixed", inset: 0, bottom: 64, zIndex: -1 }}
            />
            <div
              role="menu"
              className="nav-popup"
              style={{
                position: "absolute",
                right: 16,
                bottom: "calc(100% + 8px)",
                width: 208,
                padding: 8,
                background: SURFACE,
                borderRadius: 16,
                boxShadow: "0 2px 6px 2px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {moreItems.map(item => (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => select(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    width: "100%",
                    height: ROW_HEIGHT,
                    padding: "0 12px",
                    borderRadius: 8,
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    color: item.id === activeId ? PRIMARY : "#1D1B20",
                    textAlign: "left",
                  }}
                >
                  <span style={{ display: "flex", transform: "scale(0.85)" }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div style={{ height: 1, background: "#CAC4D0", margin: "4px 8px 12px" }} />
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setEditing(true)
                }}
                style={{
                  height: 32,
                  margin: "0 0 4px 4px",
                  padding: "0 12px",
                  borderRadius: 100,
                  background: PRIMARY,
                  color: "#fff",
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                Aanpassen
              </button>
            </div>
          </>
        )}
      </nav>

      {editing && (
        <CustomizeSheet
          prefs={prefs}
          onCancel={() => setEditing(false)}
          onSave={next => {
            saveNavPrefs(next)
            onPrefsChange(next)
            setEditing(false)
          }}
        />
      )}
    </>
  )
}

// ─── Customize bottom sheet ──────────────────────────────────────────────────

function RadioDot({ checked, disabled }: { checked: boolean; disabled: boolean }) {
  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        height: 48,
        flexShrink: 0,
        opacity: disabled ? 0.38 : 1,
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: `2px solid ${checked ? PRIMARY : "#49454F"}`,
        }}
      >
        {checked && <span style={{ width: 10, height: 10, borderRadius: "50%", background: PRIMARY }} />}
      </span>
    </span>
  )
}

function CustomizeSheet({
  prefs,
  onSave,
  onCancel,
}: {
  prefs: NavPrefs
  onSave: (prefs: NavPrefs) => void
  onCancel: () => void
}) {
  const [order, setOrder] = useState(prefs.order)
  const [opening, setOpening] = useState(prefs.opening)
  const [drag, setDrag] = useState<{ id: string; startY: number; startIdx: number; dy: number } | null>(null)

  // Only items that sit in the bar can be the opening app; if the chosen one
  // is dragged into "Meer", Home (always first) takes over.
  const effectiveOpening = order.indexOf(opening) < BAR_SLOTS ? opening : order[0]

  function onHandleDown(e: PointerEvent<HTMLElement>, id: string) {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ id, startY: e.clientY, startIdx: order.indexOf(id), dy: 0 })
  }

  function onHandleMove(e: PointerEvent<HTMLElement>) {
    if (!drag) return
    const dy = e.clientY - drag.startY
    const current = order.indexOf(drag.id)
    // Index 0 (Home) is pinned, so the dragged row can only land on 1..n-1.
    const target = Math.max(1, Math.min(order.length - 1, drag.startIdx + Math.round(dy / ROW_HEIGHT)))
    if (target !== current) {
      const next = order.filter(id => id !== drag.id)
      next.splice(target, 0, drag.id)
      setOrder(next)
    }
    setDrag({ ...drag, dy })
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <div
        onClick={onCancel}
        className="sheet-scrim"
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)" }}
      />
      <div
        role="dialog"
        aria-label="Navigatiemenu aanpassen"
        className="sheet"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          maxHeight: "92%",
          display: "flex",
          flexDirection: "column",
          background: SURFACE,
          borderRadius: "28px 28px 0 0",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: 16, flexShrink: 0 }}>
          <div style={{ width: 32, height: 4, borderRadius: 100, background: "#79747E" }} />
        </div>

        <p
          style={{
            margin: 0,
            padding: "0 16px 16px",
            fontSize: 13,
            lineHeight: "16px",
            color: "#000",
            flexShrink: 0,
          }}
        >
          Bepaal de volgorde van het navigatiemenu door de opties te slepen. Selecteer vervolgens de gewenste
          opening app.
        </p>

        <div style={{ height: 1, background: "#CAC4D0", margin: "0 8px", flexShrink: 0 }} />

        <div style={{ overflowY: "auto", padding: "4px 0", position: "relative" }}>
          {order.map((id, idx) => {
            const item = itemById(id)
            const selectable = idx < BAR_SLOTS
            const checked = id === effectiveOpening
            const pinned = idx === 0
            const isDragged = drag?.id === id
            const offset = isDragged ? drag.dy - (idx - drag.startIdx) * ROW_HEIGHT : 0

            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: ROW_HEIGHT,
                  padding: "0 12px 0 4px",
                  transform: `translateY(${offset}px)`,
                  transition: isDragged ? "none" : "transform 0.15s",
                  position: "relative",
                  zIndex: isDragged ? 2 : 0,
                  background: isDragged ? "#DCE7FD" : "transparent",
                  borderRadius: 4,
                  boxShadow: isDragged ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
                }}
              >
                <button
                  role="radio"
                  aria-checked={checked}
                  aria-label={`${item.label} als opening app`}
                  disabled={!selectable}
                  onClick={() => setOpening(id)}
                  style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0, textAlign: "left", cursor: selectable ? "pointer" : "default" }}
                >
                  <RadioDot checked={checked} disabled={!selectable} />
                  <span style={{ display: "flex", color: "#000", transform: "scale(0.85)" }}>{item.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: 14, letterSpacing: 0.1, color: "#1D1B20" }}>
                    {item.label}
                  </span>
                  {checked && (
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#1D1B20" }}>(Opening app)</span>
                  )}
                </button>
                {!pinned && (
                  <span
                    role="button"
                    aria-label={`Versleep ${item.label}`}
                    onPointerDown={e => onHandleDown(e, id)}
                    onPointerMove={onHandleMove}
                    onPointerUp={() => setDrag(null)}
                    onPointerCancel={() => setDrag(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: 48,
                      height: ROW_HEIGHT,
                      color: "#49454F",
                      cursor: isDragged ? "grabbing" : "grab",
                      touchAction: "none",
                    }}
                  >
                    {ICON_MENU}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ height: 1, background: "#CAC4D0", flexShrink: 0 }} />
        <div style={{ display: "flex", gap: 8, padding: "12px 24px", flexShrink: 0 }}>
          <button
            onClick={() => onSave({ order, opening: effectiveOpening })}
            style={{
              height: 40,
              padding: "0 24px",
              borderRadius: 100,
              background: PRIMARY,
              color: "#fff",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: 0.1,
            }}
          >
            Save
          </button>
          <button
            onClick={onCancel}
            style={{
              height: 40,
              padding: "0 24px",
              borderRadius: 100,
              border: "1px solid #CAC4D0",
              color: "#49454F",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: 0.1,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
