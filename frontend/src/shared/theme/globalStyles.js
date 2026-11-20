import { surfaceStyles } from "./surfaceStyles.js";
import { designColors, statusColors, withOpacity } from "./designColors.js";

export const globalStyles = [
  {
    ":root": {
      fontFamily: '"Inter Variable", sans-serif',
      color: designColors.dark,
      background: designColors.surface,
      fontSynthesis: "none",
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      "--accent": designColors.accent,
      "--dark": designColors.dark,
      "--muted": designColors.muted,
      "--border": designColors.border,
      "--success": designColors.primary,
      "--sidebar": designColors.dark,
    },
  },
  {
    "*": {
      boxSizing: "border-box",
    },
  },
  {
    html: {
      scrollBehavior: "smooth",
    },
  },
  {
    body: {
      margin: "0",
      minWidth: "320px",
    },
  },
  {
    "button,input:not(.MuiInputBase-input),select:not(.MuiInputBase-input),textarea":
      {
        font: "inherit",
      },
  },
  {
    button: {
      cursor: "pointer",
    },
  },
  {
    "button:disabled": {
      cursor: "not-allowed",
      opacity: ".6",
    },
  },
  {
    a: {
      color: "inherit",
      textDecoration: "none",
    },
  },
  {
    "h1,h2,h3,h4,p": {
      marginTop: "0",
    },
  },
  {
    "h1,h2,h3,h4": {
      fontFamily: '"Inter Variable", sans-serif',
      letterSpacing: "-.035em",
    },
  },
  {
    "input:not(.MuiInputBase-input),textarea,select:not(.MuiInputBase-input)": {
      outline: "none",
      maxWidth: "100%",
      color: "var(--dark)",
    },
  },
  {
    "input:not(.MuiInputBase-input)::placeholder,textarea::placeholder": {
      color: designColors.muted,
    },
  },
  {
    "input:not(.MuiInputBase-input):focus,textarea:focus,select:not(.MuiInputBase-input):focus":
      {
        borderColor: `${designColors.border} !important`,
        boxShadow: `0 0 0 3px ${designColors.surface}`,
      },
  },
  {
    "input:not(.MuiInputBase-input)[type=checkbox]": {
      accentColor: "var(--accent)",
    },
  },
  {
    ".app-shell": {
      minHeight: "100vh",
    },
  },
  {
    ".sidebar": {
      position: "fixed",
      inset: "0 auto 0 0",
      width: "264px",
      background: "var(--sidebar)",
      color: designColors.light,
      zIndex: "40",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: `${designColors.primary} transparent`,
    },
  },
  {
    ".brand": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "33px 27px 29px",
      cursor: "pointer",
    },
  },
  {
    ".brand-mark": {
      width: "42px",
      height: "42px",
      borderRadius: "14px",
      display: "grid",
      placeItems: "center",
      background: designColors.accent,
      color: designColors.background,
      boxShadow: `0 9px 23px ${withOpacity(designColors.accent, 0.267)}`,
    },
  },
  {
    ".brand-wordmark": {
      display: "flex",
      flexDirection: "column",
      gap: "0",
    },
  },
  {
    ".brand-wordmark strong": {
      fontFamily: '"Inter Variable", sans-serif',
      fontSize: "27px",
      color: designColors.background,
      lineHeight: "1.08",
      letterSpacing: "-1.8px",
    },
  },
  {
    ".brand-wordmark strong span": {
      color: designColors.light,
    },
  },
  {
    ".brand-wordmark small": {
      fontSize: "9px",
      fontWeight: "700",
      letterSpacing: "1.55px",
      color: designColors.muted,
      marginTop: "6px",
    },
  },
  {
    ".sidebar-overline": {
      margin: "7px 26px 24px",
      padding: "9px 12px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "8px",
      color: designColors.light,
      fontSize: "10px",
      letterSpacing: ".84px",
      fontWeight: "700",
      textAlign: "center",
    },
  },
  {
    ".nav-sections": {
      padding: "0 13px",
    },
  },
  {
    ".nav-section": {
      marginBottom: "25px",
    },
  },
  {
    ".nav-label": {
      fontSize: "10px",
      fontWeight: "800",
      letterSpacing: "1.5px",
      color: designColors.muted,
      padding: "0 14px",
      marginBottom: "10px",
    },
  },
  {
    ".nav-item": {
      appearance: "none",
      border: "0",
      background: "transparent",
      color: designColors.light,
      width: "100%",
      height: "44px",
      display: "flex",
      alignItems: "center",
      gap: "13px",
      padding: "0 14px",
      borderRadius: "9px",
      textAlign: "left",
      fontSize: "13px",
      fontWeight: "600",
      transition: "background .15s,color .15s",
      marginBottom: "4px",
      position: "relative",
    },
  },
  {
    ".nav-item svg": {
      flex: "0 0 auto",
      opacity: ".86",
    },
  },
  {
    ".nav-item span:nth-child(2)": {
      flex: "1",
    },
  },
  {
    ".nav-item:hover": {
      background: designColors.dark,
      color: designColors.light,
    },
  },
  {
    ".nav-item.selected": {
      background: designColors.primary,
      color: designColors.light,
      boxShadow: `inset 3px 0 ${designColors.accent}`,
    },
  },
  {
    ".nav-item.selected svg": {
      color: designColors.light,
      opacity: "1",
    },
  },
  {
    ".nav-count": {
      minWidth: "23px",
      height: "22px",
      padding: "0 5px",
      borderRadius: "7px",
      background: statusColors.warningSoft,
      color: statusColors.warning,
      fontSize: "11px",
      fontWeight: "800",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".sidebar-bottom": {
      marginTop: "auto",
      padding: "3px 13px 18px",
    },
  },
  {
    ".next-up-card": {
      margin: "2px 7px 22px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "13px",
      background: `linear-gradient(145deg,${designColors.primary},${designColors.dark})`,
      padding: "19px 16px 17px",
      position: "relative",
      overflow: "hidden",
    },
  },
  {
    ".next-up-card:before": {
      content: "''",
      position: "absolute",
      right: "-42px",
      top: "-44px",
      background: withOpacity(designColors.accent, 0.133),
      width: "130px",
      height: "130px",
      borderRadius: "50%",
    },
  },
  {
    ".next-up-icon": {
      width: "30px",
      height: "30px",
      borderRadius: "9px",
      display: "grid",
      placeItems: "center",
      background: designColors.primary,
      color: designColors.light,
      marginBottom: "12px",
    },
  },
  {
    ".next-up-card>span": {
      display: "block",
      fontSize: "10px",
      letterSpacing: "1px",
      color: designColors.light,
      fontWeight: "800",
      marginBottom: "8px",
    },
  },
  {
    ".next-up-card>strong": {
      fontSize: "13px",
      lineHeight: "1.4",
      display: "block",
      color: designColors.background,
      marginBottom: "18px",
    },
  },
  {
    ".next-up-card>button": {
      display: "flex",
      gap: "7px",
      alignItems: "center",
      background: "transparent",
      border: "0",
      padding: "0",
      color: designColors.light,
      fontSize: "12px",
      fontWeight: "700",
    },
  },
  {
    ".sidebar-settings": {
      marginBottom: "16px",
    },
  },
  {
    ".sidebar-signature": {
      padding: "17px 10px 0",
      borderTop: `1px solid ${designColors.border}`,
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  },
  {
    ".avatar-small,.avatar-top": {
      width: "35px",
      height: "35px",
      borderRadius: "11px",
      display: "grid",
      placeItems: "center",
      background: designColors.surface,
      color: designColors.primary,
      fontSize: "12px",
      fontWeight: "800",
    },
  },
  {
    ".avatar-small": {
      background: designColors.primary,
      color: designColors.primary,
    },
  },
  {
    ".sidebar-signature strong": {
      display: "block",
      color: designColors.light,
      fontSize: "11px",
    },
  },
  {
    ".sidebar-signature small": {
      display: "block",
      color: designColors.muted,
      fontSize: "10px",
      marginTop: "4px",
    },
  },
  {
    ".nav-close": {
      display: "none",
    },
  },
  {
    ".app-main": {
      marginLeft: "264px",
      minWidth: "0",
    },
  },
  {
    ".topbar": {
      height: "76px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 42px",
      background: designColors.background,
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: "0",
      zIndex: "20",
    },
  },
  {
    ".topbar-left,.topbar-right": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
  },
  {
    ".topbar-left": {
      fontSize: "12px",
      fontWeight: "650",
    },
  },
  {
    ".breadcrumb-root": {
      color: designColors.muted,
    },
  },
  {
    ".breadcrumb-arrow": {
      color: designColors.border,
    },
  },
  {
    ".breadcrumb-current": {
      color: designColors.muted,
    },
  },
  {
    ".topbar-right": {
      gap: "25px",
    },
  },
  {
    ".topbar-date": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: designColors.muted,
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  {
    ".notification-button": {
      width: "31px",
      height: "31px",
      border: "0",
      background: "transparent",
      display: "grid",
      placeItems: "center",
      color: designColors.muted,
      position: "relative",
    },
  },
  {
    ".notification-dot": {
      position: "absolute",
      width: "8px",
      height: "8px",
      borderRadius: "100%",
      background: statusColors.warning,
      border: `2px solid ${designColors.background}`,
      right: "4px",
      top: "3px",
    },
  },
  {
    ".avatar-top": {
      width: "37px",
      height: "37px",
      borderRadius: "11px",
    },
  },
  {
    ".mobile-menu": {
      display: "none !important",
    },
  },
  {
    ".main-content": {
      maxWidth: "none",
      margin: "auto",
      padding: "39px 40px 20px",
    },
  },
  {
    ".page-header": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "18px",
      margin: "0 0 30px",
    },
  },
  {
    ".page-breadcrumb": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "10px",
      letterSpacing: "1.1px",
      fontWeight: "800",
      color: designColors.muted,
      marginBottom: "13px",
    },
  },
  {
    ".live-dot,.small-live-dot": {
      background: designColors.primary,
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      display: "inline-block",
      boxShadow: `0 0 0 3px ${withOpacity(designColors.primary, 0.133)}`,
    },
  },
  {
    ".page-header h1": {
      fontSize: "28px",
      lineHeight: "1.25",
      letterSpacing: "-1.15px",
      color: designColors.dark,
      marginBottom: "8px",
      fontWeight: "800",
    },
  },
  {
    ".page-header p": {
      fontSize: "13px",
      color: designColors.muted,
      margin: "0",
    },
  },
  {
    ".edition-chip": {
      borderRadius: "30px",
      padding: "10px 15px",
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      fontSize: "11px",
      maxWidth: "240px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      fontWeight: "700",
      color: designColors.muted,
      boxShadow: `0 3px 10px ${withOpacity(designColors.dark, 0.016)}`,
      display: "block",
    },
  },
  {
    ".edition-chip>span": {
      display: "inline-block",
      width: "8px",
      height: "8px",
      background: designColors.accent,
      borderRadius: "100%",
      marginRight: "7px",
    },
  },
  {
    ".view-stack": {
      display: "flex",
      flexDirection: "column",
      gap: "23px",
    },
  },
  {
    ".panel": {
      background: designColors.background,
      border: "1px solid var(--border)",
      borderRadius: "14px",
      boxShadow: `0 5px 25px ${withOpacity(designColors.dark, 0.027)}`,
      padding: "23px 25px",
      minWidth: "0",
    },
  },
  {
    ".panel-heading": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "20px",
      marginBottom: "22px",
    },
  },
  {
    ".panel-heading h3": {
      color: designColors.dark,
      fontSize: "15px",
      fontWeight: "800",
      margin: "0 0 6px",
    },
  },
  {
    ".panel-heading p": {
      fontSize: "11px",
      color: designColors.muted,
      lineHeight: "1.5",
      margin: "0",
    },
  },
  {
    ".panel-heading>div:last-child": {
      flexShrink: "0",
    },
  },
  {
    ".small-chip": {
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      padding: "7px 11px",
      borderRadius: "8px",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: designColors.muted,
      fontSize: "10px",
      fontWeight: "800",
      whiteSpace: "nowrap",
    },
  },
  {
    ".small-live-dot": {
      width: "5px",
      height: "5px",
    },
  },
  {
    ".muted-icon": {
      color: designColors.primary,
    },
  },
  {
    ".btn": {
      border: "0",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      padding: "11px 17px",
      minHeight: "40px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: "800",
      whiteSpace: "nowrap",
      transition: "transform .15s,box-shadow .15s,background .15s",
    },
  },
  {
    ".btn:not(:disabled):hover": {
      transform: "translateY(-1px)",
    },
  },
  {
    ".btn-primary": {
      background: designColors.accent,
      color: designColors.background,
      boxShadow: `0 5px 13px ${withOpacity(designColors.accent, 0.145)}`,
    },
  },
  {
    ".btn-primary:hover": {
      background: designColors.accent,
      boxShadow: `0 7px 15px ${withOpacity(designColors.accent, 0.212)}`,
    },
  },
  {
    ".btn-subtle": {
      background: designColors.surface,
      color: designColors.muted,
      border: `1px solid ${designColors.border}`,
    },
  },
  {
    ".btn-subtle:hover": {
      background: designColors.surface,
    },
  },
  {
    ".btn-success": {
      background: statusColors.successSoft,
      color: statusColors.success,
      border: `1px solid ${statusColors.successSoft}`,
    },
  },
  {
    ".btn-success:hover": {
      background: statusColors.successSoft,
    },
  },
  {
    ".btn-warning": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".icon-button": {
      display: "inline-grid",
      placeItems: "center",
      flex: "0 0 auto",
      border: "0",
      background: "transparent",
      borderRadius: "8px",
      width: "32px",
      height: "32px",
      color: designColors.muted,
    },
  },
  {
    ".icon-button:hover": {
      background: designColors.surface,
    },
  },
  {
    ".danger-hover:hover": {
      background: statusColors.errorSoft,
      color: statusColors.error,
    },
  },
  {
    ".text-link,.metric-link": {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      background: "transparent",
      border: "0",
      color: designColors.primary,
      fontSize: "11px",
      fontWeight: "800",
      padding: "0",
    },
  },
  {
    ".text-link:hover,.metric-link:hover": {
      textDecoration: "underline",
    },
  },
  {
    ".row-link": {
      border: "0",
      background: designColors.surface,
      color: designColors.primary,
      fontSize: "11px",
      fontWeight: "800",
      padding: "8px 12px",
      borderRadius: "7px",
    },
  },
  {
    ".row-link:hover": {
      background: designColors.surface,
    },
  },
  {
    ".wide-soft-button": {
      border: "0",
      background: designColors.surface,
      color: designColors.primary,
      fontSize: "11px",
      fontWeight: "800",
      padding: "12px 14px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: "100%",
      marginTop: "21px",
    },
  },
  {
    ".wide-soft-button:hover": {
      background: designColors.surface,
    },
  },
  {
    ".progress-track": {
      width: "100%",
      background: designColors.surface,
      borderRadius: "50px",
      overflow: "hidden",
    },
  },
  {
    ".progress-fill": {
      height: "100%",
      borderRadius: "inherit",
      transition: "width .35s ease",
    },
  },
  {
    ".footer": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      fontSize: "10px",
      color: designColors.muted,
      borderTop: `1px solid ${designColors.border}`,
      padding: "23px 3px",
      marginTop: "40px",
    },
  },
  {
    ".footer span:first-child": {
      fontWeight: "800",
    },
  },
  {
    ".footer-dot": {
      color: designColors.primary,
    },
  },
  {
    ".welcome-banner": {
      position: "relative",
      overflow: "hidden",
      minHeight: "226px",
      borderRadius: "16px",
      background: `linear-gradient(107deg,${designColors.primary} 0%,${designColors.primary} 49%,${designColors.primary} 100%)`,
      padding: "31px 38px",
      color: designColors.background,
      display: "flex",
      alignItems: "center",
    },
  },
  {
    ".welcome-banner:after": {
      content: "''",
      background: `radial-gradient(circle,${withOpacity(designColors.light, 0.082)},transparent 70%)`,
      position: "absolute",
      width: "490px",
      height: "490px",
      right: "-80px",
      top: "-115px",
    },
  },
  {
    ".welcome-copy": {
      position: "relative",
      zIndex: "2",
    },
  },
  {
    ".welcome-eyebrow": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "10px",
      letterSpacing: "1.2px",
      fontWeight: "800",
      color: designColors.primary,
      marginBottom: "12px",
    },
  },
  {
    ".welcome-copy h2": {
      color: designColors.background,
      fontSize: "26px",
      lineHeight: "1.27",
      letterSpacing: "-1.2px",
      margin: "0 0 10px",
      fontWeight: "800",
    },
  },
  {
    ".welcome-copy h2 span": {
      color: designColors.light,
    },
  },
  {
    ".welcome-copy p": {
      fontSize: "11px",
      color: designColors.light,
      marginBottom: "19px",
      maxWidth: "440px",
      lineHeight: "1.55",
    },
  },
  {
    ".banner-button": {
      display: "inline-flex",
      alignItems: "center",
      gap: "11px",
      background: designColors.background,
      color: designColors.primary,
      border: "0",
      borderRadius: "8px",
      padding: "11px 17px",
      fontSize: "11px",
      fontWeight: "800",
      boxShadow: `0 8px 20px ${withOpacity(designColors.dark, 0.075)}`,
    },
  },
  {
    ".banner-button:hover": {
      background: designColors.surface,
    },
  },
  {
    ".banner-art": {
      position: "absolute",
      zIndex: "1",
      right: "4%",
      top: "0",
      width: "380px",
      height: "100%",
      pointerEvents: "none",
    },
  },
  {
    ".art-glow": {
      width: "250px",
      height: "250px",
      background: withOpacity(designColors.accent, 0.169),
      filter: "blur(40px)",
      borderRadius: "100%",
      position: "absolute",
      top: "-12px",
      right: "28px",
    },
  },
  {
    ".art-orbit": {
      position: "absolute",
      border: `1px solid ${withOpacity(designColors.border, 0.196)}`,
      transform: "rotate(-26deg)",
      borderRadius: "100%",
    },
  },
  {
    ".orbit-a": {
      width: "340px",
      height: "185px",
      top: "27px",
      right: "-13px",
    },
  },
  {
    ".orbit-b": {
      width: "275px",
      height: "139px",
      right: "34px",
      top: "50px",
    },
  },
  {
    ".art-main-card": {
      position: "absolute",
      width: "232px",
      height: "167px",
      top: "31px",
      right: "66px",
      transform: "rotate(-7deg)",
      padding: "20px",
      background: `linear-gradient(134deg,${designColors.surface},${designColors.surface})`,
      color: designColors.dark,
      borderRadius: "14px",
      boxShadow: `15px 19px 30px ${withOpacity(designColors.dark, 0.29)}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  {
    ".art-check": {
      width: "39px",
      height: "39px",
      borderRadius: "12px",
      display: "grid",
      placeItems: "center",
      background: designColors.surface,
      color: designColors.primary,
      marginBottom: "9px",
    },
  },
  {
    ".art-main-card>span": {
      fontSize: "9px",
      color: designColors.muted,
      fontWeight: "800",
      letterSpacing: ".65px",
    },
  },
  {
    ".art-main-card>strong": {
      fontSize: "13px",
      margin: "4px 0 14px",
      maxWidth: "180px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  {
    ".art-line": {
      height: "6px",
      background: designColors.light,
      width: "100%",
      borderRadius: "20px",
    },
  },
  {
    ".art-line div": {
      width: "70%",
      background: designColors.accent,
      height: "100%",
      borderRadius: "20px",
    },
  },
  {
    ".art-mini-stars": {
      position: "absolute",
      right: "16px",
      top: "18px",
      color: designColors.light,
      fontSize: "14px",
    },
  },
  {
    ".art-float": {
      position: "absolute",
      background: withOpacity(designColors.background, 0.922),
      boxShadow: `0 8px 30px ${withOpacity(designColors.dark, 0.231)}`,
      borderRadius: "10px",
      color: designColors.text,
      fontWeight: "800",
    },
  },
  {
    ".art-float-a": {
      left: "6px",
      top: "133px",
      transform: "rotate(10deg)",
      padding: "10px 13px",
      fontSize: "14px",
    },
  },
  {
    ".art-float-a span": {
      display: "block",
      fontSize: "9px",
      color: designColors.muted,
    },
  },
  {
    ".art-float-b": {
      right: "7px",
      top: "24px",
      fontSize: "28px",
      padding: "1px 12px",
      color: statusColors.warning,
      transform: "rotate(18deg)",
    },
  },
  {
    ".metric-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "17px",
    },
  },
  {
    ".metric-card": {
      background: designColors.background,
      border: "1px solid var(--border)",
      borderRadius: "13px",
      padding: "21px 21px 19px",
      boxShadow: `0 4px 19px ${withOpacity(designColors.dark, 0.024)}`,
      minWidth: "0",
    },
  },
  {
    ".metric-top": {
      display: "flex",
      justifyContent: "space-between",
      gap: "7px",
      alignItems: "flex-start",
    },
  },
  {
    ".metric-top>span": {
      fontSize: "11px",
      fontWeight: "700",
      color: designColors.muted,
      paddingTop: "4px",
    },
  },
  {
    ".metric-icon,.mini-icon": {
      display: "grid",
      placeItems: "center",
      width: "36px",
      height: "36px",
      borderRadius: "10px",
      flexShrink: "0",
    },
  },
  {
    ".metric-icon.blue,.mini-icon.blue": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".metric-icon.teal,.mini-icon.teal": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".metric-icon.purple,.mini-icon.purple": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".metric-icon.orange,.mini-icon.orange": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".metric-value": {
      color: designColors.dark,
      fontFamily: '"Inter Variable", sans-serif',
      fontSize: "26px",
      fontWeight: "800",
      letterSpacing: "-1.6px",
      margin: "15px 0 5px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".metric-foot": {
      fontSize: "10px",
      color: designColors.muted,
      minHeight: "29px",
      lineHeight: "1.5",
    },
  },
  {
    ".metric-card .progress-track": {
      marginTop: "11px",
    },
  },
  {
    ".metric-link": {
      marginTop: "6px",
      fontSize: "10px",
    },
  },
  {
    ".dashboard-main-grid": {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.38fr) minmax(315px,1fr)",
      gap: "20px",
    },
  },
  {
    ".chart-sum": {
      display: "flex",
      alignItems: "baseline",
      gap: "10px",
      margin: "-7px 0 19px",
    },
  },
  {
    ".chart-sum strong": {
      font: '800 23px "Inter Variable"',
      color: designColors.dark,
      letterSpacing: "-1px",
    },
  },
  {
    ".chart-sum span": {
      color: designColors.muted,
      fontSize: "10px",
    },
  },
  {
    ".weekly-chart": {
      display: "flex",
      gap: "12px",
      height: "154px",
      padding: "0 5px 8px",
      alignItems: "end",
      justifyContent: "space-around",
    },
  },
  {
    ".bar-col": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "end",
      flex: "1",
      minWidth: "0",
      height: "100%",
      gap: "7px",
    },
  },
  {
    ".bar-number": {
      fontSize: "9px",
      color: designColors.muted,
      fontWeight: "800",
      height: "12px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".bar-track": {
      flex: "1",
      width: "min(35px,70%)",
      position: "relative",
      display: "flex",
      alignItems: "flex-end",
      background: "transparent",
      borderRadius: "6px 6px 0 0",
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".bar-fill": {
      width: "100%",
      background: designColors.surface,
      borderRadius: "5px 5px 0 0",
      minHeight: "0",
      transition: "height .3s",
    },
  },
  {
    ".bar-highlight": {
      background: designColors.accent,
    },
  },
  {
    ".bar-label": {
      color: designColors.muted,
      fontSize: "10px",
      fontWeight: "700",
    },
  },
  {
    ".bar-label-active": {
      color: designColors.primary,
    },
  },
  {
    ".chart-bottom": {
      borderTop: `1px solid ${designColors.border}`,
      marginTop: "14px",
      paddingTop: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: designColors.muted,
      fontSize: "10px",
    },
  },
  {
    ".chart-bottom>span": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  },
  {
    ".legend-dot": {
      width: "8px",
      height: "8px",
      background: designColors.accent,
      borderRadius: "3px",
    },
  },
  {
    ".weekly-target": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginTop: "5px",
    },
  },
  {
    ".target-ring": {
      width: "112px",
      height: "112px",
      borderRadius: "100%",
      background: `conic-gradient(${designColors.accent} var(--progress),${designColors.surface} var(--progress))`,
      padding: "10px",
      flexShrink: "0",
    },
  },
  {
    ".target-ring>div": {
      background: designColors.paper,
      borderRadius: "100%",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    ".target-ring strong": {
      color: designColors.dark,
      fontSize: "22px",
      letterSpacing: "-1px",
      fontFamily: '"Inter Variable", sans-serif',
    },
  },
  {
    ".target-ring span": {
      fontSize: "9px",
      color: designColors.muted,
      fontWeight: "650",
    },
  },
  {
    ".weekly-target>div:last-child": {
      minWidth: "0",
    },
  },
  {
    ".target-hint": {
      fontSize: "10px",
      color: designColors.muted,
      display: "block",
      marginBottom: "8px",
    },
  },
  {
    ".weekly-target>div:last-child>strong": {
      fontSize: "15px",
      whiteSpace: "nowrap",
      color: designColors.dark,
      fontFamily: '"Inter Variable", sans-serif',
    },
  },
  {
    ".weekly-target>div:last-child>strong span": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".weekly-target p": {
      fontSize: "10px",
      color: designColors.muted,
      lineHeight: "1.5",
      margin: "8px 0 0",
    },
  },
  {
    ".target-divider": {
      height: "1px",
      background: designColors.surface,
      margin: "22px 0",
    },
  },
  {
    ".target-line": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      marginBottom: "13px",
    },
  },
  {
    ".target-line>span": {
      fontSize: "11px",
      fontWeight: "700",
      color: designColors.muted,
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  },
  {
    ".target-line strong": {
      fontSize: "14px",
      color: designColors.dark,
    },
  },
  {
    ".target-line small": {
      fontSize: "11px",
      color: designColors.muted,
    },
  },
  {
    ".target-icon": {
      width: "29px",
      height: "29px",
      display: "grid",
      placeItems: "center",
      borderRadius: "8px",
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".discipline-list": {
      display: "flex",
      flexDirection: "column",
      gap: "19px",
    },
  },
  {
    ".discipline-progress-head": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      marginBottom: "9px",
      fontSize: "11px",
      color: designColors.muted,
    },
  },
  {
    ".discipline-progress-head>div": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      fontWeight: "700",
    },
  },
  {
    ".discipline-dot": {
      width: "9px",
      height: "9px",
      borderRadius: "3px",
      flexShrink: "0",
    },
  },
  {
    ".discipline-progress-head>span": {
      color: designColors.muted,
      fontSize: "10px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".discipline-progress-head strong": {
      color: designColors.muted,
      marginLeft: "9px",
    },
  },
  {
    ".discipline-progress .progress-track": {
      height: "6px !important",
    },
  },
  {
    ".due-pill": {
      background: designColors.surface,
      color: designColors.primary,
      borderRadius: "20px",
      padding: "7px 10px",
      fontSize: "10px",
      fontWeight: "800",
    },
  },
  {
    ".due-active": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".due-list": {
      display: "flex",
      flexDirection: "column",
    },
  },
  {
    ".due-item": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderBottom: `1px solid ${designColors.border}`,
      padding: "13px 0",
    },
  },
  {
    ".due-item:last-child": {
      borderBottom: "0",
    },
  },
  {
    ".due-item-icon": {
      display: "grid",
      placeItems: "center",
      width: "37px",
      height: "37px",
      borderRadius: "10px",
      background: statusColors.warningSoft,
      color: statusColors.warning,
      flexShrink: "0",
    },
  },
  {
    ".due-item>div:nth-child(2)": {
      flex: "1",
      minWidth: "0",
    },
  },
  {
    ".due-item strong": {
      display: "block",
      fontSize: "11px",
      fontWeight: "800",
      color: designColors.text,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  {
    ".due-item span": {
      display: "block",
      color: designColors.muted,
      fontSize: "10px",
      marginTop: "5px",
    },
  },
  {
    ".due-now": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
      padding: "5px 8px",
      fontSize: "9px !important",
      fontWeight: "800",
      borderRadius: "5px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".no-reviews": {
      minHeight: "178px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "10px 20px",
    },
  },
  {
    ".good-circle": {
      background: designColors.surface,
      color: designColors.primary,
      borderRadius: "50%",
      width: "49px",
      height: "49px",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".no-reviews h4": {
      fontSize: "12px",
      margin: "12px 0 7px",
      color: designColors.text,
    },
  },
  {
    ".no-reviews p": {
      fontSize: "10px",
      color: designColors.muted,
      lineHeight: "1.6",
      maxWidth: "250px",
      marginBottom: "0",
    },
  },
  {
    ".weak-row": {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "12px 0",
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".weak-row:last-child": {
      border: "0",
    },
  },
  {
    ".weak-number": {
      fontSize: "11px",
      color: designColors.border,
      fontWeight: "800",
    },
  },
  {
    ".weak-row>div": {
      flex: "1",
    },
  },
  {
    ".weak-row strong": {
      display: "block",
      color: designColors.text,
      fontSize: "12px",
    },
  },
  {
    ".weak-row span:not(.weak-number)": {
      display: "block",
      color: designColors.muted,
      fontSize: "10px",
      marginTop: "5px",
    },
  },
  {
    ".section-toolbar": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      flexWrap: "wrap",
    },
  },
  {
    ".section-toolbar-left,.toolbar-buttons": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
    },
  },
  {
    ".toolbar-info": {
      display: "inline-flex",
      alignItems: "center",
      gap: "9px",
      color: designColors.muted,
      fontSize: "12px",
      fontWeight: "750",
    },
  },
  {
    ".toolbar-info svg": {
      color: designColors.primary,
    },
  },
  {
    ".edital-progress-panel": {
      borderRadius: "13px",
      background: `linear-gradient(112deg,${designColors.primary},${designColors.primary})`,
      padding: "24px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "25px",
      color: designColors.background,
    },
  },
  {
    ".eyebrow": {
      fontSize: "10px",
      letterSpacing: "1.15px",
      fontWeight: "800",
      color: designColors.primary,
    },
  },
  {
    ".edital-progress-main": {
      display: "flex",
      alignItems: "baseline",
      gap: "11px",
      marginTop: "8px",
    },
  },
  {
    ".edital-progress-main strong": {
      font: '800 32px "Inter Variable"',
      color: designColors.background,
      letterSpacing: "-1px",
    },
  },
  {
    ".edital-progress-main span": {
      fontSize: "11px",
      color: designColors.primary,
    },
  },
  {
    ".edital-progress-right": {
      width: "min(390px,48%)",
    },
  },
  {
    ".edital-progress-right>div:first-child": {
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      color: designColors.primary,
      fontSize: "11px",
      marginBottom: "10px",
    },
  },
  {
    ".edital-progress-right strong": {
      color: designColors.background,
    },
  },
  {
    ".filter-row": {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
  },
  {
    ".search-wrap": {
      height: "39px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      borderRadius: "8px",
      padding: "0 13px",
      flex: "1",
      minWidth: "200px",
    },
  },
  {
    ".search-wrap svg": {
      color: designColors.muted,
      flexShrink: "0",
    },
  },
  {
    ".search-wrap input:not(.MuiInputBase-input)": {
      width: "100%",
      border: "0",
      background: "transparent",
      padding: "0",
      color: designColors.primary,
      fontSize: "11px",
      minWidth: "0",
      outline: "none",
      boxShadow: "none !important",
    },
  },
  {
    ".filter-select": {
      height: "39px",
      minWidth: "150px",
      maxWidth: "240px",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      borderRadius: "8px",
      padding: "0 12px",
      color: designColors.muted,
      fontWeight: "650",
      fontSize: "11px",
    },
  },
  {
    ".table-scroll": {
      overflowX: "auto",
    },
  },
  {
    ".data-table": {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
      minWidth: "600px",
    },
  },
  {
    ".data-table th": {
      color: designColors.muted,
      fontSize: "9px",
      letterSpacing: "1px",
      fontWeight: "800",
      borderBottom: `1px solid ${designColors.border}`,
      padding: "14px 12px",
      whiteSpace: "nowrap",
      background: designColors.surface,
    },
  },
  {
    ".data-table td": {
      fontSize: "11px",
      color: designColors.muted,
      padding: "15px 12px",
      borderBottom: `1px solid ${designColors.border}`,
      verticalAlign: "middle",
    },
  },
  {
    ".data-table tbody tr:last-child td": {
      borderBottom: "0",
    },
  },
  {
    ".data-table tbody tr:hover": {
      background: designColors.surface,
    },
  },
  {
    ".data-table strong": {
      color: designColors.text,
      fontWeight: "800",
    },
  },
  {
    ".data-table th:first-child,.data-table td:first-child": {
      paddingLeft: "13px",
    },
  },
  {
    ".data-table th:last-child,.data-table td:last-child": {
      paddingRight: "8px",
    },
  },
  {
    ".edital-table": {
      minWidth: "735px",
    },
  },
  {
    ".table-topic": {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      minWidth: "215px",
    },
  },
  {
    ".topic-symbol": {
      width: "33px",
      height: "33px",
      display: "grid",
      placeItems: "center",
      borderRadius: "9px",
      flexShrink: "0",
    },
  },
  {
    ".table-topic strong,.table-cell-main strong": {
      fontSize: "11px",
      display: "block",
      lineHeight: "1.35",
    },
  },
  {
    ".table-topic span:not(.topic-symbol),.table-cell-main small": {
      display: "block",
      fontSize: "10px",
      color: designColors.muted,
      marginTop: "5px",
    },
  },
  {
    ".table-cell-main": {
      maxWidth: "320px",
    },
  },
  {
    ".status-pill": {
      fontSize: "10px",
      fontWeight: "800",
      borderRadius: "20px",
      padding: "6px 9px",
      whiteSpace: "nowrap",
      display: "inline-block",
    },
  },
  {
    ".status-not_started": {
      background: designColors.surface,
      color: designColors.muted,
    },
  },
  {
    ".status-in_progress": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".status-completed": {
      background: statusColors.successSoft,
      color: statusColors.success,
    },
  },
  {
    ".mastery-pill": {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "10px",
      padding: "6px 10px",
      borderRadius: "20px",
      fontWeight: "800",
      whiteSpace: "nowrap",
    },
  },
  {
    ".mastery-pill .circle": {
      height: "6px",
      width: "6px",
      borderRadius: "50%",
      background: "currentColor",
    },
  },
  {
    ".mastery-weak": {
      background: statusColors.errorSoft,
      color: statusColors.error,
    },
  },
  {
    ".mastery-medium": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".mastery-strong": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".table-checkbox": {
      width: "20px",
      height: "20px",
      border: `1.5px solid ${designColors.border}`,
      background: designColors.background,
      color: "transparent",
      display: "grid",
      placeItems: "center",
      borderRadius: "5px",
      transition: "all .15s",
      marginLeft: "6px",
    },
  },
  {
    ".table-checkbox.checked": {
      background: designColors.primary,
      color: designColors.background,
      borderColor: designColors.border,
    },
  },
  {
    ".table-checkbox:hover": {
      borderColor: designColors.border,
    },
  },
  {
    ".table-actions": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "3px",
    },
  },
  {
    ".table-muted": {
      color: `${designColors.muted} !important`,
    },
  },
  {
    ".accuracy-tag": {
      display: "inline-block",
      borderRadius: "8px",
      padding: "7px 10px",
      fontWeight: "800",
      fontSize: "11px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".accuracy-tag.good": {
      color: designColors.primary,
      background: designColors.surface,
    },
  },
  {
    ".accuracy-tag.medium": {
      color: statusColors.warning,
      background: statusColors.warningSoft,
    },
  },
  {
    ".accuracy-tag.low": {
      color: statusColors.error,
      background: statusColors.errorSoft,
    },
  },
  {
    ".tip": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      padding: "13px 16px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      color: designColors.primary,
      borderRadius: "9px",
      fontSize: "11px",
      lineHeight: "1.55",
    },
  },
  {
    ".tip svg": {
      flexShrink: "0",
      color: designColors.primary,
    },
  },
  {
    ".tip strong": {
      fontWeight: "800",
      color: designColors.primary,
    },
  },
  {
    ".empty": {
      minHeight: "205px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 15px",
      textAlign: "center",
    },
  },
  {
    ".empty-icon": {
      width: "52px",
      height: "52px",
      background: designColors.surface,
      color: designColors.primary,
      borderRadius: "14px",
      display: "grid",
      placeItems: "center",
      marginBottom: "16px",
    },
  },
  {
    ".empty h4": {
      color: designColors.primary,
      marginBottom: "7px",
      fontSize: "13px",
    },
  },
  {
    ".empty p": {
      color: designColors.muted,
      maxWidth: "350px",
      lineHeight: "1.65",
      fontSize: "11px",
      margin: "0 0 14px",
    },
  },
  {
    ".empty .text-link": {
      fontSize: "11px",
    },
  },
  {
    ".mini-metric-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "18px",
    },
  },
  {
    ".mini-metric": {
      background: designColors.background,
      border: "1px solid var(--border)",
      borderRadius: "13px",
      padding: "21px 22px",
      display: "grid",
      gridTemplateColumns: "48px 1fr",
      gridTemplateRows: "auto auto auto",
      alignItems: "center",
      boxShadow: `0 3px 17px ${withOpacity(designColors.dark, 0.024)}`,
    },
  },
  {
    ".mini-icon": {
      gridRow: "1/4",
      width: "41px",
      height: "41px",
      alignSelf: "center",
    },
  },
  {
    ".mini-metric>span": {
      fontSize: "10px",
      fontWeight: "800",
      color: designColors.muted,
      letterSpacing: ".8px",
    },
  },
  {
    ".mini-metric>strong": {
      font: '800 26px "Inter Variable"',
      letterSpacing: "-1.1px",
      color: designColors.dark,
      marginTop: "5px",
    },
  },
  {
    ".mini-metric>small": {
      fontSize: "10px",
      color: designColors.muted,
      marginTop: "2px",
    },
  },
  {
    ".topic-performance-list": {
      display: "flex",
      flexDirection: "column",
    },
  },
  {
    ".performance-row": {
      display: "flex",
      alignItems: "center",
      gap: "24px",
      borderBottom: `1px solid ${designColors.border}`,
      padding: "14px 4px",
    },
  },
  {
    ".performance-row:last-child": {
      border: "0",
    },
  },
  {
    ".performance-info": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: "1",
      minWidth: "0",
    },
  },
  {
    ".performance-info>div:last-child": {
      minWidth: "0",
    },
  },
  {
    ".performance-mark": {
      width: "37px",
      height: "37px",
      display: "grid",
      placeItems: "center",
      borderRadius: "9px",
      flexShrink: "0",
    },
  },
  {
    ".performance-info strong": {
      color: designColors.text,
      fontSize: "11px",
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  {
    ".performance-info span": {
      color: designColors.muted,
      fontSize: "10px",
      marginTop: "4px",
      display: "block",
    },
  },
  {
    ".performance-bar": {
      flex: "0 0 29%",
      maxWidth: "200px",
    },
  },
  {
    ".performance-row .accuracy-tag": {
      minWidth: "70px",
      textAlign: "center",
    },
  },
  {
    ".inline-result": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "8px",
      padding: "13px 15px",
      fontSize: "12px",
      color: designColors.primary,
    },
  },
  {
    ".inline-result strong": {
      font: '800 16px "Inter Variable"',
      color: designColors.primary,
    },
  },
  {
    ".cycle-cards": {
      display: "flex",
      gap: "9px",
      overflowX: "auto",
      paddingBottom: "5px",
    },
  },
  {
    ".cycle-card": {
      minWidth: "132px",
      flex: "1",
      maxWidth: "200px",
      minHeight: "112px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      textAlign: "left",
      padding: "13px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "8px",
      position: "relative",
      transition: "border .15s,background .15s",
    },
  },
  {
    ".cycle-card:hover": {
      background: designColors.surface,
    },
  },
  {
    ".cycle-card.active": {
      border: `1.5px solid ${designColors.border}`,
      background: designColors.surface,
      boxShadow: `0 0 0 2px ${designColors.surface} inset`,
    },
  },
  {
    ".cycle-card-index": {
      color: designColors.primary,
      fontSize: "10px",
      fontWeight: "800",
    },
  },
  {
    ".cycle-card-dot": {
      width: "9px",
      height: "9px",
      borderRadius: "3px",
    },
  },
  {
    ".cycle-card strong": {
      fontSize: "11px",
      lineHeight: "1.3",
      color: designColors.primary,
      maxWidth: "125px",
    },
  },
  {
    ".cycle-next-label": {
      position: "absolute",
      right: "8px",
      top: "9px",
      fontSize: "8px",
      color: designColors.primary,
      fontWeight: "850",
      letterSpacing: ".5px",
    },
  },
  {
    ".study-grid": {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.12fr) minmax(280px,.88fr)",
      gap: "20px",
    },
  },
  {
    ".timer-panel": {
      paddingBottom: "18px",
    },
  },
  {
    ".timer-state": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      background: designColors.surface,
      color: designColors.muted,
      padding: "7px 10px",
      borderRadius: "20px",
      fontSize: "10px",
      fontWeight: "800",
    },
  },
  {
    ".timer-state>span": {
      width: "6px",
      height: "6px",
      background: designColors.muted,
      borderRadius: "50%",
    },
  },
  {
    ".timer-state.is-running": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".timer-state.is-running>span": {
      background: designColors.primary,
      boxShadow: `0 0 0 3px ${withOpacity(designColors.primary, 0.141)}`,
    },
  },
  {
    ".timer-content": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  {
    ".timer-face": {
      textAlign: "center",
      margin: "4px 0 24px",
    },
  },
  {
    ".timer-icon": {
      color: designColors.primary,
      background: designColors.surface,
      display: "grid",
      placeItems: "center",
      width: "48px",
      height: "48px",
      margin: "0 auto 17px",
      borderRadius: "15px",
    },
  },
  {
    ".timer-digits": {
      font: '800 clamp(35px,4.6vw,58px) "Inter Variable"',
      letterSpacing: "0",
      color: designColors.dark,
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    ".timer-caption": {
      color: designColors.border,
      letterSpacing: "2px",
      fontSize: "9px",
      fontWeight: "800",
      marginTop: "5px",
    },
  },
  {
    ".timer-selects": {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },
  },
  {
    ".timer-actions": {
      margin: "21px 0 0",
      display: "flex",
      gap: "11px",
      justifyContent: "center",
    },
  },
  {
    ".timer-actions .btn": {
      minWidth: "128px",
    },
  },
  {
    ".timer-save": {
      background: designColors.surface,
      color: designColors.primary,
      border: `1px solid ${designColors.border}`,
      borderRadius: "9px",
      padding: "11px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      fontSize: "11px",
      fontWeight: "800",
      marginTop: "14px",
      width: "100%",
    },
  },
  {
    ".timer-note": {
      fontSize: "10px",
      color: designColors.muted,
      textAlign: "center",
      margin: "19px 0 0",
      lineHeight: "1.5",
    },
  },
  {
    ".hours-summary": {
      textAlign: "center",
      background: designColors.surface,
      borderRadius: "11px",
      padding: "24px 15px 21px",
      marginBottom: "17px",
    },
  },
  {
    ".hours-summary span": {
      fontSize: "10px",
      letterSpacing: "1px",
      color: designColors.muted,
      fontWeight: "800",
    },
  },
  {
    ".hours-summary strong": {
      display: "block",
      font: '800 33px "Inter Variable"',
      color: designColors.text,
      margin: "10px 0 4px",
    },
  },
  {
    ".hours-summary p": {
      fontSize: "11px",
      color: designColors.muted,
      margin: "0",
    },
  },
  {
    ".daily-mini-bars": {
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      margin: "22px 0",
    },
  },
  {
    ".daily-mini": {
      flex: "1",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "6px",
    },
  },
  {
    ".daily-mini>span": {
      color: designColors.muted,
      fontSize: "10px",
    },
  },
  {
    ".daily-mini>div": {
      height: "55px",
      width: "19px",
      background: designColors.surface,
      borderRadius: "4px",
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
    },
  },
  {
    ".daily-mini>div>div": {
      background: designColors.accent,
      width: "100%",
      borderRadius: "4px",
    },
  },
  {
    ".daily-mini small": {
      color: designColors.muted,
      fontSize: "9px",
    },
  },
  {
    ".study-advice": {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "9px",
      padding: "12px 13px",
    },
  },
  {
    ".study-advice svg": {
      flex: "0 0 auto",
      color: designColors.primary,
    },
  },
  {
    ".study-advice p": {
      fontSize: "10px",
      color: designColors.primary,
      lineHeight: "1.7",
      margin: "0",
    },
  },
  {
    ".study-advice strong": {
      display: "block",
      color: designColors.primary,
    },
  },
  {
    ".time-tag": {
      display: "inline-block",
      color: designColors.primary,
      background: designColors.surface,
      padding: "7px 10px",
      borderRadius: "7px",
      fontWeight: "800",
      fontSize: "11px",
    },
  },
  {
    ".review-hero": {
      background: `linear-gradient(104deg,${designColors.surface},${designColors.surface})`,
      border: `1px solid ${designColors.border}`,
      borderRadius: "13px",
      padding: "25px 28px",
      display: "flex",
      gap: "17px",
      alignItems: "center",
    },
  },
  {
    ".review-hero-icon": {
      width: "60px",
      height: "60px",
      display: "grid",
      placeItems: "center",
      borderRadius: "17px",
      background: designColors.light,
      color: designColors.primary,
      flexShrink: "0",
    },
  },
  {
    ".review-hero .eyebrow": {
      color: designColors.primary,
    },
  },
  {
    ".review-hero h2": {
      fontSize: "18px",
      color: designColors.dark,
      margin: "7px 0 6px",
    },
  },
  {
    ".review-hero p": {
      color: designColors.muted,
      fontSize: "11px",
      lineHeight: "1.5",
      margin: "0",
    },
  },
  {
    ".tabs": {
      display: "flex",
      gap: "18px",
      borderBottom: `1px solid ${designColors.border}`,
      marginBottom: "11px",
      overflowX: "auto",
    },
  },
  {
    ".tabs button": {
      border: "0",
      borderBottom: "2px solid transparent",
      background: "transparent",
      color: designColors.muted,
      fontSize: "11px",
      fontWeight: "800",
      padding: "0 5px 14px",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      gap: "9px",
    },
  },
  {
    ".tabs button.active": {
      color: designColors.primary,
      borderColor: designColors.border,
    },
  },
  {
    ".tabs button span": {
      fontSize: "9px",
      borderRadius: "15px",
      background: designColors.surface,
      padding: "3px 6px",
      color: designColors.muted,
    },
  },
  {
    ".tabs button.active span": {
      color: designColors.primary,
      background: designColors.surface,
    },
  },
  {
    ".review-list": {
      display: "flex",
      flexDirection: "column",
    },
  },
  {
    ".review-item": {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "16px 0",
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".review-item:last-child": {
      border: "0",
    },
  },
  {
    ".review-item-badge": {
      background: designColors.surface,
      color: designColors.primary,
      width: "42px",
      height: "42px",
      display: "grid",
      placeItems: "center",
      borderRadius: "11px",
      flexShrink: "0",
    },
  },
  {
    ".review-item-badge.is-done": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".review-item-main": {
      flex: "1",
      minWidth: "0",
    },
  },
  {
    ".review-item-main strong": {
      display: "block",
      fontSize: "12px",
      color: designColors.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  {
    ".review-item-main span": {
      display: "block",
      fontSize: "10px",
      color: designColors.muted,
      marginTop: "6px",
    },
  },
  {
    ".review-meta": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      minWidth: "100px",
      gap: "5px",
    },
  },
  {
    ".review-meta>span": {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "10px",
      fontWeight: "700",
      color: designColors.muted,
    },
  },
  {
    ".review-meta .review-overdue": {
      color: statusColors.error,
    },
  },
  {
    ".review-meta small": {
      color: designColors.muted,
      fontSize: "9px",
    },
  },
  {
    ".upcoming-pill": {
      color: designColors.primary,
      background: designColors.surface,
      padding: "7px 10px",
      borderRadius: "7px",
      fontSize: "10px",
      fontWeight: "800",
    },
  },
  {
    ".mock-list": {
      display: "flex",
      flexDirection: "column",
    },
  },
  {
    ".mock-row": {
      display: "flex",
      gap: "18px",
      alignItems: "center",
      borderBottom: `1px solid ${designColors.border}`,
      padding: "17px 0",
    },
  },
  {
    ".mock-row:last-child": {
      border: "0",
    },
  },
  {
    ".mock-main": {
      flex: "1",
      minWidth: "0",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
  },
  {
    ".mock-icon": {
      width: "43px",
      height: "43px",
      borderRadius: "11px",
      background: designColors.surface,
      color: designColors.primary,
      display: "grid",
      placeItems: "center",
      flexShrink: "0",
    },
  },
  {
    ".mock-main strong": {
      display: "block",
      color: designColors.text,
      fontSize: "12px",
    },
  },
  {
    ".mock-main span,.mock-main small": {
      display: "block",
      fontSize: "10px",
      color: designColors.muted,
      marginTop: "6px",
    },
  },
  {
    ".mock-grade,.mock-cutoff": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      minWidth: "75px",
    },
  },
  {
    ".mock-grade span,.mock-cutoff span": {
      fontSize: "9px",
      color: designColors.muted,
      letterSpacing: ".7px",
      fontWeight: "800",
    },
  },
  {
    ".mock-grade strong,.mock-cutoff strong": {
      font: '800 16px "Inter Variable"',
      color: designColors.text,
    },
  },
  {
    ".mock-cutoff strong": {
      color: designColors.muted,
    },
  },
  {
    ".mock-status": {
      borderRadius: "7px",
      padding: "8px 10px",
      minWidth: "111px",
      textAlign: "center",
      whiteSpace: "nowrap",
      fontSize: "10px",
      fontWeight: "800",
    },
  },
  {
    ".mock-status.passed": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".mock-status.failed": {
      background: statusColors.errorSoft,
      color: statusColors.error,
    },
  },
  {
    ".material-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "15px",
    },
  },
  {
    ".material-card": {
      border: `1px solid ${designColors.border}`,
      borderRadius: "11px",
      padding: "18px",
      minHeight: "199px",
      display: "flex",
      flexDirection: "column",
      background: designColors.surface,
    },
  },
  {
    ".material-card:hover": {
      borderColor: designColors.border,
      boxShadow: `0 5px 15px ${withOpacity(designColors.primary, 0.039)}`,
    },
  },
  {
    ".material-card-head": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  },
  {
    ".material-icon": {
      display: "grid",
      placeItems: "center",
      width: "42px",
      height: "42px",
      borderRadius: "11px",
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".material-type": {
      fontSize: "9px",
      letterSpacing: ".7px",
      color: designColors.muted,
      fontWeight: "800",
      marginTop: "14px",
      textTransform: "uppercase",
    },
  },
  {
    ".material-card h4": {
      fontSize: "13px",
      color: designColors.text,
      margin: "6px 0 7px",
    },
  },
  {
    ".material-card p": {
      fontSize: "10px",
      color: designColors.muted,
      lineHeight: "1.5",
      flex: "1",
      marginBottom: "16px",
    },
  },
  {
    ".material-card-foot": {
      borderTop: `1px solid ${designColors.border}`,
      paddingTop: "13px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "8px",
    },
  },
  {
    ".material-card-foot span": {
      fontSize: "9px",
      color: designColors.muted,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "55%",
    },
  },
  {
    ".material-card-foot a": {
      fontSize: "10px",
      color: designColors.primary,
      fontWeight: "800",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".material-card-foot a:hover": {
      textDecoration: "underline",
    },
  },
  {
    ".errors-callout": {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      background: statusColors.warningSoft,
      border: `1px solid ${statusColors.warningSoft}`,
      padding: "17px 19px",
      borderRadius: "12px",
    },
  },
  {
    ".errors-callout>div": {
      display: "grid",
      placeItems: "center",
      width: "41px",
      height: "41px",
      background: statusColors.warningSoft,
      color: statusColors.warning,
      borderRadius: "10px",
      flexShrink: "0",
    },
  },
  {
    ".errors-callout p": {
      fontSize: "11px",
      lineHeight: "1.65",
      color: designColors.primary,
      margin: "0",
    },
  },
  {
    ".errors-callout strong": {
      color: statusColors.warning,
    },
  },
  {
    ".note-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "17px",
    },
  },
  {
    ".note-card": {
      borderRadius: "11px",
      border: `1px solid ${designColors.border}`,
      background: designColors.background,
      padding: "18px",
      minWidth: "0",
    },
  },
  {
    ".note-card-top": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
    },
  },
  {
    ".note-topic": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "10px",
      color: designColors.primary,
      fontWeight: "800",
    },
  },
  {
    ".note-source": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      margin: "12px 0 13px",
    },
  },
  {
    ".note-source span": {
      fontSize: "12px",
      fontWeight: "800",
      color: designColors.text,
    },
  },
  {
    ".note-source small": {
      fontSize: "10px",
      color: designColors.muted,
    },
  },
  {
    ".repeat-alert": {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      background: statusColors.warningSoft,
      color: statusColors.warning,
      borderRadius: "6px",
      padding: "6px 8px",
      fontSize: "10px",
      fontWeight: "800",
      marginBottom: "14px",
    },
  },
  {
    ".note-block": {
      padding: "14px 15px",
      background: statusColors.errorSoft,
      border: `1px solid ${statusColors.errorSoft}`,
      borderRadius: "9px",
      marginTop: "10px",
    },
  },
  {
    ".note-block>span": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: statusColors.error,
      fontSize: "9px",
      fontWeight: "800",
      letterSpacing: ".8px",
    },
  },
  {
    ".note-block p": {
      fontSize: "11px",
      whiteSpace: "pre-wrap",
      lineHeight: "1.6",
      color: designColors.muted,
      margin: "9px 0 0",
      overflowWrap: "anywhere",
    },
  },
  {
    ".note-block.correct-block": {
      background: statusColors.successSoft,
      borderColor: statusColors.successSoft,
    },
  },
  {
    ".note-block.correct-block>span": {
      color: statusColors.success,
    },
  },
  {
    ".note-block.correct-block p": {
      color: statusColors.success,
    },
  },
  {
    ".settings-view": {
      maxWidth: "970px",
    },
  },
  {
    ".settings-form": {
      display: "flex",
      flexDirection: "column",
    },
  },
  {
    ".settings-group": {
      padding: "9px 0 29px",
      marginBottom: "25px",
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".settings-group-head": {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      marginBottom: "22px",
    },
  },
  {
    ".settings-icon": {
      display: "grid",
      placeItems: "center",
      width: "43px",
      height: "43px",
      borderRadius: "11px",
      flexShrink: "0",
    },
  },
  {
    ".settings-icon.blue": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".settings-icon.teal": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".settings-group-head h4": {
      margin: "0 0 5px",
      fontSize: "13px",
      color: designColors.text,
    },
  },
  {
    ".settings-group-head p": {
      fontSize: "11px",
      color: designColors.muted,
      margin: "0",
    },
  },
  {
    ".settings-actions": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  {
    ".settings-security": {
      display: "flex",
      alignItems: "flex-start",
      gap: "14px",
      border: `1px solid ${statusColors.warningSoft}`,
      background: statusColors.warningSoft,
      padding: "19px",
      borderRadius: "12px",
      color: statusColors.warning,
    },
  },
  {
    ".settings-security svg": {
      flexShrink: "0",
    },
  },
  {
    ".settings-security strong": {
      color: statusColors.warning,
      fontSize: "12px",
    },
  },
  {
    ".settings-security p": {
      fontSize: "11px",
      color: designColors.primary,
      lineHeight: "1.6",
      margin: "6px 0 0",
    },
  },
  {
    ".modal-overlay": {
      position: "fixed",
      inset: "0",
      background: withOpacity(designColors.dark, 0.651),
      backdropFilter: "blur(3px)",
      zIndex: "80",
      display: "grid",
      placeItems: "center",
      padding: "16px",
      overflow: "auto",
    },
  },
  {
    ".modal-panel": {
      width: "min(100%,480px)",
      maxHeight: "min(92vh,950px)",
      overflowY: "auto",
      background: designColors.background,
      borderRadius: "17px",
      boxShadow: `0 25px 90px ${withOpacity(designColors.dark, 0.333)}`,
    },
  },
  {
    ".modal-wide": {
      maxWidth: "660px",
    },
  },
  {
    ".modal-top": {
      padding: "23px 26px 20px",
      borderBottom: `1px solid ${designColors.border}`,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "10px",
    },
  },
  {
    ".modal-top h2": {
      color: designColors.dark,
      fontSize: "18px",
      fontWeight: "800",
      margin: "0 0 5px",
    },
  },
  {
    ".modal-top p": {
      color: designColors.muted,
      fontSize: "11px",
      lineHeight: "1.5",
      margin: "0",
    },
  },
  {
    ".modal-body": {
      padding: "23px 26px 26px",
    },
  },
  {
    ".form-stack": {
      display: "flex",
      flexDirection: "column",
      gap: "17px",
    },
  },
  {
    ".field": {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      minWidth: "0",
    },
  },
  {
    ".field-label": {
      color: designColors.muted,
      fontSize: "11px",
      fontWeight: "800",
    },
  },
  {
    ".field input:not(.MuiInputBase-input),.field select:not(.MuiInputBase-input),.field textarea":
      {
        width: "100%",
        border: `1px solid ${designColors.border}`,
        background: designColors.surface,
        borderRadius: "8px",
        padding: "11px 12px",
        fontSize: "12px",
        transition: "border .15s,box-shadow .15s",
        minHeight: "41px",
      },
  },
  {
    ".field textarea": {
      minHeight: "80px",
      resize: "vertical",
    },
  },
  {
    ".field-hint": {
      fontSize: "10px",
      color: designColors.muted,
    },
  },
  {
    ".form-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "14px",
    },
  },
  {
    ".form-check-row": {
      display: "flex",
      alignItems: "center",
      gap: "19px",
      flexWrap: "wrap",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      padding: "13px",
      borderRadius: "9px",
    },
  },
  {
    ".form-check-row label,.checkbox-label": {
      fontSize: "12px",
      fontWeight: "650",
      color: designColors.muted,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
  },
  {
    ".form-check-row input:not(.MuiInputBase-input),.checkbox-label input:not(.MuiInputBase-input)":
      {
        height: "16px",
        width: "16px",
      },
  },
  {
    ".modal-actions": {
      display: "flex",
      justifyContent: "flex-end",
      gap: "9px",
      borderTop: `1px solid ${designColors.border}`,
      paddingTop: "19px",
      marginTop: "3px",
    },
  },
  {
    ".color-field": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: designColors.muted,
      fontSize: "12px",
    },
  },
  {
    ".color-field input:not(.MuiInputBase-input)": {
      padding: "0",
      width: "50px",
      height: "38px",
      cursor: "pointer",
    },
  },
  {
    ".toast": {
      position: "fixed",
      right: "25px",
      bottom: "24px",
      zIndex: "100",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: "260px",
      maxWidth: "min(470px,calc(100vw - 35px))",
      padding: "15px 17px",
      background: designColors.dark,
      color: designColors.background,
      boxShadow: `0 15px 45px ${withOpacity(designColors.dark, 0.208)}`,
      borderRadius: "10px",
      fontSize: "12px",
      fontWeight: "650",
    },
  },
  {
    ".toast-ok svg": {
      color: designColors.primary,
    },
  },
  {
    ".toast-error svg": {
      color: statusColors.errorSoft,
    },
  },
  {
    ".toast span": {
      flex: "1",
      lineHeight: "1.4",
    },
  },
  {
    ".toast button": {
      display: "grid",
      placeItems: "center",
      border: "0",
      background: "transparent",
      color: designColors.border,
      padding: "0",
    },
  },
  {
    ".api-error": {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      background: statusColors.errorSoft,
      border: `1px solid ${statusColors.errorSoft}`,
      color: statusColors.error,
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "24px",
    },
  },
  {
    ".api-error>div": {
      flex: "1",
    },
  },
  {
    ".api-error strong": {
      fontSize: "12px",
    },
  },
  {
    ".api-error p": {
      fontSize: "11px",
      lineHeight: "1.5",
      margin: "4px 0 0",
    },
  },
  {
    ".api-error code": {
      background: statusColors.errorSoft,
      padding: "2px 4px",
    },
  },
  {
    ".skeleton-layout": {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "15px",
      minHeight: "290px",
    },
  },
  {
    ".skeleton-layout div": {
      height: "145px",
      borderRadius: "12px",
      background: `linear-gradient(90deg,${designColors.surface},${designColors.surface},${designColors.surface})`,
      backgroundSize: "200% 100%",
      animation: "skeleton 1.5s linear infinite",
    },
  },
  {
    "@keyframes skeleton": {
      "0%": {
        backgroundPosition: "100% 0",
      },
      "100%": {
        backgroundPosition: "-100% 0",
      },
    },
  },
  {
    "@media (max-width:1290px)": {
      ".sidebar": {
        width: "242px",
      },
      ".app-main": {
        marginLeft: "242px",
      },
      ".main-content": {
        padding: "32px 27px 20px",
      },
      ".topbar": {
        padding: "0 28px",
      },
      ".metric-grid": {
        gap: "12px",
      },
      ".metric-card": {
        padding: "18px 15px",
      },
      ".metric-value": {
        fontSize: "23px",
      },
      ".dashboard-main-grid": {
        gridTemplateColumns: "minmax(0,1fr) minmax(285px,.85fr)",
      },
      ".art-main-card": {
        right: "10px",
      },
      ".art-float-a": {
        left: "30px",
      },
      ".material-grid": {
        gridTemplateColumns: "repeat(2,1fr)",
      },
    },
  },
  {
    "@media (max-width:1030px)": {
      ".sidebar": {
        width: "226px",
      },
      ".app-main": {
        marginLeft: "226px",
      },
      ".sidebar .brand": {
        paddingLeft: "20px",
      },
      ".dashboard-main-grid,.study-grid": {
        gridTemplateColumns: "1fr",
      },
      ".metric-grid": {
        gridTemplateColumns: "repeat(2,1fr)",
      },
      ".dashboard-main-grid .panel": {
        minWidth: "0",
      },
      ".mock-row": {
        flexWrap: "wrap",
      },
      ".mock-main": {
        flexBasis: "100%",
      },
      ".metric-value": {
        fontSize: "27px",
      },
      ".main-content": {
        padding: "27px 23px",
      },
      ".art-main-card": {
        right: "0",
      },
      ".welcome-copy h2": {
        fontSize: "23px",
      },
      ".banner-art": {
        right: "-8%",
      },
      ".mini-metric-grid": {
        gap: "10px",
      },
      ".mini-metric": {
        padding: "16px",
      },
      ".mini-metric>strong": {
        fontSize: "23px",
      },
    },
  },
  {
    "@media (max-width:760px)": {
      ".sidebar": {
        transform: "translateX(-102%)",
        transition: "transform .2s",
        width: "264px",
        boxShadow: `10px 0 35px ${withOpacity(designColors.dark, 0.196)}`,
      },
      ".sidebar.nav-visible": {
        transform: "translateX(0)",
      },
      ".mobile-dim": {
        position: "fixed",
        inset: "0",
        background: withOpacity(designColors.dark, 0.478),
        zIndex: "35",
      },
      ".nav-close": {
        display: "grid",
        placeItems: "center",
        border: "0",
        background: "transparent",
        color: designColors.light,
        marginLeft: "auto",
      },
      ".app-main": {
        marginLeft: "0",
      },
      ".topbar": {
        height: "64px",
        padding: "0 18px",
      },
      ".mobile-menu": {
        display: "inline-grid !important",
        marginRight: "1px",
      },
      ".topbar-date": {
        display: "none",
      },
      ".topbar-right": {
        gap: "10px",
      },
      ".main-content": {
        padding: "23px 16px 10px",
      },
      ".page-header h1": {
        fontSize: "24px",
      },
      ".page-header": {
        marginBottom: "23px",
        alignItems: "flex-start",
      },
      ".edition-chip": {
        display: "none",
      },
      ".welcome-banner": {
        padding: "27px 24px",
        minHeight: "210px",
      },
      ".banner-art": {
        opacity: ".22",
        right: "-32%",
      },
      ".welcome-copy h2": {
        fontSize: "23px",
      },
      ".welcome-copy p": {
        maxWidth: "350px",
      },
      ".metric-grid": {
        gap: "11px",
      },
      ".metric-card": {
        padding: "16px",
      },
      ".metric-top>span": {
        fontSize: "10px",
      },
      ".metric-value": {
        fontSize: "23px",
      },
      ".metric-foot": {
        fontSize: "9px",
      },
      ".panel": {
        padding: "20px 17px",
      },
      ".panel-heading": {
        marginBottom: "17px",
      },
      ".mini-metric-grid": {
        gridTemplateColumns: "repeat(3,1fr)",
      },
      ".mini-metric": {
        gridTemplateColumns: "1fr",
        gap: "5px",
        padding: "13px",
      },
      ".mini-icon": {
        gridRow: "auto",
        width: "31px",
        height: "31px",
      },
      ".mini-icon svg": {
        height: "17px",
        width: "17px",
      },
      ".mini-metric>span": {
        fontSize: "8px",
        marginTop: "6px",
        minHeight: "24px",
      },
      ".mini-metric>strong": {
        fontSize: "21px",
      },
      ".mini-metric>small": {
        fontSize: "9px",
      },
      ".footer span:last-child": {
        display: "none",
      },
      ".review-item": {
        flexWrap: "wrap",
      },
      ".review-item-main": {
        minWidth: "calc(100% - 60px)",
      },
      ".review-meta": {
        alignItems: "flex-start",
        paddingLeft: "58px",
        flex: "1",
      },
      ".review-item>.btn,.review-item>.upcoming-pill": {
        marginLeft: "auto",
      },
      ".material-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".note-grid": {
        gridTemplateColumns: "1fr",
      },
    },
  },
  {
    "@media (max-width:500px)": {
      ".metric-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".metric-top": {
        gap: "2px",
      },
      ".metric-icon": {
        height: "31px",
        width: "31px",
        borderRadius: "8px",
      },
      ".metric-icon svg": {
        height: "17px",
        width: "17px",
      },
      ".metric-value": {
        fontSize: "21px",
        letterSpacing: "-1.1px",
      },
      ".metric-card": {
        padding: "15px 12px",
      },
      ".metric-foot": {
        minHeight: "41px",
      },
      ".welcome-copy h2": {
        fontSize: "20px",
      },
      ".welcome-eyebrow": {
        fontSize: "8px",
      },
      ".banner-button": {
        fontSize: "10px",
      },
      ".welcome-banner": {
        minHeight: "211px",
      },
      ".page-header h1": {
        fontSize: "22px",
      },
      ".page-header p": {
        fontSize: "11px",
      },
      ".topbar-left": {
        fontSize: "11px",
      },
      ".avatar-top": {
        height: "32px",
        width: "32px",
      },
      ".section-toolbar": {
        alignItems: "flex-start",
      },
      ".section-toolbar .toolbar-info": {
        fontSize: "11px",
      },
      ".toolbar-buttons": {
        width: "100%",
        justifyContent: "flex-end",
      },
      ".section-toolbar>.btn": {
        marginLeft: "auto",
      },
      ".edital-progress-panel": {
        padding: "20px 18px",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "14px",
      },
      ".edital-progress-right": {
        width: "100%",
      },
      ".filter-row": {
        gap: "9px",
      },
      ".search-wrap": {
        minWidth: "100%",
        width: "100%",
      },
      ".filter-select": {
        flex: "1",
        maxWidth: "100%",
        minWidth: "130px",
      },
      ".mini-metric-grid": {
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      },
      ".mini-metric": {
        padding: "12px 9px",
      },
      ".mini-metric>span": {
        lineHeight: "1.3",
      },
      ".mini-metric>strong": {
        fontSize: "19px",
      },
      ".weekly-target": {
        gap: "11px",
      },
      ".target-ring": {
        height: "94px",
        width: "94px",
      },
      ".target-ring strong": {
        fontSize: "18px",
      },
      ".target-line>span": {
        fontSize: "10px",
      },
      ".timer-selects,.form-grid": {
        gridTemplateColumns: "1fr",
      },
      ".timer-digits": {
        fontSize: "41px",
      },
      ".review-hero": {
        padding: "19px 16px",
        alignItems: "flex-start",
      },
      ".review-hero-icon": {
        width: "43px",
        height: "43px",
      },
      ".review-hero h2": {
        fontSize: "15px",
      },
      ".review-hero p": {
        fontSize: "10px",
      },
      ".tabs": {
        gap: "6px",
        justifyContent: "space-between",
      },
      ".tabs button": {
        fontSize: "10px",
        gap: "5px",
      },
      ".material-grid": {
        gridTemplateColumns: "1fr",
      },
      ".mock-row": {
        gap: "12px",
      },
      ".mock-grade,.mock-cutoff": {
        minWidth: "65px",
      },
      ".mock-status": {
        minWidth: "auto",
      },
      ".cycle-card": {
        minWidth: "138px",
      },
      ".modal-top": {
        padding: "20px 20px 17px",
      },
      ".modal-body": {
        padding: "20px",
      },
      ".footer": {
        fontSize: "9px",
      },
      ".performance-row": {
        flexWrap: "wrap",
        gap: "10px",
      },
      ".performance-info": {
        flexBasis: "100%",
      },
      ".performance-bar": {
        marginLeft: "48px",
        maxWidth: "none",
        flex: "1",
      },
      ".note-grid": {
        gridTemplateColumns: "1fr",
      },
    },
  },
  {
    "@media (prefers-reduced-motion:reduce)": {
      "*,*:before,*:after": {
        animationDuration: ".01ms !important",
        transitionDuration: ".01ms !important",
        scrollBehavior: "auto !important",
      },
    },
  },
  {
    ".reorder-list": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
  },
  {
    ".reorder-item": {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      padding: "9px 12px",
      borderRadius: "9px",
    },
  },
  {
    ".reorder-number": {
      fontSize: "11px",
      color: designColors.muted,
      fontWeight: "800",
      width: "14px",
    },
  },
  {
    ".reorder-item>strong": {
      fontSize: "12px",
      color: designColors.muted,
      flex: "1",
    },
  },
  {
    ".reorder-item>div": {
      display: "flex",
      gap: "2px",
    },
  },
  {
    ".reorder-item .icon-button": {
      height: "29px",
      width: "29px",
    },
  },
  {
    ":root": {
      "--accent": designColors.primary,
      "--dark": designColors.dark,
      "--muted": designColors.muted,
      "--border": designColors.border,
      "--success": designColors.primary,
      "--sidebar": designColors.dark,
      "--soft": designColors.surface,
      fontFamily: '"Inter Variable", sans-serif',
      background: designColors.surface,
      color: designColors.dark,
    },
  },
  {
    body: {
      background: designColors.surface,
      color: designColors.dark,
    },
  },
  {
    a: {
      color: designColors.text,
    },
  },
  {
    "input:not(.MuiInputBase-input)[type=checkbox]": {
      accentColor: designColors.primary,
    },
  },
  {
    "input:not(.MuiInputBase-input):focus,textarea:focus,select:not(.MuiInputBase-input):focus":
      {
        borderColor: `${designColors.border} !important`,
        boxShadow: `0 0 0 3px ${withOpacity(designColors.accent, 0.157)} !important`,
      },
  },
  {
    "button:focus-visible,a:focus-visible": {
      outline: `3px solid ${statusColors.warning}`,
      outlineOffset: "2px",
    },
  },
  {
    ".sidebar": {
      background: `linear-gradient(171deg,${designColors.dark} 0%,${designColors.dark} 72%,${designColors.dark} 100%)`,
      width: "246px",
      borderRight: `1px solid ${designColors.border}`,
      color: designColors.border,
      boxShadow: `4px 0 24px ${withOpacity(designColors.dark, 0.078)}`,
    },
  },
  {
    ".sidebar-overline": {
      margin: "0 18px 25px",
      border: `1px solid ${designColors.border}`,
      background: withOpacity(designColors.background, 0.031),
      color: designColors.border,
      letterSpacing: "1.06px",
      fontSize: "9px",
      borderRadius: "11px",
    },
  },
  {
    ".brand": {
      padding: "26px 23px 19px",
    },
  },
  {
    ".brand-mark": {
      width: "44px",
      height: "44px",
      borderRadius: "15px",
      background: statusColors.warning,
      color: designColors.dark,
      boxShadow: `0 7px 22px ${withOpacity(designColors.dark, 0.271)}`,
    },
  },
  {
    ".brand-wordmark strong": {
      fontSize: "28px",
      fontWeight: "800",
      letterSpacing: "-1.35px",
      color: designColors.light,
    },
  },
  {
    ".brand-wordmark strong span": {
      color: statusColors.warning,
    },
  },
  {
    ".brand-wordmark small": {
      fontSize: "8px",
      letterSpacing: "1.6px",
      color: designColors.border,
    },
  },
  {
    ".nav-sections": {
      padding: "0 13px",
    },
  },
  {
    ".nav-section": {
      marginBottom: "20px",
    },
  },
  {
    ".nav-label": {
      color: designColors.light,
      fontSize: "9px",
      letterSpacing: "1.55px",
    },
  },
  {
    ".nav-item": {
      color: designColors.border,
      fontSize: "12px",
      minHeight: "43px",
      borderRadius: "11px",
      fontWeight: "650",
      gap: "11px",
    },
  },
  {
    ".nav-item:hover": {
      background: withOpacity(designColors.background, 0.075),
      color: designColors.paper,
    },
  },
  {
    ".nav-item.selected": {
      background: designColors.surface,
      color: designColors.dark,
      boxShadow: `0 4px 15px ${withOpacity(designColors.dark, 0.133)}`,
    },
  },
  {
    ".nav-item.selected svg": {
      color: designColors.text,
    },
  },
  {
    ".nav-count": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".more-toggle": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 15px",
      border: `1px solid ${withOpacity(designColors.border, 0.333)}`,
      borderRadius: "11px",
      color: designColors.light,
      background: withOpacity(designColors.background, 0.031),
      fontSize: "12px",
      fontWeight: "750",
    },
  },
  {
    ".more-toggle svg": {
      transition: "transform .2s",
    },
  },
  {
    ".more-toggle .rotated": {
      transform: "rotate(180deg)",
    },
  },
  {
    ".extra-section .nav-item": {
      marginTop: "7px",
    },
  },
  {
    ".sidebar-hint": {
      padding: "18px 15px",
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      border: `1px solid ${withOpacity(designColors.border, 0.333)}`,
      borderRadius: "16px",
      background: `linear-gradient(145deg,${withOpacity(designColors.primary, 0.533)},${withOpacity(designColors.dark, 0.6)})`,
      color: designColors.light,
    },
  },
  {
    ".sidebar-hint svg": {
      color: statusColors.warning,
    },
  },
  {
    ".sidebar-hint strong": {
      fontSize: "12px",
    },
  },
  {
    ".sidebar-hint span": {
      fontSize: "10px",
      color: designColors.light,
      lineHeight: "1.6",
    },
  },
  {
    ".sidebar-bottom": {
      padding: "6px 14px 19px",
    },
  },
  {
    ".app-main": {
      marginLeft: "246px",
    },
  },
  {
    ".topbar": {
      height: "70px",
      background: withOpacity(designColors.background, 0.867),
      backdropFilter: "blur(20px)",
      padding: "0 38px",
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".topbar-path": {
      color: designColors.text,
      fontWeight: "750",
    },
  },
  {
    ".topbar-path span": {
      color: designColors.muted,
      margin: "0 6px",
    },
  },
  {
    ".topbar-quick": {
      display: "inline-flex",
      alignItems: "center",
      gap: "9px",
      padding: "9px 14px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      color: designColors.text,
      fontSize: "11px",
      fontWeight: "800",
      borderRadius: "10px",
    },
  },
  {
    ".topbar-quick:hover": {
      background: designColors.surface,
    },
  },
  {
    ".edition-chip": {
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      boxShadow: "none",
      color: designColors.muted,
    },
  },
  {
    ".main-content": {
      maxWidth: "none",
      padding: "34px 36px 25px",
    },
  },
  {
    ".page-header": {
      marginBottom: "29px",
    },
  },
  {
    ".page-breadcrumb": {
      color: designColors.primary,
      letterSpacing: "1.7px",
      fontSize: "9px",
      marginBottom: "12px",
    },
  },
  {
    ".live-dot": {
      background: designColors.accent,
      boxShadow: `0 0 0 4px ${withOpacity(designColors.light, 0.239)}`,
    },
  },
  {
    ".page-header h1": {
      fontSize: "29px",
      color: designColors.dark,
      marginBottom: "7px",
    },
  },
  {
    ".page-header p": {
      color: designColors.muted,
      fontSize: "12px",
      lineHeight: "1.6",
    },
  },
  {
    ".footer": {
      color: designColors.muted,
      borderColor: designColors.border,
    },
  },
  {
    ".panel,.simple-card,.home-metric,.note-card,.material-card,.metric-card": {
      border: `1px solid ${designColors.border}`,
      background: designColors.background,
      borderRadius: "17px",
      boxShadow: `0 8px 25px ${withOpacity(designColors.primary, 0.031)}`,
    },
  },
  {
    ".panel-heading h3,.simple-card h3": {
      color: designColors.dark,
    },
  },
  {
    ".panel-heading p": {
      color: designColors.muted,
    },
  },
  {
    ".btn": {
      borderRadius: "11px",
      fontWeight: "800",
    },
  },
  {
    ".btn-primary": {
      background: designColors.primary,
      color: designColors.background,
      boxShadow: `0 5px 15px ${withOpacity(designColors.primary, 0.161)}`,
    },
  },
  {
    ".btn-primary:hover": {
      background: designColors.primary,
      boxShadow: `0 7px 18px ${withOpacity(designColors.primary, 0.192)}`,
    },
  },
  {
    ".btn-subtle": {
      background: designColors.surface,
      borderColor: designColors.border,
      color: designColors.text,
    },
  },
  {
    ".btn-subtle:hover": {
      background: designColors.surface,
    },
  },
  {
    ".text-link,.metric-link,.plain-action": {
      color: designColors.text,
    },
  },
  {
    ".small-chip": {
      color: designColors.muted,
      background: designColors.surface,
      borderColor: designColors.border,
    },
  },
  {
    ".row-link": {
      color: designColors.text,
      background: designColors.surface,
    },
  },
  {
    ".row-link:hover": {
      background: designColors.surface,
    },
  },
  {
    ".progress-track,.home-bar": {
      background: designColors.surface,
    },
  },
  {
    ".field-label": {
      color: designColors.muted,
    },
  },
  {
    ".field input:not(.MuiInputBase-input),.field select:not(.MuiInputBase-input),.field textarea":
      {
        border: `1px solid ${designColors.border}`,
        background: designColors.surface,
        color: designColors.dark,
      },
  },
  {
    ".modal-panel": {
      borderRadius: "19px",
    },
  },
  {
    ".modal-overlay": {
      background: withOpacity(designColors.dark, 0.722),
    },
  },
  {
    ".modal-top h2": {
      color: designColors.dark,
    },
  },
  {
    ".toast": {
      background: designColors.dark,
    },
  },
  {
    ".home-stack": {
      display: "flex",
      flexDirection: "column",
      gap: "23px",
    },
  },
  {
    ".nimbo-welcome": {
      minHeight: "249px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
      borderRadius: "23px",
      background: `linear-gradient(116deg,${designColors.dark} 0%,${designColors.primary} 76%,${designColors.primary} 100%)`,
      padding: "35px 37px",
      color: designColors.background,
      boxShadow: `0 18px 35px ${withOpacity(designColors.primary, 0.216)}`,
    },
  },
  {
    ".welcome-orbit": {
      position: "absolute",
      borderRadius: "50%",
      border: `1px solid ${withOpacity(designColors.background, 0.125)}`,
      pointerEvents: "none",
    },
  },
  {
    ".orbit-a": {
      width: "400px",
      height: "400px",
      top: "-280px",
      left: "30%",
    },
  },
  {
    ".orbit-b": {
      width: "310px",
      height: "310px",
      bottom: "-240px",
      right: "7%",
    },
  },
  {
    ".welcome-content": {
      zIndex: "1",
      maxWidth: "630px",
    },
  },
  {
    ".welcome-content .eyebrow": {
      color: designColors.primary,
      fontSize: "10px",
      letterSpacing: "1.6px",
    },
  },
  {
    ".welcome-content h2": {
      fontSize: "30px",
      lineHeight: "1.27",
      letterSpacing: "-1.3px",
      color: designColors.background,
      margin: "12px 0 11px",
    },
  },
  {
    ".welcome-content h2 span": {
      fontWeight: "600",
      color: designColors.primary,
    },
  },
  {
    ".welcome-content p": {
      fontSize: "12px",
      lineHeight: "1.75",
      color: designColors.primary,
      maxWidth: "430px",
      margin: "0 0 19px",
    },
  },
  {
    ".welcome-actions": {
      display: "flex",
      flexWrap: "wrap",
      gap: "11px",
    },
  },
  {
    ".welcome-actions .btn-primary": {
      background: statusColors.warning,
      color: designColors.dark,
      boxShadow: `0 7px 14px ${withOpacity(designColors.dark, 0.118)}`,
    },
  },
  {
    ".welcome-actions .btn-primary:hover": {
      background: statusColors.warningSoft,
    },
  },
  {
    ".welcome-outline": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: `1px solid ${withOpacity(designColors.border, 0.439)}`,
      background: withOpacity(designColors.background, 0.098),
      color: designColors.light,
      padding: "11px 17px",
      borderRadius: "11px",
      fontWeight: "750",
      fontSize: "12px",
    },
  },
  {
    ".welcome-today": {
      width: "209px",
      minWidth: "196px",
      padding: "22px 21px 16px",
      border: `1px solid ${withOpacity(designColors.background, 0.275)}`,
      borderRadius: "19px",
      background: withOpacity(designColors.background, 0.922),
      color: designColors.dark,
      zIndex: "1",
      marginLeft: "20px",
      boxShadow: `0 13px 35px ${withOpacity(designColors.dark, 0.153)}`,
    },
  },
  {
    ".welcome-calendar-icon": {
      display: "grid",
      placeItems: "center",
      background: designColors.surface,
      color: designColors.primary,
      width: "41px",
      height: "41px",
      borderRadius: "13px",
      marginBottom: "15px",
    },
  },
  {
    ".welcome-today>span": {
      fontSize: "9px",
      letterSpacing: "1.4px",
      fontWeight: "800",
      color: designColors.muted,
    },
  },
  {
    ".welcome-today>strong": {
      display: "block",
      fontSize: "35px",
      lineHeight: "1.2",
      marginTop: "6px",
    },
  },
  {
    ".welcome-today strong small": {
      fontSize: "12px",
      color: designColors.muted,
      fontWeight: "600",
    },
  },
  {
    ".welcome-today p": {
      fontSize: "10px",
      color: designColors.muted,
      lineHeight: "1.45",
      margin: "6px 0 12px",
    },
  },
  {
    ".welcome-today button": {
      background: "none",
      border: "0",
      padding: "0",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      fontWeight: "800",
      color: designColors.primary,
      fontSize: "11px",
    },
  },
  {
    ".home-section-head": {
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between",
      gap: "16px",
    },
  },
  {
    ".home-section-head .eyebrow": {
      color: designColors.muted,
      fontSize: "9px",
      letterSpacing: "1.4px",
    },
  },
  {
    ".home-section-head h2": {
      fontSize: "20px",
      color: designColors.dark,
      margin: "7px 0 0",
    },
  },
  {
    ".home-metrics": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "14px",
    },
  },
  {
    ".home-metric": {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      gap: "9px",
      padding: "20px",
      minWidth: "0",
      minHeight: "194px",
    },
  },
  {
    ".home-metric:hover": {
      borderColor: designColors.border,
      transform: "translateY(-2px)",
      boxShadow: `0 10px 24px ${withOpacity(designColors.primary, 0.125)}`,
    },
  },
  {
    ".home-metric>span": {
      fontSize: "11px",
      color: designColors.muted,
      fontWeight: "700",
    },
  },
  {
    ".home-metric strong": {
      fontSize: "29px",
      lineHeight: "1.12",
      letterSpacing: "-.8px",
      color: designColors.dark,
      whiteSpace: "nowrap",
    },
  },
  {
    ".home-metric small": {
      fontSize: "9px",
      color: designColors.muted,
      lineHeight: "1.5",
    },
  },
  {
    ".home-bar": {
      height: "7px",
      borderRadius: "10px",
      overflow: "hidden",
      marginTop: "1px",
    },
  },
  {
    ".home-bar>i": {
      display: "block",
      height: "100%",
      background: designColors.accent,
      borderRadius: "10px",
    },
  },
  {
    ".metric-symbol": {
      width: "37px",
      height: "37px",
      display: "grid",
      placeItems: "center",
      borderRadius: "12px",
    },
  },
  {
    ".metric-symbol.mint": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".metric-symbol.yellow": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".metric-symbol.blue": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".metric-symbol.pink": {
      background: statusColors.errorSoft,
      color: statusColors.error,
    },
  },
  {
    ".home-lower-nimbo": {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr .82fr",
      gap: "14px",
    },
  },
  {
    ".simple-card": {
      padding: "22px",
    },
  },
  {
    ".simple-card-head": {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      marginBottom: "14px",
    },
  },
  {
    ".simple-card-head h3": {
      margin: "0",
      fontSize: "13px",
      flex: "1",
    },
  },
  {
    ".simple-card>p": {
      fontSize: "11px",
      lineHeight: "1.6",
      color: designColors.muted,
      margin: "0 0 14px",
    },
  },
  {
    ".plain-action": {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      background: "none",
      border: "0",
      fontSize: "11px",
      fontWeight: "800",
      padding: "0",
      marginTop: "14px",
    },
  },
  {
    ".next-subject": {
      fontSize: "15px",
      fontWeight: "800",
      color: designColors.text,
      lineHeight: "1.35",
    },
  },
  {
    ".focus-subtext": {
      display: "block",
      color: designColors.muted,
      marginTop: "5px",
      fontSize: "10px",
    },
  },
  {
    ".pill-counter": {
      borderRadius: "15px",
      background: designColors.surface,
      color: designColors.primary,
      fontSize: "10px",
      fontWeight: "800",
      padding: "4px 8px",
    },
  },
  {
    ".today-tasks": {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
  },
  {
    ".today-tasks button": {
      display: "flex",
      textAlign: "left",
      alignItems: "center",
      gap: "10px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      padding: "9px",
      width: "100%",
    },
  },
  {
    ".today-tasks button.complete": {
      opacity: ".55",
    },
  },
  {
    ".today-tasks button.complete strong": {
      textDecoration: "line-through",
    },
  },
  {
    ".today-checkbox": {
      width: "21px",
      height: "21px",
      flex: "0 0 21px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "7px",
      color: designColors.text,
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".today-tasks button>span:last-child": {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
      minWidth: "0",
    },
  },
  {
    ".today-tasks strong": {
      color: designColors.text,
      fontSize: "11px",
    },
  },
  {
    ".today-tasks small": {
      color: designColors.muted,
      fontSize: "9px",
    },
  },
  {
    ".week-mini-chart": {
      display: "flex",
      justifyContent: "space-between",
      gap: "5px",
      height: "130px",
      marginTop: "20px",
    },
  },
  {
    ".week-mini-chart>div": {
      width: "17px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "7px",
    },
  },
  {
    ".week-mini-track": {
      height: "103px",
      width: "13px",
      display: "flex",
      alignItems: "end",
      borderRadius: "15px",
      background: designColors.surface,
      overflow: "hidden",
    },
  },
  {
    ".week-mini-track span": {
      display: "block",
      width: "100%",
      background: `linear-gradient(${designColors.accent},${designColors.primary})`,
      borderRadius: "8px",
    },
  },
  {
    ".week-mini-chart small": {
      fontSize: "9px",
      color: designColors.muted,
    },
  },
  {
    ".exam-reminder": {
      borderRadius: "14px",
      border: `1px solid ${designColors.border}`,
      color: designColors.muted,
      background: designColors.surface,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: "11px",
      fontSize: "12px",
    },
  },
  {
    ".exam-reminder span": {
      flex: "1",
    },
  },
  {
    ".exam-reminder button": {
      border: "0",
      background: "transparent",
      color: designColors.primary,
      fontSize: "11px",
      fontWeight: "800",
    },
  },
  {
    ".edital-upload-banner": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      background: `linear-gradient(110deg,${designColors.surface},${designColors.surface})`,
      border: `1px solid ${designColors.border}`,
      borderRadius: "19px",
      padding: "23px",
    },
  },
  {
    ".edital-upload-icon": {
      width: "58px",
      height: "58px",
      flex: "0 0 58px",
      borderRadius: "18px",
      display: "grid",
      placeItems: "center",
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".edital-upload-banner>div:nth-child(2)": {
      flex: "1",
      minWidth: "0",
    },
  },
  {
    ".edital-upload-banner h3": {
      fontSize: "17px",
      color: designColors.dark,
      margin: "5px 0 6px",
    },
  },
  {
    ".edital-upload-banner .eyebrow": {
      fontSize: "9px",
      color: designColors.primary,
      letterSpacing: "1.2px",
    },
  },
  {
    ".edital-upload-banner p": {
      fontSize: "11px",
      lineHeight: "1.65",
      color: designColors.muted,
      maxWidth: "680px",
      margin: "0",
    },
  },
  {
    ".edital-import-history": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      flexWrap: "wrap",
      fontSize: "10px",
      color: designColors.muted,
      padding: "0 6px",
    },
  },
  {
    ".edital-import-history a": {
      fontWeight: "800",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
  },
  {
    ".edital-import-history small": {
      fontSize: "10px",
    },
  },
  {
    ".edital-import-body": {
      display: "flex",
      flexDirection: "column",
      gap: "17px",
    },
  },
  {
    ".edital-dropzone": {
      border: `2px dashed ${designColors.border}`,
      borderRadius: "17px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "10px",
      padding: "42px 22px",
      color: designColors.primary,
      background: designColors.surface,
      textAlign: "center",
      cursor: "pointer",
      position: "relative",
    },
  },
  {
    ".edital-dropzone strong": {
      fontSize: "14px",
    },
  },
  {
    ".edital-dropzone span": {
      maxWidth: "440px",
      color: designColors.muted,
      fontSize: "11px",
      lineHeight: "1.7",
    },
  },
  {
    ".edital-dropzone input:not(.MuiInputBase-input)": {
      position: "absolute",
      inset: "0",
      opacity: "0",
      cursor: "pointer",
      width: "100%",
    },
  },
  {
    ".edital-preview-file": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      padding: "12px 15px",
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".edital-preview-file>span": {
      display: "flex",
      flex: "1",
      flexDirection: "column",
      gap: "3px",
      minWidth: "0",
    },
  },
  {
    ".edital-preview-file strong": {
      fontSize: "12px",
      overflowWrap: "anywhere",
    },
  },
  {
    ".edital-preview-file small": {
      fontSize: "10px",
      color: designColors.muted,
    },
  },
  {
    ".edital-warning": {
      display: "flex",
      gap: "9px",
      alignItems: "flex-start",
      background: statusColors.warningSoft,
      border: `1px solid ${statusColors.warningSoft}`,
      borderRadius: "10px",
      padding: "11px",
      color: statusColors.warning,
      fontSize: "11px",
      lineHeight: "1.6",
    },
  },
  {
    ".edital-warning svg": {
      flexShrink: "0",
    },
  },
  {
    ".edital-preview-top": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      alignItems: "flex-start",
    },
  },
  {
    ".edital-preview-top h3": {
      fontSize: "15px",
      margin: "0 0 4px",
    },
  },
  {
    ".edital-preview-top p": {
      margin: "0",
      fontSize: "11px",
      lineHeight: "1.5",
      color: designColors.muted,
    },
  },
  {
    ".edital-preview-top strong": {
      color: designColors.primary,
      fontSize: "11px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".edital-preview-groups": {
      display: "flex",
      flexDirection: "column",
      gap: "13px",
      maxHeight: "55vh",
      overflowY: "auto",
      paddingRight: "5px",
    },
  },
  {
    ".edital-preview-group": {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      padding: "17px",
      borderRadius: "13px",
    },
  },
  {
    ".edital-preview-group-head": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "11px",
      fontWeight: "800",
      color: designColors.muted,
    },
  },
  {
    ".edital-preview-group .field textarea": {
      fontFamily: '"Inter Variable", sans-serif',
      fontSize: "11px",
      lineHeight: "1.65",
    },
  },
  {
    ".modal-wide": {
      maxWidth: "860px",
    },
  },
  {
    ".week-planner": {
      gap: "20px",
    },
  },
  {
    ".weekly-hero": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      border: `1px solid ${designColors.border}`,
      background: designColors.background,
      borderRadius: "19px",
      padding: "25px 26px",
    },
  },
  {
    ".weekly-hero h2": {
      fontSize: "19px",
      color: designColors.dark,
      margin: "6px 0 8px",
    },
  },
  {
    ".weekly-hero p": {
      fontSize: "11px",
      color: designColors.muted,
      maxWidth: "690px",
      lineHeight: "1.7",
      margin: "0",
    },
  },
  {
    ".weekly-hero .eyebrow": {
      color: designColors.primary,
      fontSize: "9px",
      letterSpacing: "1.2px",
    },
  },
  {
    ".weekly-hero .btn": {
      alignSelf: "center",
    },
  },
  {
    ".week-summary": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "12px",
    },
  },
  {
    ".week-summary>div": {
      borderRadius: "14px",
      padding: "16px 19px",
      border: `1px solid ${designColors.border}`,
      background: designColors.background,
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },
  },
  {
    ".week-summary span": {
      fontSize: "10px",
      color: designColors.muted,
    },
  },
  {
    ".week-summary strong": {
      fontSize: "24px",
      lineHeight: "1",
      color: designColors.text,
    },
  },
  {
    ".week-controls": {
      display: "flex",
      justifyContent: "space-between",
      gap: "14px",
      alignItems: "center",
    },
  },
  {
    ".week-nav": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  },
  {
    ".week-nav>div": {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      minWidth: "167px",
      textAlign: "center",
    },
  },
  {
    ".week-nav strong": {
      fontSize: "12px",
      color: designColors.text,
    },
  },
  {
    ".week-nav small": {
      fontSize: "9px",
      color: designColors.muted,
    },
  },
  {
    ".week-nav .btn": {
      marginLeft: "7px",
      minHeight: "35px",
      padding: "7px 12px",
    },
  },
  {
    ".week-filters select:not(.MuiInputBase-input)": {
      height: "37px",
      borderRadius: "9px",
      padding: "0 12px",
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      fontSize: "11px",
      color: designColors.muted,
    },
  },
  {
    ".week-board": {
      display: "grid",
      gridTemplateColumns: "repeat(7,minmax(0,1fr))",
      gap: "9px",
    },
  },
  {
    ".week-day": {
      border: `1px solid ${designColors.border}`,
      background: designColors.background,
      borderRadius: "15px",
      minHeight: "245px",
      minWidth: "0",
      overflow: "hidden",
    },
  },
  {
    ".week-day.today": {
      borderColor: designColors.border,
      boxShadow: `0 0 0 2px ${withOpacity(designColors.accent, 0.106)}`,
    },
  },
  {
    ".week-day-top": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${designColors.border}`,
      padding: "13px 9px 10px",
    },
  },
  {
    ".week-day-top>div": {
      display: "flex",
      alignItems: "center",
      gap: "7px",
    },
  },
  {
    ".week-day-top span": {
      fontSize: "10px",
      color: designColors.muted,
      fontWeight: "750",
    },
  },
  {
    ".week-day-top strong": {
      fontSize: "17px",
      color: designColors.text,
    },
  },
  {
    ".week-day.today .week-day-top": {
      background: designColors.surface,
    },
  },
  {
    ".week-add": {
      width: "24px",
      height: "24px",
      border: "0",
      background: designColors.surface,
      color: designColors.primary,
      borderRadius: "7px",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".week-add:hover": {
      background: designColors.surface,
    },
  },
  {
    ".week-day-items": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "8px",
    },
  },
  {
    ".week-empty": {
      fontSize: "10px",
      color: designColors.border,
      textAlign: "center",
      padding: "16px 0",
    },
  },
  {
    ".week-event": {
      borderLeft: "3px solid var(--event-color)",
      borderRadius: "9px",
      background: designColors.surface,
      padding: "10px 8px",
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      minWidth: "0",
    },
  },
  {
    ".week-event.is-done": {
      opacity: ".58",
    },
  },
  {
    ".week-event.is-done>strong": {
      textDecoration: "line-through",
    },
  },
  {
    ".week-event-top": {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      minWidth: "0",
    },
  },
  {
    ".week-check": {
      border: `1px solid ${designColors.border}`,
      background: designColors.paper,
      width: "17px",
      height: "17px",
      flex: "0 0 17px",
      borderRadius: "5px",
      display: "grid",
      placeItems: "center",
      color: designColors.background,
      padding: "0",
    },
  },
  {
    ".week-check.checked": {
      background: designColors.primary,
      borderColor: designColors.border,
    },
  },
  {
    ".week-event-cat": {
      fontSize: "9px",
      color: designColors.muted,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  {
    ".week-event-tools": {
      marginLeft: "auto",
    },
  },
  {
    ".week-event-tools button": {
      background: "transparent",
      border: "0",
      color: designColors.muted,
      padding: "0",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".week-event>strong": {
      fontSize: "11px",
      lineHeight: "1.36",
      color: designColors.text,
      overflowWrap: "anywhere",
    },
  },
  {
    ".week-event>small": {
      fontSize: "9px",
      color: designColors.muted,
      display: "flex",
      alignItems: "center",
      gap: "4px",
      flexWrap: "wrap",
    },
  },
  {
    ".week-high-priority": {
      fontSize: "8px",
      fontWeight: "800",
      color: statusColors.warning,
    },
  },
  {
    ".week-after": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "13px",
    },
  },
  {
    ".week-after .simple-card": {
      padding: "20px",
    },
  },
  {
    ".week-after .simple-card p": {
      fontSize: "11px",
      lineHeight: "1.6",
    },
  },
  {
    ".week-repeat-check": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      padding: "12px",
      background: designColors.surface,
      borderRadius: "10px",
      color: designColors.primary,
      fontSize: "12px",
      fontWeight: "700",
    },
  },
  {
    ".nimbo-art": {
      width: "100%",
      height: "auto",
      display: "block",
      overflow: "visible",
      filter: `drop-shadow(0 4px 7px ${withOpacity(designColors.dark, 0.125)})`,
    },
  },
  {
    ".nimbo-big": {
      maxWidth: "265px",
    },
  },
  {
    ".nimbo-widget": {
      position: "fixed",
      bottom: "22px",
      right: "23px",
      width: "318px",
      zIndex: "26",
      maxWidth: "calc(100vw - 32px)",
    },
  },
  {
    ".nimbo-widget.is-closed": {
      width: "211px",
    },
  },
  {
    ".nimbo-tab": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "9px",
      width: "100%",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      padding: "8px 13px 8px 8px",
      borderRadius: "18px",
      boxShadow: `0 10px 35px ${withOpacity(designColors.dark, 0.2)}`,
      color: designColors.text,
    },
  },
  {
    ".nimbo-tab>span:nth-child(2)": {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
    },
  },
  {
    ".nimbo-tab strong": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-tab small": {
      fontSize: "9px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-tab-avatar": {
      display: "block",
      width: "48px",
      height: "48px",
      overflow: "hidden",
      borderRadius: "13px",
      background: `linear-gradient(${designColors.surface},${statusColors.warningSoft})`,
    },
  },
  {
    ".nimbo-tab-avatar .nimbo-art": {
      width: "53px",
      transform: "translate(-3px,-4px)",
    },
  },
  {
    ".nimbo-panel": {
      background: designColors.background,
      borderRadius: "21px",
      border: `1px solid ${designColors.border}`,
      overflow: "hidden",
      boxShadow: `0 18px 68px ${withOpacity(designColors.dark, 0.247)}`,
      animation: "nimbo-open .25s ease-out",
    },
  },
  {
    "@keyframes nimbo-open": {
      from: {
        opacity: "0",
        transform: "translateY(15px) scale(.98)",
      },
      to: {
        opacity: "1",
        transform: "translateY(0) scale(1)",
      },
    },
  },
  {
    ".nimbo-panel-head": {
      height: "40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 15px",
      background: designColors.surface,
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".nimbo-live": {
      fontSize: "9px",
      letterSpacing: "1.4px",
      fontWeight: "850",
      color: designColors.primary,
      display: "flex",
      alignItems: "center",
      gap: "7px",
    },
  },
  {
    ".nimbo-live i": {
      width: "7px",
      height: "7px",
      background: designColors.accent,
      borderRadius: "50%",
      boxShadow: `0 0 0 3px ${withOpacity(designColors.accent, 0.133)}`,
    },
  },
  {
    ".nimbo-panel-head>div": {
      display: "flex",
      gap: "3px",
    },
  },
  {
    ".nimbo-tool": {
      width: "29px",
      height: "29px",
      border: "0",
      borderRadius: "8px",
      background: "transparent",
      color: designColors.muted,
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".nimbo-tool:hover": {
      background: designColors.surface,
    },
  },
  {
    ".nimbo-habitat": {
      height: "175px",
      position: "relative",
      overflow: "hidden",
      background: `radial-gradient(ellipse at 50% 98%,${designColors.light} 0%,${designColors.surface} 40%,${designColors.light} 78%,${designColors.surface} 100%)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    ".nimbo-light": {
      position: "absolute",
      inset: "0",
      background: `radial-gradient(circle at 20% 10%,${withOpacity(designColors.background, 0.78)},transparent 35%)`,
    },
  },
  {
    ".nimbo-floor": {
      position: "absolute",
      zIndex: "1",
      width: "180px",
      height: "21px",
      bottom: "12px",
      background: withOpacity(designColors.primary, 0.22),
      borderRadius: "50%",
      filter: "blur(8px)",
    },
  },
  {
    ".nimbo-art-button": {
      border: "0",
      background: "none",
      padding: "0",
      position: "relative",
      zIndex: "2",
      width: "178px",
      alignSelf: "center",
      transition: "transform .15s",
    },
  },
  {
    ".nimbo-art-button:hover": {
      transform: "scale(1.05)",
    },
  },
  {
    ".nimbo-art-button .nimbo-art": {
      maxHeight: "187px",
      filter: `drop-shadow(0 8px 8px ${withOpacity(designColors.dark, 0.251)})`,
    },
  },
  {
    ".nimbo-star": {
      position: "absolute",
      color: statusColors.warningSoft,
      fontSize: "24px",
      opacity: ".75",
      animation: "nimbo-twinkle 2.5s infinite alternate",
    },
  },
  {
    ".star-a": {
      left: "40px",
      top: "42px",
    },
  },
  {
    ".star-b": {
      right: "44px",
      top: "29px",
      animationDelay: "1s",
    },
  },
  {
    "@keyframes nimbo-twinkle": {
      from: {
        opacity: ".25",
        transform: "scale(.65)",
      },
      to: {
        opacity: "1",
        transform: "scale(1.15)",
      },
    },
  },
  {
    ".nimbo-panel-body": {
      padding: "13px 15px 14px",
    },
  },
  {
    ".nimbo-title": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      alignItems: "flex-start",
      marginBottom: "12px",
    },
  },
  {
    ".nimbo-title h3": {
      fontSize: "13px",
      color: designColors.text,
      margin: "0 0 2px",
    },
  },
  {
    ".nimbo-title small": {
      fontSize: "9px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-mood": {
      border: `1px solid ${designColors.border}`,
      borderRadius: "50px",
      padding: "5px 8px",
      color: designColors.muted,
      fontSize: "9px",
      background: designColors.surface,
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-meter-label": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "9px",
      color: designColors.muted,
      margin: "7px 0 4px",
    },
  },
  {
    ".nimbo-meter-label span": {
      display: "flex",
      gap: "5px",
      alignItems: "center",
    },
  },
  {
    ".nimbo-meter-label b": {
      color: designColors.muted,
    },
  },
  {
    ".nimbo-meter": {
      height: "6px",
      width: "100%",
      background: designColors.surface,
      borderRadius: "20px",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-meter i": {
      display: "block",
      height: "100%",
      background: `linear-gradient(90deg,${designColors.accent},${designColors.primary})`,
      borderRadius: "20px",
    },
  },
  {
    ".nimbo-meter.xp i": {
      background: `linear-gradient(90deg,${statusColors.warning},${statusColors.warning})`,
    },
  },
  {
    ".nimbo-bubble": {
      borderRadius: "11px",
      display: "flex",
      gap: "9px",
      alignItems: "flex-start",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      padding: "10px",
      marginTop: "13px",
      fontSize: "10px",
      lineHeight: "1.6",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-bubble svg": {
      flexShrink: "0",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-actions": {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "6px",
      marginTop: "11px",
    },
  },
  {
    ".nimbo-actions button": {
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "9px",
      color: designColors.muted,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      padding: "9px 2px",
      fontSize: "9px",
      fontWeight: "750",
    },
  },
  {
    ".nimbo-actions button:hover": {
      background: designColors.surface,
    },
  },
  {
    ".nimbo-chat": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginTop: "9px",
    },
  },
  {
    ".nimbo-chat input:not(.MuiInputBase-input)": {
      width: "100%",
      border: `1px solid ${designColors.border}`,
      borderRadius: "9px",
      padding: "9px",
      fontSize: "10px",
    },
  },
  {
    ".nimbo-chat button": {
      background: designColors.primary,
      color: designColors.paper,
      border: "0",
      borderRadius: "9px",
      padding: "9px",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".nimbo-collection-link": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "none",
      border: "0",
      width: "100%",
      fontSize: "10px",
      fontWeight: "800",
      color: designColors.primary,
      marginTop: "10px",
      padding: "5px 0 0",
    },
  },
  {
    ".nimbo-onboarding-floating": {
      position: "fixed",
      bottom: "20px",
      right: "22px",
      zIndex: "25",
      width: "212px",
    },
  },
  {
    ".nimbo-first": {
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      marginTop: "8px",
      padding: "13px",
      fontSize: "11px",
      lineHeight: "1.6",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-picker": {
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      borderRadius: "17px",
      padding: "25px",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
  },
  {
    ".nimbo-picker h2": {
      fontSize: "20px",
      color: designColors.text,
      margin: "6px 0",
    },
  },
  {
    ".nimbo-picker p": {
      fontSize: "12px",
      color: designColors.muted,
      lineHeight: "1.7",
      margin: "0",
    },
  },
  {
    ".nimbo-options": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(106px,1fr))",
      gap: "9px",
    },
  },
  {
    ".nimbo-choice": {
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      borderRadius: "13px",
      padding: "7px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3px",
      maxHeight: "164px",
    },
  },
  {
    ".nimbo-choice.active": {
      borderColor: designColors.border,
      background: designColors.surface,
      boxShadow: `0 0 0 2px ${withOpacity(designColors.accent, 0.212)}`,
    },
  },
  {
    ".nimbo-choice .nimbo-art": {
      width: "91px",
      height: "100px",
    },
  },
  {
    ".nimbo-choice strong": {
      fontSize: "11px",
      color: designColors.text,
    },
  },
  {
    ".nimbo-choice small": {
      fontSize: "9px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-picker .btn": {
      alignSelf: "flex-start",
    },
  },
  {
    ".nimbo-hero-card": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      background: designColors.surface,
      borderRadius: "16px",
      padding: "20px",
    },
  },
  {
    ".nimbo-hero-card>.nimbo-art": {
      maxWidth: "150px",
    },
  },
  {
    ".nimbo-hero-card h2": {
      fontSize: "18px",
      color: designColors.dark,
    },
  },
  {
    ".nimbo-hero-card p": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-collection-banner": {
      background: `linear-gradient(120deg,${designColors.surface},${designColors.surface})`,
      border: `1px solid ${designColors.border}`,
      borderRadius: "17px",
      padding: "23px 26px",
      display: "flex",
      gap: "22px",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-collection-banner>div": {
      maxWidth: "630px",
    },
  },
  {
    ".nimbo-collection-banner h2": {
      color: designColors.text,
      fontSize: "21px",
      margin: "9px 0",
    },
  },
  {
    ".nimbo-collection-banner p": {
      color: designColors.muted,
      fontSize: "12px",
      lineHeight: "1.6",
    },
  },
  {
    ".nimbo-collection-banner>.nimbo-art": {
      width: "220px",
    },
  },
  {
    ".collection-hero-tags": {
      display: "flex",
      gap: "8px",
    },
  },
  {
    ".collection-hero-tags span": {
      fontSize: "10px",
      background: withOpacity(designColors.background, 0.6),
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      padding: "7px 10px",
      color: designColors.muted,
      fontWeight: "800",
    },
  },
  {
    ".nimbo-collection-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
      gap: "13px",
    },
  },
  {
    ".nimbo-collection-card": {
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      borderRadius: "15px",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-collection-card.active": {
      borderColor: designColors.border,
    },
  },
  {
    ".nimbo-collection-visual": {
      background: "var(--nimbo-tone)",
      height: "175px",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".nimbo-collection-visual .nimbo-art": {
      height: "168px",
      maxWidth: "190px",
    },
  },
  {
    ".nimbo-collection-info": {
      padding: "16px",
    },
  },
  {
    ".nimbo-collection-name": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "5px",
    },
  },
  {
    ".nimbo-collection-name strong": {
      fontSize: "12px",
      color: designColors.text,
    },
  },
  {
    ".nimbo-collection-name span": {
      display: "flex",
      alignItems: "center",
      gap: "3px",
      fontSize: "9px",
      color: designColors.primary,
    },
  },
  {
    ".nimbo-collection-info p": {
      fontSize: "10px",
      color: designColors.muted,
      margin: "7px 0 9px",
    },
  },
  {
    ".nimbo-collection-info .btn": {
      width: "100%",
      marginTop: "14px",
    },
  },
  {
    ".nimbo-lock-note": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: designColors.muted,
      background: statusColors.warningSoft,
      border: `1px solid ${statusColors.warningSoft}`,
      padding: "14px",
      borderRadius: "12px",
      fontSize: "11px",
    },
  },
  {
    ".section-intro h2,.section-toolbar,.edital-progress-main strong,.timer-digits,.review-hero h2,.settings-group-head h4":
      {
        color: designColors.text,
      },
  },
  {
    ".edital-progress-panel": {
      background: `linear-gradient(117deg,${designColors.surface},${designColors.surface})`,
      borderColor: designColors.border,
    },
  },
  {
    ".edital-progress-panel .progress-fill": {
      background: `${designColors.primary} !important`,
    },
  },
  {
    ".status-pill,.mastery-pill,.accuracy-tag": {
      borderRadius: "16px",
    },
  },
  {
    ".topic-symbol": {
      borderRadius: "10px",
    },
  },
  {
    ".table-checkbox.checked": {
      background: designColors.primary,
      borderColor: designColors.border,
    },
  },
  {
    ".table-topic strong": {
      color: designColors.text,
    },
  },
  {
    ".filter-select,.search-wrap": {
      borderColor: designColors.border,
    },
  },
  {
    ".timer-face": {
      borderColor: designColors.border,
      background: `linear-gradient(160deg,${designColors.surface},${designColors.background})`,
    },
  },
  {
    ".timer-icon": {
      color: designColors.primary,
      background: designColors.surface,
    },
  },
  {
    ".cycle-card.active": {
      borderColor: designColors.border,
      background: designColors.surface,
    },
  },
  {
    ".cycle-next-label": {
      color: designColors.primary,
    },
  },
  {
    ".focus-suggestion": {
      background: designColors.surface,
      borderColor: designColors.border,
    },
  },
  {
    ".focus-symbol": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".tip": {
      background: designColors.surface,
      borderColor: designColors.border,
      color: designColors.muted,
    },
  },
  {
    ".tip svg": {
      color: designColors.primary,
    },
  },
  {
    ".stats-panel,.analytics-section": {
      borderColor: designColors.border,
    },
  },
  {
    ".analytics-view .panel": {
      background: designColors.background,
    },
  },
  {
    "@media (min-width:1600px)": {
      ".app-main": {
        marginRight: 0,
      },
      ".main-content": {
        padding: "38px 35px",
      },
      ".nimbo-widget": {
        width: "294px",
        bottom: "24px",
        right: "13px",
      },
    },
  },
  {
    "@media (max-width:1450px)": {
      ".home-metrics": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".home-lower-nimbo": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".home-lower-nimbo .weekly-graph-card": {
        gridColumn: "1 / -1",
      },
      ".week-board": {
        overflowX: "auto",
        gridTemplateColumns: "repeat(7,minmax(120px,1fr))",
        paddingBottom: "8px",
      },
      ".week-day": {
        minHeight: "200px",
      },
    },
  },
  {
    "@media (max-width:1260px)": {
      ".sidebar": {
        width: "230px",
      },
      ".app-main": {
        marginLeft: "230px",
      },
      ".main-content": {
        padding: "28px 24px",
      },
      ".topbar": {
        padding: "0 26px",
      },
      ".nimbo-widget": {
        right: "14px",
        bottom: "14px",
      },
      ".nimbo-panel": {
        boxShadow: `0 12px 45px ${withOpacity(designColors.dark, 0.302)}`,
      },
    },
  },
  {
    "@media (max-width:1030px)": {
      ".sidebar": {
        width: "210px",
      },
      ".app-main": {
        marginLeft: "210px",
      },
      ".topbar-quick": {
        display: "none",
      },
      ".welcome-content h2": {
        fontSize: "25px",
      },
      ".welcome-today": {
        minWidth: "155px",
        width: "162px",
        padding: "16px",
      },
      ".home-lower-nimbo": {
        gridTemplateColumns: "1fr",
      },
      ".home-lower-nimbo .weekly-graph-card": {
        gridColumn: "auto",
      },
      ".week-board": {
        gridTemplateColumns: "repeat(7,130px)",
      },
      ".week-summary": {
        gridTemplateColumns: "repeat(2,1fr)",
      },
      ".nimbo-widget": {
        width: "285px",
      },
    },
  },
  {
    "@media (max-width:760px)": {
      ".sidebar": {
        width: "264px",
        transform: "translateX(-102%)",
      },
      ".sidebar.nav-visible": {
        transform: "translateX(0)",
      },
      ".app-main": {
        marginLeft: "0",
      },
      ".mobile-menu": {
        display: "grid !important",
      },
      ".topbar": {
        height: "63px",
        padding: "0 18px",
      },
      ".main-content": {
        padding: "23px 17px 13px",
      },
      ".nimbo-welcome": {
        padding: "26px 22px",
      },
      ".welcome-content h2": {
        fontSize: "22px",
      },
      ".welcome-today": {
        display: "none",
      },
      ".home-metrics": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
        gap: "10px",
      },
      ".home-metric": {
        padding: "16px",
        minHeight: "165px",
      },
      ".home-metric strong": {
        fontSize: "24px",
      },
      ".home-section-head h2": {
        fontSize: "18px",
      },
      ".nimbo-widget": {
        bottom: "11px",
        right: "12px",
        width: "282px",
        maxWidth: "calc(100vw - 24px)",
      },
      ".week-board": {
        overflowX: "auto",
      },
      ".weekly-hero": {
        padding: "22px",
        flexDirection: "column",
        alignItems: "flex-start",
      },
      ".weekly-hero .btn": {
        alignSelf: "flex-start",
      },
      ".edital-upload-banner": {
        flexWrap: "wrap",
        gap: "12px",
      },
      ".edital-upload-banner>div:nth-child(2)": {
        flexBasis: "calc(100% - 75px)",
      },
      ".edital-upload-banner>.btn": {
        marginLeft: "auto",
      },
      ".week-after": {
        gridTemplateColumns: "1fr",
      },
      ".nimbo-collection-banner>.nimbo-art": {
        maxWidth: "128px",
      },
      ".nimbo-collection-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
    },
  },
  {
    "@media (max-width:520px)": {
      ".page-header h1": {
        fontSize: "24px",
      },
      ".page-header p": {
        fontSize: "11px",
      },
      ".nimbo-welcome": {
        borderRadius: "17px",
      },
      ".welcome-content h2": {
        fontSize: "21px",
      },
      ".welcome-content p": {
        fontSize: "11px",
      },
      ".welcome-actions": {
        gap: "8px",
      },
      ".welcome-actions button": {
        fontSize: "10px",
        padding: "10px 12px",
      },
      ".home-metric": {
        minHeight: "152px",
        padding: "14px",
      },
      ".home-metric strong": {
        fontSize: "21px",
      },
      ".home-metric small": {
        fontSize: "9px",
      },
      ".home-section-head": {
        alignItems: "flex-start",
        flexDirection: "column",
        gap: "8px",
      },
      ".week-controls": {
        flexWrap: "wrap",
      },
      ".week-nav": {
        gap: "4px",
      },
      ".week-nav>div": {
        minWidth: "134px",
      },
      ".week-summary>div": {
        padding: "13px",
      },
      ".week-summary strong": {
        fontSize: "20px",
      },
      ".week-filters": {
        width: "100%",
      },
      ".week-filters select:not(.MuiInputBase-input)": {
        width: "100%",
      },
      ".edital-upload-icon": {
        width: "43px",
        height: "43px",
        flexBasis: "43px",
      },
      ".edital-upload-banner>div:nth-child(2)": {
        flexBasis: "calc(100% - 55px)",
      },
      ".edital-upload-banner h3": {
        fontSize: "14px",
      },
      ".edital-preview-top": {
        flexDirection: "column",
      },
      ".nimbo-collection-banner": {
        padding: "16px",
      },
      ".nimbo-collection-banner>.nimbo-art": {
        width: "80px",
      },
      ".nimbo-collection-banner h2": {
        fontSize: "17px",
      },
      ".nimbo-collection-grid": {
        gridTemplateColumns: "1fr",
      },
      ".nimbo-options": {
        gridTemplateColumns: "repeat(2,1fr)",
      },
      ".nimbo-panel": {
        borderRadius: "17px",
      },
      ".nimbo-widget.is-closed": {
        width: "190px",
      },
      ".toast": {
        bottom: "80px",
        right: "12px",
      },
      ".nimbo-picker": {
        padding: "17px",
      },
    },
  },
  {
    "@media (prefers-reduced-motion:reduce)": {
      ".nimbo-float,.nimbo-orbit,.nimbo-face,.nimbo-crown,.nimbo-star,.nimbo-panel":
        {
          animation: "none !important",
        },
      "*": {
        scrollBehavior: "auto !important",
      },
    },
  },
  {
    ":root": {
      "--accent": designColors.primary,
      "--dark": designColors.dark,
      "--muted": designColors.muted,
      "--border": designColors.border,
      "--success": designColors.primary,
      "--soft": designColors.surface,
    },
  },
  {
    body: {
      fontSize: "15px",
      lineHeight: "1.55",
      background: designColors.surface,
      color: designColors.dark,
    },
  },
  {
    ".nimbo-theme .app-main": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .main-content": {
      maxWidth: "none",
      padding: "36px clamp(16px,3vw,44px) 28px",
    },
  },
  {
    ".nimbo-theme h1,.nimbo-theme h2,.nimbo-theme h3,.nimbo-theme h4": {
      lineHeight: "1.27",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme p": {
      lineHeight: "1.65",
    },
  },
  {
    ".nimbo-theme button,.nimbo-theme input:not(.MuiInputBase-input),.nimbo-theme select:not(.MuiInputBase-input),.nimbo-theme textarea":
      {
        fontSize: "14px",
      },
  },
  {
    ".nimbo-theme input:not(.MuiInputBase-input):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]),\n.nimbo-theme select:not(.MuiInputBase-input),.nimbo-theme textarea":
      {
        minHeight: "43px",
        lineHeight: "1.45",
      },
  },
  {
    ".nimbo-theme input:not(.MuiInputBase-input)::placeholder,.nimbo-theme textarea::placeholder":
      {
        color: designColors.muted,
      },
  },
  {
    ".nimbo-theme .btn": {
      minHeight: "42px",
      fontSize: "13px",
      lineHeight: "1.35",
      fontWeight: "750",
      whiteSpace: "normal",
      textAlign: "center",
      padding: "10px 15px",
      borderRadius: "10px",
    },
  },
  {
    ".nimbo-theme .btn:focus-visible,.nimbo-theme .icon-button:focus-visible": {
      outline: `3px solid ${statusColors.warning}`,
      outlineOffset: "2px",
    },
  },
  {
    ".nimbo-theme small": {
      fontSize: "12px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .eyebrow,.nimbo-theme .page-breadcrumb,.nimbo-theme .nav-label":
      {
        fontSize: "11px",
        letterSpacing: ".8px",
      },
  },
  {
    ".nimbo-theme .page-header": {
      marginBottom: "24px",
    },
  },
  {
    ".nimbo-theme .page-header h1": {
      fontSize: "clamp(27px,2.5vw,35px)",
      lineHeight: "1.2",
      letterSpacing: "-.8px",
    },
  },
  {
    ".nimbo-theme .page-header p": {
      fontSize: "14px",
      lineHeight: "1.6",
      marginBottom: "0",
    },
  },
  {
    ".nimbo-theme .topbar-path": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .edition-chip": {
      fontSize: "12px",
      maxWidth: "260px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-theme .topbar-quick": {
      fontSize: "13px",
      gap: "7px",
    },
  },
  {
    ".nimbo-theme .sidebar-overline": {
      fontSize: "11px",
      lineHeight: "1.4",
      letterSpacing: ".65px",
      marginBottom: "20px",
    },
  },
  {
    ".nimbo-theme .nav-item": {
      minHeight: "46px",
      fontSize: "13.5px",
      lineHeight: "1.35",
    },
  },
  {
    ".nimbo-theme .more-toggle": {
      fontSize: "13px",
      minHeight: "42px",
    },
  },
  {
    ".nimbo-theme .sidebar-hint strong": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .sidebar-hint span": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .brand-wordmark small": {
      fontSize: "10px",
      letterSpacing: ".9px",
    },
  },
  {
    ".nimbo-theme .panel,.nimbo-theme .simple-card,.nimbo-theme .home-metric,.nimbo-theme .mini-metric,.nimbo-theme .note-card,\n.nimbo-theme .insight-card":
      {
        borderColor: designColors.border,
        boxShadow: `0 4px 16px ${withOpacity(designColors.dark, 0.039)}`,
        minWidth: "0",
      },
  },
  {
    ".nimbo-theme .panel-heading": {
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "14px",
      marginBottom: "19px",
    },
  },
  {
    ".nimbo-theme .panel-heading h3": {
      fontSize: "18px",
      lineHeight: "1.35",
      color: designColors.dark,
      marginBottom: "4px",
    },
  },
  {
    ".nimbo-theme .panel-heading p": {
      fontSize: "13px",
      lineHeight: "1.55",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .panel-heading>div": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .section-toolbar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
    },
  },
  {
    ".nimbo-theme .toolbar-info": {
      fontSize: "13px",
      lineHeight: "1.5",
      color: designColors.muted,
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .toolbar-buttons": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      gap: "9px",
    },
  },
  {
    ".nimbo-theme .section-intro h2": {
      fontSize: "20px",
    },
  },
  {
    ".nimbo-theme .section-intro p": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .text-link,.nimbo-theme .plain-action,.nimbo-theme .row-link":
      {
        fontSize: "13px",
        fontWeight: "750",
        gap: "7px",
      },
  },
  {
    ".nimbo-theme .small-chip,.nimbo-theme .pill-counter,.nimbo-theme .accuracy-tag,.nimbo-theme .mastery-pill,.nimbo-theme .status-pill":
      {
        fontSize: "12px",
        lineHeight: "1.4",
        whiteSpace: "normal",
      },
  },
  {
    ".nimbo-theme .tip": {
      fontSize: "13px",
      lineHeight: "1.7",
      gap: "10px",
    },
  },
  {
    ".nimbo-theme .empty h4": {
      fontSize: "16px",
    },
  },
  {
    ".nimbo-theme .empty p": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .field-label": {
      fontSize: "13px",
      color: designColors.muted,
      fontWeight: "750",
    },
  },
  {
    ".nimbo-theme .field-hint": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .field": {
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .field input:not(.MuiInputBase-input),.nimbo-theme .field select:not(.MuiInputBase-input),.nimbo-theme .field textarea":
      {
        fontSize: "14px",
        borderRadius: "10px",
        padding: "11px 12px",
      },
  },
  {
    ".nimbo-theme .form-stack": {
      gap: "17px",
    },
  },
  {
    ".nimbo-theme .form-grid": {
      gap: "14px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .form-grid>*": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .form-check-row label,.nimbo-theme .checkbox-label": {
      fontSize: "13px",
      lineHeight: "1.55",
    },
  },
  {
    ".nimbo-theme .modal-panel": {
      width: "min(calc(100% - 24px),570px)",
      maxHeight: "92dvh",
      overflow: "auto",
    },
  },
  {
    ".nimbo-theme .modal-panel.modal-wide": {
      width: "min(calc(100% - 24px),1040px)",
      maxWidth: "1040px",
    },
  },
  {
    ".nimbo-theme .modal-top": {
      padding: "21px 25px 17px",
    },
  },
  {
    ".nimbo-theme .modal-body": {
      padding: "24px 25px",
    },
  },
  {
    ".nimbo-theme .modal-top h2": {
      fontSize: "20px",
    },
  },
  {
    ".nimbo-theme .modal-top p": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .modal-actions": {
      flexWrap: "wrap",
      gap: "10px",
    },
  },
  {
    ".nimbo-theme .data-table": {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      minWidth: "700px",
    },
  },
  {
    ".nimbo-theme .data-table th": {
      fontSize: "11px",
      letterSpacing: ".45px",
      padding: "14px 13px",
      color: designColors.muted,
      background: designColors.surface,
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .data-table td": {
      fontSize: "13px",
      lineHeight: "1.5",
      color: designColors.muted,
      padding: "14px 13px",
      verticalAlign: "middle",
    },
  },
  {
    ".nimbo-theme .data-table strong": {
      fontSize: "13px",
      color: designColors.dark,
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .table-topic,.nimbo-theme .performance-info": {
      minWidth: "0",
      gap: "11px",
    },
  },
  {
    ".nimbo-theme .table-topic strong,.nimbo-theme .table-cell-main strong": {
      fontSize: "13px",
      whiteSpace: "normal",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .table-topic span:not(.topic-symbol),.nimbo-theme .table-cell-main small":
      {
        fontSize: "12px",
        lineHeight: "1.4",
        display: "block",
        color: designColors.muted,
        marginTop: "4px",
        overflowWrap: "anywhere",
      },
  },
  {
    ".nimbo-theme .data-table th:not(:first-child),.nimbo-theme .data-table td:not(:first-child)":
      {
        whiteSpace: "normal",
      },
  },
  {
    ".nimbo-theme .data-table .table-cell-main": {
      maxWidth: "500px",
      minWidth: "160px",
    },
  },
  {
    ".nimbo-theme .table-scroll": {
      maxWidth: "100%",
      overflowX: "auto",
      overscrollBehaviorX: "contain",
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
    },
  },
  {
    ".nimbo-theme .table-checkbox": {
      width: "27px",
      height: "27px",
      margin: "0 auto",
    },
  },
  {
    ".nimbo-theme .table-actions": {
      gap: "10px",
    },
  },
  {
    ".nimbo-theme .filter-row": {
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .search-wrap": {
      height: "auto",
      minHeight: "43px",
      minWidth: "0",
      borderRadius: "10px",
      flex: "1",
      gap: "9px",
    },
  },
  {
    ".nimbo-theme .search-wrap input:not(.MuiInputBase-input)": {
      fontSize: "14px",
      minHeight: "40px !important",
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .filter-select": {
      minHeight: "43px",
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .mini-metric-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "14px",
    },
  },
  {
    ".nimbo-theme .mini-metric": {
      display: "grid",
      gridTemplateColumns: "48px minmax(0,1fr)",
      gridTemplateRows: "auto auto auto",
      gap: "2px 14px",
      alignItems: "center",
      padding: "20px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .mini-metric .mini-icon": {
      gridRow: "1/span 3",
      gridColumn: "1",
      alignSelf: "center",
    },
  },
  {
    ".nimbo-theme .mini-metric>span": {
      gridColumn: "2",
      fontSize: "11px",
      letterSpacing: ".45px",
      lineHeight: "1.45",
      color: designColors.muted,
      minHeight: "0",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .mini-metric>strong": {
      gridColumn: "2",
      fontSize: "clamp(23px,2.1vw,31px)",
      lineHeight: "1.2",
      color: designColors.dark,
      minWidth: "0",
      overflowWrap: "anywhere",
      margin: "2px 0",
    },
  },
  {
    ".nimbo-theme .mini-metric>small": {
      gridColumn: "2",
      fontSize: "12px",
      color: designColors.muted,
      minWidth: "0",
      margin: "0",
    },
  },
  {
    ".metric-split": {
      fontSize: ".69em",
      color: statusColors.error,
      fontWeight: "650",
      verticalAlign: "baseline",
    },
  },
  {
    ".nimbo-theme .performance-row": {
      gap: "18px",
      flexWrap: "wrap",
      alignItems: "center",
      padding: "14px 3px",
    },
  },
  {
    ".nimbo-theme .performance-info": {
      flex: "1 1 230px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .performance-info strong": {
      fontSize: "13px",
      whiteSpace: "normal",
      lineHeight: "1.4",
      overflowWrap: "anywhere",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .performance-info span": {
      fontSize: "12px",
      color: designColors.muted,
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .performance-counts": {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      minWidth: "120px",
    },
  },
  {
    ".nimbo-theme .performance-counts span": {
      fontSize: "12px",
      color: designColors.muted,
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .performance-counts b": {
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .performance-bar": {
      minWidth: "85px",
      flex: "1 1 140px",
      maxWidth: "240px",
    },
  },
  {
    ".nimbo-theme .note-grid": {
      gap: "15px",
    },
  },
  {
    ".nimbo-theme .note-card": {
      padding: "20px",
      borderRadius: "14px",
    },
  },
  {
    ".nimbo-theme .note-topic": {
      fontSize: "12px",
      lineHeight: "1.5",
      overflowWrap: "anywhere",
      display: "flex",
      gap: "7px",
    },
  },
  {
    ".nimbo-theme .note-source": {
      display: "flex",
      alignItems: "start",
      flexWrap: "wrap",
      gap: "8px",
      margin: "11px 0",
    },
  },
  {
    ".nimbo-theme .note-source span": {
      fontSize: "13px",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .note-source small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .note-block": {
      padding: "15px 17px",
    },
  },
  {
    ".nimbo-theme .note-block>span": {
      fontSize: "11px",
      letterSpacing: ".3px",
    },
  },
  {
    ".nimbo-theme .note-block p": {
      fontSize: "13px",
      lineHeight: "1.7",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .note-block.correct-block p": {
      color: statusColors.success,
    },
  },
  {
    ".nimbo-theme .errors-callout p": {
      fontSize: "13px",
      lineHeight: "1.6",
    },
  },
  {
    ".nimbo-theme .screenshot-input,.nimbo-theme .screenshot-drop": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .screenshot-title": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .screenshot-drop": {
      fontSize: "13px",
      lineHeight: "1.55",
    },
  },
  {
    ".nimbo-theme .mock-row": {
      gap: "16px",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .mock-grade,.nimbo-theme .mock-cutoff": {
      minWidth: "95px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
  },
  {
    ".nimbo-theme .mock-grade>span,.nimbo-theme .mock-cutoff>span": {
      fontSize: "11px",
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .mock-grade strong,.nimbo-theme .mock-cutoff strong": {
      fontSize: "18px",
    },
  },
  {
    ".nimbo-theme .vault-card h4": {
      fontSize: "15px",
      lineHeight: "1.45",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .vault-card small,.nimbo-theme .vault-card .vault-type": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .reader-toolbar": {
      gap: "12px",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .reader-aside": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .reader-notes p,.nimbo-theme .docx-editor p": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .week-summary span": {
      fontSize: "12px",
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .week-summary strong": {
      fontSize: "clamp(22px,2vw,28px)",
    },
  },
  {
    ".nimbo-theme .weekly-hero h2": {
      fontSize: "23px",
    },
  },
  {
    ".nimbo-theme .weekly-hero p": {
      fontSize: "14px",
      lineHeight: "1.6",
    },
  },
  {
    ".nimbo-theme .weekly-hero": {
      flexWrap: "wrap",
      gap: "15px",
    },
  },
  {
    ".nimbo-theme .week-controls": {
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .week-nav strong": {
      fontSize: "14px",
      lineHeight: "1.45",
      textTransform: "capitalize",
    },
  },
  {
    ".nimbo-theme .week-nav small": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .week-day-top span": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .week-event-cat,.nimbo-theme .week-event>small": {
      fontSize: "11px",
    },
  },
  {
    ".nimbo-theme .week-event>strong": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .simple-card-head h3": {
      fontSize: "15px",
    },
  },
  {
    ".nimbo-theme .simple-card>p,.nimbo-theme .week-after .simple-card p": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .home-metric": {
      minHeight: "180px",
      gap: "7px",
    },
  },
  {
    ".nimbo-theme .home-metric>span": {
      fontSize: "13px",
      lineHeight: "1.45",
    },
  },
  {
    ".nimbo-theme .home-metric strong": {
      fontSize: "clamp(25px,2.4vw,35px)",
    },
  },
  {
    ".nimbo-theme .home-metric small": {
      fontSize: "12px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .home-section-head h2": {
      fontSize: "clamp(19px,2vw,24px)",
    },
  },
  {
    ".nimbo-theme .home-section-head .eyebrow": {
      fontSize: "11px",
    },
  },
  {
    ".nimbo-theme .welcome-content p": {
      fontSize: "14px",
      maxWidth: "580px",
      lineHeight: "1.65",
    },
  },
  {
    ".nimbo-theme .welcome-today>p,.nimbo-theme .welcome-today>span": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .next-subject": {
      fontSize: "16px",
      lineHeight: "1.4",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .today-tasks strong": {
      fontSize: "13px",
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .today-tasks small": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .nimbo-bubble": {
      fontSize: "12px",
      lineHeight: "1.6",
    },
  },
  {
    ".nimbo-theme .nimbo-live": {
      fontSize: "11px",
      letterSpacing: ".6px",
    },
  },
  {
    ".nimbo-theme .nimbo-title h3": {
      fontSize: "15px",
    },
  },
  {
    ".nimbo-theme .nimbo-title small,.nimbo-theme .nimbo-mood,.nimbo-theme .nimbo-meter-label":
      {
        fontSize: "11px",
      },
  },
  {
    ".nimbo-theme .nimbo-actions button": {
      fontSize: "11px",
      lineHeight: "1.35",
    },
  },
  {
    ".nimbo-theme .nimbo-chat input:not(.MuiInputBase-input)": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .nimbo-collection-link": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .nimbo-tab strong": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .nimbo-tab small": {
      fontSize: "11px",
    },
  },
  {
    ".nimbo-theme .settings-group-head h4,.nimbo-theme .settings-group-head p":
      {
        lineHeight: "1.5",
      },
  },
  {
    ".nimbo-theme .settings-group-head p": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .settings-security p": {
      fontSize: "13px",
    },
  },
  {
    ".filter-workspace": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "13px",
      alignItems: "end",
      marginBottom: "15px",
    },
  },
  {
    ".filter-item": {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      minWidth: "0",
      color: designColors.muted,
      fontSize: "13px",
      fontWeight: "750",
      lineHeight: "1.35",
    },
  },
  {
    ".filter-item>span": {
      overflowWrap: "anywhere",
    },
  },
  {
    ".filter-item input:not(.MuiInputBase-input),.filter-item select:not(.MuiInputBase-input)":
      {
        width: "100%",
        border: `1px solid ${designColors.border}`,
        borderRadius: "10px",
        background: designColors.surface,
        color: designColors.dark,
        padding: "9px 11px",
        minHeight: "43px",
        fontSize: "13px",
      },
  },
  {
    ".filter-item .search-wrap input:not(.MuiInputBase-input)": {
      padding: "0",
      background: "transparent",
      border: "0",
      boxShadow: "none !important",
    },
  },
  {
    ".filter-item.filter-search": {
      gridColumn: "span 2",
    },
  },
  {
    ".filter-foot": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
      borderTop: `1px solid ${designColors.border}`,
      paddingTop: "13px",
      color: designColors.muted,
      fontSize: "13px",
    },
  },
  {
    ".filter-foot strong": {
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .btn-danger-outline": {
      background: statusColors.errorSoft,
      color: statusColors.error,
      border: `1px solid ${statusColors.errorSoft}`,
      boxShadow: "none",
    },
  },
  {
    ".nimbo-theme .btn-danger-outline:hover": {
      background: statusColors.errorSoft,
      color: statusColors.error,
    },
  },
  {
    ".nimbo-theme .btn-danger": {
      background: statusColors.error,
      color: designColors.paper,
      border: `1px solid ${statusColors.error}`,
    },
  },
  {
    ".nimbo-theme .btn-danger:hover": {
      background: statusColors.error,
    },
  },
  {
    ".nimbo-theme .btn-sm": {
      fontSize: "12px",
      minHeight: "40px",
      padding: "9px 12px",
    },
  },
  {
    ".danger-explanation": {
      display: "flex",
      gap: "14px",
      padding: "18px",
      borderRadius: "12px",
      border: `1px solid ${statusColors.errorSoft}`,
      background: statusColors.errorSoft,
      marginBottom: "19px",
      color: statusColors.error,
    },
  },
  {
    ".danger-explanation svg": {
      flex: "0 0 auto",
    },
  },
  {
    ".danger-explanation strong": {
      color: statusColors.error,
      fontSize: "14px",
    },
  },
  {
    ".danger-explanation p": {
      fontSize: "13px",
      margin: "7px 0 0",
      color: statusColors.error,
    },
  },
  {
    ".maintenance-details summary": {
      cursor: "pointer",
      fontWeight: "750",
      color: designColors.text,
      fontSize: "14px",
      padding: "12px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      background: designColors.surface,
    },
  },
  {
    ".maintenance-details[open] summary": {
      marginBottom: "16px",
    },
  },
  {
    ".maintenance-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "11px",
    },
  },
  {
    ".maintenance-option": {
      padding: "15px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
    },
  },
  {
    ".maintenance-option>div": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      minWidth: "0",
    },
  },
  {
    ".maintenance-option strong": {
      fontSize: "14px",
      color: designColors.dark,
    },
  },
  {
    ".maintenance-option span,.maintenance-hint": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".maintenance-hint": {
      margin: "15px 0 0",
      lineHeight: "1.6",
    },
  },
  {
    ".dashboard-section-title": {
      marginTop: "12px",
    },
  },
  {
    ".dashboard-section-title p": {
      margin: "8px 0 0",
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".insight-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "17px",
      alignItems: "stretch",
    },
  },
  {
    ".insight-card": {
      border: `1px solid ${designColors.border}`,
      borderRadius: "17px",
      background: designColors.paper,
      padding: "22px",
      minWidth: "0",
    },
  },
  {
    ".insight-card header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "22px",
    },
  },
  {
    ".insight-card header h3": {
      fontSize: "17px",
      color: designColors.dark,
      margin: "5px 0 0",
    },
  },
  {
    ".insight-card header p": {
      fontSize: "13px",
      color: designColors.muted,
      margin: "8px 0 0",
      lineHeight: "1.6",
    },
  },
  {
    ".insight-card .eyebrow": {
      fontSize: "11px",
      color: designColors.primary,
      letterSpacing: ".6px",
    },
  },
  {
    ".insight-link": {
      background: "none",
      border: "0",
      color: designColors.text,
      fontSize: "12px",
      fontWeight: "750",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      lineHeight: "1.4",
      padding: "4px 0",
    },
  },
  {
    ".insight-link:hover": {
      textDecoration: "underline",
    },
  },
  {
    ".insight-full": {
      width: "100%",
    },
  },
  {
    ".coverage-list": {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      maxHeight: "440px",
      overflow: "auto",
      paddingRight: "4px",
    },
  },
  {
    ".coverage-row": {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },
  },
  {
    ".coverage-top": {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "13px",
      lineHeight: "1.4",
    },
  },
  {
    ".coverage-top strong": {
      fontSize: "13px",
      color: designColors.text,
      overflowWrap: "anywhere",
      maxWidth: "55%",
    },
  },
  {
    ".coverage-top span": {
      fontSize: "12px",
      color: designColors.muted,
      textAlign: "right",
    },
  },
  {
    ".coverage-top b": {
      marginLeft: "8px",
      color: designColors.text,
      whiteSpace: "nowrap",
    },
  },
  {
    ".stage-stats": {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
  },
  {
    ".stage-line": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
  {
    ".stage-line>div": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      alignItems: "center",
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".stage-line strong": {
      fontSize: "14px",
      color: designColors.text,
      whiteSpace: "nowrap",
    },
  },
  {
    ".data-footnote": {
      fontSize: "12px",
      lineHeight: "1.6",
      color: designColors.muted,
      marginTop: "22px",
      borderTop: `1px solid ${designColors.border}`,
      paddingTop: "12px",
    },
  },
  {
    ".chart-legend": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".chart-legend span": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
  },
  {
    ".chart-legend i": {
      display: "inline-block",
      height: "10px",
      width: "10px",
      borderRadius: "3px",
    },
  },
  {
    ".legend-correct": {
      background: designColors.primary,
    },
  },
  {
    ".legend-wrong": {
      background: statusColors.warning,
    },
  },
  {
    ".correct-error-chart": {
      display: "flex",
      flexDirection: "column",
      gap: "13px",
      maxHeight: "480px",
      overflow: "auto",
    },
  },
  {
    ".correct-error-row": {
      display: "grid",
      gridTemplateColumns: "minmax(105px,1.2fr) minmax(120px,1.8fr) 65px",
      gap: "10px",
      alignItems: "center",
      minWidth: "0",
    },
  },
  {
    ".chart-topic-name": {
      fontSize: "12px",
      color: designColors.muted,
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      lineHeight: "1.45",
    },
  },
  {
    ".stacked-track": {
      height: "12px",
      borderRadius: "7px",
      background: designColors.surface,
      display: "flex",
      overflow: "hidden",
    },
  },
  {
    ".stacked-track span": {
      display: "block",
      height: "100%",
      flex: "0 0 auto",
    },
  },
  {
    ".stacked-correct": {
      background: designColors.primary,
    },
  },
  {
    ".stacked-wrong": {
      background: statusColors.warning,
    },
  },
  {
    ".correct-error-row>strong": {
      fontSize: "12px",
      color: statusColors.success,
      textAlign: "right",
      whiteSpace: "nowrap",
    },
  },
  {
    ".correct-error-row>strong em": {
      fontWeight: "400",
      color: designColors.muted,
    },
  },
  {
    ".review-overview": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "9px",
    },
  },
  {
    ".review-overview>div": {
      borderRadius: "11px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "12px",
      minWidth: "0",
    },
  },
  {
    ".review-overview span": {
      fontSize: "11px",
      lineHeight: "1.4",
      color: designColors.muted,
    },
  },
  {
    ".review-overview strong": {
      fontSize: "25px",
      color: designColors.text,
      lineHeight: "1.1",
    },
  },
  {
    ".review-week-list": {
      display: "flex",
      flexDirection: "column",
      gap: "11px",
      marginTop: "23px",
    },
  },
  {
    ".review-week-list>div": {
      display: "grid",
      gridTemplateColumns: "83px 1fr 32px",
      gap: "11px",
      alignItems: "center",
    },
  },
  {
    ".review-week-list>div span,.review-week-list>div strong": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".review-week-list>div strong": {
      textAlign: "right",
      color: designColors.text,
    },
  },
  {
    ".review-day-track": {
      height: "10px",
      background: designColors.surface,
      borderRadius: "10px",
      overflow: "hidden",
    },
  },
  {
    ".review-day-track i": {
      display: "block",
      height: "100%",
      borderRadius: "10px",
      background: designColors.accent,
    },
  },
  {
    ".question-summary-line": {
      display: "flex",
      alignItems: "stretch",
      gap: "12px",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
  },
  {
    ".question-summary-line>span": {
      flex: "1 1 145px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "11px",
      padding: "12px",
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      color: designColors.muted,
    },
  },
  {
    ".question-summary-line strong": {
      fontSize: "19px",
      color: designColors.text,
    },
  },
  {
    ".question-trend": {
      display: "grid",
      gridTemplateColumns: "repeat(14,minmax(0,1fr))",
      gap: "8px",
      height: "182px",
      padding: "0 2px 7px",
      marginBottom: "10px",
    },
  },
  {
    ".trend-column": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: "0",
      gap: "6px",
    },
  },
  {
    ".trend-bars": {
      height: "150px",
      width: "100%",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      background: `repeating-linear-gradient(to top,${designColors.surface} 0 1px,transparent 1px 30px)`,
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".trend-data": {
      width: "70%",
      maxWidth: "28px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      borderRadius: "5px 5px 0 0",
      background: statusColors.warning,
      overflow: "hidden",
      minHeight: "0",
    },
  },
  {
    ".trend-correct": {
      background: designColors.primary,
      display: "block",
      width: "100%",
    },
  },
  {
    ".trend-column small": {
      fontSize: "11px",
      color: designColors.muted,
    },
  },
  {
    ".legend-hint": {
      marginLeft: "auto",
    },
  },
  {
    ".dashboard-filters": {
      gridTemplateColumns: "2fr 1fr 1fr",
      alignItems: "end",
      marginBottom: "16px",
    },
  },
  {
    ".dashboard-filters .filter-search": {
      gridColumn: "auto",
    },
  },
  {
    ".dashboard-topic-table": {
      minWidth: "1120px",
    },
  },
  {
    ".dashboard-topic-table td": {
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    ".dashboard-topic-table td:first-child": {
      minWidth: "210px",
      maxWidth: "360px",
    },
  },
  {
    ".dashboard-table-bottom": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "13px 0 0",
      flexWrap: "wrap",
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".planner-controls": {
      gap: "14px",
    },
  },
  {
    ".planner-controls-right": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "13px",
      flexWrap: "wrap",
    },
  },
  {
    ".planner-switch": {
      display: "flex",
      gap: "3px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "11px",
      padding: "4px",
    },
  },
  {
    ".planner-switch button": {
      border: "0",
      borderRadius: "8px",
      padding: "9px 13px",
      background: "transparent",
      color: designColors.muted,
      fontWeight: "750",
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontSize: "13px",
    },
  },
  {
    ".planner-switch button.active": {
      background: designColors.background,
      color: designColors.text,
      boxShadow: `0 2px 8px ${withOpacity(designColors.dark, 0.102)}`,
    },
  },
  {
    ".compact-filter": {
      minWidth: "160px",
    },
  },
  {
    ".planner-month-scroll": {
      width: "100%",
      overflowX: "auto",
      overscrollBehaviorX: "contain",
      borderRadius: "17px",
      border: `1px solid ${designColors.border}`,
      background: designColors.background,
    },
  },
  {
    ".planner-month-grid": {
      minWidth: "790px",
      display: "grid",
      gridTemplateColumns: "repeat(7,minmax(0,1fr))",
      gap: "1px",
      background: designColors.surface,
    },
  },
  {
    ".planner-month-weekday": {
      padding: "12px",
      background: designColors.surface,
      textAlign: "center",
      color: designColors.muted,
      fontWeight: "800",
      fontSize: "12px",
    },
  },
  {
    ".planner-month-day": {
      position: "relative",
      minWidth: "0",
      minHeight: "116px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "stretch",
      textAlign: "left",
      border: "0",
      borderRadius: "0",
      padding: "10px 10px 9px",
      background: designColors.background,
      transition: "background .15s",
    },
  },
  {
    ".planner-month-day:hover,.planner-month-day:focus-visible": {
      background: designColors.surface,
    },
  },
  {
    ".planner-month-day.outside": {
      background: designColors.surface,
      color: designColors.muted,
    },
  },
  {
    ".planner-month-day.today": {
      background: designColors.surface,
      boxShadow: `inset 0 0 0 2px ${designColors.accent}`,
    },
  },
  {
    ".planner-month-day .month-day-top": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "5px",
    },
  },
  {
    ".planner-month-day .month-day-top strong": {
      display: "grid",
      placeItems: "center",
      fontSize: "14px",
      fontWeight: "800",
      width: "26px",
      height: "26px",
      color: designColors.text,
      borderRadius: "8px",
    },
  },
  {
    ".planner-month-day.today .month-day-top strong": {
      background: designColors.primary,
      color: designColors.background,
    },
  },
  {
    ".planner-month-day .month-day-top small": {
      fontSize: "11px",
      color: designColors.muted,
      whiteSpace: "nowrap",
    },
  },
  {
    ".month-events": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      minWidth: "0",
    },
  },
  {
    ".month-event-label": {
      display: "block",
      fontSize: "11px",
      lineHeight: "1.35",
      padding: "3px 6px 3px 8px",
      borderRadius: "4px",
      background: designColors.surface,
      color: designColors.text,
      borderLeft: "3px solid var(--event-color)",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  {
    ".month-event-label.finished": {
      opacity: ".55",
      textDecoration: "line-through",
    },
  },
  {
    ".month-event-more": {
      fontSize: "10px",
      color: designColors.muted,
    },
  },
  {
    ".planner-day-modal": {
      display: "flex",
      flexDirection: "column",
      gap: "11px",
    },
  },
  {
    ".planner-day-modal>.btn": {
      alignSelf: "flex-start",
      marginBottom: "4px",
    },
  },
  {
    ".planner-day-item": {
      display: "flex",
      alignItems: "flex-start",
      gap: "11px",
      border: `1px solid ${designColors.border}`,
      borderLeft: "4px solid var(--event-color)",
      background: designColors.surface,
      borderRadius: "10px",
      padding: "13px",
    },
  },
  {
    ".planner-day-item>div": {
      flex: "1",
      minWidth: "0",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
  },
  {
    ".planner-day-item strong": {
      fontSize: "14px",
      color: designColors.text,
      lineHeight: "1.45",
      overflowWrap: "anywhere",
    },
  },
  {
    ".planner-day-item span": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".planner-day-item p": {
      margin: "4px 0 0",
      fontSize: "12px",
      color: designColors.muted,
      whiteSpace: "pre-wrap",
      overflowWrap: "anywhere",
    },
  },
  {
    ".planner-day-item .completed-text": {
      textDecoration: "line-through",
      opacity: ".7",
    },
  },
  {
    ".planner-day-empty": {
      fontSize: "14px",
      color: designColors.muted,
      padding: "20px 0",
    },
  },
  {
    "@media (max-width:1250px)": {
      ".filter-workspace": {
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      },
      ".nimbo-theme .home-metrics": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".nimbo-theme .mini-metric-grid": {
        gap: "10px",
      },
      ".nimbo-theme .mini-metric": {
        padding: "15px",
        gap: "2px 9px",
      },
      ".insight-grid": {
        gap: "12px",
      },
    },
  },
  {
    "@media (max-width:1000px)": {
      ".filter-workspace": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".filter-item.filter-search": {
        gridColumn: "span 2",
      },
      ".dashboard-filters": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".dashboard-filters .filter-search": {
        gridColumn: "span 2",
      },
      ".nimbo-theme .mini-metric-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".insight-grid": {
        gridTemplateColumns: "1fr",
      },
      ".maintenance-grid": {
        gridTemplateColumns: "1fr",
      },
      ".nimbo-theme .app-main": {
        minWidth: "0",
      },
    },
  },
  {
    "@media (max-width:680px)": {
      ".nimbo-theme .main-content": {
        padding: "22px 14px 25px",
      },
      ".nimbo-theme .page-header h1": {
        fontSize: "26px",
      },
      ".nimbo-theme .page-header p": {
        fontSize: "13px",
      },
      ".nimbo-theme .section-toolbar": {
        alignItems: "stretch",
      },
      ".nimbo-theme .toolbar-buttons": {
        justifyContent: "flex-start",
        width: "100%",
      },
      ".nimbo-theme .toolbar-buttons .btn": {
        flex: "1 1 130px",
      },
      ".nimbo-theme .mini-metric-grid": {
        gridTemplateColumns: "1fr",
        gap: "10px",
      },
      ".nimbo-theme .mini-metric": {
        gridTemplateColumns: "50px 1fr",
        padding: "15px",
      },
      ".nimbo-theme .home-metrics": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
        gap: "9px",
      },
      ".nimbo-theme .home-metric": {
        minHeight: "170px",
        padding: "15px",
        gap: "7px",
      },
      ".nimbo-theme .home-metric strong": {
        fontSize: "24px",
      },
      ".nimbo-theme .home-metric>span": {
        fontSize: "12px",
      },
      ".nimbo-theme .home-metric small": {
        fontSize: "11px",
      },
      ".nimbo-theme .form-grid": {
        gridTemplateColumns: "1fr",
      },
      ".nimbo-theme .modal-panel": {
        width: "calc(100% - 14px)",
      },
      ".nimbo-theme .modal-top": {
        padding: "18px",
      },
      ".nimbo-theme .modal-body": {
        padding: "18px",
      },
      ".nimbo-theme .note-grid": {
        gridTemplateColumns: "1fr",
      },
      ".filter-workspace": {
        gridTemplateColumns: "1fr",
        gap: "12px",
      },
      ".filter-item.filter-search,.dashboard-filters .filter-search": {
        gridColumn: "auto",
      },
      ".dashboard-filters": {
        gridTemplateColumns: "1fr",
      },
      ".filter-foot": {
        alignItems: "flex-start",
      },
      ".nimbo-theme .week-summary": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".planner-controls-right": {
        justifyContent: "flex-start",
      },
      ".week-nav": {
        flexWrap: "wrap",
      },
      ".week-nav>div": {
        minWidth: "145px",
      },
      ".insight-card": {
        padding: "16px",
      },
      ".correct-error-row": {
        gridTemplateColumns: "minmax(80px,1.2fr) minmax(65px,1.2fr) 62px",
        gap: "7px",
      },
      ".review-overview": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".question-trend": {
        gap: "3px",
      },
      ".question-summary-line>span": {
        flexBasis: "calc(50% - 10px)",
      },
      ".nimbo-theme .performance-row": {
        gap: "10px",
      },
      ".nimbo-theme .performance-counts": {
        justifyContent: "flex-start",
        flex: "1",
      },
      ".nimbo-theme .performance-bar": {
        flexBasis: "100%",
        maxWidth: "none",
      },
    },
  },
  {
    "@media (max-width:410px)": {
      ".nimbo-theme .home-metrics": {
        gridTemplateColumns: "1fr 1fr",
      },
      ".nimbo-theme .home-metric": {
        minHeight: "172px",
        padding: "12px",
      },
      ".nimbo-theme .home-metric strong": {
        fontSize: "23px",
      },
      ".nimbo-theme .home-metric .metric-symbol": {
        width: "32px",
        height: "32px",
      },
      ".planner-controls-right": {
        width: "100%",
      },
      ".planner-switch": {
        width: "100%",
      },
      ".planner-switch button": {
        flex: "1",
        justifyContent: "center",
      },
      ".nimbo-theme .btn": {
        padding: "10px",
      },
    },
  },
  {
    "@media (prefers-reduced-motion:reduce)": {
      ".planner-month-day,.nimbo-theme .btn": {
        transition: "none",
      },
    },
  },
  {
    ".sr-only": {
      position: "absolute !important",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0,0,0,0)",
      whiteSpace: "nowrap",
      border: "0",
    },
  },
  {
    ".nimbo-theme .analytics-kpis": {
      gap: "13px",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div": {
      minWidth: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "7px",
      padding: "18px",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div>span": {
      fontSize: "12px",
      lineHeight: "1.45",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div>strong": {
      fontSize: "24px",
      lineHeight: "1.2",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div>small": {
      fontSize: "12px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .analytics-chart-row>div:first-child": {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      flexWrap: "wrap",
      alignItems: "center",
    },
  },
  {
    ".nimbo-theme .analytics-chart-row span,.nimbo-theme .analytics-chart-row strong":
      {
        fontSize: "13px",
        lineHeight: "1.5",
      },
  },
  {
    ".nimbo-theme .radar-card": {
      minWidth: "0",
      padding: "18px",
    },
  },
  {
    ".nimbo-theme .radar-top": {
      gap: "10px",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .radar-top>strong": {
      fontSize: "14px",
      lineHeight: "1.45",
      flex: "1",
      minWidth: "120px",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .radar-line": {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .radar-line b": {
      whiteSpace: "nowrap",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .radar-stats": {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px 14px",
      marginTop: "12px",
    },
  },
  {
    ".nimbo-theme .radar-stats span": {
      fontSize: "12px",
      lineHeight: "1.45",
      whiteSpace: "normal",
    },
  },
  {
    ".nimbo-theme .radar-rating": {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "9px",
      padding: "11px 0",
    },
  },
  {
    ".nimbo-theme .radar-rating span": {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      fontSize: "12px",
      lineHeight: "1.4",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .radar-rating b": {
      color: designColors.text,
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .radar-edit": {
      fontSize: "13px",
      minHeight: "40px",
    },
  },
  {
    ".nimbo-theme .analytics-filters": {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .analytics-filters .search-wrap": {
      flex: "1 1 210px",
    },
  },
  {
    ".nimbo-theme .analytics-filters select:not(.MuiInputBase-input)": {
      minHeight: "43px",
      fontSize: "13px",
      flex: "1 1 150px",
      maxWidth: "100%",
    },
  },
  {
    ".nimbo-theme .analytics-topic-name": {
      display: "flex",
      alignItems: "flex-start",
      gap: "9px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .analytics-topic-name>div": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .analytics-topic-name strong": {
      display: "block",
      fontSize: "13px",
      lineHeight: "1.45",
      whiteSpace: "normal",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .analytics-topic-name small": {
      display: "block",
      marginTop: "5px",
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .analytics-detail-row p": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .topic-detail-stats": {
      display: "flex",
      flexWrap: "wrap",
      gap: "9px 15px",
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .topic-detail-stats span": {
      whiteSpace: "normal",
    },
  },
  {
    ".nimbo-theme .analytics-sample": {
      fontSize: "11px",
      display: "block",
      marginTop: "5px",
    },
  },
  {
    ".nimbo-theme .rating-field": {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "13px",
    },
  },
  {
    ".nimbo-theme .rating-field>div:first-child": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      minWidth: "155px",
    },
  },
  {
    ".nimbo-theme .rating-field strong": {
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .rating-field small": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .radar-rating,.nimbo-theme .settings-form,.nimbo-theme .material-grid,.nimbo-theme .vault-grid":
      {
        minWidth: "0",
      },
  },
  {
    ".nimbo-theme .vault-card-body small": {
      display: "block",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .vault-card-tags": {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
    },
  },
  {
    ".nimbo-theme .vault-card-foot": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .review-item-main strong": {
      fontSize: "14px",
      lineHeight: "1.45",
    },
  },
  {
    ".nimbo-theme .review-item-main span,.nimbo-theme .review-meta": {
      fontSize: "12px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .review-item": {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .timer-selects": {
      gap: "14px",
    },
  },
  {
    ".nimbo-theme .timer-caption,.nimbo-theme .timer-note": {
      fontSize: "12px",
      lineHeight: "1.6",
    },
  },
  {
    ".nimbo-theme .timer-digits": {
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    "@media (max-width:710px)": {
      ".nimbo-theme .analytics-kpis": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".nimbo-theme .radar-rating": {
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      },
      ".nimbo-theme .review-item": {
        alignItems: "flex-start",
      },
    },
  },
  {
    ".nimbo-theme": {
      "--ui-ink": designColors.dark,
      "--ui-muted": designColors.muted,
      "--ui-border": designColors.border,
      "--ui-soft": designColors.surface,
      "--ui-green": designColors.primary,
      fontSize: "15px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .main-content": {
      maxWidth: "none",
    },
  },
  {
    ".nimbo-theme button,.nimbo-theme select:not(.MuiInputBase-input),.nimbo-theme input:not(.MuiInputBase-input),.nimbo-theme textarea":
      {
        fontFamily: '"Inter Variable", sans-serif',
      },
  },
  {
    ".nimbo-theme p,.nimbo-theme small": {
      lineHeight: "1.55",
    },
  },
  {
    ".nimbo-theme .page-header p,.nimbo-theme .panel-heading p,.nimbo-theme .insight-card header p":
      {
        fontSize: "14px",
        lineHeight: "1.6",
        color: designColors.muted,
      },
  },
  {
    ".nimbo-theme .panel-heading h3,.nimbo-theme .insight-card h3": {
      fontSize: "18px",
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .btn,.nimbo-theme .row-link": {
      fontSize: "14px",
      lineHeight: "1.35",
      minHeight: "43px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      borderRadius: "10px",
      fontWeight: "750",
    },
  },
  {
    ".nimbo-theme .btn svg,.nimbo-theme button svg": {
      flexShrink: "0",
    },
  },
  {
    ".nimbo-theme .btn-subtle": {
      color: designColors.text,
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
    },
  },
  {
    ".nimbo-theme .btn-primary": {
      color: designColors.background,
      background: designColors.primary,
      border: `1px solid ${designColors.border}`,
    },
  },
  {
    ".nimbo-theme .btn:focus-visible,.nimbo-theme button:focus-visible,.nimbo-theme select:not(.MuiInputBase-input):focus-visible,.nimbo-theme input:not(.MuiInputBase-input):focus-visible":
      {
        outline: `3px solid ${designColors.accent}`,
        outlineOffset: "2px",
      },
  },
  {
    ".nimbo-theme .section-toolbar": {
      alignItems: "center",
      gap: "16px",
    },
  },
  {
    ".nimbo-theme .toolbar-info": {
      fontSize: "14px",
      gap: "10px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .toolbar-buttons": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      gap: "10px",
    },
  },
  {
    ".nimbo-theme .eyebrow,.nimbo-theme .small-chip,.nimbo-theme .toolbar-info,.nimbo-theme .data-table th":
      {
        letterSpacing: ".3px",
      },
  },
  {
    ".nimbo-theme .field-label,.nimbo-theme .filter-item>span": {
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .field-hint": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .filter-row,.nimbo-theme .filter-workspace": {
      gap: "12px",
    },
  },
  {
    ".nimbo-theme .filter-select,.nimbo-theme .search-wrap,.nimbo-theme .filter-item select:not(.MuiInputBase-input),.nimbo-theme .analytics-filters select:not(.MuiInputBase-input),.nimbo-theme .vault-filters select:not(.MuiInputBase-input)":
      {
        minHeight: "44px",
        fontSize: "14px",
        color: designColors.dark,
        background: designColors.background,
        border: `1px solid ${designColors.border}`,
        borderRadius: "10px",
      },
  },
  {
    ".nimbo-theme .search-wrap input:not(.MuiInputBase-input)": {
      fontSize: "14px",
      minHeight: "40px",
      color: designColors.dark,
    },
  },
  {
    ".nimbo-theme .data-table th": {
      fontSize: "12px",
      letterSpacing: ".4px",
      padding: "13px 14px",
      color: designColors.muted,
      background: designColors.surface,
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .data-table td": {
      fontSize: "14px",
      padding: "14px",
      color: designColors.text,
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .data-table .table-topic strong,.nimbo-theme .data-table .table-cell-main strong":
      {
        fontSize: "14px",
      },
  },
  {
    ".nimbo-theme .data-table .table-topic span:not(.topic-symbol),.nimbo-theme .data-table .table-cell-main small":
      {
        fontSize: "13px",
      },
  },
  {
    ".nimbo-theme .status-pill,.nimbo-theme .mastery-pill": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .tip": {
      fontSize: "14px",
      gap: "12px",
      alignItems: "flex-start",
      lineHeight: "1.6",
    },
  },
  {
    ".nimbo-theme .empty h4": {
      fontSize: "17px",
    },
  },
  {
    ".nimbo-theme .empty p": {
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .modal-top p,.nimbo-theme .modal-body,.nimbo-theme .form-check-row":
      {
        fontSize: "14px",
      },
  },
  {
    ".nimbo-theme .text-link,.nimbo-theme .insight-link,.nimbo-theme .plain-action":
      {
        fontSize: "14px",
      },
  },
  {
    ".nimbo-theme .review-item-main span,.nimbo-theme .review-meta,.nimbo-theme .topic-detail p":
      {
        fontSize: "14px",
      },
  },
  {
    ".nimbo-theme .vault-metrics": {
      display: "grid",
      gridTemplateColumns: "repeat(5,minmax(0,1fr))",
      gap: "14px",
      alignItems: "stretch",
    },
  },
  {
    ".nimbo-theme .vault-metrics>div": {
      display: "grid",
      gridTemplateAreas: "'icon value' 'label label'",
      gridTemplateColumns: "auto 1fr",
      alignContent: "center",
      columnGap: "12px",
      rowGap: "8px",
      minWidth: "0",
      padding: "17px 18px",
      border: "1px solid var(--ui-border)",
      borderRadius: "15px",
      background: designColors.paper,
      boxShadow: `0 4px 12px ${withOpacity(designColors.primary, 0.039)}`,
    },
  },
  {
    ".nimbo-theme .vault-metrics>div>svg": {
      gridArea: "icon",
      alignSelf: "center",
      width: "34px",
      height: "34px",
      padding: "8px",
      borderRadius: "10px",
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .vault-metrics>div>strong": {
      gridArea: "value",
      fontSize: "29px",
      fontWeight: "800",
      lineHeight: "1.1",
      color: designColors.dark,
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .vault-metrics>div>span": {
      gridArea: "label",
      fontSize: "14px",
      fontWeight: "600",
      color: designColors.muted,
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .vault-filters": {
      display: "grid",
      gridTemplateColumns: "minmax(220px,2fr) repeat(3,minmax(145px,1fr))",
      gap: "10px",
      alignItems: "center",
      marginBottom: "22px",
    },
  },
  {
    ".nimbo-theme .vault-filters>.search-wrap": {
      width: "100%",
      minWidth: "0",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .vault-filters>label": {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .vault-filters>label svg": {
      flexShrink: "0",
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .vault-filters select:not(.MuiInputBase-input)": {
      width: "100%",
      minWidth: "0",
      padding: "0 10px",
    },
  },
  {
    ".nimbo-theme .vault-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(235px,1fr))",
      gap: "16px",
    },
  },
  {
    ".nimbo-theme .vault-card": {
      overflow: "hidden",
      minWidth: "0",
      border: `1px solid ${designColors.border}`,
      borderRadius: "15px",
      background: designColors.paper,
    },
  },
  {
    ".nimbo-theme .vault-card-body": {
      minWidth: "0",
      padding: "15px",
    },
  },
  {
    ".nimbo-theme .vault-card-body h4": {
      fontSize: "16px",
      lineHeight: "1.45",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .vault-card-body small": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .vault-preview": {
      width: "100%",
      display: "block",
      position: "relative",
      minHeight: "165px",
      overflow: "hidden",
      background: designColors.surface,
      border: "0",
    },
  },
  {
    ".nimbo-theme .vault-preview img": {
      width: "100%",
      height: "170px",
      objectFit: "cover",
    },
  },
  {
    ".nimbo-theme .vault-preview-empty": {
      minHeight: "166px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .vault-card-foot>button": {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      border: "0",
      background: "none",
      color: designColors.text,
      fontSize: "13px",
      fontWeight: "750",
    },
  },
  {
    ".nimbo-theme .analytics-intro": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "22px",
      padding: "10px 0",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .analytics-intro>div": {
      flex: "1 1 360px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .analytics-intro h2": {
      fontSize: "24px",
      color: "var(--ui-ink)",
      margin: "8px 0 10px",
    },
  },
  {
    ".nimbo-theme .analytics-intro p": {
      fontSize: "14px",
      color: "var(--ui-muted)",
      maxWidth: "940px",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .analytics-kpis": {
      display: "grid !important",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "14px",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "9px",
      padding: "20px",
      border: "1px solid var(--ui-border)",
      borderRadius: "15px",
      background: designColors.background,
      minWidth: "0",
      minHeight: "160px",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div svg": {
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div>span": {
      fontSize: "14px",
      color: designColors.muted,
      lineHeight: "1.4",
      fontWeight: "650",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div>strong": {
      display: "block",
      fontSize: "29px",
      lineHeight: "1.12",
      color: "var(--ui-ink)",
      letterSpacing: "-.6px",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div>small": {
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .analytics-chart-pair": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "16px",
      alignItems: "stretch",
    },
  },
  {
    ".nimbo-theme .analytics-chart-bars": {
      display: "flex",
      flexDirection: "column",
      gap: "19px",
    },
  },
  {
    ".nimbo-theme .analytics-chart-row": {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .analytics-chart-row>div:first-child": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .analytics-chart-row .chart-track": {
      height: "11px",
      background: designColors.surface,
      borderRadius: "20px",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-theme .analytics-chart-row .chart-track i": {
      display: "block",
      height: "100%",
      minWidth: "0",
      borderRadius: "inherit",
    },
  },
  {
    ".nimbo-theme .discipline-radar": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
      gap: "16px",
    },
  },
  {
    ".nimbo-theme .radar-card": {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "15px",
      padding: "19px",
      minWidth: "0",
      background: `linear-gradient(180deg,${designColors.background},${designColors.surface})`,
    },
  },
  {
    ".nimbo-theme .radar-top": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .radar-top>strong": {
      fontSize: "16px",
      lineHeight: "1.4",
      flex: "1 1 140px",
      color: "var(--ui-ink)",
      minWidth: "0",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .radar-dot": {
      display: "inline-block",
      flex: "0 0 10px",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
    },
  },
  {
    ".nimbo-theme .priority-chip": {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      border: "1px solid color-mix(in srgb,var(--priority-color) 50%,white)",
      background: "color-mix(in srgb,var(--priority-color) 12%,white)",
      borderRadius: "16px",
      padding: "5px 9px",
      color: designColors.text,
      fontSize: "12px",
      fontWeight: "800",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .radar-line": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .radar-stats": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .radar-stats>span": {
      display: "block",
      minWidth: "0",
      fontSize: "13px",
      color: designColors.muted,
      background: designColors.surface,
      borderRadius: "9px",
      padding: "9px",
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .radar-rating": {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "9px",
      padding: "12px 0",
      borderTop: "1px solid var(--ui-border)",
      borderBottom: "1px solid var(--ui-border)",
    },
  },
  {
    ".nimbo-theme .radar-rating>span": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      fontSize: "13px",
      color: designColors.muted,
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .radar-rating>span b": {
      display: "block",
      color: designColors.dark,
      fontSize: "16px",
    },
  },
  {
    ".nimbo-theme .radar-edit": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      alignSelf: "flex-start",
      fontSize: "14px",
      fontWeight: "750",
      color: designColors.text,
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      minHeight: "42px",
      padding: "9px 13px",
    },
  },
  {
    ".nimbo-theme .radar-edit:hover": {
      background: designColors.surface,
    },
  },
  {
    ".nimbo-theme .analytics-filters": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "10px",
      marginBottom: "18px",
    },
  },
  {
    ".nimbo-theme .analytics-filters .search-wrap": {
      minWidth: "230px",
      flex: "2",
    },
  },
  {
    ".nimbo-theme .analytics-filters select:not(.MuiInputBase-input)": {
      flex: "1",
      minWidth: "145px",
    },
  },
  {
    ".nimbo-theme .analytics-table": {
      minWidth: "1080px",
    },
  },
  {
    ".nimbo-theme .analytics-clickable": {
      cursor: "pointer",
    },
  },
  {
    ".nimbo-theme .analytics-detail-row": {
      background: designColors.surface,
    },
  },
  {
    ".nimbo-theme .rating-options": {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .rating-options button": {
      display: "grid",
      placeItems: "center",
      width: "43px",
      height: "43px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      color: designColors.text,
      background: designColors.surface,
      fontWeight: "800",
      fontSize: "15px",
    },
  },
  {
    ".nimbo-theme .rating-options button.selected": {
      background: designColors.primary,
      color: designColors.background,
      borderColor: designColors.border,
    },
  },
  {
    ".nimbo-theme .rating-field": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "15px",
      flexWrap: "wrap",
      borderBottom: `1px solid ${designColors.border}`,
      padding: "12px 0",
    },
  },
  {
    ".nimbo-theme .rating-field>div:first-child": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
  },
  {
    ".nimbo-theme .rating-field strong": {
      fontSize: "15px",
    },
  },
  {
    ".nimbo-theme .rating-field small": {
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .analytics-explanation": {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      padding: "17px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .analytics-explanation p": {
      fontSize: "14px",
      lineHeight: "1.65",
      margin: "6px 0 0",
    },
  },
  {
    ".nimbo-theme .focus-suggestion": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "18px",
      padding: "19px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "16px",
      background: designColors.surface,
    },
  },
  {
    ".nimbo-theme .focus-symbol": {
      width: "44px",
      height: "44px",
      flex: "0 0 44px",
      display: "grid",
      placeItems: "center",
      borderRadius: "12px",
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .focus-suggestion>div": {
      flex: "1 1 280px",
      minWidth: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "6px",
    },
  },
  {
    ".nimbo-theme .focus-suggestion .eyebrow": {
      fontSize: "12px",
      color: designColors.muted,
      letterSpacing: ".7px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .focus-suggestion strong": {
      fontSize: "17px",
      color: designColors.text,
      lineHeight: "1.4",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .focus-suggestion small": {
      fontSize: "13px",
      lineHeight: "1.5",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .focus-suggestion>.btn": {
      marginLeft: "auto",
      minHeight: "43px",
    },
  },
  {
    ".nimbo-theme .weekly-graph-card": {
      display: "flex",
      flexDirection: "column",
    },
  },
  {
    ".nimbo-theme .week-chart-explainer": {
      fontSize: "13px",
      lineHeight: "1.55",
      color: designColors.muted,
      margin: "0 0 8px",
    },
  },
  {
    ".nimbo-theme .week-mini-chart": {
      minHeight: "128px",
      marginTop: "11px",
    },
  },
  {
    ".nimbo-theme .week-mini-chart small": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .week-chart-total": {
      fontSize: "13px",
      color: designColors.muted,
      marginTop: "9px",
    },
  },
  {
    ".nimbo-theme .week-chart-total strong": {
      fontSize: "14px",
      color: designColors.dark,
    },
  },
  {
    ".nimbo-theme .edital-summary": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "13px",
    },
  },
  {
    ".nimbo-theme .edital-summary>div": {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      background: designColors.background,
      border: "1px solid var(--ui-border)",
      borderRadius: "15px",
      padding: "18px",
      minWidth: "0",
      minHeight: "168px",
    },
  },
  {
    ".nimbo-theme .edital-summary>div>span:not(.summary-icon)": {
      fontSize: "14px",
      fontWeight: "650",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .edital-summary strong": {
      fontSize: "28px",
      color: "var(--ui-ink)",
      lineHeight: "1.15",
    },
  },
  {
    ".nimbo-theme .edital-summary small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .summary-icon": {
      width: "36px",
      height: "36px",
      display: "grid",
      placeItems: "center",
      borderRadius: "11px",
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .summary-icon.blue": {
      background: designColors.surface,
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .summary-icon.sand": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".nimbo-theme .summary-icon.rose": {
      background: statusColors.errorSoft,
      color: statusColors.error,
    },
  },
  {
    ".nimbo-theme .edital-sheet-panel": {
      padding: "23px 0 19px",
    },
  },
  {
    ".nimbo-theme .edital-sheet-panel>.panel-heading": {
      padding: "0 23px",
    },
  },
  {
    ".nimbo-theme .sheet-hint": {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      color: designColors.text,
      borderRadius: "10px",
      padding: "12px 15px",
      margin: "0 23px 18px",
      fontSize: "13px",
      lineHeight: "1.55",
    },
  },
  {
    ".nimbo-theme .sheet-hint svg": {
      flexShrink: "0",
      marginTop: "2px",
    },
  },
  {
    ".nimbo-theme .edital-filter-grid": {
      display: "grid",
      gridTemplateColumns: "minmax(180px,2fr) repeat(5,minmax(135px,1fr))",
      gap: "10px",
      padding: "0 23px 19px",
      alignItems: "end",
    },
  },
  {
    ".nimbo-theme .sheet-filter": {
      minWidth: "0",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
  },
  {
    ".nimbo-theme .sheet-filter>span": {
      fontSize: "12px",
      fontWeight: "750",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .sheet-filter select:not(.MuiInputBase-input)": {
      height: "44px",
      minWidth: "0",
      width: "100%",
      border: `1px solid ${designColors.border}`,
      borderRadius: "9px",
      padding: "0 8px",
      color: designColors.text,
      background: designColors.background,
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .sheet-filter .search-wrap": {
      height: "44px",
      minWidth: "0",
      width: "100%",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .sheet-filter input:not(.MuiInputBase-input)": {
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .sheet-scroll": {
      width: "100%",
      overflow: "auto",
      maxHeight: "73vh",
      scrollbarColor: `${designColors.light} ${designColors.surface}`,
      overscrollBehaviorX: "contain",
      borderTop: `1px solid ${designColors.border}`,
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".nimbo-theme .edital-sheet": {
      width: "max-content",
      minWidth: "2040px",
      borderCollapse: "separate",
      borderSpacing: "0",
      tableLayout: "auto",
    },
  },
  {
    ".nimbo-theme .edital-sheet th": {
      position: "sticky",
      top: "0",
      zIndex: "2",
      padding: "13px 12px",
      textTransform: "none",
      fontSize: "12px",
      letterSpacing: "0",
      background: designColors.surface,
      borderBottom: `1px solid ${designColors.border}`,
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .edital-sheet td": {
      whiteSpace: "nowrap",
      padding: "12px 10px",
      borderBottom: `1px solid ${designColors.border}`,
      background: designColors.background,
      verticalAlign: "middle",
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .edital-sheet tbody tr:hover td": {
      background: designColors.surface,
    },
  },
  {
    ".nimbo-theme .edital-sheet .sheet-sticky": {
      position: "sticky",
      left: "0",
      zIndex: "1",
      width: "305px",
      minWidth: "305px",
      maxWidth: "305px",
      borderRight: `1px solid ${designColors.border}`,
      boxShadow: `5px 0 8px -6px ${withOpacity(designColors.dark, 0.247)}`,
    },
  },
  {
    ".nimbo-theme .edital-sheet th.sheet-sticky": {
      zIndex: "3",
      background: designColors.surface,
    },
  },
  {
    ".nimbo-theme .sheet-topic": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      textAlign: "left",
      width: "100%",
      padding: "4px 0",
      border: "0",
      background: "none",
      color: designColors.text,
      whiteSpace: "normal",
    },
  },
  {
    ".nimbo-theme .sheet-topic-dot": {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      flex: "0 0 8px",
    },
  },
  {
    ".nimbo-theme .sheet-topic-copy": {
      display: "flex",
      flexDirection: "column",
      minWidth: "0",
      gap: "5px",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .sheet-topic-copy strong": {
      fontSize: "13px",
      color: designColors.dark,
      lineHeight: "1.45",
    },
  },
  {
    ".nimbo-theme .sheet-topic-copy small": {
      fontSize: "12px",
      color: designColors.muted,
      lineHeight: "1.3",
    },
  },
  {},
  {},
  {
    ".nimbo-theme .study-check,.nimbo-theme .review-check": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "6px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "8px",
      padding: "7px 9px",
      background: designColors.background,
      minHeight: "37px",
      color: designColors.muted,
      fontSize: "12px",
      fontWeight: "650",
    },
  },
  {
    ".nimbo-theme .study-check.is-checked,.nimbo-theme .review-check.is-checked":
      {
        background: designColors.surface,
        color: designColors.text,
        borderColor: designColors.border,
      },
  },
  {
    ".nimbo-theme .study-check-square": {
      display: "grid",
      placeItems: "center",
      width: "18px",
      height: "18px",
      flex: "0 0 18px",
      border: `1.5px solid ${designColors.border}`,
      borderRadius: "5px",
      background: designColors.background,
      color: designColors.background,
    },
  },
  {
    ".nimbo-theme .is-checked>.study-check-square": {
      background: designColors.primary,
      borderColor: designColors.border,
    },
  },
  {
    ".nimbo-theme .review-check.is-overdue": {
      background: statusColors.warningSoft,
      borderColor: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".nimbo-theme .review-blank": {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      color: designColors.muted,
      fontSize: "12px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .review-blank-circle": {
      width: "17px",
      height: "17px",
      border: `1.5px dashed ${designColors.border}`,
      borderRadius: "5px",
    },
  },
  {
    ".nimbo-theme .sheet-num": {
      fontVariantNumeric: "tabular-nums",
      textAlign: "center",
      fontWeight: "750",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .sheet-good": {
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .sheet-wrong": {
      color: statusColors.error,
    },
  },
  {
    ".nimbo-theme .sheet-progress": {
      minWidth: "94px",
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },
  },
  {
    ".nimbo-theme .sheet-progress>strong": {
      fontSize: "13px",
      color: designColors.primary,
    },
  },
  {
    ".nimbo-theme .sheet-actions": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
  },
  {
    ".nimbo-theme .sheet-actions .btn": {
      minHeight: "36px",
      padding: "7px 11px",
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .edital-sheet .sheet-details-row td": {
      position: "relative",
      background: designColors.surface,
      whiteSpace: "normal",
      padding: "17px",
    },
  },
  {
    ".nimbo-theme .sheet-detail": {
      display: "flex",
      justifyContent: "space-between",
      gap: "25px",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .sheet-detail>div:first-child": {
      minWidth: "320px",
      flex: "1",
    },
  },
  {
    ".nimbo-theme .sheet-detail h4": {
      fontSize: "16px",
      color: designColors.text,
      margin: "0 0 10px",
    },
  },
  {
    ".nimbo-theme .sheet-detail p": {
      fontSize: "13px",
      lineHeight: "1.65",
      margin: "3px 0",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .sheet-detail-actions": {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .sheet-detail-actions .btn": {
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .sheet-footer": {
      padding: "17px 23px 0",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "space-between",
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .sheet-footer>label": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .sheet-footer select:not(.MuiInputBase-input)": {
      minHeight: "37px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "8px",
      padding: "5px 9px",
      color: designColors.text,
      background: designColors.background,
    },
  },
  {
    ".nimbo-theme .sheet-pager": {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
  },
  {
    ".nimbo-theme .sheet-pager>.btn": {
      padding: "6px 10px",
      minHeight: "36px",
      fontSize: "13px",
    },
  },
  {
    "@media (max-width:1350px)": {
      ".nimbo-theme .edital-filter-grid": {
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      },
      ".nimbo-theme .sheet-search": {
        gridColumn: "span 2",
      },
      ".nimbo-theme .vault-metrics": {
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      },
      ".nimbo-theme .vault-filters": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".nimbo-theme .analytics-kpis,.nimbo-theme .edital-summary": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
    },
  },
  {
    "@media (max-width:900px)": {
      ".nimbo-theme .analytics-chart-pair": {
        gridTemplateColumns: "1fr",
      },
      ".nimbo-theme .analytics-kpis": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".nimbo-theme .edital-filter-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".nimbo-theme .sheet-search": {
        gridColumn: "span 2",
      },
      ".nimbo-theme .discipline-radar": {
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      },
    },
  },
  {
    "@media (max-width:580px)": {
      ".nimbo-theme .page-header p": {
        fontSize: "14px",
      },
      ".nimbo-theme .vault-metrics": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
        gap: "9px",
      },
      ".nimbo-theme .vault-metrics>div": {
        padding: "12px",
      },
      ".nimbo-theme .vault-metrics>div>strong": {
        fontSize: "24px",
      },
      ".nimbo-theme .vault-filters": {
        gridTemplateColumns: "1fr",
      },
      ".nimbo-theme .analytics-kpis,.nimbo-theme .edital-summary": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
        gap: "9px",
      },
      ".nimbo-theme .analytics-kpis>div,.nimbo-theme .edital-summary>div": {
        padding: "13px",
        minHeight: "145px",
      },
      ".nimbo-theme .analytics-kpis>div>strong,.nimbo-theme .edital-summary strong":
        {
          fontSize: "24px",
        },
      ".nimbo-theme .edital-filter-grid": {
        gridTemplateColumns: "1fr 1fr",
        padding: "0 14px 16px",
      },
      ".nimbo-theme .sheet-search": {
        gridColumn: "span 2",
      },
      ".nimbo-theme .edital-sheet-panel>.panel-heading": {
        padding: "0 14px",
      },
      ".nimbo-theme .sheet-hint": {
        margin: "0 14px 14px",
      },
      ".nimbo-theme .edital-sheet .sheet-sticky": {
        width: "230px",
        minWidth: "230px",
        maxWidth: "230px",
      },
      ".nimbo-theme .sheet-footer": {
        padding: "13px 14px 0",
      },
      ".nimbo-theme .focus-suggestion>.btn": {
        marginLeft: "0",
        width: "100%",
      },
      ".nimbo-theme .radar-rating": {
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      },
    },
  },
  {
    "@media (prefers-reduced-motion:reduce)": {
      ".nimbo-theme *": {
        scrollBehavior: "auto",
        transitionDuration: "0s !important",
      },
    },
  },
  {
    ".nimbo-theme .vault-upload-zone": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      textAlign: "center",
      padding: "24px",
      border: `2px dashed ${designColors.border}`,
      background: designColors.surface,
      borderRadius: "14px",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .vault-upload-zone strong": {
      fontSize: "16px",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .vault-upload-zone small": {
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .vault-upload-zone input:not(.MuiInputBase-input)[type=file]":
      {
        maxWidth: "100%",
        fontSize: "13px",
      },
  },
  {
    ".nimbo-theme .vault-or": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      color: designColors.muted,
      fontSize: "13px",
      padding: "5px",
    },
  },
  {
    ".nimbo-theme .vault-or:before,.nimbo-theme .vault-or:after": {
      content: '""',
      flex: "1",
      height: "1px",
      background: designColors.border,
    },
  },
  {
    ".nimbo-theme .vault-cover-thumb": {
      maxWidth: "170px",
      maxHeight: "120px",
      objectFit: "cover",
      borderRadius: "10px",
      display: "block",
      marginTop: "10px",
    },
  },
  {
    ".nimbo-theme .vault-card-title": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .vault-preview-action": {
      position: "absolute",
      bottom: "9px",
      right: "9px",
      background: withOpacity(designColors.primary, 0.867),
      color: designColors.background,
      borderRadius: "8px",
      padding: "6px 9px",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .reader-toolbar": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "13px",
      flexWrap: "wrap",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "11px",
      padding: "13px",
    },
  },
  {
    ".nimbo-theme .reader-toolbar>div:first-child": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .reader-links": {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .reader-layout": {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(210px,270px)",
      gap: "17px",
      marginTop: "16px",
      alignItems: "start",
    },
  },
  {
    ".nimbo-theme .reader-primary": {
      minWidth: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "13px",
    },
  },
  {
    ".nimbo-theme .reader-primary>.btn": {
      alignSelf: "flex-start",
      whiteSpace: "normal",
    },
  },
  {
    ".nimbo-theme .reader-pdf": {
      width: "100%",
      height: "min(65vh,770px)",
      border: `1px solid ${designColors.border}`,
      borderRadius: "11px",
    },
  },
  {
    ".nimbo-theme .reader-image": {
      display: "block",
      maxWidth: "100%",
      maxHeight: "65vh",
      objectFit: "contain",
      border: `1px solid ${designColors.border}`,
      borderRadius: "11px",
    },
  },
  {
    ".nimbo-theme .reader-empty": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      flexDirection: "column",
      minHeight: "230px",
      background: designColors.surface,
      borderRadius: "13px",
      textAlign: "center",
      padding: "24px",
    },
  },
  {
    ".nimbo-theme .reader-empty h3": {
      fontSize: "17px",
      color: designColors.text,
      margin: "0",
    },
  },
  {
    ".nimbo-theme .reader-empty p": {
      fontSize: "14px",
      color: designColors.muted,
      margin: "0",
    },
  },
  {
    ".nimbo-theme .reader-empty img": {
      maxWidth: "200px",
      maxHeight: "180px",
      objectFit: "contain",
    },
  },
  {
    ".nimbo-theme .reader-notes": {
      padding: "15px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
  {
    ".nimbo-theme .reader-notes strong,.nimbo-theme .docx-editor-header": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "15px",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .reader-notes textarea": {
      width: "100%",
      padding: "12px",
      borderRadius: "9px",
      border: `1px solid ${designColors.border}`,
      minHeight: "125px",
    },
  },
  {
    ".nimbo-theme .docx-editor": {
      display: "flex",
      flexDirection: "column",
      gap: "11px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      padding: "15px",
    },
  },
  {
    ".nimbo-theme .docx-editor textarea": {
      width: "100%",
      minHeight: "340px",
      resize: "vertical",
      padding: "13px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "8px",
    },
  },
  {
    ".nimbo-theme .docx-editor p,.nimbo-theme .reader-notes p": {
      fontSize: "13px",
      lineHeight: "1.6",
      color: designColors.muted,
      margin: "0",
    },
  },
  {
    ".nimbo-theme .reader-aside": {
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
  },
  {
    ".nimbo-theme .reader-aside h3": {
      fontSize: "16px",
      color: designColors.text,
      margin: "0",
    },
  },
  {
    ".nimbo-theme .reader-aside>small": {
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .reader-check": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      fontSize: "14px",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .reader-check input:not(.MuiInputBase-input)": {
      width: "17px",
      height: "17px",
      flex: "0 0 17px",
    },
  },
  {
    ".nimbo-theme .screenshot-pair": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "14px",
    },
  },
  {
    ".nimbo-theme .screenshot-input": {
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      background: designColors.surface,
      padding: "16px",
      outlineOffset: "3px",
    },
  },
  {
    ".nimbo-theme .screenshot-input:focus-visible": {
      outline: `3px solid ${designColors.accent}`,
    },
  },
  {
    ".nimbo-theme .screenshot-title": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "12px",
      color: designColors.text,
      fontSize: "15px",
    },
  },
  {
    ".nimbo-theme .screenshot-drop": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "11px",
      minHeight: "180px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .screenshot-drop>span": {
      fontSize: "14px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .screenshot-file-button,.nimbo-theme .screenshot-paste-button":
      {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: designColors.surface,
        color: designColors.text,
        border: `1px solid ${designColors.border}`,
        borderRadius: "9px",
        padding: "9px 12px",
        fontWeight: "750",
        fontSize: "13px",
        cursor: "pointer",
      },
  },
  {
    ".nimbo-theme .screenshot-file-button input:not(.MuiInputBase-input)": {
      display: "none",
    },
  },
  {
    ".nimbo-theme .screenshot-selected": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px",
    },
  },
  {
    ".nimbo-theme .screenshot-selected img": {
      display: "block",
      width: "100%",
      maxHeight: "210px",
      objectFit: "contain",
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
    },
  },
  {
    ".nimbo-theme .error-screenshots": {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "8px",
      margin: "12px 0",
    },
  },
  {
    ".nimbo-theme .error-screenshots>button": {
      minWidth: "0",
      overflow: "hidden",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      borderRadius: "10px",
      padding: "5px",
      textAlign: "left",
    },
  },
  {
    ".nimbo-theme .error-screenshots img": {
      width: "100%",
      height: "105px",
      objectFit: "contain",
      display: "block",
    },
  },
  {
    ".nimbo-theme .error-screenshots button span": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      justifyContent: "center",
      fontSize: "12px",
      color: designColors.primary,
      marginTop: "5px",
    },
  },
  {
    ".nimbo-theme .screenshot-lightbox": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
    },
  },
  {
    ".nimbo-theme .screenshot-lightbox img": {
      display: "block",
      maxWidth: "100%",
      maxHeight: "72vh",
      objectFit: "contain",
    },
  },
  {
    ".nimbo-theme .inline-error,.nimbo-theme .input-error": {
      display: "block",
      fontSize: "13px",
      lineHeight: "1.5",
      color: statusColors.error,
      background: statusColors.errorSoft,
      border: `1px solid ${statusColors.errorSoft}`,
      borderRadius: "9px",
      padding: "10px",
    },
  },
  {
    "@media (max-width:760px)": {
      ".nimbo-theme .reader-layout": {
        gridTemplateColumns: "1fr",
      },
      ".nimbo-theme .reader-aside": {
        order: "-1",
      },
      ".nimbo-theme .screenshot-pair": {
        gridTemplateColumns: "1fr",
      },
    },
  },
  {
    ".nimbo-theme .edital-sheet td:not(:first-child),.nimbo-theme .edital-sheet th:not(:first-child)":
      {
        whiteSpace: "nowrap",
      },
  },
  {
    ".nimbo-theme .edital-sheet .sheet-details-row td:not(:first-child)": {
      whiteSpace: "normal",
    },
  },
  {
    ".nimbo-theme .topic-detail-actions": {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      alignItems: "center",
    },
  },
  {
    ".nimbo-theme .analytics-accuracy": {
      fontWeight: "750",
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    ".nimbo-theme .intro-action": {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
  },
  {
    ".nimbo-theme .page-header": {
      marginBottom: "20px",
    },
  },
  {
    ".nimbo-theme .page-header h1": {
      fontSize: "clamp(25px,2.35vw,34px)",
      lineHeight: "1.2",
      letterSpacing: "-.03em",
    },
  },
  {
    ".nimbo-theme .page-header p,.nimbo-theme .page-breadcrumb": {
      display: "none",
    },
  },
  {
    ".nimbo-theme .view-stack": {
      gap: "20px",
    },
  },
  {
    ".nimbo-theme .panel-heading": {
      marginBottom: "15px",
    },
  },
  {
    ".nimbo-theme .panel-heading p": {
      maxWidth: "62ch",
    },
  },
  {
    ".nimbo-theme .sidebar .nav-sections": {
      gap: "8px",
    },
  },
  {
    ".nimbo-theme .footer": {
      padding: "16px 0",
      color: designColors.muted,
      fontSize: "12px",
    },
  },
  {
    ".nimbo-theme .home-section-head": {
      marginTop: "8px",
    },
  },
  {
    ".nimbo-theme .nimbo-welcome": {
      minHeight: "0",
    },
  },
  {
    ".nimbo-theme .home-metric small": {
      fontSize: "12px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .home-metrics,.nimbo-theme .insight-grid": {
      gap: "13px",
    },
  },
  {
    ".nimbo-theme .time-split": {
      display: "flex",
      flexWrap: "wrap",
      gap: "9px 18px",
      alignItems: "center",
    },
  },
  {
    ".nimbo-theme .time-split span": {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      color: designColors.muted,
      fontSize: "13px",
      lineHeight: "1.5",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .time-split b": {
      fontSize: "13px",
      color: designColors.dark,
      fontWeight: "800",
      marginLeft: "3px",
    },
  },
  {
    ".nimbo-theme .time-dot": {
      display: "inline-block",
      flex: "none",
      width: "9px",
      height: "9px",
      borderRadius: "3px",
    },
  },
  {
    ".nimbo-theme .time-dot.theory": {
      background: designColors.primary,
    },
  },
  {
    ".nimbo-theme .time-dot.questions": {
      background: statusColors.warning,
    },
  },
  {
    ".nimbo-theme .time-split.compact": {
      margin: "10px 0 6px",
    },
  },
  {
    ".nimbo-theme .weekly-graph-card .time-split": {
      margin: "0 0 12px",
    },
  },
  {
    ".nimbo-theme .week-mini-track .week-bar-split": {
      display: "block",
      width: "100%",
      background: designColors.primary,
      borderRadius: "5px 5px 0 0",
      position: "relative",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-theme .week-bar-questions": {
      display: "block",
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      background: statusColors.warning,
    },
  },
  {
    ".nimbo-theme .study-type": {
      display: "inline-flex",
      padding: "5px 9px",
      borderRadius: "7px",
      fontSize: "12px",
      fontWeight: "700",
      background: designColors.surface,
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .study-type.questions": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
    },
  },
  {
    ".nimbo-theme .question-focus-panel": {
      display: "grid",
      gridTemplateColumns: "minmax(220px,1fr) auto auto",
      alignItems: "center",
      gap: "20px",
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      borderRadius: "18px",
      padding: "19px 22px",
      boxShadow: `0 4px 24px ${withOpacity(designColors.dark, 0.035)}`,
    },
  },
  {
    ".nimbo-theme .question-focus-details": {
      minWidth: "0",
      display: "flex",
      flexDirection: "column",
      gap: "13px",
    },
  },
  {
    ".nimbo-theme .question-focus-title": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      color: designColors.text,
    },
  },
  {
    ".nimbo-theme .question-focus-title h3": {
      fontSize: "17px",
      fontWeight: "800",
      color: designColors.dark,
      margin: "0",
    },
  },
  {
    ".nimbo-theme .question-focus-title .timer-state": {
      fontSize: "12px",
      marginLeft: "2px",
    },
  },
  {
    ".nimbo-theme .question-topic-picker": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .question-topic-picker>span": {
      fontSize: "12px",
      color: designColors.muted,
      fontWeight: "700",
    },
  },
  {
    ".nimbo-theme .question-topic-picker select:not(.MuiInputBase-input)": {
      width: "100%",
      minHeight: "42px",
      fontSize: "14px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      background: designColors.surface,
      padding: "8px",
      color: designColors.dark,
    },
  },
  {
    ".nimbo-theme .question-topic-picker select:not(.MuiInputBase-input):disabled":
      {
        opacity: ".65",
      },
  },
  {
    ".nimbo-theme .question-focus-clock": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "3px",
      minWidth: "140px",
    },
  },
  {
    ".nimbo-theme .question-focus-clock output": {
      fontSize: "clamp(26px,2.5vw,39px)",
      fontWeight: "800",
      letterSpacing: ".012em",
      color: designColors.dark,
      fontVariantNumeric: "tabular-nums",
      lineHeight: "1.1",
    },
  },
  {
    ".nimbo-theme .question-focus-clock>span": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .question-focus-actions": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
      flexWrap: "wrap",
    },
  },
  {
    ".nimbo-theme .question-focus-actions .btn": {
      minHeight: "42px",
      fontSize: "13px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .question-focus-actions .icon-button": {
      width: "42px",
      height: "42px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
    },
  },
  {
    ".nimbo-theme .question-stat-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "12px",
    },
  },
  {
    ".nimbo-theme .question-stat-grid>div": {
      minWidth: "0",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      background: designColors.background,
      padding: "18px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "14px",
    },
  },
  {
    ".nimbo-theme .question-stat-grid span": {
      fontSize: "13px",
      color: designColors.muted,
      fontWeight: "650",
    },
  },
  {
    ".nimbo-theme .question-stat-grid strong": {
      fontSize: "clamp(23px,2.1vw,30px)",
      lineHeight: "1.2",
      fontWeight: "800",
      letterSpacing: "-.025em",
      color: designColors.dark,
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .question-stat-grid em": {
      fontWeight: "600",
      color: designColors.muted,
      fontStyle: "normal",
    },
  },
  {
    ".nimbo-theme .question-record-time": {
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "12px 14px",
      borderRadius: "10px",
      color: designColors.text,
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .question-record-time strong": {
      fontSize: "18px",
      color: designColors.text,
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    ".nimbo-theme .questions-page .filter-workspace": {
      gap: "11px",
    },
  },
  {
    ".nimbo-theme .questions-page .performance-info": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .questions-page .performance-info>div": {
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .questions-page .performance-info strong": {
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .questions-page .panel-heading": {
      marginBottom: "16px",
    },
  },
  {
    "@media (max-width:1160px)": {
      ".nimbo-theme .question-focus-panel": {
        gridTemplateColumns: "minmax(200px,1fr) auto",
      },
      ".nimbo-theme .question-focus-actions": {
        gridColumn: "1/-1",
        justifyContent: "flex-start",
      },
      ".nimbo-theme .question-stat-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
    },
  },
  {
    "@media (max-width:680px)": {
      ".nimbo-theme .question-focus-panel": {
        gridTemplateColumns: "1fr",
        padding: "16px",
      },
      ".nimbo-theme .question-focus-clock": {
        alignItems: "flex-start",
      },
      ".nimbo-theme .question-focus-actions": {
        gridColumn: "auto",
      },
      ".nimbo-theme .question-focus-actions .btn": {
        flex: "1 1 auto",
      },
      ".nimbo-theme .question-stat-grid": {
        gap: "8px",
      },
      ".nimbo-theme .question-stat-grid>div": {
        padding: "14px",
      },
      ".nimbo-theme .question-stat-grid strong": {
        fontSize: "22px",
      },
      ".nimbo-theme .time-split": {
        gap: "6px 12px",
      },
    },
  },
  {
    ".nimbo-theme .dashboard-deep": {
      border: `1px solid ${designColors.border}`,
      borderRadius: "15px",
      background: designColors.background,
      overflow: "visible",
      marginTop: "12px",
    },
  },
  {
    ".nimbo-theme .dashboard-deep>summary": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      padding: "18px 21px",
      color: designColors.text,
      cursor: "pointer",
      listStyle: "none",
      fontSize: "16px",
    },
  },
  {
    ".nimbo-theme .dashboard-deep>summary::-webkit-details-marker": {
      display: "none",
    },
  },
  {
    ".nimbo-theme .dashboard-deep>summary strong": {
      fontSize: "16px",
      fontWeight: "800",
    },
  },
  {
    ".nimbo-theme .dashboard-deep>summary span": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .dashboard-deep>summary:after": {
      content: '"⌄"',
      color: designColors.primary,
      fontSize: "23px",
      transition: "transform .2s",
    },
  },
  {
    ".nimbo-theme .dashboard-deep[open]>summary:after": {
      transform: "rotate(180deg)",
    },
  },
  {
    ".nimbo-theme .dashboard-deep-body": {
      display: "flex",
      flexDirection: "column",
      gap: "19px",
      padding: "4px 18px 18px",
    },
  },
  {
    ".nimbo-theme .dashboard-deep-body .dashboard-section-title": {
      margin: "0 0 2px",
    },
  },
  {
    "@media (max-width:680px)": {
      ".nimbo-theme .dashboard-deep>summary": {
        flexWrap: "wrap",
        padding: "15px",
      },
      ".nimbo-theme .dashboard-deep-body": {
        padding: "6px 12px 14px",
      },
    },
  },
  {
    ".ux-v54": {
      "--ux-ink": designColors.dark,
      "--ux-muted": designColors.muted,
      "--ux-green": designColors.primary,
      "--ux-border": designColors.border,
      "--ux-canvas": designColors.surface,
      "--ux-shadow": `0 8px 26px ${withOpacity(designColors.dark, 0.045)}`,
      background: "var(--ux-canvas)",
      color: "var(--ux-ink)",
    },
  },
  {
    ".ux-v54 button,.ux-v54 input:not(.MuiInputBase-input),.ux-v54 select:not(.MuiInputBase-input),.ux-v54 textarea":
      {
        font: "inherit",
      },
  },
  {
    ".ux-v54 button": {
      cursor: "pointer",
    },
  },
  {
    ".ux-v54 button:disabled": {
      cursor: "not-allowed",
      opacity: ".55",
    },
  },
  {
    ".ux-v54 :is(button,input:not(.MuiInputBase-input),select:not(.MuiInputBase-input),textarea,summary,a):focus-visible":
      {
        outline: `3px solid ${designColors.accent} !important`,
        outlineOffset: "3px",
      },
  },
  {
    ".ux-v54 .sidebar": {
      width: "244px",
      background: designColors.dark,
      color: designColors.light,
      borderRight: `1px solid ${designColors.border}`,
      overflowY: "auto",
    },
  },
  {
    ".ux-v54 .brand": {
      padding: "23px 20px 22px",
      cursor: "default",
    },
  },
  {
    ".ux-v54 .ux-brand-home": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      background: "transparent",
      color: "inherit",
      border: "0",
      textAlign: "left",
      padding: "0",
    },
  },
  {
    ".ux-v54 .brand-mark": {
      width: "41px",
      height: "41px",
      display: "grid",
      placeItems: "center",
      flex: "none",
      borderRadius: "13px",
      background: designColors.primary,
      color: designColors.paper,
      boxShadow: "none",
    },
  },
  {
    ".ux-v54 .brand-wordmark strong": {
      fontSize: "26px",
      color: designColors.paper,
      letterSpacing: "-1px",
    },
  },
  {
    ".ux-v54 .brand-wordmark small": {
      fontSize: "10px",
      color: designColors.light,
      letterSpacing: "1px",
    },
  },
  {
    ".ux-v54 .brand-wordmark strong span": {
      color: designColors.light,
    },
  },
  {
    ".ux-v54 .nav-sections": {
      padding: "0 13px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
  },
  {
    ".ux-v54 .nav-section": {
      marginBottom: "0",
    },
  },
  {
    ".ux-v54 .nav-label": {
      color: designColors.light,
      fontSize: "11px",
      letterSpacing: ".08em",
      margin: "0 0 9px",
      padding: "0 12px",
    },
  },
  {
    ".ux-v54 .nav-item": {
      minHeight: "46px",
      height: "auto",
      margin: "2px 0",
      padding: "10px 12px",
      fontSize: "15px",
      lineHeight: "1.35",
      color: designColors.border,
      borderRadius: "11px",
      gap: "12px",
      fontWeight: "600",
      transition: "background .16s,color .16s",
    },
  },
  {
    ".ux-v54 .nav-item:hover": {
      background: designColors.dark,
      color: designColors.paper,
    },
  },
  {
    ".ux-v54 .nav-item.selected": {
      background: designColors.primary,
      boxShadow: "none",
      color: designColors.background,
      fontWeight: "800",
    },
  },
  {
    ".ux-v54 .nav-item.selected svg": {
      color: designColors.background,
    },
  },
  {
    ".ux-v54 .nav-count": {
      background: statusColors.warningSoft,
      color: statusColors.warning,
      fontSize: "12px",
      minWidth: "25px",
    },
  },
  {
    ".ux-v54 .more-toggle": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      textAlign: "left",
      background: "transparent",
      color: designColors.light,
      border: "0",
      padding: "13px 12px",
      borderTop: `1px solid ${designColors.border}`,
      borderRadius: "0",
      fontSize: "14px",
      fontWeight: "700",
    },
  },
  {
    ".ux-v54 .more-toggle:hover": {
      color: designColors.paper,
    },
  },
  {
    ".ux-v54 .more-toggle svg": {
      transition: "transform .2s",
    },
  },
  {
    ".ux-v54 .more-toggle svg.rotated": {
      transform: "rotate(180deg)",
    },
  },
  {
    ".ux-v54 .ux-extra-links[hidden]": {
      display: "none",
    },
  },
  {
    ".ux-v54 .ux-extra-links": {
      paddingBottom: "10px",
    },
  },
  {
    ".ux-v54 .ux-sidebar-bottom": {
      marginTop: "auto",
      padding: "8px 13px 20px",
    },
  },
  {
    ".ux-v54 .ux-sidebar-search": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      width: "100%",
      padding: "11px 12px",
      background: designColors.dark,
      color: designColors.light,
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      textAlign: "left",
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 kbd": {
      fontSize: "11px",
      fontFamily: '"Inter Variable", sans-serif',
      fontWeight: "650",
      border: "1px solid currentColor",
      borderRadius: "5px",
      padding: "2px 5px",
      opacity: ".7",
      whiteSpace: "nowrap",
    },
  },
  {
    ".ux-v54 .ux-sidebar-search kbd": {
      marginLeft: "auto",
    },
  },
  {
    ".ux-v54 .app-main": {
      marginLeft: "244px",
    },
  },
  {
    ".ux-v54 .topbar": {
      height: "68px",
      background: designColors.background,
      borderBottom: "1px solid var(--ux-border)",
      padding: "0 36px",
    },
  },
  {
    ".ux-v54 .topbar-path": {
      color: designColors.muted,
      fontSize: "14px",
      fontWeight: "650",
    },
  },
  {
    ".ux-v54 .topbar-path span": {
      padding: "0 5px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .topbar-right": {
      gap: "12px",
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .ux-top-search": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      padding: "9px 12px",
      minHeight: "38px",
      color: designColors.text,
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .ux-top-search kbd": {
      marginLeft: "10px",
    },
  },
  {
    ".ux-v54 .edition-chip": {
      maxWidth: "225px",
      fontSize: "12px",
      color: designColors.muted,
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      boxShadow: "none",
    },
  },
  {
    ".ux-v54 .main-content": {
      maxWidth: "none",
      padding: "30px clamp(18px,3vw,44px) 45px",
    },
  },
  {
    ".ux-v54 .page-header": {
      marginBottom: "20px",
    },
  },
  {
    ".ux-v54 .page-header h1": {
      fontSize: "clamp(26px,2.3vw,32px)",
      fontWeight: "800",
      letterSpacing: "-.035em",
      margin: "0",
      color: designColors.dark,
    },
  },
  {
    ".ux-v54 .view-stack": {
      gap: "24px",
    },
  },
  {
    ".ux-v54 .panel,.ux-v54 .simple-card,.ux-v54 .insight-card,.ux-v54 .question-focus-panel":
      {
        border: "1px solid var(--ux-border)",
        background: designColors.background,
        borderRadius: "16px",
        boxShadow: "var(--ux-shadow)",
      },
  },
  {
    ".ux-v54 .panel": {
      padding: "20px 22px",
    },
  },
  {
    ".ux-v54 .panel-heading": {
      gap: "12px",
      marginBottom: "16px",
      alignItems: "center",
    },
  },
  {
    ".ux-v54 .panel-heading h3": {
      fontSize: "17px",
      lineHeight: "1.35",
      color: "var(--ux-ink)",
      margin: "0",
    },
  },
  {
    ".ux-v54 .panel-heading p": {
      fontSize: "13px",
      color: "var(--ux-muted)",
      marginTop: "5px",
    },
  },
  {
    ".ux-v54 .small-chip": {
      fontSize: "12px",
      padding: "7px 10px",
      borderRadius: "9px",
      color: designColors.muted,
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
    },
  },
  {
    ".ux-v54 .btn": {
      fontSize: "14px",
      minHeight: "42px",
      padding: "10px 15px",
      borderRadius: "10px",
      lineHeight: "1.3",
      boxShadow: "none",
    },
  },
  {
    ".ux-v54 .btn-primary": {
      background: designColors.primary,
      color: designColors.background,
    },
  },
  {
    ".ux-v54 .btn-primary:hover": {
      background: designColors.dark,
      boxShadow: `0 5px 14px ${withOpacity(designColors.primary, 0.15)}`,
    },
  },
  {
    ".ux-v54 .btn-subtle": {
      background: designColors.surface,
      color: designColors.text,
      borderColor: designColors.border,
    },
  },
  {
    ".ux-v54 .btn-subtle:hover": {
      background: designColors.surface,
    },
  },
  {
    ".ux-v54 .icon-button": {
      minWidth: "36px",
      minHeight: "36px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .text-link,.ux-v54 .plain-action": {
      fontSize: "14px",
      color: designColors.text,
    },
  },
  {
    ".ux-v54 :is(.field-label,.sheet-filter>span,.filter-item>span,.question-topic-picker>span)":
      {
        fontSize: "13px",
        fontWeight: "700",
        color: designColors.muted,
      },
  },
  {
    ".ux-v54 :is(.field,.sheet-filter,.filter-item)": {
      minWidth: "0",
    },
  },
  {
    ".ux-v54 :is(input:not(.MuiInputBase-input):not([type='checkbox']):not([type='radio']):not([type='file']),select:not(.MuiInputBase-input),textarea)":
      {
        fontSize: "15px",
        minHeight: "42px",
        lineHeight: "1.35",
        borderRadius: "9px",
        color: designColors.dark,
      },
  },
  {
    ".ux-v54 textarea": {
      minHeight: "92px",
    },
  },
  {
    ".ux-v54 .search-wrap": {
      height: "auto",
      minHeight: "43px",
      borderColor: "var(--ux-border)",
      background: designColors.surface,
    },
  },
  {
    ".ux-v54 .search-wrap input:not(.MuiInputBase-input)": {
      fontSize: "15px !important",
      height: "38px",
      minHeight: "38px !important",
    },
  },
  {
    ".ux-v54 .data-table th": {
      fontSize: "11px",
      letterSpacing: ".035em",
      padding: "13px 14px",
      color: designColors.muted,
      background: designColors.surface,
    },
  },
  {
    ".ux-v54 .data-table td": {
      fontSize: "13px",
      lineHeight: "1.45",
      padding: "13px 14px",
      color: designColors.text,
    },
  },
  {
    ".ux-v54 .data-table td strong": {
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .data-table tbody tr:hover": {
      background: designColors.surface,
    },
  },
  {
    ".ux-v54 .table-scroll": {
      borderRadius: "10px",
      maxWidth: "100%",
      overscrollBehaviorX: "contain",
    },
  },
  {
    ".ux-v54 .modal-panel": {
      borderRadius: "18px",
    },
  },
  {
    ".ux-v54 .modal-top h2": {
      fontSize: "21px",
    },
  },
  {
    ".ux-v54 .modal-top p": {
      fontSize: "13px",
      color: "var(--ux-muted)",
    },
  },
  {
    ".ux-v54 .modal-body": {
      fontSize: "14px",
    },
  },
  {
    ".ux-v54 .section-toolbar": {
      minHeight: "46px",
    },
  },
  {
    ".ux-v54 .toolbar-info": {
      fontSize: "14px",
      color: designColors.primary,
    },
  },
  {
    ".ux-v54 .toolbar-info svg": {
      color: designColors.primary,
    },
  },
  {
    ".ux-v54 .ux-more-filters": {
      gridColumn: "1/-1",
      alignSelf: "stretch",
      marginTop: "2px",
    },
  },
  {
    ".ux-v54 .ux-more-filters>summary": {
      listStyle: "none",
      cursor: "pointer",
      padding: "10px 6px",
      display: "inline-flex",
      gap: "8px",
      alignItems: "center",
      color: designColors.text,
      fontWeight: "750",
      fontSize: "14px",
    },
  },
  {
    ".ux-v54 .ux-more-filters>summary::-webkit-details-marker": {
      display: "none",
    },
  },
  {
    ".ux-v54 .ux-more-filters>summary:before": {
      content: "'+'",
      fontSize: "19px",
      fontWeight: "600",
      lineHeight: "1",
    },
  },
  {
    ".ux-v54 .ux-more-filters[open]>summary:before": {
      content: "'−'",
    },
  },
  {
    ".ux-v54 .ux-extra-filter-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(145px,1fr))",
      gap: "12px",
      padding: "12px 0 4px",
      borderTop: `1px solid ${designColors.border}`,
    },
  },
  {
    ".ux-v54 .ux-extra-filter-grid .filter-item,.ux-v54 .ux-extra-filter-grid .sheet-filter":
      {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      },
  },
  {
    ".ux-v54 .ux-collapsible": {
      border: "1px solid var(--ux-border)",
      background: designColors.background,
      borderRadius: "13px",
      boxShadow: "var(--ux-shadow)",
      overflow: "clip",
    },
  },
  {
    ".ux-v54 .ux-collapsible>summary": {
      listStyle: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 18px",
      color: designColors.text,
      fontSize: "14px",
      fontWeight: "750",
    },
  },
  {
    ".ux-v54 .ux-collapsible>summary::-webkit-details-marker": {
      display: "none",
    },
  },
  {
    ".ux-v54 .ux-collapsible>summary:before": {
      content: "'+'",
      fontSize: "20px",
      color: designColors.primary,
      lineHeight: "1",
    },
  },
  {
    ".ux-v54 .ux-collapsible[open]>summary:before": {
      content: "'−'",
    },
  },
  {
    ".ux-v54 .ux-collapsible>summary small": {
      marginLeft: "auto",
      color: designColors.muted,
      fontWeight: "500",
      fontSize: "12px",
    },
  },
  {
    ".ux-v54 .ux-collapsible-body": {
      padding: "4px 16px 16px",
    },
  },
  {
    ".ux-v54 .ux-collapsible-body>.panel": {
      boxShadow: "none",
    },
  },
  {
    ".ux-v54 .ux-inline-help": {
      fontSize: "13px",
      color: designColors.muted,
      padding: "3px 5px",
    },
  },
  {
    ".ux-v54 .ux-inline-help summary": {
      cursor: "pointer",
      color: designColors.primary,
      fontWeight: "700",
    },
  },
  {
    ".ux-v54 .ux-inline-help p": {
      margin: "8px 0 0",
      maxWidth: "70ch",
    },
  },
  {
    ".ux-v54 .filter-foot": {
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .vault-metrics": {
      display: "grid !important",
      gridTemplateColumns: "repeat(3,minmax(0,1fr)) !important",
      gap: "12px",
    },
  },
  {
    ".ux-v54 .vault-metrics>div": {
      display: "flex !important",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "8px 12px",
      padding: "16px 18px",
      border: "1px solid var(--ux-border)",
      borderRadius: "13px",
      background: designColors.background,
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .vault-metrics>div svg": {
      color: designColors.primary,
      flex: "none",
    },
  },
  {
    ".ux-v54 .vault-metrics strong": {
      fontSize: "24px",
      lineHeight: "1.1",
      color: designColors.dark,
    },
  },
  {
    ".ux-v54 .vault-metrics>div span": {
      width: "100%",
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .analytics-kpis": {
      display: "grid !important",
      gridTemplateColumns: "repeat(4,minmax(0,1fr)) !important",
      gap: "12px",
    },
  },
  {
    ".ux-v54 .analytics-kpis>div": {
      display: "flex !important",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "6px",
      minWidth: "0",
      border: "1px solid var(--ux-border)",
      borderRadius: "13px",
      background: designColors.background,
      padding: "17px",
    },
  },
  {
    ".ux-v54 .analytics-kpis>div svg": {
      color: designColors.primary,
    },
  },
  {
    ".ux-v54 .analytics-kpis strong": {
      fontSize: "26px",
      color: designColors.dark,
    },
  },
  {
    ".ux-v54 .analytics-kpis span": {
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .analytics-kpis small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .radar-edit": {
      padding: "9px 12px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      background: designColors.surface,
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      color: designColors.text,
      fontSize: "13px",
      fontWeight: "700",
    },
  },
  {
    ".ux-v54 .radar-edit:hover": {
      background: designColors.surface,
    },
  },
  {
    ".ux-v54 .focus-suggestion": {
      gap: "14px",
      border: `1px solid ${designColors.border}`,
      background: designColors.surface,
      padding: "14px 18px",
      borderRadius: "14px",
    },
  },
  {
    ".ux-v54 .focus-suggestion>div:nth-child(2)": {
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .focus-suggestion strong": {
      fontSize: "15px",
      lineHeight: "1.3",
      overflowWrap: "anywhere",
    },
  },
  {
    ".ux-v54 .focus-suggestion small": {
      fontSize: "12px",
      lineHeight: "1.5",
    },
  },
  {
    ".ux-v54 .focus-suggestion .eyebrow": {
      fontSize: "11px",
    },
  },
  {
    ".ux-v54 .edital-summary": {
      gap: "12px",
    },
  },
  {
    ".ux-v54 .edital-summary>div": {
      padding: "16px",
    },
  },
  {
    ".ux-v54 .edital-summary strong": {
      fontSize: "24px",
    },
  },
  {
    ".ux-v54 .edital-summary small": {
      fontSize: "12px",
    },
  },
  {
    ".ux-v54 .edital-filter-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "12px",
    },
  },
  {
    ".ux-v54 .edital-filter-grid .sheet-search": {
      gridColumn: "auto",
    },
  },
  {
    ".ux-v54 .edital-filter-grid .ux-more-filters": {
      gridColumn: "1/-1",
    },
  },
  {
    ".ux-v54 .question-focus-panel": {
      boxShadow: "none",
    },
  },
  {
    ".ux-v54 .question-stat-grid": {
      gap: "10px",
    },
  },
  {
    ".ux-v54 .question-stat-grid>div": {
      padding: "15px",
    },
  },
  {
    ".ux-v54 .question-stat-grid strong": {
      fontSize: "23px",
    },
  },
  {
    ".ux-v54 .week-summary": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "10px",
    },
  },
  {
    ".ux-v54 .week-summary>div": {
      minWidth: "0",
      background: designColors.background,
      border: "1px solid var(--ux-border)",
      borderRadius: "13px",
      padding: "14px 16px",
    },
  },
  {
    ".ux-v54 .week-summary>div span": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .week-summary>div strong": {
      fontSize: "22px",
      color: designColors.dark,
    },
  },
  {
    ".ux-v54 .weekly-hero": {
      padding: "15px 22px",
      minHeight: "0",
      background: designColors.background,
      border: "1px solid var(--ux-border)",
      borderRadius: "14px",
    },
  },
  {
    ".ux-v54 .weekly-hero h2": {
      fontSize: "19px",
      margin: "0",
    },
  },
  {
    ".ux-v54 .weekly-hero p": {
      display: "none",
    },
  },
  {
    ".ux-v54 .planner-month-day": {
      minHeight: "95px",
    },
  },
  {
    ".ux-v54 .planner-month-day strong": {
      fontSize: "14px",
    },
  },
  {
    ".ux-v54 .month-event-label": {
      fontSize: "11px",
    },
  },
  {
    ".ux-v54 .nimbo-collection-banner": {
      padding: "18px 24px",
    },
  },
  {
    ".ux-v54 .nimbo-collection-banner h2": {
      fontSize: "21px",
    },
  },
  {
    ".ux-v54 .ux-home": {
      display: "flex",
      flexDirection: "column",
      gap: "17px",
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .ux-home-focus": {
      padding: "25px 29px",
      borderRadius: "19px",
      border: `1px solid ${designColors.border}`,
      background: `linear-gradient(120deg,${designColors.surface},${designColors.surface})`,
      boxShadow: `0 5px 25px ${withOpacity(designColors.primary, 0.05)}`,
    },
  },
  {
    ".ux-v54 .ux-home-focus-top": {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
  },
  {
    ".ux-v54 .ux-kicker": {
      fontSize: "13px",
      color: designColors.muted,
      fontWeight: "750",
    },
  },
  {
    ".ux-v54 .ux-focus-reason": {
      display: "inline-flex",
      padding: "5px 11px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "50px",
      background: designColors.surface,
      color: designColors.text,
      fontSize: "12px",
      fontWeight: "750",
    },
  },
  {
    ".ux-v54 .ux-home-focus h2": {
      fontSize: "clamp(22px,2.4vw,29px)",
      letterSpacing: "-.035em",
      lineHeight: "1.25",
      margin: "17px 0 7px",
      color: designColors.dark,
      overflowWrap: "anywhere",
    },
  },
  {
    ".ux-v54 .ux-home-focus p": {
      fontSize: "14px",
      color: designColors.muted,
      margin: "0 0 18px",
      lineHeight: "1.5",
    },
  },
  {
    ".ux-v54 .ux-home-focus-actions": {
      display: "flex",
      flexWrap: "wrap",
      gap: "9px",
    },
  },
  {
    ".ux-v54 .ux-home-summary": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "11px",
    },
  },
  {
    ".ux-v54 .ux-summary-item": {
      border: "1px solid var(--ux-border)",
      background: designColors.background,
      borderRadius: "14px",
      textAlign: "left",
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      minWidth: "0",
      boxShadow: "var(--ux-shadow)",
      transition: "border-color .15s,transform .15s",
    },
  },
  {
    ".ux-v54 .ux-summary-item:hover": {
      borderColor: designColors.border,
      transform: "translateY(-2px)",
    },
  },
  {
    ".ux-v54 .ux-summary-item svg": {
      color: designColors.primary,
      marginBottom: "4px",
    },
  },
  {
    ".ux-v54 .ux-summary-item span": {
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .ux-summary-item strong": {
      fontSize: "clamp(22px,2.5vw,29px)",
      color: designColors.dark,
      fontWeight: "800",
      letterSpacing: "-.035em",
    },
  },
  {
    ".ux-v54 .ux-summary-item small": {
      fontSize: "12px",
      color: designColors.muted,
      lineHeight: "1.35",
    },
  },
  {
    ".ux-v54 .ux-home-columns": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "13px",
      alignItems: "stretch",
    },
  },
  {
    ".ux-v54 .ux-home-panel": {
      border: "1px solid var(--ux-border)",
      borderRadius: "16px",
      background: designColors.background,
      padding: "20px 22px",
      minWidth: "0",
      boxShadow: "var(--ux-shadow)",
    },
  },
  {
    ".ux-v54 .ux-home-panel-head": {
      display: "flex",
      gap: "10px",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
  },
  {
    ".ux-v54 .ux-home-panel-head h3": {
      display: "inline-flex",
      alignItems: "center",
      gap: "9px",
      margin: "0",
      fontSize: "17px",
      color: designColors.dark,
      lineHeight: "1.3",
    },
  },
  {
    ".ux-v54 .ux-home-panel-head h3 svg": {
      color: designColors.primary,
      flex: "none",
    },
  },
  {
    ".ux-v54 .ux-home-panel-head>button": {
      border: "0",
      background: "transparent",
      color: designColors.text,
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "8px 0",
      fontSize: "13px",
      fontWeight: "750",
      whiteSpace: "nowrap",
    },
  },
  {
    ".ux-v54 .ux-home-panel-head p": {
      fontSize: "12px",
      color: designColors.muted,
      margin: "5px 0 0 27px",
    },
  },
  {
    ".ux-v54 .ux-today-list,.ux-v54 .ux-reviews-list": {
      display: "flex",
      flexDirection: "column",
      gap: "0",
    },
  },
  {
    ".ux-v54 .ux-today-task": {
      display: "flex",
      width: "100%",
      gap: "12px",
      alignItems: "center",
      textAlign: "left",
      padding: "12px 6px",
      background: "transparent",
      border: "0",
      borderBottom: `1px solid ${designColors.border}`,
      color: designColors.text,
    },
  },
  {
    ".ux-v54 .ux-today-task:last-child": {
      borderBottom: "0",
    },
  },
  {
    ".ux-v54 .ux-today-task:hover": {
      background: designColors.surface,
    },
  },
  {
    ".ux-v54 .ux-task-check": {
      border: `1.5px solid ${designColors.border}`,
      borderRadius: "6px",
      width: "20px",
      height: "20px",
      flex: "none",
      display: "grid",
      placeItems: "center",
      color: designColors.background,
    },
  },
  {
    ".ux-v54 .ux-today-task.is-complete .ux-task-check": {
      background: designColors.primary,
      borderColor: designColors.border,
    },
  },
  {
    ".ux-v54 .ux-task-label": {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .ux-task-label strong,.ux-v54 .ux-review-item strong": {
      fontSize: "14px",
      fontWeight: "750",
      color: designColors.dark,
      overflowWrap: "anywhere",
    },
  },
  {
    ".ux-v54 .ux-today-task.is-complete .ux-task-label strong": {
      textDecoration: "line-through",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .ux-task-label small,.ux-v54 .ux-review-item small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .ux-review-item": {
      display: "flex",
      gap: "11px",
      alignItems: "flex-start",
      padding: "12px 4px",
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".ux-v54 .ux-review-item:last-child": {
      borderBottom: "0",
    },
  },
  {
    ".ux-v54 .ux-review-item>div": {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .ux-review-dot": {
      background: statusColors.warning,
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      marginTop: "6px",
      flex: "none",
    },
  },
  {
    ".ux-v54 .ux-quiet-empty": {
      fontSize: "14px",
      color: designColors.muted,
      padding: "14px 4px",
      lineHeight: "1.5",
      margin: "0",
    },
  },
  {
    ".ux-v54 .ux-inline-note": {
      fontSize: "12px",
      color: designColors.muted,
      display: "block",
      marginTop: "10px",
    },
  },
  {
    ".ux-v54 .ux-week-head": {
      display: "flex",
      alignItems: "baseline",
      gap: "14px",
      flexWrap: "wrap",
    },
  },
  {
    ".ux-v54 .ux-week-head strong": {
      fontSize: "25px",
      color: designColors.dark,
    },
  },
  {
    ".ux-v54 .ux-week-head span": {
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .ux-week-bars": {
      display: "grid",
      gridTemplateColumns: "repeat(7,minmax(0,1fr))",
      gap: "12px",
      height: "130px",
      margin: "12px 0 18px",
      maxWidth: "760px",
    },
  },
  {
    ".ux-v54 .ux-week-day": {
      minWidth: "0",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "7px",
    },
  },
  {
    ".ux-v54 .ux-week-track": {
      width: "min(100%,64px)",
      height: "102px",
      borderBottom: `1px solid ${designColors.border}`,
      display: "flex",
      alignItems: "end",
      justifyContent: "center",
    },
  },
  {
    ".ux-v54 .ux-week-track>span": {
      width: "min(100%,42px)",
      background: designColors.primary,
      borderRadius: "6px 6px 0 0",
      overflow: "hidden",
      display: "block",
      position: "relative",
    },
  },
  {
    ".ux-v54 .ux-week-track i": {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      background: statusColors.warning,
    },
  },
  {
    ".ux-v54 .ux-week-day small": {
      fontSize: "12px",
      color: designColors.muted,
      textTransform: "capitalize",
    },
  },
  {
    ".ux-v54 .ux-goal-line": {
      borderTop: `1px solid ${designColors.border}`,
      paddingTop: "14px",
      maxWidth: "760px",
    },
  },
  {
    ".ux-v54 .ux-goal-line>div": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      marginBottom: "7px",
      fontSize: "13px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .ux-goal-line strong": {
      color: designColors.text,
    },
  },
  {
    ".ux-v54 .ux-home-end": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      flexWrap: "wrap",
      padding: "4px 0",
      color: designColors.muted,
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .ux-command-backdrop": {
      position: "fixed",
      inset: "0",
      zIndex: "120",
      background: withOpacity(designColors.dark, 0.45),
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "clamp(50px,14vh,130px) 20px 20px",
    },
  },
  {
    ".ux-v54 .ux-command-dialog": {
      width: "min(100%,510px)",
      background: designColors.paper,
      border: `1px solid ${designColors.border}`,
      borderRadius: "17px",
      boxShadow: `0 20px 70px ${withOpacity(designColors.dark, 0.2)}`,
      overflow: "hidden",
    },
  },
  {
    ".ux-v54 .ux-command-input": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 17px",
      borderBottom: `1px solid ${designColors.border}`,
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .ux-command-input input:not(.MuiInputBase-input)": {
      flex: "1",
      minWidth: "0",
      border: "0 !important",
      background: "transparent",
      outline: "0",
      fontSize: "16px !important",
      boxShadow: "none !important",
    },
  },
  {
    ".ux-v54 .ux-command-results": {
      maxHeight: "430px",
      overflow: "auto",
      padding: "9px",
    },
  },
  {
    ".ux-v54 .ux-command-results button": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      border: "0",
      borderRadius: "9px",
      padding: "12px 14px",
      background: designColors.background,
      textAlign: "left",
      color: designColors.text,
      fontSize: "15px",
    },
  },
  {
    ".ux-v54 .ux-command-results button:hover,.ux-v54 .ux-command-results button:focus":
      {
        background: designColors.surface,
      },
  },
  {
    ".ux-v54 .ux-command-results button span": {
      flex: "1",
    },
  },
  {
    ".ux-v54 .ux-command-results p": {
      padding: "16px",
      fontSize: "14px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .ux-command-hint": {
      fontSize: "12px",
      color: designColors.muted,
      padding: "12px 18px",
      background: designColors.surface,
    },
  },
  {
    "@media (min-width:1600px)": {
      ".ux-v54 .app-main": {
        marginRight: 0,
      },
    },
  },
  {
    "@media (max-width:1260px)": {
      ".ux-v54 .sidebar": {
        width: "220px",
      },
      ".ux-v54 .app-main": {
        marginLeft: "220px",
      },
      ".ux-v54 .main-content": {
        padding: "26px 25px 35px",
      },
      ".ux-v54 .analytics-kpis": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr)) !important",
      },
    },
  },
  {
    "@media (max-width:1020px)": {
      ".ux-v54 .sidebar": {
        width: "204px",
      },
      ".ux-v54 .app-main": {
        marginLeft: "204px",
      },
      ".ux-v54 .ux-top-search kbd": {
        display: "none",
      },
      ".ux-v54 .ux-home-summary": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".ux-v54 .edital-summary": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".ux-v54 .ux-extra-filter-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".ux-v54 .vault-metrics": {
        gridTemplateColumns: "repeat(3,minmax(0,1fr)) !important",
      },
      ".ux-v54 .edital-filter-grid": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
    },
  },
  {
    "@media (max-width:760px)": {
      ".ux-v54 .sidebar": {
        width: "min(82vw,288px)",
        transform: "translateX(-102%)",
      },
      ".ux-v54 .sidebar.nav-visible": {
        transform: "translateX(0)",
      },
      ".ux-v54 .app-main": {
        marginLeft: "0",
      },
      ".ux-v54 .main-content": {
        padding: "20px 16px 32px",
      },
      ".ux-v54 .topbar": {
        height: "60px",
        padding: "0 16px",
      },
      ".ux-v54 .ux-top-search": {
        padding: "9px",
      },
      ".ux-v54 .ux-top-search span": {
        display: "none",
      },
      ".ux-v54 .ux-home-columns": {
        gridTemplateColumns: "1fr",
      },
      ".ux-v54 .ux-home-focus": {
        padding: "20px",
      },
      ".ux-v54 .ux-home-panel": {
        padding: "17px",
      },
      ".ux-v54 .week-summary": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".ux-v54 .question-focus-panel": {
        gridTemplateColumns: "1fr",
      },
      ".ux-v54 .edital-filter-grid": {
        gridTemplateColumns: "1fr",
      },
    },
  },
  {
    "@media (max-width:510px)": {
      ".ux-v54 .topbar-path": {
        fontSize: "12px",
      },
      ".ux-v54 .edition-chip": {
        display: "none",
      },
      ".ux-v54 .ux-home-summary": {
        gap: "8px",
      },
      ".ux-v54 .ux-summary-item": {
        padding: "13px",
      },
      ".ux-v54 .ux-summary-item span": {
        fontSize: "12px",
      },
      ".ux-v54 .ux-summary-item strong": {
        fontSize: "23px",
      },
      ".ux-v54 .ux-summary-item small": {
        fontSize: "11px",
      },
      ".ux-v54 .ux-home-focus-actions .btn": {
        flex: "1 1 100%",
      },
      ".ux-v54 .ux-home-panel-head": {
        alignItems: "flex-start",
      },
      ".ux-v54 .ux-home-panel-head>button": {
        fontSize: "12px",
      },
      ".ux-v54 .ux-extra-filter-grid": {
        gridTemplateColumns: "1fr",
      },
      ".ux-v54 .vault-metrics": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr)) !important",
      },
      ".ux-v54 .ux-command-hint": {
        fontSize: "11px",
      },
      ".ux-v54 .btn": {
        whiteSpace: "normal",
      },
    },
  },
  {
    "@media (prefers-reduced-motion:reduce)": {
      ".ux-v54 *": {
        scrollBehavior: "auto !important",
        transitionDuration: ".01ms !important",
        animationDuration: ".01ms !important",
      },
    },
  },
  {
    ".ux-v54 .ux-planner-toolbar": {
      display: "flex",
      justifyContent: "flex-end",
      padding: "0 0 2px",
      background: "transparent",
    },
  },
  {
    ".ux-v54 .ux-planner-toolbar .toolbar-info": {
      marginRight: "auto",
    },
  },
  {
    ".ux-v54 .ux-planner-summary": {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
  },
  {
    ".ux-v54 .ux-planner-summary span": {
      fontSize: "13px",
      color: designColors.muted,
      border: "1px solid var(--ux-border)",
      borderRadius: "12px",
      background: designColors.background,
      padding: "10px 15px",
    },
  },
  {
    ".ux-v54 .ux-planner-summary strong": {
      fontSize: "18px",
      color: designColors.text,
      marginRight: "4px",
    },
  },
  {
    ".ux-v54 .ux-analytics-charts .analytics-chart-pair": {
      margin: "0",
    },
  },
  {
    ".ux-v54 .ux-muted-intro": {
      color: designColors.muted,
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .ux-security": {
      borderTop: `1px solid ${designColors.border}`,
      paddingTop: "10px",
    },
  },
  {
    ".ux-v54 .tabs": {
      gap: "6px",
    },
  },
  {
    ".ux-v54 .tabs button": {
      fontSize: "14px",
      padding: "11px 13px 13px",
      minHeight: "43px",
      color: designColors.muted,
      borderBottomWidth: "3px",
    },
  },
  {
    ".ux-v54 .tabs button.active": {
      color: designColors.text,
      borderBottomColor: designColors.border,
    },
  },
  {
    ".ux-v54 .tabs button span": {
      fontSize: "12px",
      background: designColors.surface,
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .tabs button.active span": {
      color: designColors.text,
      background: designColors.surface,
    },
  },
  {
    ".ux-v54 .review-item-main strong": {
      fontSize: "14px",
      color: designColors.dark,
      whiteSpace: "normal",
      lineHeight: "1.4",
    },
  },
  {
    ".ux-v54 .review-item-main span": {
      fontSize: "12px",
      color: designColors.muted,
      lineHeight: "1.4",
    },
  },
  {
    ".ux-v54 .review-meta>span": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .review-meta small": {
      fontSize: "12px",
    },
  },
  {
    ".ux-v54 .mini-metric-grid": {
      gap: "12px",
    },
  },
  {
    ".ux-v54 .mini-metric": {
      border: "1px solid var(--ux-border)",
      borderRadius: "14px",
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .mini-metric>span": {
      fontSize: "12px",
      letterSpacing: "0",
      fontWeight: "700",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .mini-metric>strong": {
      fontSize: "26px",
      lineHeight: "1.2",
      color: designColors.dark,
    },
  },
  {
    ".ux-v54 .mini-metric>small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".ux-v54 .status-pill,.ux-v54 .mastery-pill,.ux-v54 .accuracy-tag": {
      fontSize: "12px",
      fontWeight: "700",
    },
  },
  {
    ".ux-v54 .mock-main strong,.ux-v54 .note-card h4,.ux-v54 .vault-card h4": {
      fontSize: "15px",
      lineHeight: "1.45",
      color: designColors.dark,
      overflowWrap: "anywhere",
    },
  },
  {
    ".ux-v54 .mock-main span,.ux-v54 .note-source small,.ux-v54 .vault-card small":
      {
        fontSize: "12px",
        color: designColors.muted,
      },
  },
  {
    ".ux-v54 .note-block p,.ux-v54 .reader-aside,.ux-v54 .reader-notes": {
      fontSize: "14px",
      lineHeight: "1.55",
    },
  },
  {
    ".ux-v54 .note-block>span": {
      fontSize: "12px",
      letterSpacing: ".03em",
    },
  },
  {
    ".ux-v54 .sheet-topic strong": {
      fontSize: "13px",
      lineHeight: "1.4",
    },
  },
  {
    ".ux-v54 .sheet-topic small": {
      fontSize: "12px",
    },
  },
  {
    ".ux-v54 .study-check,.ux-v54 .review-check": {
      fontSize: "12px",
      minHeight: "33px",
    },
  },
  {},
  {
    ".ux-v54 .sheet-footer": {
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .sheet-scroll": {
      border: `1px solid ${designColors.border}`,
    },
  },
  {
    ".ux-v54 .form-stack": {
      gap: "15px",
    },
  },
  {
    ".ux-v54 .field-hint": {
      fontSize: "12px",
      color: designColors.muted,
      lineHeight: "1.5",
    },
  },
  {
    ".ux-v54 .form-check-row label,.ux-v54 .checkbox-label,.ux-v54 .reader-check,.ux-v54 .week-repeat-check":
      {
        fontSize: "14px",
      },
  },
  {
    ".ux-v54 .empty h4": {
      fontSize: "17px",
    },
  },
  {
    ".ux-v54 .empty p": {
      fontSize: "13px",
      lineHeight: "1.5",
    },
  },
  {
    "@media (max-width:670px)": {
      ".ux-v54 .review-item": {
        flexWrap: "wrap",
        gap: "10px",
      },
      ".ux-v54 .review-item-main": {
        minWidth: "70%",
        flex: "1",
      },
      ".ux-v54 .review-meta": {
        alignItems: "flex-start",
      },
      ".ux-v54 .review-item>.btn": {
        marginLeft: "auto",
      },
      ".ux-v54 .tabs button": {
        fontSize: "12px",
        padding: "10px 7px",
      },
      ".ux-v54 .tabs button span": {
        fontSize: "11px",
      },
    },
  },
  {
    ".n55-planner,.assimilation-picker": {
      fontSize: "15px",
      color: `var(--text,${designColors.dark})`,
    },
  },
  {
    ".n55-planner button,.assimilation-picker button": {
      font: "inherit",
      cursor: "pointer",
    },
  },
  {
    ".n55-toolbar": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "14px",
      flexWrap: "wrap",
    },
  },
  {
    ".n55-calendar-switch": {
      display: "inline-flex",
      gap: "4px",
      padding: "4px",
      borderRadius: "13px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
    },
  },
  {
    ".n55-calendar-switch button": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "9px 15px",
      borderRadius: "10px",
      border: "0",
      background: "transparent",
      color: designColors.muted,
      fontWeight: "650",
    },
  },
  {
    ".n55-calendar-switch button.selected": {
      background: designColors.paper,
      color: designColors.text,
      boxShadow: `0 1px 5px ${withOpacity(designColors.dark, 0.102)}`,
    },
  },
  {
    ".n55-toolbar-actions": {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
  },
  {
    ".n55-summary": {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "12px",
    },
  },
  {
    ".n55-goal-stat": {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "11px",
      textAlign: "left",
      padding: "17px 18px",
      minWidth: "0",
      border: `1px solid ${designColors.border}`,
      borderRadius: "16px",
      background: designColors.background,
      boxShadow: `0 2px 8px ${withOpacity(designColors.text, 0.035)}`,
      color: "inherit",
    },
  },
  {
    ".n55-goal-stat:not(.n55-static):hover": {
      borderColor: designColors.border,
      background: designColors.surface,
    },
  },
  {
    ".n55-goal-stat>span": {
      fontSize: "13px",
      color: designColors.muted,
      fontWeight: "600",
    },
  },
  {
    ".n55-goal-stat>strong": {
      fontSize: "24px",
      lineHeight: "1.15",
      letterSpacing: "-.045em",
      color: designColors.dark,
      fontWeight: "780",
    },
  },
  {
    ".n55-goal-stat>small": {
      color: designColors.muted,
      fontSize: "12px",
    },
  },
  {
    ".n55-goal-stat .progress-track": {
      width: "100%",
      marginTop: "auto",
      background: designColors.surface,
    },
  },
  {
    ".n55-metrics-detail": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      columnGap: "20px",
      rowGap: "10px",
      padding: "5px 4px",
      color: designColors.muted,
      fontSize: "14px",
    },
  },
  {
    ".n55-metrics-detail b": {
      color: designColors.text,
      fontWeight: "700",
      marginRight: "6px",
    },
  },
  {
    ".n55-metrics-detail button": {
      marginLeft: "auto",
    },
  },
  {
    ".n55-calendar": {
      background: designColors.background,
      border: `1px solid ${designColors.border}`,
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: `0 3px 12px ${withOpacity(designColors.dark, 0.027)}`,
    },
  },
  {
    ".n55-calendar-head": {
      padding: "17px 19px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
      borderBottom: `1px solid ${designColors.border}`,
    },
  },
  {
    ".n55-date-nav": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },
  },
  {
    ".n55-date-nav>strong": {
      fontSize: "16px",
      minWidth: "170px",
      textAlign: "center",
      textTransform: "capitalize",
      color: designColors.dark,
    },
  },
  {
    ".n55-area": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      fontSize: "13px",
      color: designColors.muted,
      fontWeight: "650",
    },
  },
  {
    ".n55-area select:not(.MuiInputBase-input)": {
      minWidth: "124px",
      fontSize: "14px",
    },
  },
  {
    ".n55-week-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(7,minmax(0,1fr))",
      alignItems: "stretch",
    },
  },
  {
    ".n55-week-day": {
      minWidth: "0",
      borderRight: `1px solid ${designColors.border}`,
      background: designColors.paper,
      minHeight: "255px",
    },
  },
  {
    ".n55-week-day:last-child": {
      borderRight: "0",
    },
  },
  {
    ".n55-week-day.today": {
      background: designColors.surface,
    },
  },
  {
    ".n55-week-day>header": {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      padding: "11px 10px",
      borderBottom: `1px solid ${designColors.border}`,
      color: designColors.muted,
    },
  },
  {
    ".n55-week-day>header span": {
      fontSize: "13px",
      fontWeight: "650",
    },
  },
  {
    ".n55-week-day>header strong": {
      fontSize: "20px",
      color: designColors.dark,
    },
  },
  {
    ".n55-week-day>header button": {
      marginLeft: "auto",
      display: "grid",
      placeItems: "center",
      border: "0",
      borderRadius: "8px",
      width: "28px",
      height: "28px",
      background: designColors.surface,
      color: designColors.text,
    },
  },
  {
    ".n55-day-body": {
      padding: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
  },
  {
    ".n55-event": {
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      minWidth: "0",
    },
  },
  {
    ".n55-event.study": {
      background: designColors.surface,
      borderColor: designColors.border,
    },
  },
  {
    ".n55-event.done": {
      opacity: ".7",
    },
  },
  {
    ".n55-event-body": {
      display: "flex",
      flex: "1",
      minWidth: "0",
      flexDirection: "column",
      gap: "4px",
    },
  },
  {
    ".n55-event-body strong": {
      fontSize: "14px",
      lineHeight: "1.4",
      color: designColors.dark,
      overflowWrap: "anywhere",
      fontWeight: "680",
    },
  },
  {
    ".n55-event-body small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".n55-event-progress": {
      fontSize: "12px",
      lineHeight: "1.4",
      color: designColors.primary,
      overflowWrap: "anywhere",
    },
  },
  {
    ".n55-event-actions": {
      display: "flex",
      gap: "3px",
      alignSelf: "flex-start",
    },
  },
  {
    ".n55-minibutton": {
      width: "26px",
      height: "26px",
      display: "grid",
      placeItems: "center",
      border: "0",
      borderRadius: "7px",
      background: designColors.surface,
      color: designColors.text,
    },
  },
  {
    ".n55-minibutton:hover": {
      background: designColors.light,
    },
  },
  {
    ".n55-check": {
      display: "grid",
      placeItems: "center",
      flex: "none",
      width: "17px",
      height: "17px",
      marginTop: "2px",
      border: `1.5px solid ${designColors.border}`,
      borderRadius: "5px",
      background: designColors.paper,
      color: designColors.paper,
    },
  },
  {
    ".n55-check.checked": {
      background: designColors.primary,
      borderColor: designColors.border,
    },
  },
  {
    ".n55-review-event": {
      display: "flex",
      alignItems: "flex-start",
      gap: "5px",
      width: "100%",
      textAlign: "left",
      border: `1px solid ${statusColors.warningSoft}`,
      background: statusColors.warningSoft,
      color: statusColors.warning,
      borderRadius: "9px",
      padding: "8px",
      fontSize: "13px",
      lineHeight: "1.35",
      fontWeight: "650",
    },
  },
  {
    ".n55-review-event svg": {
      flexShrink: "0",
    },
  },
  {
    ".n55-review-event span": {
      overflowWrap: "anywhere",
      minWidth: "0",
    },
  },
  {
    ".n55-day-actual": {
      color: designColors.muted,
      fontSize: "11px",
      lineHeight: "1.4",
      padding: "4px 6px",
      borderTop: `1px solid ${designColors.border}`,
    },
  },
  {
    ".n55-day-empty": {
      border: `1px dashed ${designColors.border}`,
      background: "transparent",
      borderRadius: "9px",
      color: designColors.muted,
      fontSize: "12px",
      padding: "17px 6px",
    },
  },
  {
    ".n55-month-scroll": {
      overflowX: "auto",
    },
  },
  {
    ".n55-month-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(7,minmax(0,1fr))",
      gap: "8px",
      padding: "12px",
    },
  },
  {
    ".n55-weekday": {
      textAlign: "center",
      padding: "11px 4px",
      fontWeight: "700",
      color: designColors.muted,
      fontSize: "12px",
      borderBottom: `1px solid ${designColors.border}`,
      background: designColors.surface,
    },
  },
  {
    ".n55-month-day": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      minHeight: "104px",
      maxHeight: "140px",
      overflow: "hidden",
      textAlign: "left",
      border: `1px solid ${designColors.border}`,
      background: designColors.paper,
      padding: "11px",
      fontSize: "12px",
      color: designColors.dark,
      minWidth: "0",
    },
  },
  {
    ".n55-month-day.outside": {
      background: designColors.surface,
      opacity: ".5",
    },
  },
  {
    ".n55-month-day.today": {
      background: designColors.surface,
      boxShadow: `inset 0 0 0 2px ${designColors.accent}`,
    },
  },
  {
    ".n55-month-day:hover": {
      background: designColors.surface,
    },
  },
  {
    ".n55-month-top": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "4px",
    },
  },
  {
    ".n55-month-top strong": {
      fontSize: "17px",
    },
  },
  {
    ".n55-month-top small": {
      whiteSpace: "nowrap",
      fontSize: "11px",
      color: designColors.muted,
    },
  },
  {
    ".n55-month-text": {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
      overflow: "hidden",
      color: designColors.muted,
      lineHeight: "1.35",
    },
  },
  {
    ".n55-month-text>span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  {
    ".n55-day-dialog": {
      display: "grid",
      gap: "12px",
    },
  },
  {
    ".n55-day-dialog>.n55-event": {
      padding: "12px",
    },
  },
  {
    ".n55-suggestions": {
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
      borderRadius: "15px",
      padding: "18px",
      display: "grid",
      gap: "12px",
    },
  },
  {
    ".n55-subhead": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "15px",
    },
  },
  {
    ".n55-subhead strong": {
      fontSize: "16px",
    },
  },
  {
    ".n55-suggestion": {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      alignItems: "center",
      padding: "10px 0",
      borderTop: `1px solid ${designColors.border}`,
    },
  },
  {
    ".n55-suggestion>div": {
      display: "grid",
      gap: "4px",
      minWidth: "0",
    },
  },
  {
    ".n55-suggestion strong": {
      fontSize: "14px",
      overflowWrap: "anywhere",
    },
  },
  {
    ".n55-suggestion small,.n55-suggestions>small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".n55-editor details": {
      border: `1px solid ${designColors.border}`,
      borderRadius: "9px",
      padding: "11px",
    },
  },
  {
    ".n55-editor details summary": {
      cursor: "pointer",
      color: designColors.muted,
    },
  },
  {
    ".n55-editor details .field": {
      marginTop: "12px",
    },
  },
  {
    ".assimilation-picker": {
      display: "grid",
      gap: "16px",
    },
  },
  {
    ".assimilation-subject": {
      margin: "0",
      fontWeight: "650",
      color: designColors.muted,
    },
  },
  {
    ".assimilation-options": {
      display: "grid",
      gap: "9px",
    },
  },
  {
    ".assimilation-choice": {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      minHeight: "69px",
      padding: "11px 14px",
      border: `1px solid ${designColors.border}`,
      borderRadius: "12px",
      cursor: "pointer",
      background: designColors.background,
    },
  },
  {
    ".assimilation-choice.selected": {
      background: designColors.surface,
      borderColor: designColors.border,
      boxShadow: `inset 0 0 0 1px ${designColors.accent}`,
    },
  },
  {
    ".assimilation-choice input:not(.MuiInputBase-input)": {
      accentColor: designColors.primary,
      width: "18px",
      height: "18px",
    },
  },
  {
    ".assimilation-number": {
      fontWeight: "800",
      color: designColors.primary,
      fontSize: "20px",
    },
  },
  {
    ".assimilation-copy": {
      display: "grid",
      gap: "4px",
      minWidth: "0",
      flex: "1",
    },
  },
  {
    ".assimilation-copy strong": {
      fontSize: "15px",
      color: designColors.dark,
    },
  },
  {
    ".assimilation-copy small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".assimilation-days": {
      borderRadius: "999px",
      background: designColors.surface,
      color: designColors.primary,
      fontSize: "12px",
      fontWeight: "800",
      padding: "6px 10px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".assimilation-footer": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "10px",
    },
  },
  {
    ".edital-advanced .review-check": {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      alignItems: "center",
      minWidth: "100px",
    },
  },
  {
    ".edital-advanced .review-check small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    "@media (max-width:1350px)": {
      ".n55-week-grid": {
        gridTemplateColumns: "repeat(7,minmax(144px,1fr))",
        minWidth: "1008px",
      },
      ".n55-calendar": {
        overflowX: "auto",
      },
      ".n55-calendar-head": {
        position: "sticky",
        left: "0",
      },
      ".n55-month-grid": {
        minWidth: "700px",
      },
    },
  },
  {
    "@media (max-width:850px)": {
      ".n55-summary": {
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      },
      ".n55-goal-stat>strong": {
        fontSize: "20px",
      },
      ".n55-calendar-head": {
        padding: "12px",
      },
      ".n55-metrics-detail button": {
        marginLeft: "0",
      },
    },
  },
  {
    "@media (max-width:520px)": {
      ".n55-toolbar-actions": {
        width: "100%",
      },
      ".n55-toolbar-actions>*": {
        flex: "1",
      },
      ".n55-goal-stat": {
        padding: "12px",
      },
      ".n55-metrics-detail": {
        gap: "8px",
      },
      ".n55-metrics-detail span": {
        minWidth: "40%",
      },
      ".n55-date-nav": {
        gap: "4px",
      },
      ".n55-date-nav>strong": {
        minWidth: "130px",
        fontSize: "13px",
      },
      ".n55-month-grid": {
        minWidth: "680px",
      },
      ".assimilation-choice": {
        padding: "10px",
        gap: "8px",
      },
      ".assimilation-copy strong": {
        fontSize: "14px",
      },
    },
  },
  {
    ".n55-logged-event": {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      borderRadius: "10px",
      padding: "10px",
      background: designColors.surface,
      border: `1px solid ${designColors.border}`,
    },
  },
  {
    ".n55-logged-event span": {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color: designColors.primary,
      fontWeight: "780",
    },
  },
  {
    ".n55-logged-event strong": {
      fontSize: "13px",
      overflowWrap: "anywhere",
      color: designColors.primary,
    },
  },
  {
    ".n55-logged-event small": {
      fontSize: "12px",
      color: designColors.muted,
    },
  },
  {
    ".nimbo-theme .search-wrap": {
      border: 0,
      padding: 0,
      background: "transparent",
    },
  },
  {
    ":root, .nimbo-theme": {
      "--accent": designColors.primary,
      "--dark": designColors.text,
      "--muted": designColors.muted,
      "--border": designColors.border,
      "--success": statusColors.success,
      "--sidebar": designColors.sidebar,
      "--soft": designColors.surface,
      "--ui-ink": designColors.text,
      "--ui-muted": designColors.muted,
      "--ui-border": designColors.border,
      "--ui-soft": designColors.surface,
      "--ui-green": designColors.primary,
    },
    "html, body, #root, .app-shell, .nimbo-theme, .nimbo-theme .app-main, .nimbo-theme .main-content":
      {
        background: designColors.background,
        color: designColors.text,
      },
    ".nimbo-theme .sidebar": {
      background: designColors.sidebar,
      color: designColors.light,
    },
  },
  {
    ".nimbo-theme .MuiPaper-root.MuiPaper-outlined": {
      boxShadow: surfaceStyles.cardShadow,
    },
  },
];
