import svgPaths from "./svg-dpg7c70yrn";
import logoSvgPaths from "../Navigation20MobileAppIos-1/svg-xeo0dfukyr";

function HeaderLogo() {
  return (
    <div style={{ flex: "1 0 0", maxWidth: 170, minWidth: 1, position: "relative", height: 24 }}>
      <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 170 23.8619" preserveAspectRatio="xMinYMid meet">
        <path d={logoSvgPaths.p11e7f180} fill="black" />
        <path d={logoSvgPaths.p17155600} fill="black" />
        <path d={logoSvgPaths.p3ebc2000} fill="black" />
        <path d={logoSvgPaths.p318d8200} fill="black" />
        <path d={logoSvgPaths.p115d2e00} fill="black" />
        <path d={logoSvgPaths.p397827e0} fill="black" />
        <path d={logoSvgPaths.p6829f00} fill="black" />
        <path d={logoSvgPaths.p240f2b00} fill="black" />
        <path d={logoSvgPaths.p290a5f00} fill="black" />
        <path d={logoSvgPaths.p294ce100} fill="black" />
      </svg>
    </div>
  );
}

function SubscribeButton() {
  return (
    <div style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 36,
      padding: "7px 20px 5px",
      borderRadius: 1000,
      flexShrink: 0,
      overflow: "hidden",
    }}>
      {/* Glass layers */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 1000,
        boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.75)",
      }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 1000, background: "#2b70e8" }} />
      <span style={{
        position: "relative",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
        fontSize: 14,
        color: "white",
        lineHeight: "16px",
        whiteSpace: "nowrap",
      }}>
        Subscribe
      </span>
    </div>
  );
}

function AccountButton() {
  return (
    <div style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      flexShrink: 0,
    }}>
      {/* Glass circle background */}
      <div style={{
        position: "absolute",
        width: 30, height: 30,
        borderRadius: 1000,
        background: "#2b70e8",
        boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)",
      }} />
      <svg style={{ position: "relative" }} fill="none" height="13.231" viewBox="0 0 14 13.231" width="14">
        <path d={svgPaths.p306d7800} fill="white" />
      </svg>
    </div>
  );
}

export default function Navigation20MobileAppIos() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", flexShrink: 0 }}>
      {/* Header nav */}
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", height: 52, padding: "8px 16px", gap: 16 }}>
        <div style={{ flex: "1 0 0", display: "flex", alignItems: "center", minWidth: 0, maxHeight: 32, overflow: "hidden" }}>
          <HeaderLogo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <SubscribeButton />
          <AccountButton />
        </div>
      </div>
    </div>
  );
}
