import { useState, type CSSProperties, type ReactNode } from "react"

// Placeholder pages for the bottom-nav sections that are not the home feed.
// Every section gets its own layout (podcast rows, video tiles, newspaper edition, chat, ...),
// built from grey placeholder boxes with an img on top, like the article teasers on the home tabs.

export interface SectionArticle {
  label: string
  title: string
  image: string
  excerpt: string
  timeAgo: string
  premium?: boolean
}

export interface SectionPageData {
  title: string
  subtitle: string
  articles: SectionArticle[]
}

export const SECTION_PAGES: Record<string, SectionPageData> = {
  krant: {
    title: "Krant",
    subtitle: "Digitale editie",
    articles: [
      { label: "Voorpagina", title: "Coalitieakkoord rond: 28 miljard voor koopkracht en klimaat", image: "photo-1586174035695-35ab9e19215c", excerpt: "Na 227 dagen onderhandelen presenteren de vier partijen hun plannen.", timeAgo: "Pagina 1" },
      { label: "Binnenland", title: "Fietsstraat in het centrum gaat definitief open na maanden van werken", image: "photo-1627964718300-fab24a8a85ce", excerpt: "De nieuwe fietsstraat verbindt het station met de markt.", timeAgo: "Pagina 6" },
      { label: "Buitenland", title: "Zelensky: offensief gaat door ondanks zware verliezen aan het front", image: "photo-1558352983-6b862ad859a1", excerpt: "De Oekraïense president benadrukte dat steun van het Westen cruciaal blijft.", timeAgo: "Pagina 9" },
      { label: "Economie", title: "Inflatie daalt verder naar 2,3 procent — laagste niveau in drie jaar", image: "photo-1620202304714-23f7b437d856", excerpt: "De prijzen in de eurozone stijgen minder snel dan verwacht.", timeAgo: "Pagina 14", premium: true },
      { label: "Sport", title: "Topper eindigt in spektakel: 3-2 na rode kaart voor de doelman", image: "photo-1679391029864-d46f366a456b", excerpt: "De thuisploeg won na een bizarre slotfase.", timeAgo: "Pagina 22" },
    ],
  },
  luister: {
    title: "Luister",
    subtitle: "Podcasts en voorgelezen artikelen",
    articles: [
      { label: "De Dag", title: "Waarom de inflatie plots daalt", image: "photo-1499909694555-1ae5b7067b1a", excerpt: "Onze economieredactie legt uit wat de nieuwe cijfers betekenen voor jouw portemonnee.", timeAgo: "24 min" },
      { label: "Het Gesprek", title: "De winter aan het front", image: "photo-1590301729964-23833732ee04", excerpt: "Een verslaggever in Kyiv over de voorbereidingen op een lange en koude oorlogswinter.", timeAgo: "38 min" },
      { label: "Voorgelezen", title: "Hoe het Westen Poetin miskende — en wat we ervan kunnen leren", image: "photo-1563166796-befbbd534d1b", excerpt: "Een terugblik op twintig jaar westerse Rusland-politiek, ingesproken door de auteur.", timeAgo: "12 min", premium: true },
      { label: "Extra Time", title: "De Klassiker onder de loep", image: "photo-1522778526097-ce0a22ceb253", excerpt: "De sportredactie blikt vooruit op de topper van het weekend.", timeAgo: "45 min" },
      { label: "Cultuurkaffee", title: "Festivalzomer in volle gang", image: "photo-1459679749680-18eb1eb37418", excerpt: "Wat zie en hoor je deze zomer niet te missen? De tips van onze cultuurredactie.", timeAgo: "31 min" },
    ],
  },
  kijken: {
    title: "Kijken",
    subtitle: "Video's, reportages en livestreams",
    articles: [
      { label: "Livestream", title: "Persconferentie na het coalitieakkoord", image: "photo-1719732882715-4194f657117f", excerpt: "Volg live de toelichting van de formateur en de partijleiders.", timeAgo: "Live" },
      { label: "Reportage", title: "Een dag mee met de douane in de haven", image: "photo-1702499384351-8f84e3f9281c", excerpt: "Hoe controleren ze duizenden containers per dag?", timeAgo: "14:20" },
      { label: "Samenvatting", title: "Alle doelpunten van de topper in drie minuten", image: "photo-1679391029864-d46f366a456b", excerpt: "De beste momenten van gisteravond.", timeAgo: "3:05" },
      { label: "Documentaire", title: "Achter de schermen op het filmfestival", image: "photo-1771574203200-0ec88f162fe0", excerpt: "Een week lang volgden we regisseurs en festivalmakers.", timeAgo: "52:00", premium: true },
      { label: "Video", title: "Zo ziet de nieuwe fietsstraat eruit", image: "photo-1627964718300-fab24a8a85ce", excerpt: "Een rondrit door de vernieuwde route.", timeAgo: "1:12" },
    ],
  },
  "mijn-nieuws": {
    title: "Mijn nieuws",
    subtitle: "Op basis van de onderwerpen die jij volgt",
    articles: [
      { label: "Hockey", title: "Hockeydames pakken goud op het WK na shoot-out tegen België", image: "photo-1734159319354-b9ead78dd441", excerpt: "Na 1-1 in de finale werd het in de shoot-out 3-2.", timeAgo: "3 uur geleden" },
      { label: "Mijn gemeente", title: "Zwembad blijft deze zomer langer open dankzij extra budget", image: "photo-1765401809244-888bddb45307", excerpt: "De gemeenteraad besliste het openluchtbad tot half september open te houden.", timeAgo: "3 uur geleden" },
      { label: "Klimaat", title: "Uitstoot daalt te traag: land dreigt klimaatdoelen voor 2030 te missen", image: "photo-1557436552-d1d884f1bb62", excerpt: "De uitstoot daalt onvoldoende, vooral in verkeer en gebouwen.", timeAgo: "1 uur geleden" },
      { label: "Film", title: "Debuutfilm 'De Stille Kracht' wint de Gouden Beer in Rotterdam", image: "photo-1771574203200-0ec88f162fe0", excerpt: "Regisseur Mila de Vries won met haar eerste langspeelfilm de hoofdprijs.", timeAgo: "20 min geleden" },
    ],
  },
  assistent: {
    title: "Assistent",
    subtitle: "Stel een vraag of begin met een suggestie",
    articles: [
      { label: "Samenvatting", title: "Het nieuws van vandaag in één minuut", image: "photo-1586174035695-35ab9e19215c", excerpt: "Een korte samenvatting van de vijf belangrijkste verhalen van de dag.", timeAgo: "Suggestie" },
      { label: "Uitleg", title: "Wat betekent het coalitieakkoord voor jouw portemonnee?", image: "photo-1620202304714-23f7b437d856", excerpt: "De assistent zet de maatregelen op een rij.", timeAgo: "Suggestie" },
      { label: "Achtergrond", title: "Waarom daalt de inflatie nu, en blijft dat zo?", image: "photo-1499909694555-1ae5b7067b1a", excerpt: "Een uitleg in gewone taal.", timeAgo: "Suggestie" },
      { label: "Vraag", title: "Hoe werkt verrijkt uranium, eigenlijk?", image: "photo-1591200834528-4050ce99fe78", excerpt: "Krijg een antwoord op basis van onze berichtgeving.", timeAgo: "Suggestie" },
    ],
  },
  recent: {
    title: "Recent",
    subtitle: "Artikelen die je onlangs las",
    articles: [
      { label: "Economie", title: "Inflatie daalt verder naar 2,3 procent — laagste niveau in drie jaar", image: "photo-1620202304714-23f7b437d856", excerpt: "De prijzen in de eurozone stijgen minder snel dan verwacht.", timeAgo: "Gelezen vandaag", premium: true },
      { label: "Sport", title: "Zesde grandslamtitel voor Swiatek na winst in twee sets", image: "photo-1761927055615-f59ae714385b", excerpt: "In de finale won ze met 6-3 en 6-4.", timeAgo: "Gelezen vandaag" },
      { label: "Buitenland", title: "Zelensky: offensief gaat door ondanks zware verliezen aan het front", image: "photo-1558352983-6b862ad859a1", excerpt: "De Oekraïense president benadrukte dat steun van het Westen cruciaal blijft.", timeAgo: "Gelezen gisteren" },
      { label: "Wetenschap", title: "Onderzoekers ontdekken mechanisme achter veroudering van hersencellen", image: "photo-1719650592946-55163c4994cb", excerpt: "Een nieuwe studie toont aan dat mitochondriaal disfunctioneren een sleutelrol speelt.", timeAgo: "Gelezen gisteren", premium: true },
    ],
  },
  puzzels: {
    title: "Puzzels",
    subtitle: "Een nieuwe puzzel elke dag",
    articles: [
      { label: "Kruiswoord", title: "Kruiswoordpuzzel van vandaag", image: "photo-1563166796-befbbd534d1b", excerpt: "Dertig omschrijvingen, één oplossing.", timeAgo: "Gemiddeld · 15 min" },
      { label: "Sudoku", title: "Sudoku: moeilijk", image: "photo-1546185058-592ead754d27", excerpt: "Vul het rooster aan zonder cijfers te herhalen.", timeAgo: "Moeilijk · 20 min" },
      { label: "Quiz", title: "Nieuwsquiz: hoeveel weet jij van de week?", image: "photo-1536181783029-1097aaf179de", excerpt: "Tien vragen over het nieuws van de afgelopen week.", timeAgo: "10 vragen · 5 min", premium: true },
      { label: "Woordzoeker", title: "Woordzoeker: sporttermen", image: "photo-1502904550040-7534597429ae", excerpt: "Vind alle verborgen woorden.", timeAgo: "Makkelijk · 10 min" },
      { label: "Breinbreker", title: "Logica: wie woont waar?", image: "photo-1546185058-592ead754d27", excerpt: "Vijf huizen, vijf bewoners en een handvol aanwijzingen.", timeAgo: "Gemiddeld · 25 min" },
    ],
  },
}

// ─── Shared building blocks ──────────────────────────────────────────────────

const BLUE = "#2b70e8"
const NAVY = "#000068"

function photoUrl(id: string, width: number) {
  return `https://images.unsplash.com/${id}?w=${width}&q=80&fit=crop&auto=format`
}

// Grey placeholder div with an img on top; children render as overlays.
function Photo({
  id,
  width = 600,
  style,
  children,
}: {
  id: string
  width?: number
  style?: CSSProperties
  children?: ReactNode
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div style={{ position: "relative", background: "#e8e8e8", overflow: "hidden", flexShrink: 0, ...style }}>
      {!failed && (
        <img
          src={photoUrl(id, width)}
          alt=""
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
      {children}
    </div>
  )
}

function Scroll({ children }: { children: ReactNode }) {
  return <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>{children}</div>
}

function PageTitle({ page }: { page: SectionPageData }) {
  return (
    <div style={{ padding: "16px 16px 12px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, margin: 0 }}>{page.title}</h1>
      <p style={{ fontSize: 13, color: "#aaa", margin: "4px 0 0" }}>{page.subtitle}</p>
    </div>
  )
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", margin: 0, padding: "8px 16px 8px" }}>{children}</h2>
}

function PremiumBadge() {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: "#b07d10", background: "#fef3c7", padding: "2px 6px", borderRadius: 4 }}>
      Premium
    </span>
  )
}

function PlayIcon({ size = 20, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

const clamp = (lines: number): CSSProperties => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
})

// ─── Krant: the digital edition ─────────────────────────────────────────────

function KrantBody({ page }: { page: SectionPageData }) {
  const raw = new Date().toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long" })
  const date = raw.charAt(0).toUpperCase() + raw.slice(1)
  return (
    <Scroll>
      <PageTitle page={page} />
      <div style={{ display: "flex", gap: 16, padding: "0 16px 20px" }}>
        <Photo
          id={page.articles[0].image}
          style={{ width: 128, aspectRatio: "3 / 4", borderRadius: 3, boxShadow: "0 4px 16px rgba(0,0,0,0.22)" }}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
          <span style={{ fontSize: 13, color: "#666" }}>{date}</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>Editie van vandaag</span>
          <span style={{ fontSize: 13, color: "#aaa", marginBottom: 6 }}>32 pagina's</span>
          <button style={{ height: 40, borderRadius: 999, background: BLUE, color: "#fff", fontSize: 15, fontWeight: 600 }}>
            Lees de krant
          </button>
          <button style={{ height: 40, borderRadius: 999, border: "1px solid #d0d0d0", color: "#1a1a1a", fontSize: 15, fontWeight: 500 }}>
            Eerdere edities
          </button>
        </div>
      </div>

      <Heading>In deze editie</Heading>
      {page.articles.map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderTop: "1px solid #ebebeb" }}>
          <span style={{ width: 40, flexShrink: 0, fontSize: 13, fontWeight: 700, color: BLUE, paddingTop: 2 }}>
            p. {a.timeAgo.replace("Pagina ", "")}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: 0.4 }}>{a.label}</span>
              {a.premium && <PremiumBadge />}
            </div>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.3, margin: 0, ...clamp(3) }}>{a.title}</p>
          </div>
          <Photo id={a.image} width={200} style={{ width: 64, height: 64, borderRadius: 4 }} />
        </div>
      ))}
      <div style={{ height: 32 }} />
    </Scroll>
  )
}

// ─── Luister: podcast player + episode rows ─────────────────────────────────

function LuisterBody({ page }: { page: SectionPageData }) {
  const [now, ...episodes] = page.articles
  return (
    <Scroll>
      <PageTitle page={page} />
      <div style={{ margin: "0 16px 20px", padding: 16, borderRadius: 20, background: NAVY, color: "#fff" }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", opacity: 0.7 }}>Verder luisteren</span>
        <div style={{ display: "flex", gap: 14, marginTop: 10, alignItems: "center" }}>
          <Photo id={now.image} width={300} style={{ width: 88, height: 88, borderRadius: 12 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.8 }}>{now.label}</span>
            <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.25, margin: "2px 0 0", ...clamp(3) }}>{now.title}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.25)" }}>
              <div style={{ width: "38%", height: "100%", borderRadius: 2, background: "#fff" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.75, marginTop: 6 }}>
              <span>09:12</span>
              <span>{now.timeAgo}</span>
            </div>
          </div>
          <button aria-label="Afspelen" style={{ width: 48, height: 48, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PlayIcon size={26} color={NAVY} />
          </button>
        </div>
      </div>

      <Heading>Afleveringen</Heading>
      {episodes.map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
          <Photo id={a.image} width={200} style={{ width: 72, height: 72, borderRadius: 12 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: BLUE }}>{a.label}</span>
              {a.premium && <PremiumBadge />}
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.3, margin: "2px 0 4px", ...clamp(2) }}>{a.title}</p>
            <span style={{ fontSize: 12, color: "#888" }}>{a.timeAgo}</span>
          </div>
          <button aria-label="Afspelen" style={{ width: 40, height: 40, flexShrink: 0, borderRadius: "50%", border: "1.5px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PlayIcon size={20} color="#1a1a1a" />
          </button>
        </div>
      ))}
      <div style={{ height: 32 }} />
    </Scroll>
  )
}

// ─── Kijken: video hero + 2-column tiles ────────────────────────────────────

function DurationBadge({ value }: { value: string }) {
  const live = value === "Live"
  return (
    <span
      style={{
        position: "absolute",
        ...(live ? { top: 8, left: 8 } : { right: 8, bottom: 8 }),
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 7px",
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 700,
        color: "#fff",
        background: live ? "#d0021b" : "rgba(0,0,0,0.75)",
      }}
    >
      {live && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
      {live ? "LIVE" : value}
    </span>
  )
}

function KijkenBody({ page }: { page: SectionPageData }) {
  const [hero, ...rest] = page.articles
  return (
    <Scroll>
      <PageTitle page={page} />
      <div style={{ padding: "0 16px 20px" }}>
        <Photo id={hero.image} width={800} style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 8 }}>
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlayIcon size={30} />
            </span>
          </span>
          <DurationBadge value={hero.timeAgo} />
        </Photo>
        <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: BLUE, marginTop: 10 }}>{hero.label}</span>
        <p style={{ fontSize: 20, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.3, margin: "2px 0 4px" }}>{hero.title}</p>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5, margin: 0 }}>{hero.excerpt}</p>
      </div>

      <Heading>Meer video's</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 12px", padding: "4px 16px 32px" }}>
        {rest.map((a, i) => (
          <div key={i}>
            <Photo id={a.image} width={400} style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 6 }}>
              <span style={{ position: "absolute", left: 6, bottom: 6, width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlayIcon size={14} />
              </span>
              <DurationBadge value={a.timeAgo} />
            </Photo>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: BLUE }}>{a.label}</span>
              {a.premium && <PremiumBadge />}
            </div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.3, margin: "2px 0 0", ...clamp(3) }}>{a.title}</p>
          </div>
        ))}
      </div>
    </Scroll>
  )
}

// ─── Mijn nieuws: followed topics + compact news list ───────────────────────

function MijnNieuwsBody({ page }: { page: SectionPageData }) {
  const topics = ["Alles", ...page.articles.map(a => a.label)]
  const [active, setActive] = useState("Alles")
  const shown = active === "Alles" ? page.articles : page.articles.filter(a => a.label === active)
  return (
    <Scroll>
      <PageTitle page={page} />
      <div style={{ display: "flex", gap: 8, padding: "0 16px 12px", overflowX: "auto" }}>
        {topics.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={{
              flexShrink: 0,
              height: 36,
              padding: "0 14px",
              borderRadius: 999,
              fontSize: 14,
              whiteSpace: "nowrap",
              color: active === t ? "#fff" : "#1a1a1a",
              background: active === t ? "#1a1a1a" : "transparent",
              border: `1px solid ${active === t ? "#1a1a1a" : "#d0d0d0"}`,
            }}
          >
            {t}
          </button>
        ))}
        <button style={{ flexShrink: 0, height: 36, padding: "0 14px", borderRadius: 999, fontSize: 14, color: BLUE, border: "1px dashed #9db9ee", whiteSpace: "nowrap" }}>
          + Onderwerp
        </button>
      </div>
      {shown.map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "16px", borderTop: "1px solid #ebebeb" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: BLUE }}>{a.label}</span>
            <p style={{ fontSize: 17, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.3, margin: "3px 0 6px", ...clamp(4) }}>{a.title}</p>
            <span style={{ fontSize: 12, color: "#aaa" }}>{a.timeAgo}</span>
          </div>
          <Photo id={a.image} width={300} style={{ width: 104, height: 104, borderRadius: 8 }} />
        </div>
      ))}
      <div style={{ height: 32 }} />
    </Scroll>
  )
}

// ─── Assistent: chat entry with suggestions + input bar ─────────────────────

function SparkleIcon({ size = 22, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M14 7l1.8 4.7 4.7 1.8-4.7 1.8L14 20l-1.8-4.7-4.7-1.8 4.7-1.8z" />
      <path d="M6 2.5l.9 2.1 2.1.9-2.1.9L6 8.5l-.9-2.1L3 5.5l2.1-.9z" />
    </svg>
  )
}

function AssistentBody({ page }: { page: SectionPageData }) {
  return (
    <>
      <Scroll>
        <div style={{ padding: "24px 16px 8px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${BLUE}, #7a5cf0)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SparkleIcon />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, margin: "16px 0 4px" }}>Hoi! Waar kan ik je mee helpen?</h1>
          <p style={{ fontSize: 14, color: "#888", margin: 0 }}>{page.subtitle}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 16px 24px" }}>
          {page.articles.map((a, i) => (
            <button
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "12px 14px", borderRadius: 16, background: "#f3f7ff", border: "1px solid #d9e4fb" }}
            >
              <Photo id={a.image} width={150} style={{ width: 48, height: 48, borderRadius: 10 }} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: BLUE }}>{a.label}</span>
                <span style={{ display: "block", fontSize: 15, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.3, ...clamp(2) }}>{a.title}</span>
              </span>
            </button>
          ))}
        </div>
      </Scroll>
      <div style={{ flexShrink: 0, padding: "8px 16px 12px", borderTop: "1px solid #ebebeb", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 48, padding: "0 6px 0 16px", borderRadius: 999, background: "#f2f2f2" }}>
          <input
            placeholder="Stel een vraag over het nieuws…"
            style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 15, color: "#1a1a1a" }}
          />
          <button aria-label="Verstuur" style={{ width: 36, height: 36, borderRadius: "50%", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Recent: reading history grouped by day ─────────────────────────────────

const READ_PROGRESS = [100, 100, 55, 100]

function RecentBody({ page }: { page: SectionPageData }) {
  const groups: { day: string; items: { a: SectionArticle; i: number }[] }[] = []
  page.articles.forEach((a, i) => {
    const day = a.timeAgo.replace("Gelezen ", "")
    let g = groups.find(x => x.day === day)
    if (!g) groups.push((g = { day, items: [] }))
    g.items.push({ a, i })
  })
  return (
    <Scroll>
      <PageTitle page={page} />
      {groups.map(g => (
        <div key={g.day}>
          <div style={{ padding: "12px 16px 6px", fontSize: 13, fontWeight: 700, color: "#666", textTransform: "capitalize", background: "#f6f6f6" }}>{g.day}</div>
          {g.items.map(({ a, i }) => {
            const pct = READ_PROGRESS[i] ?? 100
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid #ebebeb" }}>
                <Photo id={a.image} width={160} style={{ width: 56, height: 56, borderRadius: 6 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.3, margin: 0, ...clamp(2) }}>{a.title}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: "#888" }}>{a.label}</span>
                    {pct < 100 ? (
                      <span style={{ fontSize: 12, fontWeight: 600, color: BLUE }}>Verder lezen · {pct}%</span>
                    ) : (
                      <span style={{ fontSize: 12, color: "#aaa" }}>Uitgelezen</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ))}
      <div style={{ height: 32 }} />
    </Scroll>
  )
}

// ─── Puzzels: puzzle of the day + tile grid ─────────────────────────────────

const TILE_TINTS = ["#eef3ff", "#fff3e6", "#eaf7ee", "#f6eefc"]

function PuzzelsBody({ page }: { page: SectionPageData }) {
  const [hero, ...rest] = page.articles
  return (
    <Scroll>
      <PageTitle page={page} />
      <div style={{ margin: "0 16px 20px", borderRadius: 16, background: "#fff8e1", overflow: "hidden" }}>
        <Photo id={hero.image} width={800} style={{ width: "100%", aspectRatio: "16 / 9" }} />
        <div style={{ padding: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#b07d10", textTransform: "uppercase", letterSpacing: 0.5 }}>Puzzel van de dag</span>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.25, margin: "4px 0 2px" }}>{hero.title}</p>
          <p style={{ fontSize: 14, color: "#666", margin: "0 0 12px" }}>{hero.timeAgo}</p>
          <button style={{ height: 40, padding: "0 22px", borderRadius: 999, background: "#1a1a1a", color: "#fff", fontSize: 15, fontWeight: 600 }}>Speel nu</button>
        </div>
      </div>

      <Heading>Meer puzzels</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "4px 16px 32px" }}>
        {rest.map((a, i) => (
          <div key={i} style={{ padding: 10, borderRadius: 16, background: TILE_TINTS[i % TILE_TINTS.length] }}>
            <Photo id={a.image} width={300} style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 10 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "8px 0 2px" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", opacity: 0.6 }}>{a.label}</span>
              {a.premium && <PremiumBadge />}
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.25, margin: 0, ...clamp(2) }}>{a.title}</p>
            <span style={{ fontSize: 12, color: "#666" }}>{a.timeAgo}</span>
          </div>
        ))}
      </div>
    </Scroll>
  )
}

// ─── Entry point ─────────────────────────────────────────────────────────────

const BODIES: Record<string, (props: { page: SectionPageData }) => ReactNode> = {
  krant: KrantBody,
  luister: LuisterBody,
  kijken: KijkenBody,
  "mijn-nieuws": MijnNieuwsBody,
  assistent: AssistentBody,
  recent: RecentBody,
  puzzels: PuzzelsBody,
}

export default function SectionPage({ id, header }: { id: string; header: ReactNode }) {
  const page = SECTION_PAGES[id]
  const Body = BODIES[id]
  if (!page || !Body) return null
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: "#fff" }}>
      <div style={{ flexShrink: 0 }}>{header}</div>
      <Body key={id} page={page} />
    </div>
  )
}
