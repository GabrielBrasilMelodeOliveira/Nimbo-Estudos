export const globalStyles = [
  {
    ":root": {
      fontFamily: '"Inter Variable", sans-serif',
      color: "#202941",
      background: "#f6f8fb",
      fontSynthesis: "none",
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      "--accent": "#5175f6",
      "--dark": "#18243c",
      "--muted": "#8993a5",
      "--border": "#e9edf4",
      "--success": "#26b696",
      "--sidebar": "#111b2f",
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
      color: "#a5afbd",
    },
  },
  {
    "input:not(.MuiInputBase-input):focus,textarea:focus,select:not(.MuiInputBase-input):focus":
      {
        borderColor: "#8da5ff !important",
        boxShadow: "0 0 0 3px #e8eeff",
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
      color: "#c4cee1",
      zIndex: "40",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#344258 transparent",
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
      background: "#5578f9",
      color: "#fff",
      boxShadow: "0 9px 23px #486cfa44",
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
      color: "#fff",
      lineHeight: "1.08",
      letterSpacing: "-1.8px",
    },
  },
  {
    ".brand-wordmark strong span": {
      color: "#5af3c0",
    },
  },
  {
    ".brand-wordmark small": {
      fontSize: "9px",
      fontWeight: "700",
      letterSpacing: "1.55px",
      color: "#8594ae",
      marginTop: "6px",
    },
  },
  {
    ".sidebar-overline": {
      margin: "7px 26px 24px",
      padding: "9px 12px",
      border: "1px solid #2e3a51",
      borderRadius: "8px",
      color: "#8d9db7",
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
      color: "#73819d",
      padding: "0 14px",
      marginBottom: "10px",
    },
  },
  {
    ".nav-item": {
      appearance: "none",
      border: "0",
      background: "transparent",
      color: "#9caac3",
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
      background: "#202e49",
      color: "#f0f5ff",
    },
  },
  {
    ".nav-item.selected": {
      background: "#304577",
      color: "#f6f8ff",
      boxShadow: "inset 3px 0 #6386ff",
    },
  },
  {
    ".nav-item.selected svg": {
      color: "#b3c4ff",
      opacity: "1",
    },
  },
  {
    ".nav-count": {
      minWidth: "23px",
      height: "22px",
      padding: "0 5px",
      borderRadius: "7px",
      background: "#fa935c",
      color: "#fff",
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
      border: "1px solid #354667",
      borderRadius: "13px",
      background: "linear-gradient(145deg,#25385b,#1a2b48)",
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
      background: "#597efd22",
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
      background: "#425e9b",
      color: "#c2d0ff",
      marginBottom: "12px",
    },
  },
  {
    ".next-up-card>span": {
      display: "block",
      fontSize: "10px",
      letterSpacing: "1px",
      color: "#9eafd0",
      fontWeight: "800",
      marginBottom: "8px",
    },
  },
  {
    ".next-up-card>strong": {
      fontSize: "13px",
      lineHeight: "1.4",
      display: "block",
      color: "#fff",
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
      color: "#8fbcff",
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
      borderTop: "1px solid #29354d",
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
      background: "#e5edff",
      color: "#5171bb",
      fontSize: "12px",
      fontWeight: "800",
    },
  },
  {
    ".avatar-small": {
      background: "#2c416c",
      color: "#dce7ff",
    },
  },
  {
    ".sidebar-signature strong": {
      display: "block",
      color: "#dce3ee",
      fontSize: "11px",
    },
  },
  {
    ".sidebar-signature small": {
      display: "block",
      color: "#7587a4",
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
      background: "#fff",
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
      color: "#9aa4b4",
    },
  },
  {
    ".breadcrumb-arrow": {
      color: "#b7c2d0",
    },
  },
  {
    ".breadcrumb-current": {
      color: "#4c5a73",
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
      color: "#8a96a9",
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
      color: "#586780",
      position: "relative",
    },
  },
  {
    ".notification-dot": {
      position: "absolute",
      width: "8px",
      height: "8px",
      borderRadius: "100%",
      background: "#fb8e60",
      border: "2px solid #fff",
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
      color: "#697d9a",
      marginBottom: "13px",
    },
  },
  {
    ".live-dot,.small-live-dot": {
      background: "#2dc89c",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      display: "inline-block",
      boxShadow: "0 0 0 3px #2dc89c22",
    },
  },
  {
    ".page-header h1": {
      fontSize: "28px",
      lineHeight: "1.25",
      letterSpacing: "-1.15px",
      color: "#19253d",
      marginBottom: "8px",
      fontWeight: "800",
    },
  },
  {
    ".page-header p": {
      fontSize: "13px",
      color: "#8a95a8",
      margin: "0",
    },
  },
  {
    ".edition-chip": {
      borderRadius: "30px",
      padding: "10px 15px",
      background: "#fff",
      border: "1px solid #e6eaf1",
      fontSize: "11px",
      maxWidth: "240px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      fontWeight: "700",
      color: "#53627d",
      boxShadow: "0 3px 10px #19253d04",
      display: "block",
    },
  },
  {
    ".edition-chip>span": {
      display: "inline-block",
      width: "8px",
      height: "8px",
      background: "#587cff",
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
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      boxShadow: "0 5px 25px #1a2f5907",
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
      color: "#1d2a43",
      fontSize: "15px",
      fontWeight: "800",
      margin: "0 0 6px",
    },
  },
  {
    ".panel-heading p": {
      fontSize: "11px",
      color: "#9ca6b6",
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
      border: "1px solid #e9eef6",
      background: "#f8faff",
      padding: "7px 11px",
      borderRadius: "8px",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#71809a",
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
      color: "#9aa9c0",
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
      background: "#5778f7",
      color: "#fff",
      boxShadow: "0 5px 13px #4169ea25",
    },
  },
  {
    ".btn-primary:hover": {
      background: "#4168ed",
      boxShadow: "0 7px 15px #4169ea36",
    },
  },
  {
    ".btn-subtle": {
      background: "#f4f6fa",
      color: "#52627e",
      border: "1px solid #e8edf5",
    },
  },
  {
    ".btn-subtle:hover": {
      background: "#e9effa",
    },
  },
  {
    ".btn-success": {
      background: "#e5f8f1",
      color: "#189778",
      border: "1px solid #caeddf",
    },
  },
  {
    ".btn-success:hover": {
      background: "#d7f4e8",
    },
  },
  {
    ".btn-warning": {
      background: "#fff0d8",
      color: "#ba7825",
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
      color: "#8793a7",
    },
  },
  {
    ".icon-button:hover": {
      background: "#f3f6fb",
    },
  },
  {
    ".danger-hover:hover": {
      background: "#ffe9ed",
      color: "#d74b62",
    },
  },
  {
    ".text-link,.metric-link": {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      background: "transparent",
      border: "0",
      color: "#5a7aed",
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
      background: "#f1f4ff",
      color: "#5272e4",
      fontSize: "11px",
      fontWeight: "800",
      padding: "8px 12px",
      borderRadius: "7px",
    },
  },
  {
    ".row-link:hover": {
      background: "#e3eaff",
    },
  },
  {
    ".wide-soft-button": {
      border: "0",
      background: "#f2f5ff",
      color: "#5776d9",
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
      background: "#e6edff",
    },
  },
  {
    ".progress-track": {
      width: "100%",
      background: "#eaf0f6",
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
      color: "#9ca7b7",
      borderTop: "1px solid #e8ebf0",
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
      color: "#3bbd9e",
    },
  },
  {
    ".welcome-banner": {
      position: "relative",
      overflow: "hidden",
      minHeight: "226px",
      borderRadius: "16px",
      background: "linear-gradient(107deg,#243b70 0%,#213965 49%,#315c88 100%)",
      padding: "31px 38px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
    },
  },
  {
    ".welcome-banner:after": {
      content: "''",
      background: "radial-gradient(circle,#99d5f515,transparent 70%)",
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
      color: "#9ed9d8",
      marginBottom: "12px",
    },
  },
  {
    ".welcome-copy h2": {
      color: "#fff",
      fontSize: "26px",
      lineHeight: "1.27",
      letterSpacing: "-1.2px",
      margin: "0 0 10px",
      fontWeight: "800",
    },
  },
  {
    ".welcome-copy h2 span": {
      color: "#a9ddeb",
    },
  },
  {
    ".welcome-copy p": {
      fontSize: "11px",
      color: "#b6c9df",
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
      background: "#fff",
      color: "#315a93",
      border: "0",
      borderRadius: "8px",
      padding: "11px 17px",
      fontSize: "11px",
      fontWeight: "800",
      boxShadow: "0 8px 20px #00000013",
    },
  },
  {
    ".banner-button:hover": {
      background: "#f0f6ff",
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
      background: "#62b1e82b",
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
      border: "1px solid #bfe0fc32",
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
      background: "linear-gradient(134deg,#f3f7ff,#e0eaff)",
      color: "#1f345a",
      borderRadius: "14px",
      boxShadow: "15px 19px 30px #0b24444a",
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
      background: "#dbf9ef",
      color: "#2ab28f",
      marginBottom: "9px",
    },
  },
  {
    ".art-main-card>span": {
      fontSize: "9px",
      color: "#8393ad",
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
      background: "#c9d9f1",
      width: "100%",
      borderRadius: "20px",
    },
  },
  {
    ".art-line div": {
      width: "70%",
      background: "#55c6ad",
      height: "100%",
      borderRadius: "20px",
    },
  },
  {
    ".art-mini-stars": {
      position: "absolute",
      right: "16px",
      top: "18px",
      color: "#9eb5d9",
      fontSize: "14px",
    },
  },
  {
    ".art-float": {
      position: "absolute",
      background: "#ffffffeb",
      boxShadow: "0 8px 30px #11294e3b",
      borderRadius: "10px",
      color: "#217f71",
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
      color: "#7a92a7",
    },
  },
  {
    ".art-float-b": {
      right: "7px",
      top: "24px",
      fontSize: "28px",
      padding: "1px 12px",
      color: "#f2b657",
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
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "13px",
      padding: "21px 21px 19px",
      boxShadow: "0 4px 19px #1a2f5906",
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
      color: "#8290a4",
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
      background: "#eaf0ff",
      color: "#5677ed",
    },
  },
  {
    ".metric-icon.teal,.mini-icon.teal": {
      background: "#e4f9f2",
      color: "#23ac8c",
    },
  },
  {
    ".metric-icon.purple,.mini-icon.purple": {
      background: "#f1ecff",
      color: "#9065e9",
    },
  },
  {
    ".metric-icon.orange,.mini-icon.orange": {
      background: "#fff1e4",
      color: "#f09a4c",
    },
  },
  {
    ".metric-value": {
      color: "#202c46",
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
      color: "#9ba5b4",
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
      color: "#21314e",
      letterSpacing: "-1px",
    },
  },
  {
    ".chart-sum span": {
      color: "#98a6b7",
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
      color: "#71819a",
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
      borderBottom: "1px solid #e7eaf0",
    },
  },
  {
    ".bar-fill": {
      width: "100%",
      background: "#dce5ff",
      borderRadius: "5px 5px 0 0",
      minHeight: "0",
      transition: "height .3s",
    },
  },
  {
    ".bar-highlight": {
      background: "#5278f5",
    },
  },
  {
    ".bar-label": {
      color: "#9aa5b6",
      fontSize: "10px",
      fontWeight: "700",
    },
  },
  {
    ".bar-label-active": {
      color: "#5278f5",
    },
  },
  {
    ".chart-bottom": {
      borderTop: "1px solid #edf0f5",
      marginTop: "14px",
      paddingTop: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#91a0b0",
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
      background: "#5b7cf5",
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
      background:
        "conic-gradient(#5279f4 var(--progress),#eaf0f8 var(--progress))",
      padding: "10px",
      flexShrink: "0",
    },
  },
  {
    ".target-ring>div": {
      background: "white",
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
      color: "#253450",
      fontSize: "22px",
      letterSpacing: "-1px",
      fontFamily: '"Inter Variable", sans-serif',
    },
  },
  {
    ".target-ring span": {
      fontSize: "9px",
      color: "#9ca8b7",
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
      color: "#9da8b8",
      display: "block",
      marginBottom: "8px",
    },
  },
  {
    ".weekly-target>div:last-child>strong": {
      fontSize: "15px",
      whiteSpace: "nowrap",
      color: "#26334d",
      fontFamily: '"Inter Variable", sans-serif',
    },
  },
  {
    ".weekly-target>div:last-child>strong span": {
      fontSize: "12px",
      color: "#a4afbf",
    },
  },
  {
    ".weekly-target p": {
      fontSize: "10px",
      color: "#a2adba",
      lineHeight: "1.5",
      margin: "8px 0 0",
    },
  },
  {
    ".target-divider": {
      height: "1px",
      background: "#ebeff5",
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
      color: "#63738e",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  },
  {
    ".target-line strong": {
      fontSize: "14px",
      color: "#20314d",
    },
  },
  {
    ".target-line small": {
      fontSize: "11px",
      color: "#a7b0bc",
    },
  },
  {
    ".target-icon": {
      width: "29px",
      height: "29px",
      display: "grid",
      placeItems: "center",
      borderRadius: "8px",
      background: "#e9f8f3",
      color: "#26b896",
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
      color: "#61718c",
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
      color: "#9ca8b8",
      fontSize: "10px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".discipline-progress-head strong": {
      color: "#4a5973",
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
      background: "#edf8f4",
      color: "#299b82",
      borderRadius: "20px",
      padding: "7px 10px",
      fontSize: "10px",
      fontWeight: "800",
    },
  },
  {
    ".due-active": {
      background: "#fff0e9",
      color: "#db8b53",
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
      borderBottom: "1px solid #eff2f5",
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
      background: "#fff0e8",
      color: "#e9a071",
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
      color: "#31405a",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  {
    ".due-item span": {
      display: "block",
      color: "#a1aab8",
      fontSize: "10px",
      marginTop: "5px",
    },
  },
  {
    ".due-now": {
      background: "#fff1e7",
      color: "#dd9e62",
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
      background: "#e1f8ef",
      color: "#1fbc92",
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
      color: "#3b4860",
    },
  },
  {
    ".no-reviews p": {
      fontSize: "10px",
      color: "#9caab9",
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
      borderBottom: "1px solid #edf1f6",
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
      color: "#bac3cf",
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
      color: "#303b50",
      fontSize: "12px",
    },
  },
  {
    ".weak-row span:not(.weak-number)": {
      display: "block",
      color: "#98a5b7",
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
      color: "#667791",
      fontSize: "12px",
      fontWeight: "750",
    },
  },
  {
    ".toolbar-info svg": {
      color: "#5c7cf0",
    },
  },
  {
    ".edital-progress-panel": {
      borderRadius: "13px",
      background: "linear-gradient(112deg,#263e6d,#244d7c)",
      padding: "24px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "25px",
      color: "#fff",
    },
  },
  {
    ".eyebrow": {
      fontSize: "10px",
      letterSpacing: "1.15px",
      fontWeight: "800",
      color: "#8db7c9",
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
      color: "#fff",
      letterSpacing: "-1px",
    },
  },
  {
    ".edital-progress-main span": {
      fontSize: "11px",
      color: "#b8cbe2",
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
      color: "#c6d6e5",
      fontSize: "11px",
      marginBottom: "10px",
    },
  },
  {
    ".edital-progress-right strong": {
      color: "#fff",
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
      border: "1px solid #e8edf4",
      background: "#fbfcff",
      borderRadius: "8px",
      padding: "0 13px",
      flex: "1",
      minWidth: "200px",
    },
  },
  {
    ".search-wrap svg": {
      color: "#a0afc0",
      flexShrink: "0",
    },
  },
  {
    ".search-wrap input:not(.MuiInputBase-input)": {
      width: "100%",
      border: "0",
      background: "transparent",
      padding: "0",
      color: "#4a5c79",
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
      border: "1px solid #e8edf4",
      background: "#fbfcff",
      borderRadius: "8px",
      padding: "0 12px",
      color: "#687991",
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
      color: "#9ba8b8",
      fontSize: "9px",
      letterSpacing: "1px",
      fontWeight: "800",
      borderBottom: "1px solid #edf0f6",
      padding: "14px 12px",
      whiteSpace: "nowrap",
      background: "#fafcff",
    },
  },
  {
    ".data-table td": {
      fontSize: "11px",
      color: "#596880",
      padding: "15px 12px",
      borderBottom: "1px solid #f0f2f6",
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
      background: "#fbfcff",
    },
  },
  {
    ".data-table strong": {
      color: "#30405a",
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
      color: "#9ca8b9",
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
      background: "#f2f4f8",
      color: "#8b96a8",
    },
  },
  {
    ".status-in_progress": {
      background: "#fff4df",
      color: "#d2a04b",
    },
  },
  {
    ".status-completed": {
      background: "#e6f7ef",
      color: "#29a783",
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
      background: "#fff0f1",
      color: "#e3737a",
    },
  },
  {
    ".mastery-medium": {
      background: "#fff5df",
      color: "#d9a347",
    },
  },
  {
    ".mastery-strong": {
      background: "#e4f8ee",
      color: "#21a985",
    },
  },
  {
    ".table-checkbox": {
      width: "20px",
      height: "20px",
      border: "1.5px solid #cbd5e2",
      background: "#fff",
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
      background: "#34b998",
      color: "#fff",
      borderColor: "#34b998",
    },
  },
  {
    ".table-checkbox:hover": {
      borderColor: "#6282f4",
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
      color: "#9aa7b8 !important",
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
      color: "#189e7e",
      background: "#e4f8ee",
    },
  },
  {
    ".accuracy-tag.medium": {
      color: "#b98a29",
      background: "#fff5e1",
    },
  },
  {
    ".accuracy-tag.low": {
      color: "#d75c71",
      background: "#fff0f2",
    },
  },
  {
    ".tip": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      padding: "13px 16px",
      background: "#eaf0ff",
      border: "1px solid #e0e9ff",
      color: "#5f79ad",
      borderRadius: "9px",
      fontSize: "11px",
      lineHeight: "1.55",
    },
  },
  {
    ".tip svg": {
      flexShrink: "0",
      color: "#5c7fdf",
    },
  },
  {
    ".tip strong": {
      fontWeight: "800",
      color: "#4e70b2",
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
      background: "#eff4fe",
      color: "#6785e1",
      borderRadius: "14px",
      display: "grid",
      placeItems: "center",
      marginBottom: "16px",
    },
  },
  {
    ".empty h4": {
      color: "#41506d",
      marginBottom: "7px",
      fontSize: "13px",
    },
  },
  {
    ".empty p": {
      color: "#9da9b8",
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
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "13px",
      padding: "21px 22px",
      display: "grid",
      gridTemplateColumns: "48px 1fr",
      gridTemplateRows: "auto auto auto",
      alignItems: "center",
      boxShadow: "0 3px 17px #182a5006",
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
      color: "#98a5b4",
      letterSpacing: ".8px",
    },
  },
  {
    ".mini-metric>strong": {
      font: '800 26px "Inter Variable"',
      letterSpacing: "-1.1px",
      color: "#23314d",
      marginTop: "5px",
    },
  },
  {
    ".mini-metric>small": {
      fontSize: "10px",
      color: "#a7b1bd",
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
      borderBottom: "1px solid #eef1f5",
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
      color: "#35435d",
      fontSize: "11px",
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  {
    ".performance-info span": {
      color: "#9fabbb",
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
      background: "#f3f7ff",
      border: "1px solid #e8edfe",
      borderRadius: "8px",
      padding: "13px 15px",
      fontSize: "12px",
      color: "#6780ae",
    },
  },
  {
    ".inline-result strong": {
      font: '800 16px "Inter Variable"',
      color: "#3d66d6",
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
      background: "#f9fbfe",
      border: "1px solid #e9eff5",
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
      background: "#f2f6fe",
    },
  },
  {
    ".cycle-card.active": {
      border: "1.5px solid #6b8bf5",
      background: "#edf3ff",
      boxShadow: "0 0 0 2px #e6edff inset",
    },
  },
  {
    ".cycle-card-index": {
      color: "#b4c0d0",
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
      color: "#45536c",
      maxWidth: "125px",
    },
  },
  {
    ".cycle-next-label": {
      position: "absolute",
      right: "8px",
      top: "9px",
      fontSize: "8px",
      color: "#4b76f0",
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
      background: "#f4f6f9",
      color: "#7e90a7",
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
      background: "#9ca9b9",
      borderRadius: "50%",
    },
  },
  {
    ".timer-state.is-running": {
      background: "#e3f9ee",
      color: "#209b78",
    },
  },
  {
    ".timer-state.is-running>span": {
      background: "#2cba8d",
      boxShadow: "0 0 0 3px #29b88b24",
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
      color: "#5c7df4",
      background: "#eef3ff",
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
      color: "#22324e",
      fontVariantNumeric: "tabular-nums",
    },
  },
  {
    ".timer-caption": {
      color: "#b2bdca",
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
      background: "#e5f9f0",
      color: "#149e79",
      border: "1px solid #bdebd9",
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
      color: "#aab6c4",
      textAlign: "center",
      margin: "19px 0 0",
      lineHeight: "1.5",
    },
  },
  {
    ".hours-summary": {
      textAlign: "center",
      background: "#f8faff",
      borderRadius: "11px",
      padding: "24px 15px 21px",
      marginBottom: "17px",
    },
  },
  {
    ".hours-summary span": {
      fontSize: "10px",
      letterSpacing: "1px",
      color: "#9aa9bc",
      fontWeight: "800",
    },
  },
  {
    ".hours-summary strong": {
      display: "block",
      font: '800 33px "Inter Variable"',
      color: "#253c69",
      margin: "10px 0 4px",
    },
  },
  {
    ".hours-summary p": {
      fontSize: "11px",
      color: "#9aa8b9",
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
      color: "#92a0b6",
      fontSize: "10px",
    },
  },
  {
    ".daily-mini>div": {
      height: "55px",
      width: "19px",
      background: "#ecf1fc",
      borderRadius: "4px",
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
    },
  },
  {
    ".daily-mini>div>div": {
      background: "#7290f7",
      width: "100%",
      borderRadius: "4px",
    },
  },
  {
    ".daily-mini small": {
      color: "#8998af",
      fontSize: "9px",
    },
  },
  {
    ".study-advice": {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      background: "#f0f5ff",
      border: "1px solid #e7eefe",
      borderRadius: "9px",
      padding: "12px 13px",
    },
  },
  {
    ".study-advice svg": {
      flex: "0 0 auto",
      color: "#5681de",
    },
  },
  {
    ".study-advice p": {
      fontSize: "10px",
      color: "#7185a9",
      lineHeight: "1.7",
      margin: "0",
    },
  },
  {
    ".study-advice strong": {
      display: "block",
      color: "#4e6fb0",
    },
  },
  {
    ".time-tag": {
      display: "inline-block",
      color: "#4166d3",
      background: "#ecf1ff",
      padding: "7px 10px",
      borderRadius: "7px",
      fontWeight: "800",
      fontSize: "11px",
    },
  },
  {
    ".review-hero": {
      background: "linear-gradient(104deg,#e7f6f0,#edf7ff)",
      border: "1px solid #dcefe9",
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
      background: "#cfefe3",
      color: "#2aac88",
      flexShrink: "0",
    },
  },
  {
    ".review-hero .eyebrow": {
      color: "#289d8a",
    },
  },
  {
    ".review-hero h2": {
      fontSize: "18px",
      color: "#22534f",
      margin: "7px 0 6px",
    },
  },
  {
    ".review-hero p": {
      color: "#718e93",
      fontSize: "11px",
      lineHeight: "1.5",
      margin: "0",
    },
  },
  {
    ".tabs": {
      display: "flex",
      gap: "18px",
      borderBottom: "1px solid #eaf0f5",
      marginBottom: "11px",
      overflowX: "auto",
    },
  },
  {
    ".tabs button": {
      border: "0",
      borderBottom: "2px solid transparent",
      background: "transparent",
      color: "#8f9db1",
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
      color: "#5073e8",
      borderColor: "#5776f4",
    },
  },
  {
    ".tabs button span": {
      fontSize: "9px",
      borderRadius: "15px",
      background: "#f0f3f7",
      padding: "3px 6px",
      color: "#8190a3",
    },
  },
  {
    ".tabs button.active span": {
      color: "#5675e9",
      background: "#e9eeff",
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
      borderBottom: "1px solid #edf1f5",
    },
  },
  {
    ".review-item:last-child": {
      border: "0",
    },
  },
  {
    ".review-item-badge": {
      background: "#f0edff",
      color: "#8267d6",
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
      background: "#e8faf2",
      color: "#1ead87",
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
      color: "#35455f",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  {
    ".review-item-main span": {
      display: "block",
      fontSize: "10px",
      color: "#9daabb",
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
      color: "#8393a9",
    },
  },
  {
    ".review-meta .review-overdue": {
      color: "#e67878",
    },
  },
  {
    ".review-meta small": {
      color: "#99b0a1",
      fontSize: "9px",
    },
  },
  {
    ".upcoming-pill": {
      color: "#6688b4",
      background: "#edf4ff",
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
      borderBottom: "1px solid #edf1f5",
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
      background: "#edf1ff",
      color: "#5878ea",
      display: "grid",
      placeItems: "center",
      flexShrink: "0",
    },
  },
  {
    ".mock-main strong": {
      display: "block",
      color: "#35445d",
      fontSize: "12px",
    },
  },
  {
    ".mock-main span,.mock-main small": {
      display: "block",
      fontSize: "10px",
      color: "#9daaba",
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
      color: "#abb5c2",
      letterSpacing: ".7px",
      fontWeight: "800",
    },
  },
  {
    ".mock-grade strong,.mock-cutoff strong": {
      font: '800 16px "Inter Variable"',
      color: "#354968",
    },
  },
  {
    ".mock-cutoff strong": {
      color: "#8997aa",
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
      background: "#e4f8ef",
      color: "#1caa81",
    },
  },
  {
    ".mock-status.failed": {
      background: "#fff0eb",
      color: "#e08466",
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
      border: "1px solid #e9eef6",
      borderRadius: "11px",
      padding: "18px",
      minHeight: "199px",
      display: "flex",
      flexDirection: "column",
      background: "#fdfefe",
    },
  },
  {
    ".material-card:hover": {
      borderColor: "#bdccf4",
      boxShadow: "0 5px 15px #1f33600a",
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
      background: "#edf2ff",
      color: "#637eee",
    },
  },
  {
    ".material-type": {
      fontSize: "9px",
      letterSpacing: ".7px",
      color: "#94a2b4",
      fontWeight: "800",
      marginTop: "14px",
      textTransform: "uppercase",
    },
  },
  {
    ".material-card h4": {
      fontSize: "13px",
      color: "#31405b",
      margin: "6px 0 7px",
    },
  },
  {
    ".material-card p": {
      fontSize: "10px",
      color: "#9ba7b6",
      lineHeight: "1.5",
      flex: "1",
      marginBottom: "16px",
    },
  },
  {
    ".material-card-foot": {
      borderTop: "1px solid #edf0f5",
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
      color: "#94a3b7",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "55%",
    },
  },
  {
    ".material-card-foot a": {
      fontSize: "10px",
      color: "#5778eb",
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
      background: "#fff8e9",
      border: "1px solid #f9ecd1",
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
      background: "#fff0ce",
      color: "#d9a24b",
      borderRadius: "10px",
      flexShrink: "0",
    },
  },
  {
    ".errors-callout p": {
      fontSize: "11px",
      lineHeight: "1.65",
      color: "#a08b69",
      margin: "0",
    },
  },
  {
    ".errors-callout strong": {
      color: "#897047",
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
      border: "1px solid #ebeff5",
      background: "#fff",
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
      color: "#5875cf",
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
      color: "#364863",
    },
  },
  {
    ".note-source small": {
      fontSize: "10px",
      color: "#a6b0bf",
    },
  },
  {
    ".repeat-alert": {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      background: "#fff0e5",
      color: "#d98b4d",
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
      background: "#fff4f3",
      border: "1px solid #ffebe9",
      borderRadius: "9px",
      marginTop: "10px",
    },
  },
  {
    ".note-block>span": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#cc7c75",
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
      color: "#6b5c5c",
      margin: "9px 0 0",
      overflowWrap: "anywhere",
    },
  },
  {
    ".note-block.correct-block": {
      background: "#ecf9f3",
      borderColor: "#d8f4e7",
    },
  },
  {
    ".note-block.correct-block>span": {
      color: "#249b7c",
    },
  },
  {
    ".note-block.correct-block p": {
      color: "#436c60",
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
      borderBottom: "1px solid #ecf0f5",
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
      background: "#e9efff",
      color: "#5175ee",
    },
  },
  {
    ".settings-icon.teal": {
      background: "#e5f8f2",
      color: "#22ad8b",
    },
  },
  {
    ".settings-group-head h4": {
      margin: "0 0 5px",
      fontSize: "13px",
      color: "#35435c",
    },
  },
  {
    ".settings-group-head p": {
      fontSize: "11px",
      color: "#a1acbb",
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
      border: "1px solid #f2e5c9",
      background: "#fffaf0",
      padding: "19px",
      borderRadius: "12px",
      color: "#bd914d",
    },
  },
  {
    ".settings-security svg": {
      flexShrink: "0",
    },
  },
  {
    ".settings-security strong": {
      color: "#917143",
      fontSize: "12px",
    },
  },
  {
    ".settings-security p": {
      fontSize: "11px",
      color: "#a28c6c",
      lineHeight: "1.6",
      margin: "6px 0 0",
    },
  },
  {
    ".modal-overlay": {
      position: "fixed",
      inset: "0",
      background: "#0b1a30a6",
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
      background: "#fff",
      borderRadius: "17px",
      boxShadow: "0 25px 90px #07132455",
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
      borderBottom: "1px solid #eef1f5",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "10px",
    },
  },
  {
    ".modal-top h2": {
      color: "#22314d",
      fontSize: "18px",
      fontWeight: "800",
      margin: "0 0 5px",
    },
  },
  {
    ".modal-top p": {
      color: "#99a5b6",
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
      color: "#596982",
      fontSize: "11px",
      fontWeight: "800",
    },
  },
  {
    ".field input:not(.MuiInputBase-input),.field select:not(.MuiInputBase-input),.field textarea":
      {
        width: "100%",
        border: "1px solid #e3e9f2",
        background: "#fcfdff",
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
      color: "#9ca8ba",
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
      border: "1px solid #eaf0f7",
      background: "#f9fbff",
      padding: "13px",
      borderRadius: "9px",
    },
  },
  {
    ".form-check-row label,.checkbox-label": {
      fontSize: "12px",
      fontWeight: "650",
      color: "#5c6b86",
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
      borderTop: "1px solid #edf0f5",
      paddingTop: "19px",
      marginTop: "3px",
    },
  },
  {
    ".color-field": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "#7988a2",
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
      background: "#25364e",
      color: "#fff",
      boxShadow: "0 15px 45px #19233935",
      borderRadius: "10px",
      fontSize: "12px",
      fontWeight: "650",
    },
  },
  {
    ".toast-ok svg": {
      color: "#6ee8bb",
    },
  },
  {
    ".toast-error svg": {
      color: "#ffa3a9",
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
      color: "#c0c8d5",
      padding: "0",
    },
  },
  {
    ".api-error": {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      background: "#fff4f2",
      border: "1px solid #ffd8d0",
      color: "#cc6763",
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
      background: "#ffe3da",
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
      background: "linear-gradient(90deg,#e9edf5,#f8fbff,#e9edf5)",
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
        boxShadow: "10px 0 35px #0c172f32",
      },
      ".sidebar.nav-visible": {
        transform: "translateX(0)",
      },
      ".mobile-dim": {
        position: "fixed",
        inset: "0",
        background: "#0c172e7a",
        zIndex: "35",
      },
      ".nav-close": {
        display: "grid",
        placeItems: "center",
        border: "0",
        background: "transparent",
        color: "#a8b7ce",
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
      border: "1px solid #e7edf5",
      background: "#fafcff",
      padding: "9px 12px",
      borderRadius: "9px",
    },
  },
  {
    ".reorder-number": {
      fontSize: "11px",
      color: "#a1aec0",
      fontWeight: "800",
      width: "14px",
    },
  },
  {
    ".reorder-item>strong": {
      fontSize: "12px",
      color: "#53637e",
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
      "--accent": "#286f60",
      "--dark": "#223d39",
      "--muted": "#7b9089",
      "--border": "#e2ebe5",
      "--success": "#4eaa89",
      "--sidebar": "#183b34",
      "--soft": "#f4f8f5",
      fontFamily: '"Inter Variable", sans-serif',
      background: "#f5f8f4",
      color: "#243e38",
    },
  },
  {
    body: {
      background: "#f5f8f4",
      color: "#243e38",
    },
  },
  {
    a: {
      color: "#267663",
    },
  },
  {
    "input:not(.MuiInputBase-input)[type=checkbox]": {
      accentColor: "#327c6c",
    },
  },
  {
    "input:not(.MuiInputBase-input):focus,textarea:focus,select:not(.MuiInputBase-input):focus":
      {
        borderColor: "#62a48c !important",
        boxShadow: "0 0 0 3px #75b49b28 !important",
      },
  },
  {
    "button:focus-visible,a:focus-visible": {
      outline: "3px solid #e6b569",
      outlineOffset: "2px",
    },
  },
  {
    ".sidebar": {
      background: "linear-gradient(171deg,#1c443b 0%,#17372f 72%,#14342e 100%)",
      width: "246px",
      borderRight: "1px solid #234a3d",
      color: "#c7dbd2",
      boxShadow: "4px 0 24px #234d3614",
    },
  },
  {
    ".sidebar-overline": {
      margin: "0 18px 25px",
      border: "1px solid #42645b",
      background: "#ffffff08",
      color: "#b7ccc2",
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
      background: "#e9ba72",
      color: "#204738",
      boxShadow: "0 7px 22px #0e2f2a45",
    },
  },
  {
    ".brand-wordmark strong": {
      fontSize: "28px",
      fontWeight: "800",
      letterSpacing: "-1.35px",
      color: "#f6fcf9",
    },
  },
  {
    ".brand-wordmark strong span": {
      color: "#efc67e",
    },
  },
  {
    ".brand-wordmark small": {
      fontSize: "8px",
      letterSpacing: "1.6px",
      color: "#b4cabc",
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
      color: "#88b4a1",
      fontSize: "9px",
      letterSpacing: "1.55px",
    },
  },
  {
    ".nav-item": {
      color: "#d0e0d6",
      fontSize: "12px",
      minHeight: "43px",
      borderRadius: "11px",
      fontWeight: "650",
      gap: "11px",
    },
  },
  {
    ".nav-item:hover": {
      background: "#ffffff13",
      color: "white",
    },
  },
  {
    ".nav-item.selected": {
      background: "#f1f8ee",
      color: "#235448",
      boxShadow: "0 4px 15px #0c2a2422",
    },
  },
  {
    ".nav-item.selected svg": {
      color: "#2d806d",
    },
  },
  {
    ".nav-count": {
      background: "#e1a45f",
      color: "#213e36",
    },
  },
  {
    ".more-toggle": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 15px",
      border: "1px solid #456b5e55",
      borderRadius: "11px",
      color: "#b7d5c7",
      background: "#ffffff08",
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
      border: "1px solid #63887855",
      borderRadius: "16px",
      background: "linear-gradient(145deg,#35625388,#274c4199)",
      color: "#e9f8ee",
    },
  },
  {
    ".sidebar-hint svg": {
      color: "#f1bf7f",
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
      color: "#bfd7cb",
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
      background: "#ffffffdd",
      backdropFilter: "blur(20px)",
      padding: "0 38px",
      borderBottom: "1px solid #e1eae3",
    },
  },
  {
    ".topbar-path": {
      color: "#3a5449",
      fontWeight: "750",
    },
  },
  {
    ".topbar-path span": {
      color: "#9cb4a5",
      margin: "0 6px",
    },
  },
  {
    ".topbar-quick": {
      display: "inline-flex",
      alignItems: "center",
      gap: "9px",
      padding: "9px 14px",
      background: "#e9f4ee",
      border: "1px solid #d9e9db",
      color: "#286f60",
      fontSize: "11px",
      fontWeight: "800",
      borderRadius: "10px",
    },
  },
  {
    ".topbar-quick:hover": {
      background: "#def0e6",
    },
  },
  {
    ".edition-chip": {
      background: "#fff",
      border: "1px solid #e0e9e2",
      boxShadow: "none",
      color: "#708377",
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
      color: "#4f957c",
      letterSpacing: "1.7px",
      fontSize: "9px",
      marginBottom: "12px",
    },
  },
  {
    ".live-dot": {
      background: "#76bfa2",
      boxShadow: "0 0 0 4px #a3d8bd3d",
    },
  },
  {
    ".page-header h1": {
      fontSize: "29px",
      color: "#1e4036",
      marginBottom: "7px",
    },
  },
  {
    ".page-header p": {
      color: "#7a8f84",
      fontSize: "12px",
      lineHeight: "1.6",
    },
  },
  {
    ".footer": {
      color: "#91a497",
      borderColor: "#e1eae3",
    },
  },
  {
    ".panel,.simple-card,.home-metric,.note-card,.material-card,.metric-card": {
      border: "1px solid #e1eae2",
      background: "#fff",
      borderRadius: "17px",
      boxShadow: "0 8px 25px #32534408",
    },
  },
  {
    ".panel-heading h3,.simple-card h3": {
      color: "#2a4b40",
    },
  },
  {
    ".panel-heading p": {
      color: "#84998d",
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
      background: "#276e5d",
      color: "#fff",
      boxShadow: "0 5px 15px #276e5d29",
    },
  },
  {
    ".btn-primary:hover": {
      background: "#1e5e50",
      boxShadow: "0 7px 18px #276e5d31",
    },
  },
  {
    ".btn-subtle": {
      background: "#f3f8f4",
      borderColor: "#dce9df",
      color: "#416c5b",
    },
  },
  {
    ".btn-subtle:hover": {
      background: "#e7f2e9",
    },
  },
  {
    ".text-link,.metric-link,.plain-action": {
      color: "#287866",
    },
  },
  {
    ".small-chip": {
      color: "#557469",
      background: "#f3f8f4",
      borderColor: "#e0eae1",
    },
  },
  {
    ".row-link": {
      color: "#277a65",
      background: "#e9f6ee",
    },
  },
  {
    ".row-link:hover": {
      background: "#dbf0e3",
    },
  },
  {
    ".progress-track,.home-bar": {
      background: "#e9f1e9",
    },
  },
  {
    ".field-label": {
      color: "#546f60",
    },
  },
  {
    ".field input:not(.MuiInputBase-input),.field select:not(.MuiInputBase-input),.field textarea":
      {
        border: "1px solid #dce8dd",
        background: "#fcfefc",
        color: "#2c493d",
      },
  },
  {
    ".modal-panel": {
      borderRadius: "19px",
    },
  },
  {
    ".modal-overlay": {
      background: "#132d29b8",
    },
  },
  {
    ".modal-top h2": {
      color: "#214d3d",
    },
  },
  {
    ".toast": {
      background: "#1c493c",
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
      background: "linear-gradient(116deg,#244e40 0%,#347963 76%,#48947b 100%)",
      padding: "35px 37px",
      color: "#fff",
      boxShadow: "0 18px 35px #2e655137",
    },
  },
  {
    ".welcome-orbit": {
      position: "absolute",
      borderRadius: "50%",
      border: "1px solid #ffffff20",
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
      color: "#a8e3bf",
      fontSize: "10px",
      letterSpacing: "1.6px",
    },
  },
  {
    ".welcome-content h2": {
      fontSize: "30px",
      lineHeight: "1.27",
      letterSpacing: "-1.3px",
      color: "#fff",
      margin: "12px 0 11px",
    },
  },
  {
    ".welcome-content h2 span": {
      fontWeight: "600",
      color: "#e2f3e7",
    },
  },
  {
    ".welcome-content p": {
      fontSize: "12px",
      lineHeight: "1.75",
      color: "#d4e8de",
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
      background: "#f2c47e",
      color: "#24483a",
      boxShadow: "0 7px 14px #102d271e",
    },
  },
  {
    ".welcome-actions .btn-primary:hover": {
      background: "#ffe1a9",
    },
  },
  {
    ".welcome-outline": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid #d9f1df70",
      background: "#ffffff19",
      color: "#ecfff2",
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
      border: "1px solid #ffffff46",
      borderRadius: "19px",
      background: "#ffffffeb",
      color: "#254f40",
      zIndex: "1",
      marginLeft: "20px",
      boxShadow: "0 13px 35px #214d3d27",
    },
  },
  {
    ".welcome-calendar-icon": {
      display: "grid",
      placeItems: "center",
      background: "#e8f3e7",
      color: "#3b8165",
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
      color: "#749788",
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
      color: "#739184",
      fontWeight: "600",
    },
  },
  {
    ".welcome-today p": {
      fontSize: "10px",
      color: "#749082",
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
      color: "#2f8166",
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
      color: "#6da18a",
      fontSize: "9px",
      letterSpacing: "1.4px",
    },
  },
  {
    ".home-section-head h2": {
      fontSize: "20px",
      color: "#294b3c",
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
      borderColor: "#a3c7b4",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 24px #376b5120",
    },
  },
  {
    ".home-metric>span": {
      fontSize: "11px",
      color: "#729081",
      fontWeight: "700",
    },
  },
  {
    ".home-metric strong": {
      fontSize: "29px",
      lineHeight: "1.12",
      letterSpacing: "-.8px",
      color: "#203e33",
      whiteSpace: "nowrap",
    },
  },
  {
    ".home-metric small": {
      fontSize: "9px",
      color: "#8b9d91",
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
      background: "#5caa8a",
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
      background: "#e5f3e8",
      color: "#369a72",
    },
  },
  {
    ".metric-symbol.yellow": {
      background: "#fff0d9",
      color: "#b98c42",
    },
  },
  {
    ".metric-symbol.blue": {
      background: "#e8f0f9",
      color: "#5385a9",
    },
  },
  {
    ".metric-symbol.pink": {
      background: "#f9e8eb",
      color: "#b77083",
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
      color: "#829488",
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
      color: "#2c5947",
      lineHeight: "1.35",
    },
  },
  {
    ".focus-subtext": {
      display: "block",
      color: "#829588",
      marginTop: "5px",
      fontSize: "10px",
    },
  },
  {
    ".pill-counter": {
      borderRadius: "15px",
      background: "#e6f2e8",
      color: "#2e8662",
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
      background: "#f7faf6",
      border: "1px solid #e8efe8",
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
      border: "1px solid #9ebbad",
      borderRadius: "7px",
      color: "#2b7c60",
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
      color: "#375446",
      fontSize: "11px",
    },
  },
  {
    ".today-tasks small": {
      color: "#87988e",
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
      background: "#ebf2ed",
      overflow: "hidden",
    },
  },
  {
    ".week-mini-track span": {
      display: "block",
      width: "100%",
      background: "linear-gradient(#85c8a7,#3b8d72)",
      borderRadius: "8px",
    },
  },
  {
    ".week-mini-chart small": {
      fontSize: "9px",
      color: "#829a8a",
    },
  },
  {
    ".exam-reminder": {
      borderRadius: "14px",
      border: "1px solid #d9ebdc",
      color: "#5a816a",
      background: "#f1f7ef",
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
      color: "#337b61",
      fontSize: "11px",
      fontWeight: "800",
    },
  },
  {
    ".edital-upload-banner": {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      background: "linear-gradient(110deg,#e9f5e9,#f8fbf0)",
      border: "1px solid #d4e7d7",
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
      background: "#d8eee0",
      color: "#397b5f",
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
      color: "#244d3d",
      margin: "5px 0 6px",
    },
  },
  {
    ".edital-upload-banner .eyebrow": {
      fontSize: "9px",
      color: "#478d70",
      letterSpacing: "1.2px",
    },
  },
  {
    ".edital-upload-banner p": {
      fontSize: "11px",
      lineHeight: "1.65",
      color: "#698574",
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
      color: "#738a79",
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
      border: "2px dashed #a5cbb4",
      borderRadius: "17px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "10px",
      padding: "42px 22px",
      color: "#3d8064",
      background: "#f6fbf7",
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
      color: "#809787",
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
      border: "1px solid #dcece1",
      borderRadius: "12px",
      padding: "12px 15px",
      background: "#f8fbf8",
      color: "#408568",
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
      color: "#8a9d91",
    },
  },
  {
    ".edital-warning": {
      display: "flex",
      gap: "9px",
      alignItems: "flex-start",
      background: "#fff8e9",
      border: "1px solid #f0e3c2",
      borderRadius: "10px",
      padding: "11px",
      color: "#927143",
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
      color: "#83958a",
    },
  },
  {
    ".edital-preview-top strong": {
      color: "#468c6c",
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
      border: "1px solid #e1ebe4",
      background: "#fbfdfb",
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
      color: "#668473",
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
      border: "1px solid #dfe9df",
      background: "#fff",
      borderRadius: "19px",
      padding: "25px 26px",
    },
  },
  {
    ".weekly-hero h2": {
      fontSize: "19px",
      color: "#28503e",
      margin: "6px 0 8px",
    },
  },
  {
    ".weekly-hero p": {
      fontSize: "11px",
      color: "#799282",
      maxWidth: "690px",
      lineHeight: "1.7",
      margin: "0",
    },
  },
  {
    ".weekly-hero .eyebrow": {
      color: "#5a9b75",
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
      border: "1px solid #dfeadf",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },
  },
  {
    ".week-summary span": {
      fontSize: "10px",
      color: "#7d9486",
    },
  },
  {
    ".week-summary strong": {
      fontSize: "24px",
      lineHeight: "1",
      color: "#305b45",
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
      color: "#3e6552",
    },
  },
  {
    ".week-nav small": {
      fontSize: "9px",
      color: "#9cae9f",
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
      background: "#fff",
      border: "1px solid #dce6dc",
      fontSize: "11px",
      color: "#567562",
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
      border: "1px solid #e1ebe2",
      background: "#fff",
      borderRadius: "15px",
      minHeight: "245px",
      minWidth: "0",
      overflow: "hidden",
    },
  },
  {
    ".week-day.today": {
      borderColor: "#69ad8d",
      boxShadow: "0 0 0 2px #77b79b1b",
    },
  },
  {
    ".week-day-top": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #edf2ed",
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
      color: "#8ba193",
      fontWeight: "750",
    },
  },
  {
    ".week-day-top strong": {
      fontSize: "17px",
      color: "#335b47",
    },
  },
  {
    ".week-day.today .week-day-top": {
      background: "#eaf7ed",
    },
  },
  {
    ".week-add": {
      width: "24px",
      height: "24px",
      border: "0",
      background: "#f0f7f1",
      color: "#5a956c",
      borderRadius: "7px",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".week-add:hover": {
      background: "#d8eadc",
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
      color: "#b4c2b7",
      textAlign: "center",
      padding: "16px 0",
    },
  },
  {
    ".week-event": {
      borderLeft: "3px solid var(--event-color)",
      borderRadius: "9px",
      background: "#f7f9f6",
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
      border: "1px solid #b0c6b4",
      background: "white",
      width: "17px",
      height: "17px",
      flex: "0 0 17px",
      borderRadius: "5px",
      display: "grid",
      placeItems: "center",
      color: "#fff",
      padding: "0",
    },
  },
  {
    ".week-check.checked": {
      background: "#56a582",
      borderColor: "#56a582",
    },
  },
  {
    ".week-event-cat": {
      fontSize: "9px",
      color: "#809688",
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
      color: "#84a18d",
      padding: "0",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".week-event>strong": {
      fontSize: "11px",
      lineHeight: "1.36",
      color: "#385646",
      overflowWrap: "anywhere",
    },
  },
  {
    ".week-event>small": {
      fontSize: "9px",
      color: "#8da295",
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
      color: "#bb754e",
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
      background: "#f3f9f3",
      borderRadius: "10px",
      color: "#4c775d",
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
      filter: "drop-shadow(0 4px 7px #224c3720)",
    },
  },
  {
    ".nimbo-big": {
      maxWidth: "265px",
    },
  },
  {
    ".nimbo-float": {
      transformOrigin: "50% 80%",
      animation: "nimbo-idle 4.4s cubic-bezier(.39,.07,.49,.92) infinite",
    },
  },
  {
    ".nimbo-orbit": {
      transformOrigin: "150px 160px",
      animation: "nimbo-orbit 12s linear infinite",
    },
  },
  {
    ".nimbo-face": {
      animation: "nimbo-squint 5.2s infinite",
      transformOrigin: "150px 160px",
    },
  },
  {
    ".nimbo-crown": {
      transformOrigin: "154px 77px",
      animation: "nimbo-leaves 3s ease-in-out infinite",
    },
  },
  {
    ".nimbo-happy .nimbo-float": {
      animation: "nimbo-happy 2.7s ease-in-out infinite",
    },
  },
  {
    ".nimbo-sad .nimbo-float": {
      animation: "nimbo-sad 5.8s ease-in-out infinite",
    },
  },
  {
    ".nimbo-tired .nimbo-float": {
      animation: "nimbo-tired 6.6s ease-in-out infinite",
    },
  },
  {
    "@keyframes nimbo-idle": {
      "0%,100%": {
        transform: "translateY(0) rotate(-1deg) scale(1)",
      },
      "50%": {
        transform: "translateY(-9px) rotate(1.7deg) scale(1.016)",
      },
    },
  },
  {
    "@keyframes nimbo-happy": {
      "0%,100%": {
        transform: "translateY(0) rotate(-2deg)",
      },
      "50%": {
        transform: "translateY(-20px) rotate(3deg)",
      },
    },
  },
  {
    "@keyframes nimbo-sad": {
      "0%,100%": {
        transform: "translateY(4px) rotate(-2deg)",
      },
      "50%": {
        transform: "translateY(0) rotate(-4deg)",
      },
    },
  },
  {
    "@keyframes nimbo-tired": {
      "0%,100%": {
        transform: "translateY(8px) scaleY(.96)",
      },
      "50%": {
        transform: "translateY(3px) scaleY(.98)",
      },
    },
  },
  {
    "@keyframes nimbo-leaves": {
      "0%,100%": {
        transform: "rotate(-4deg)",
      },
      "50%": {
        transform: "rotate(6deg)",
      },
    },
  },
  {
    "@keyframes nimbo-orbit": {
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    },
  },
  {
    "@keyframes nimbo-squint": {
      "0%,42%,46%,91%,95%,100%": {
        transform: "scaleY(1)",
      },
      "44%,93%": {
        transform: "scaleY(.14)",
      },
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
      background: "#f7fbf6",
      border: "1px solid #d3e8d8",
      padding: "8px 13px 8px 8px",
      borderRadius: "18px",
      boxShadow: "0 10px 35px #284e3d33",
      color: "#2f674e",
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
      color: "#7b9a85",
    },
  },
  {
    ".nimbo-tab-avatar": {
      display: "block",
      width: "48px",
      height: "48px",
      overflow: "hidden",
      borderRadius: "13px",
      background: "linear-gradient(#d8efe1,#f1e8d1)",
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
      background: "#fff",
      borderRadius: "21px",
      border: "1px solid #d6e8da",
      overflow: "hidden",
      boxShadow: "0 18px 68px #1a41383f",
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
      background: "#edf5eb",
      borderBottom: "1px solid #dce8dc",
    },
  },
  {
    ".nimbo-live": {
      fontSize: "9px",
      letterSpacing: "1.4px",
      fontWeight: "850",
      color: "#448269",
      display: "flex",
      alignItems: "center",
      gap: "7px",
    },
  },
  {
    ".nimbo-live i": {
      width: "7px",
      height: "7px",
      background: "#65b88d",
      borderRadius: "50%",
      boxShadow: "0 0 0 3px #65b88d22",
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
      color: "#69917a",
      display: "grid",
      placeItems: "center",
    },
  },
  {
    ".nimbo-tool:hover": {
      background: "#dfeee2",
    },
  },
  {
    ".nimbo-habitat": {
      height: "175px",
      position: "relative",
      overflow: "hidden",
      background:
        "radial-gradient(ellipse at 50% 98%,#bad3ad 0%,#e3f0e1 40%,#cbe3d6 78%,#eaf4e8 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    ".nimbo-light": {
      position: "absolute",
      inset: "0",
      background:
        "radial-gradient(circle at 20% 10%,#ffffffc7,transparent 35%)",
    },
  },
  {
    ".nimbo-floor": {
      position: "absolute",
      zIndex: "1",
      width: "180px",
      height: "21px",
      bottom: "12px",
      background: "#2e775d38",
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
      filter: "drop-shadow(0 8px 8px #244f3a40)",
    },
  },
  {
    ".nimbo-star": {
      position: "absolute",
      color: "#fff6ca",
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
      color: "#2c5d49",
      margin: "0 0 2px",
    },
  },
  {
    ".nimbo-title small": {
      fontSize: "9px",
      color: "#91a698",
    },
  },
  {
    ".nimbo-mood": {
      border: "1px solid #dcebdd",
      borderRadius: "50px",
      padding: "5px 8px",
      color: "#598773",
      fontSize: "9px",
      background: "#f3f9f2",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-meter-label": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "9px",
      color: "#729080",
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
      color: "#547766",
    },
  },
  {
    ".nimbo-meter": {
      height: "6px",
      width: "100%",
      background: "#e7f0e9",
      borderRadius: "20px",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-meter i": {
      display: "block",
      height: "100%",
      background: "linear-gradient(90deg,#84c7a1,#49a27f)",
      borderRadius: "20px",
    },
  },
  {
    ".nimbo-meter.xp i": {
      background: "linear-gradient(90deg,#f1cc85,#e9a96e)",
    },
  },
  {
    ".nimbo-bubble": {
      borderRadius: "11px",
      display: "flex",
      gap: "9px",
      alignItems: "flex-start",
      background: "#f5f8f2",
      border: "1px solid #e5eee1",
      padding: "10px",
      marginTop: "13px",
      fontSize: "10px",
      lineHeight: "1.6",
      color: "#557264",
    },
  },
  {
    ".nimbo-bubble svg": {
      flexShrink: "0",
      color: "#74a180",
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
      background: "#f4faf4",
      border: "1px solid #deecdf",
      borderRadius: "9px",
      color: "#567b68",
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
      background: "#e5f3e7",
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
      border: "1px solid #dce8dc",
      borderRadius: "9px",
      padding: "9px",
      fontSize: "10px",
    },
  },
  {
    ".nimbo-chat button": {
      background: "#3a856d",
      color: "white",
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
      color: "#42816b",
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
      background: "#fff",
      border: "1px solid #d6e4d8",
      borderRadius: "12px",
      marginTop: "8px",
      padding: "13px",
      fontSize: "11px",
      lineHeight: "1.6",
      color: "#657e6f",
    },
  },
  {
    ".nimbo-picker": {
      background: "#fff",
      border: "1px solid #dceadd",
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
      color: "#295340",
      margin: "6px 0",
    },
  },
  {
    ".nimbo-picker p": {
      fontSize: "12px",
      color: "#82998a",
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
      border: "1px solid #e1ebe1",
      background: "#f9fbf8",
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
      borderColor: "#65ab87",
      background: "#ebf7eb",
      boxShadow: "0 0 0 2px #70bb9336",
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
      color: "#32634d",
    },
  },
  {
    ".nimbo-choice small": {
      fontSize: "9px",
      color: "#869e8c",
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
      background: "#eaf6e8",
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
      color: "#27523c",
    },
  },
  {
    ".nimbo-hero-card p": {
      fontSize: "12px",
      color: "#708a75",
    },
  },
  {
    ".nimbo-collection-banner": {
      background: "linear-gradient(120deg,#f1f8e9,#dff0e3)",
      border: "1px solid #d6e9d6",
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
      color: "#305340",
      fontSize: "21px",
      margin: "9px 0",
    },
  },
  {
    ".nimbo-collection-banner p": {
      color: "#708d7d",
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
      background: "#fff9",
      border: "1px solid #dfebdd",
      borderRadius: "12px",
      padding: "7px 10px",
      color: "#6d906f",
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
      background: "#fff",
      border: "1px solid #e0eadf",
      borderRadius: "15px",
      overflow: "hidden",
    },
  },
  {
    ".nimbo-collection-card.active": {
      borderColor: "#65ac8a",
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
      color: "#2c5540",
    },
  },
  {
    ".nimbo-collection-name span": {
      display: "flex",
      alignItems: "center",
      gap: "3px",
      fontSize: "9px",
      color: "#41916b",
    },
  },
  {
    ".nimbo-collection-info p": {
      fontSize: "10px",
      color: "#8a9d8e",
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
      color: "#8b946f",
      background: "#f8f8ea",
      border: "1px solid #efedd6",
      padding: "14px",
      borderRadius: "12px",
      fontSize: "11px",
    },
  },
  {
    ".section-intro h2,.section-toolbar,.edital-progress-main strong,.timer-digits,.review-hero h2,.settings-group-head h4":
      {
        color: "#2c5c45",
      },
  },
  {
    ".edital-progress-panel": {
      background: "linear-gradient(117deg,#ecf8ed,#e2f3e7)",
      borderColor: "#d9eadb",
    },
  },
  {
    ".edital-progress-panel .progress-fill": {
      background: "#4b9d76 !important",
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
      background: "#3a9777",
      borderColor: "#3a9777",
    },
  },
  {
    ".table-topic strong": {
      color: "#3b564a",
    },
  },
  {
    ".filter-select,.search-wrap": {
      borderColor: "#dce9de",
    },
  },
  {
    ".timer-face": {
      borderColor: "#e4efdf",
      background: "linear-gradient(160deg,#f3faf0,#ffffff)",
    },
  },
  {
    ".timer-icon": {
      color: "#538d6d",
      background: "#ebf5e8",
    },
  },
  {
    ".cycle-card.active": {
      borderColor: "#69ad8a",
      background: "#f1faf0",
    },
  },
  {
    ".cycle-next-label": {
      color: "#388b68",
    },
  },
  {
    ".focus-suggestion": {
      background: "#f2f8e8",
      borderColor: "#e0ecd3",
    },
  },
  {
    ".focus-symbol": {
      background: "#e2f0d4",
      color: "#62925a",
    },
  },
  {
    ".tip": {
      background: "#f0f7ed",
      borderColor: "#dcebd9",
      color: "#628069",
    },
  },
  {
    ".tip svg": {
      color: "#4e9574",
    },
  },
  {
    ".stats-panel,.analytics-section": {
      borderColor: "#e1ebe3",
    },
  },
  {
    ".analytics-view .panel": {
      background: "#fff",
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
        boxShadow: "0 12px 45px #17372e4d",
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
      "--accent": "#287b63",
      "--dark": "#234137",
      "--muted": "#657d70",
      "--border": "#dce7dd",
      "--success": "#2a9673",
      "--soft": "#f5f9f5",
    },
  },
  {
    body: {
      fontSize: "15px",
      lineHeight: "1.55",
      background: "#f5f8f5",
      color: "#253e35",
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
        color: "#84968d",
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
      outline: "3px solid #edb66e",
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
        borderColor: "#dce7dd",
        boxShadow: "0 4px 16px #193e290a",
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
      color: "#254637",
      marginBottom: "4px",
    },
  },
  {
    ".nimbo-theme .panel-heading p": {
      fontSize: "13px",
      lineHeight: "1.55",
      color: "#71857a",
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
      color: "#587363",
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
      color: "#3f5e4f",
      fontWeight: "750",
    },
  },
  {
    ".nimbo-theme .field-hint": {
      fontSize: "12px",
      color: "#647e70",
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
      color: "#546e60",
      background: "#f5f9f5",
      lineHeight: "1.4",
    },
  },
  {
    ".nimbo-theme .data-table td": {
      fontSize: "13px",
      lineHeight: "1.5",
      color: "#486255",
      padding: "14px 13px",
      verticalAlign: "middle",
    },
  },
  {
    ".nimbo-theme .data-table strong": {
      fontSize: "13px",
      color: "#2b4b3d",
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
        color: "#728679",
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
      border: "1px solid #e6eee7",
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
      color: "#678173",
      minHeight: "0",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .mini-metric>strong": {
      gridColumn: "2",
      fontSize: "clamp(23px,2.1vw,31px)",
      lineHeight: "1.2",
      color: "#234637",
      minWidth: "0",
      overflowWrap: "anywhere",
      margin: "2px 0",
    },
  },
  {
    ".nimbo-theme .mini-metric>small": {
      gridColumn: "2",
      fontSize: "12px",
      color: "#6c8576",
      minWidth: "0",
      margin: "0",
    },
  },
  {
    ".metric-split": {
      fontSize: ".69em",
      color: "#9c675d",
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
      color: "#2e5040",
    },
  },
  {
    ".nimbo-theme .performance-info span": {
      fontSize: "12px",
      color: "#698375",
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
      color: "#617b6b",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .performance-counts b": {
      color: "#2c5140",
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
      color: "#6f8376",
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
      color: "#654c4a",
    },
  },
  {
    ".nimbo-theme .note-block.correct-block p": {
      color: "#375d4d",
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
      color: "#466454",
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
        border: "1px solid #dce8de",
        borderRadius: "10px",
        background: "#fbfdfb",
        color: "#244639",
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
      borderTop: "1px solid #e8eee9",
      paddingTop: "13px",
      color: "#687f71",
      fontSize: "13px",
    },
  },
  {
    ".filter-foot strong": {
      color: "#28583f",
    },
  },
  {
    ".nimbo-theme .btn-danger-outline": {
      background: "#fffaf9",
      color: "#9d5049",
      border: "1px solid #ebcac5",
      boxShadow: "none",
    },
  },
  {
    ".nimbo-theme .btn-danger-outline:hover": {
      background: "#fff0ee",
      color: "#933c36",
    },
  },
  {
    ".nimbo-theme .btn-danger": {
      background: "#b2463c",
      color: "white",
      border: "1px solid #a63d35",
    },
  },
  {
    ".nimbo-theme .btn-danger:hover": {
      background: "#962f27",
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
      border: "1px solid #ecc8c2",
      background: "#fff5f3",
      marginBottom: "19px",
      color: "#8c3d35",
    },
  },
  {
    ".danger-explanation svg": {
      flex: "0 0 auto",
    },
  },
  {
    ".danger-explanation strong": {
      color: "#813a32",
      fontSize: "14px",
    },
  },
  {
    ".danger-explanation p": {
      fontSize: "13px",
      margin: "7px 0 0",
      color: "#81554e",
    },
  },
  {
    ".maintenance-details summary": {
      cursor: "pointer",
      fontWeight: "750",
      color: "#2d6a55",
      fontSize: "14px",
      padding: "12px",
      border: "1px solid #dae9de",
      borderRadius: "10px",
      background: "#f7fbf8",
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
      border: "1px solid #e4ece5",
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
      color: "#284c3a",
    },
  },
  {
    ".maintenance-option span,.maintenance-hint": {
      fontSize: "12px",
      color: "#657c6d",
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
      color: "#698274",
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
      border: "1px solid #dce7dd",
      borderRadius: "17px",
      background: "white",
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
      color: "#274c3b",
      margin: "5px 0 0",
    },
  },
  {
    ".insight-card header p": {
      fontSize: "13px",
      color: "#687f71",
      margin: "8px 0 0",
      lineHeight: "1.6",
    },
  },
  {
    ".insight-card .eyebrow": {
      fontSize: "11px",
      color: "#559878",
      letterSpacing: ".6px",
    },
  },
  {
    ".insight-link": {
      background: "none",
      border: "0",
      color: "#27785e",
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
      color: "#315540",
      overflowWrap: "anywhere",
      maxWidth: "55%",
    },
  },
  {
    ".coverage-top span": {
      fontSize: "12px",
      color: "#657f71",
      textAlign: "right",
    },
  },
  {
    ".coverage-top b": {
      marginLeft: "8px",
      color: "#285942",
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
      color: "#547260",
    },
  },
  {
    ".stage-line strong": {
      fontSize: "14px",
      color: "#2c5c42",
      whiteSpace: "nowrap",
    },
  },
  {
    ".data-footnote": {
      fontSize: "12px",
      lineHeight: "1.6",
      color: "#74897a",
      marginTop: "22px",
      borderTop: "1px solid #e9f0ea",
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
      color: "#687f71",
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
      background: "#3e9c7b",
    },
  },
  {
    ".legend-wrong": {
      background: "#e49b80",
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
      color: "#3e5b4a",
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
      background: "#f0f4f0",
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
      background: "#3e9c7b",
    },
  },
  {
    ".stacked-wrong": {
      background: "#e49b80",
    },
  },
  {
    ".correct-error-row>strong": {
      fontSize: "12px",
      color: "#2d6250",
      textAlign: "right",
      whiteSpace: "nowrap",
    },
  },
  {
    ".correct-error-row>strong em": {
      fontWeight: "400",
      color: "#9cafa2",
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
      background: "#f2f7f3",
      border: "1px solid #e5eee7",
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
      color: "#687d6f",
    },
  },
  {
    ".review-overview strong": {
      fontSize: "25px",
      color: "#265e46",
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
      color: "#657d6c",
    },
  },
  {
    ".review-week-list>div strong": {
      textAlign: "right",
      color: "#346b50",
    },
  },
  {
    ".review-day-track": {
      height: "10px",
      background: "#e9f0e9",
      borderRadius: "10px",
      overflow: "hidden",
    },
  },
  {
    ".review-day-track i": {
      display: "block",
      height: "100%",
      borderRadius: "10px",
      background: "#71af91",
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
      border: "1px solid #e7eee8",
      borderRadius: "11px",
      padding: "12px",
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      color: "#617a6b",
    },
  },
  {
    ".question-summary-line strong": {
      fontSize: "19px",
      color: "#2c6147",
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
      background:
        "repeating-linear-gradient(to top,#e6eee8 0 1px,transparent 1px 30px)",
      borderBottom: "1px solid #d3e3d7",
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
      background: "#e49b80",
      overflow: "hidden",
      minHeight: "0",
    },
  },
  {
    ".trend-correct": {
      background: "#3e9c7b",
      display: "block",
      width: "100%",
    },
  },
  {
    ".trend-column small": {
      fontSize: "11px",
      color: "#657d6d",
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
      color: "#6a8271",
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
      background: "#edf5ed",
      border: "1px solid #d9e9df",
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
      color: "#597c6a",
      fontWeight: "750",
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontSize: "13px",
    },
  },
  {
    ".planner-switch button.active": {
      background: "#fff",
      color: "#245c44",
      boxShadow: "0 2px 8px #1e58321a",
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
      border: "1px solid #dde9df",
      background: "#fff",
    },
  },
  {
    ".planner-month-grid": {
      minWidth: "790px",
      display: "grid",
      gridTemplateColumns: "repeat(7,minmax(0,1fr))",
      gap: "1px",
      background: "#e8f0ea",
    },
  },
  {
    ".planner-month-weekday": {
      padding: "12px",
      background: "#f1f7f1",
      textAlign: "center",
      color: "#4d705c",
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
      background: "#fff",
      transition: "background .15s",
    },
  },
  {
    ".planner-month-day:hover,.planner-month-day:focus-visible": {
      background: "#eff8f0",
    },
  },
  {
    ".planner-month-day.outside": {
      background: "#fafcf9",
      color: "#a8b9ad",
    },
  },
  {
    ".planner-month-day.today": {
      background: "#eff8f0",
      boxShadow: "inset 0 0 0 2px #5da785",
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
      color: "#365f47",
      borderRadius: "8px",
    },
  },
  {
    ".planner-month-day.today .month-day-top strong": {
      background: "#317e5f",
      color: "#fff",
    },
  },
  {
    ".planner-month-day .month-day-top small": {
      fontSize: "11px",
      color: "#688874",
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
      background: "#f3f7f3",
      color: "#355443",
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
      color: "#547960",
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
      border: "1px solid #e2ede4",
      borderLeft: "4px solid var(--event-color)",
      background: "#fcfefc",
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
      color: "#2d503d",
      lineHeight: "1.45",
      overflowWrap: "anywhere",
    },
  },
  {
    ".planner-day-item span": {
      fontSize: "12px",
      color: "#668274",
    },
  },
  {
    ".planner-day-item p": {
      margin: "4px 0 0",
      fontSize: "12px",
      color: "#5a7564",
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
      color: "#668171",
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
      color: "#668274",
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
      color: "#28563f",
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
      color: "#245c43",
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
      color: "#6e8375",
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
      "--ui-ink": "#244536",
      "--ui-muted": "#597467",
      "--ui-border": "#dce9df",
      "--ui-soft": "#f6faf6",
      "--ui-green": "#287758",
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
        color: "#657c6e",
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
      color: "#2b624c",
      background: "#f4f9f4",
      border: "1px solid #d5e5d8",
    },
  },
  {
    ".nimbo-theme .btn-primary": {
      color: "#fff",
      background: "#287a5b",
      border: "1px solid #287a5b",
    },
  },
  {
    ".nimbo-theme .btn:focus-visible,.nimbo-theme button:focus-visible,.nimbo-theme select:not(.MuiInputBase-input):focus-visible,.nimbo-theme input:not(.MuiInputBase-input):focus-visible":
      {
        outline: "3px solid #8bcdb0",
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
        color: "#284d3a",
        background: "#fff",
        border: "1px solid #d8e6dc",
        borderRadius: "10px",
      },
  },
  {
    ".nimbo-theme .search-wrap input:not(.MuiInputBase-input)": {
      fontSize: "14px",
      minHeight: "40px",
      color: "#284d3a",
    },
  },
  {
    ".nimbo-theme .data-table th": {
      fontSize: "12px",
      letterSpacing: ".4px",
      padding: "13px 14px",
      color: "#526c5a",
      background: "#f5f9f5",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .data-table td": {
      fontSize: "14px",
      padding: "14px",
      color: "#355645",
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
      background: "white",
      boxShadow: "0 4px 12px #2c50350a",
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
      background: "#e9f3ed",
      color: "#2d8462",
    },
  },
  {
    ".nimbo-theme .vault-metrics>div>strong": {
      gridArea: "value",
      fontSize: "29px",
      fontWeight: "800",
      lineHeight: "1.1",
      color: "#244f3a",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .vault-metrics>div>span": {
      gridArea: "label",
      fontSize: "14px",
      fontWeight: "600",
      color: "#567362",
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
      color: "#4e8167",
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
      border: "1px solid #dce9df",
      borderRadius: "15px",
      background: "white",
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
      background: "#eff6ef",
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
      color: "#51846a",
    },
  },
  {
    ".nimbo-theme .vault-card-foot>button": {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      border: "0",
      background: "none",
      color: "#267b59",
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
      background: "#fff",
      minWidth: "0",
      minHeight: "160px",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div svg": {
      color: "#348261",
    },
  },
  {
    ".nimbo-theme .analytics-kpis>div>span": {
      fontSize: "14px",
      color: "#557260",
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
      color: "#627e6b",
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
      background: "#edf2ec",
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
      border: "1px solid #dce9df",
      borderRadius: "15px",
      padding: "19px",
      minWidth: "0",
      background: "linear-gradient(180deg,#fff,#fbfdfb)",
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
      color: "#3e5547",
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
      color: "#587261",
      background: "#f2f8f2",
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
      color: "#597362",
      minWidth: "0",
    },
  },
  {
    ".nimbo-theme .radar-rating>span b": {
      display: "block",
      color: "#25523c",
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
      color: "#2b7051",
      background: "#eff7f0",
      border: "1px solid #cfe4d4",
      borderRadius: "10px",
      minHeight: "42px",
      padding: "9px 13px",
    },
  },
  {
    ".nimbo-theme .radar-edit:hover": {
      background: "#e0f0e4",
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
      background: "#f4faf4",
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
      border: "1px solid #cfe1d3",
      borderRadius: "10px",
      color: "#286849",
      background: "#f7fbf7",
      fontWeight: "800",
      fontSize: "15px",
    },
  },
  {
    ".nimbo-theme .rating-options button.selected": {
      background: "#2d8460",
      color: "#fff",
      borderColor: "#2d8460",
    },
  },
  {
    ".nimbo-theme .rating-field": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "15px",
      flexWrap: "wrap",
      borderBottom: "1px solid #e4eee6",
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
      background: "#f2f8ef",
      border: "1px solid #d5e6d5",
      borderRadius: "12px",
      padding: "17px",
      color: "#476a52",
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
      border: "1px solid #d8e9d1",
      borderRadius: "16px",
      background: "#f1f8e9",
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
      color: "#548e61",
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
      color: "#608978",
      letterSpacing: ".7px",
      lineHeight: "1.5",
    },
  },
  {
    ".nimbo-theme .focus-suggestion strong": {
      fontSize: "17px",
      color: "#2b573f",
      lineHeight: "1.4",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .focus-suggestion small": {
      fontSize: "13px",
      lineHeight: "1.5",
      color: "#557662",
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
      color: "#65816d",
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
      color: "#51705a",
      marginTop: "9px",
    },
  },
  {
    ".nimbo-theme .week-chart-total strong": {
      fontSize: "14px",
      color: "#24553e",
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
      background: "#fff",
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
      color: "#53705e",
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
      color: "#657b6b",
    },
  },
  {
    ".nimbo-theme .summary-icon": {
      width: "36px",
      height: "36px",
      display: "grid",
      placeItems: "center",
      borderRadius: "11px",
      background: "#e8f5ea",
      color: "#33845d",
    },
  },
  {
    ".nimbo-theme .summary-icon.blue": {
      background: "#e9f1fb",
      color: "#4b86a7",
    },
  },
  {
    ".nimbo-theme .summary-icon.sand": {
      background: "#fff2de",
      color: "#a98245",
    },
  },
  {
    ".nimbo-theme .summary-icon.rose": {
      background: "#fceced",
      color: "#b57477",
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
      border: "1px solid #d7e9dc",
      background: "#f2f9f3",
      color: "#436a50",
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
      color: "#466450",
    },
  },
  {
    ".nimbo-theme .sheet-filter select:not(.MuiInputBase-input)": {
      height: "44px",
      minWidth: "0",
      width: "100%",
      border: "1px solid #d7e7db",
      borderRadius: "9px",
      padding: "0 8px",
      color: "#2b523b",
      background: "#fff",
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
      scrollbarColor: "#adcdb7 #edf4ee",
      overscrollBehaviorX: "contain",
      borderTop: "1px solid #e0eae0",
      borderBottom: "1px solid #e0eae0",
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
      background: "#eaf3eb",
      borderBottom: "1px solid #d2e1d5",
      color: "#325541",
    },
  },
  {
    ".nimbo-theme .edital-sheet td": {
      whiteSpace: "nowrap",
      padding: "12px 10px",
      borderBottom: "1px solid #e9eee9",
      background: "#fff",
      verticalAlign: "middle",
      fontSize: "13px",
    },
  },
  {
    ".nimbo-theme .edital-sheet tbody tr:hover td": {
      background: "#f9fcf9",
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
      borderRight: "1px solid #dbe8dc",
      boxShadow: "5px 0 8px -6px #1a49313f",
    },
  },
  {
    ".nimbo-theme .edital-sheet th.sheet-sticky": {
      zIndex: "3",
      background: "#eaf3eb",
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
      color: "#2b583c",
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
      color: "#254b37",
      lineHeight: "1.45",
    },
  },
  {
    ".nimbo-theme .sheet-topic-copy small": {
      fontSize: "12px",
      color: "#738877",
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
      border: "1px solid #d6e6da",
      borderRadius: "8px",
      padding: "7px 9px",
      background: "#fff",
      minHeight: "37px",
      color: "#69826d",
      fontSize: "12px",
      fontWeight: "650",
    },
  },
  {
    ".nimbo-theme .study-check.is-checked,.nimbo-theme .review-check.is-checked":
      {
        background: "#e7f5eb",
        color: "#287550",
        borderColor: "#8ac5a0",
      },
  },
  {
    ".nimbo-theme .study-check-square": {
      display: "grid",
      placeItems: "center",
      width: "18px",
      height: "18px",
      flex: "0 0 18px",
      border: "1.5px solid #9fb7a6",
      borderRadius: "5px",
      background: "#fff",
      color: "#fff",
    },
  },
  {
    ".nimbo-theme .is-checked>.study-check-square": {
      background: "#2b8962",
      borderColor: "#2b8962",
    },
  },
  {
    ".nimbo-theme .review-check.is-overdue": {
      background: "#fff5ed",
      borderColor: "#eac6ad",
      color: "#8a5a35",
    },
  },
  {
    ".nimbo-theme .review-blank": {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      color: "#91a59a",
      fontSize: "12px",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .review-blank-circle": {
      width: "17px",
      height: "17px",
      border: "1.5px dashed #adc4b1",
      borderRadius: "5px",
    },
  },
  {
    ".nimbo-theme .sheet-num": {
      fontVariantNumeric: "tabular-nums",
      textAlign: "center",
      fontWeight: "750",
      color: "#324d3c",
    },
  },
  {
    ".nimbo-theme .sheet-good": {
      color: "#2d8a58",
    },
  },
  {
    ".nimbo-theme .sheet-wrong": {
      color: "#b6685a",
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
      color: "#387856",
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
      background: "#f3faf4",
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
      color: "#2e6146",
      margin: "0 0 10px",
    },
  },
  {
    ".nimbo-theme .sheet-detail p": {
      fontSize: "13px",
      lineHeight: "1.65",
      margin: "3px 0",
      color: "#4c7059",
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
      color: "#5d7865",
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
      border: "1px solid #cfdfd2",
      borderRadius: "8px",
      padding: "5px 9px",
      color: "#31593d",
      background: "#fff",
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
      border: "2px dashed #b9d8c3",
      background: "#f6fbf6",
      borderRadius: "14px",
      color: "#386950",
    },
  },
  {
    ".nimbo-theme .vault-upload-zone strong": {
      fontSize: "16px",
      color: "#315940",
    },
  },
  {
    ".nimbo-theme .vault-upload-zone small": {
      fontSize: "13px",
      color: "#698574",
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
      color: "#809587",
      fontSize: "13px",
      padding: "5px",
    },
  },
  {
    ".nimbo-theme .vault-or:before,.nimbo-theme .vault-or:after": {
      content: '""',
      flex: "1",
      height: "1px",
      background: "#dce8df",
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
      background: "#245c48dd",
      color: "#fff",
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
      background: "#f3f8f3",
      border: "1px solid #dce9df",
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
      border: "1px solid #dce9df",
      borderRadius: "11px",
    },
  },
  {
    ".nimbo-theme .reader-image": {
      display: "block",
      maxWidth: "100%",
      maxHeight: "65vh",
      objectFit: "contain",
      border: "1px solid #dce9df",
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
      background: "#f7faf6",
      borderRadius: "13px",
      textAlign: "center",
      padding: "24px",
    },
  },
  {
    ".nimbo-theme .reader-empty h3": {
      fontSize: "17px",
      color: "#38624c",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .reader-empty p": {
      fontSize: "14px",
      color: "#627c6a",
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
      background: "#f8fbf7",
      border: "1px solid #dce9df",
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
      color: "#315a43",
    },
  },
  {
    ".nimbo-theme .reader-notes textarea": {
      width: "100%",
      padding: "12px",
      borderRadius: "9px",
      border: "1px solid #ccddcf",
      minHeight: "125px",
    },
  },
  {
    ".nimbo-theme .docx-editor": {
      display: "flex",
      flexDirection: "column",
      gap: "11px",
      border: "1px solid #dce9df",
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
      border: "1px solid #d6e5da",
      borderRadius: "8px",
    },
  },
  {
    ".nimbo-theme .docx-editor p,.nimbo-theme .reader-notes p": {
      fontSize: "13px",
      lineHeight: "1.6",
      color: "#607867",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .reader-aside": {
      border: "1px solid #dce9df",
      background: "#f8fbf7",
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
      color: "#315940",
      margin: "0",
    },
  },
  {
    ".nimbo-theme .reader-aside>small": {
      fontSize: "13px",
      color: "#728678",
    },
  },
  {
    ".nimbo-theme .reader-check": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      fontSize: "14px",
      color: "#385743",
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
      border: "1px solid #d4e5d9",
      borderRadius: "12px",
      background: "#f7fbf7",
      padding: "16px",
      outlineOffset: "3px",
    },
  },
  {
    ".nimbo-theme .screenshot-input:focus-visible": {
      outline: "3px solid #92c9a5",
    },
  },
  {
    ".nimbo-theme .screenshot-title": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "12px",
      color: "#2e6348",
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
      color: "#5e7c67",
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
        background: "#e8f5ed",
        color: "#286c4a",
        border: "1px solid #c5dfcc",
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
      background: "#fff",
      border: "1px solid #d4e4d8",
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
      border: "1px solid #d5e7d9",
      background: "#f5faf5",
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
      color: "#3f7558",
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
      color: "#9f433e",
      background: "#fff1ef",
      border: "1px solid #f1d2cd",
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
      color: "#86998c",
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
      color: "#567567",
      fontSize: "13px",
      lineHeight: "1.5",
      whiteSpace: "nowrap",
    },
  },
  {
    ".nimbo-theme .time-split b": {
      fontSize: "13px",
      color: "#214e3e",
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
      background: "#4e9785",
    },
  },
  {
    ".nimbo-theme .time-dot.questions": {
      background: "#ecae60",
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
      background: "#4e9785",
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
      background: "#ecae60",
    },
  },
  {
    ".nimbo-theme .study-type": {
      display: "inline-flex",
      padding: "5px 9px",
      borderRadius: "7px",
      fontSize: "12px",
      fontWeight: "700",
      background: "#eaf5f1",
      color: "#286a58",
    },
  },
  {
    ".nimbo-theme .study-type.questions": {
      background: "#fff2e1",
      color: "#946023",
    },
  },
  {
    ".nimbo-theme .question-focus-panel": {
      display: "grid",
      gridTemplateColumns: "minmax(220px,1fr) auto auto",
      alignItems: "center",
      gap: "20px",
      background: "#fff",
      border: "1px solid #dce9e0",
      borderRadius: "18px",
      padding: "19px 22px",
      boxShadow: "0 4px 24px rgba(28,77,51,.035)",
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
      color: "#28755b",
    },
  },
  {
    ".nimbo-theme .question-focus-title h3": {
      fontSize: "17px",
      fontWeight: "800",
      color: "#224e3a",
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
      color: "#6c8777",
      fontWeight: "700",
    },
  },
  {
    ".nimbo-theme .question-topic-picker select:not(.MuiInputBase-input)": {
      width: "100%",
      minHeight: "42px",
      fontSize: "14px",
      border: "1px solid #dbe9df",
      borderRadius: "10px",
      background: "#f9fcfa",
      padding: "8px",
      color: "#264e3b",
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
      color: "#194e3a",
      fontVariantNumeric: "tabular-nums",
      lineHeight: "1.1",
    },
  },
  {
    ".nimbo-theme .question-focus-clock>span": {
      fontSize: "12px",
      color: "#809387",
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
      border: "1px solid #e1eae4",
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
      background: "#fff",
      padding: "18px",
      border: "1px solid #e0ebe3",
      borderRadius: "14px",
    },
  },
  {
    ".nimbo-theme .question-stat-grid span": {
      fontSize: "13px",
      color: "#688675",
      fontWeight: "650",
    },
  },
  {
    ".nimbo-theme .question-stat-grid strong": {
      fontSize: "clamp(23px,2.1vw,30px)",
      lineHeight: "1.2",
      fontWeight: "800",
      letterSpacing: "-.025em",
      color: "#224f3c",
      overflowWrap: "anywhere",
    },
  },
  {
    ".nimbo-theme .question-stat-grid em": {
      fontWeight: "600",
      color: "#9b8473",
      fontStyle: "normal",
    },
  },
  {
    ".nimbo-theme .question-record-time": {
      background: "#eef8f2",
      border: "1px solid #d7e9dd",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "12px 14px",
      borderRadius: "10px",
      color: "#2f765b",
      fontSize: "14px",
    },
  },
  {
    ".nimbo-theme .question-record-time strong": {
      fontSize: "18px",
      color: "#1e6244",
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
      border: "1px solid #e0ebe3",
      borderRadius: "15px",
      background: "#fff",
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
      color: "#285a42",
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
      color: "#6a8b76",
    },
  },
  {
    ".nimbo-theme .dashboard-deep>summary:after": {
      content: '"⌄"',
      color: "#497e62",
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
      "--ux-ink": "#1e3c33",
      "--ux-muted": "#62776e",
      "--ux-green": "#26745b",
      "--ux-border": "#dce8de",
      "--ux-canvas": "#f5f8f5",
      "--ux-shadow": "0 8px 26px rgba(29,66,46,.045)",
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
        outline: "3px solid #72ad98 !important",
        outlineOffset: "3px",
      },
  },
  {
    ".ux-v54 .sidebar": {
      width: "244px",
      background: "#173a32",
      color: "#d5e5d9",
      borderRight: "1px solid #174333",
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
      background: "#2c8166",
      color: "white",
      boxShadow: "none",
    },
  },
  {
    ".ux-v54 .brand-wordmark strong": {
      fontSize: "26px",
      color: "white",
      letterSpacing: "-1px",
    },
  },
  {
    ".ux-v54 .brand-wordmark small": {
      fontSize: "10px",
      color: "#a4cbb9",
      letterSpacing: "1px",
    },
  },
  {
    ".ux-v54 .brand-wordmark strong span": {
      color: "#b0e4c1",
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
      color: "#8fbdac",
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
      color: "#bfd5c9",
      borderRadius: "11px",
      gap: "12px",
      fontWeight: "600",
      transition: "background .16s,color .16s",
    },
  },
  {
    ".ux-v54 .nav-item:hover": {
      background: "#285145",
      color: "white",
    },
  },
  {
    ".ux-v54 .nav-item.selected": {
      background: "#31765d",
      boxShadow: "none",
      color: "#fff",
      fontWeight: "800",
    },
  },
  {
    ".ux-v54 .nav-item.selected svg": {
      color: "#fff",
    },
  },
  {
    ".ux-v54 .nav-count": {
      background: "#e3aa65",
      color: "#352410",
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
      color: "#b5d1c3",
      border: "0",
      padding: "13px 12px",
      borderTop: "1px solid #315549",
      borderRadius: "0",
      fontSize: "14px",
      fontWeight: "700",
    },
  },
  {
    ".ux-v54 .more-toggle:hover": {
      color: "white",
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
      background: "#234d3f",
      color: "#d8e8df",
      border: "1px solid #36624f",
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
      background: "#fff",
      borderBottom: "1px solid var(--ux-border)",
      padding: "0 36px",
    },
  },
  {
    ".ux-v54 .topbar-path": {
      color: "#516d5f",
      fontSize: "14px",
      fontWeight: "650",
    },
  },
  {
    ".ux-v54 .topbar-path span": {
      padding: "0 5px",
      color: "#acc0b3",
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
      background: "#f6faf6",
      border: "1px solid #e1ebe3",
      borderRadius: "10px",
      padding: "9px 12px",
      minHeight: "38px",
      color: "#426b56",
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
      color: "#577265",
      background: "#f9fbf9",
      border: "1px solid #e1ebe3",
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
      color: "#1d4034",
    },
  },
  {
    ".ux-v54 .view-stack": {
      gap: "18px",
    },
  },
  {
    ".ux-v54 .panel,.ux-v54 .simple-card,.ux-v54 .insight-card,.ux-v54 .question-focus-panel":
      {
        border: "1px solid var(--ux-border)",
        background: "#fff",
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
      color: "#527363",
      background: "#f3f8f3",
      border: "1px solid #dfe8de",
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
      background: "#277459",
      color: "#fff",
    },
  },
  {
    ".ux-v54 .btn-primary:hover": {
      background: "#1a5d44",
      boxShadow: "0 5px 14px rgba(39,116,89,.15)",
    },
  },
  {
    ".ux-v54 .btn-subtle": {
      background: "#f7faf7",
      color: "#355b47",
      borderColor: "#dce8df",
    },
  },
  {
    ".ux-v54 .btn-subtle:hover": {
      background: "#edf5ee",
    },
  },
  {
    ".ux-v54 .icon-button": {
      minWidth: "36px",
      minHeight: "36px",
      color: "#537362",
    },
  },
  {
    ".ux-v54 .text-link,.ux-v54 .plain-action": {
      fontSize: "14px",
      color: "#26765b",
    },
  },
  {
    ".ux-v54 :is(.field-label,.sheet-filter>span,.filter-item>span,.question-topic-picker>span)":
      {
        fontSize: "13px",
        fontWeight: "700",
        color: "#426757",
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
        color: "#244737",
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
      background: "#fbfdfb",
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
      color: "#566f60",
      background: "#f5f9f5",
    },
  },
  {
    ".ux-v54 .data-table td": {
      fontSize: "13px",
      lineHeight: "1.45",
      padding: "13px 14px",
      color: "#355447",
    },
  },
  {
    ".ux-v54 .data-table td strong": {
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .data-table tbody tr:hover": {
      background: "#f7faf8",
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
      color: "#456d55",
    },
  },
  {
    ".ux-v54 .toolbar-info svg": {
      color: "#3b8668",
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
      color: "#326a53",
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
      borderTop: "1px solid #e9f0eb",
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
      background: "#fff",
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
      color: "#2c6048",
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
      color: "#398363",
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
      color: "#7e9987",
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
      color: "#60766b",
      padding: "3px 5px",
    },
  },
  {
    ".ux-v54 .ux-inline-help summary": {
      cursor: "pointer",
      color: "#37775e",
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
      background: "#fff",
      minWidth: "0",
    },
  },
  {
    ".ux-v54 .vault-metrics>div svg": {
      color: "#338365",
      flex: "none",
    },
  },
  {
    ".ux-v54 .vault-metrics strong": {
      fontSize: "24px",
      lineHeight: "1.1",
      color: "#214a38",
    },
  },
  {
    ".ux-v54 .vault-metrics>div span": {
      width: "100%",
      fontSize: "13px",
      color: "#63796b",
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
      background: "#fff",
      padding: "17px",
    },
  },
  {
    ".ux-v54 .analytics-kpis>div svg": {
      color: "#438268",
    },
  },
  {
    ".ux-v54 .analytics-kpis strong": {
      fontSize: "26px",
      color: "#204839",
    },
  },
  {
    ".ux-v54 .analytics-kpis span": {
      fontSize: "13px",
      color: "#5c786a",
    },
  },
  {
    ".ux-v54 .analytics-kpis small": {
      fontSize: "12px",
      color: "#73887d",
    },
  },
  {
    ".ux-v54 .radar-edit": {
      padding: "9px 12px",
      border: "1px solid #d9e6db",
      borderRadius: "10px",
      background: "#f6faf7",
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      color: "#2b6b4e",
      fontSize: "13px",
      fontWeight: "700",
    },
  },
  {
    ".ux-v54 .radar-edit:hover": {
      background: "#e8f5eb",
    },
  },
  {
    ".ux-v54 .focus-suggestion": {
      gap: "14px",
      border: "1px solid #dcebdc",
      background: "#f3f8ef",
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
      background: "#fff",
      border: "1px solid var(--ux-border)",
      borderRadius: "13px",
      padding: "14px 16px",
    },
  },
  {
    ".ux-v54 .week-summary>div span": {
      fontSize: "12px",
      color: "#667e70",
    },
  },
  {
    ".ux-v54 .week-summary>div strong": {
      fontSize: "22px",
      color: "#204b37",
    },
  },
  {
    ".ux-v54 .weekly-hero": {
      padding: "15px 22px",
      minHeight: "0",
      background: "#fff",
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
      border: "1px solid #cfe5d5",
      background: "linear-gradient(120deg,#e8f4ed,#f4f9ef)",
      boxShadow: "0 5px 25px rgba(28,96,64,.05)",
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
      color: "#4f765e",
      fontWeight: "750",
    },
  },
  {
    ".ux-v54 .ux-focus-reason": {
      display: "inline-flex",
      padding: "5px 11px",
      border: "1px solid #c4dfcb",
      borderRadius: "50px",
      background: "#f9fcf9",
      color: "#356d51",
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
      color: "#184938",
      overflowWrap: "anywhere",
    },
  },
  {
    ".ux-v54 .ux-home-focus p": {
      fontSize: "14px",
      color: "#527362",
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
      background: "#fff",
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
      borderColor: "#8ac4a4",
      transform: "translateY(-2px)",
    },
  },
  {
    ".ux-v54 .ux-summary-item svg": {
      color: "#408d6b",
      marginBottom: "4px",
    },
  },
  {
    ".ux-v54 .ux-summary-item span": {
      fontSize: "13px",
      color: "#617b6b",
    },
  },
  {
    ".ux-v54 .ux-summary-item strong": {
      fontSize: "clamp(22px,2.5vw,29px)",
      color: "#203e34",
      fontWeight: "800",
      letterSpacing: "-.035em",
    },
  },
  {
    ".ux-v54 .ux-summary-item small": {
      fontSize: "12px",
      color: "#749082",
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
      background: "#fff",
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
      color: "#234e39",
      lineHeight: "1.3",
    },
  },
  {
    ".ux-v54 .ux-home-panel-head h3 svg": {
      color: "#44876a",
      flex: "none",
    },
  },
  {
    ".ux-v54 .ux-home-panel-head>button": {
      border: "0",
      background: "transparent",
      color: "#297959",
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
      color: "#718a7b",
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
      borderBottom: "1px solid #edf2ee",
      color: "#2c5140",
    },
  },
  {
    ".ux-v54 .ux-today-task:last-child": {
      borderBottom: "0",
    },
  },
  {
    ".ux-v54 .ux-today-task:hover": {
      background: "#f4f9f5",
    },
  },
  {
    ".ux-v54 .ux-task-check": {
      border: "1.5px solid #94b7a2",
      borderRadius: "6px",
      width: "20px",
      height: "20px",
      flex: "none",
      display: "grid",
      placeItems: "center",
      color: "#fff",
    },
  },
  {
    ".ux-v54 .ux-today-task.is-complete .ux-task-check": {
      background: "#388469",
      borderColor: "#388469",
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
      color: "#274c3c",
      overflowWrap: "anywhere",
    },
  },
  {
    ".ux-v54 .ux-today-task.is-complete .ux-task-label strong": {
      textDecoration: "line-through",
      color: "#91a79a",
    },
  },
  {
    ".ux-v54 .ux-task-label small,.ux-v54 .ux-review-item small": {
      fontSize: "12px",
      color: "#7a9080",
    },
  },
  {
    ".ux-v54 .ux-review-item": {
      display: "flex",
      gap: "11px",
      alignItems: "flex-start",
      padding: "12px 4px",
      borderBottom: "1px solid #edf2ee",
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
      background: "#dba96a",
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
      color: "#688172",
      padding: "14px 4px",
      lineHeight: "1.5",
      margin: "0",
    },
  },
  {
    ".ux-v54 .ux-inline-note": {
      fontSize: "12px",
      color: "#668674",
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
      color: "#254838",
    },
  },
  {
    ".ux-v54 .ux-week-head span": {
      fontSize: "13px",
      color: "#647d6c",
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
      borderBottom: "1px solid #dbe7df",
      display: "flex",
      alignItems: "end",
      justifyContent: "center",
    },
  },
  {
    ".ux-v54 .ux-week-track>span": {
      width: "min(100%,42px)",
      background: "#5ba185",
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
      background: "#ebad61",
    },
  },
  {
    ".ux-v54 .ux-week-day small": {
      fontSize: "12px",
      color: "#6b8777",
      textTransform: "capitalize",
    },
  },
  {
    ".ux-v54 .ux-goal-line": {
      borderTop: "1px solid #eaf1ec",
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
      color: "#5b7969",
    },
  },
  {
    ".ux-v54 .ux-goal-line strong": {
      color: "#2e7054",
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
      color: "#657e6d",
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .ux-command-backdrop": {
      position: "fixed",
      inset: "0",
      zIndex: "120",
      background: "rgba(18,42,30,.45)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "clamp(50px,14vh,130px) 20px 20px",
    },
  },
  {
    ".ux-v54 .ux-command-dialog": {
      width: "min(100%,510px)",
      background: "white",
      border: "1px solid #dce9e0",
      borderRadius: "17px",
      boxShadow: "0 20px 70px rgba(10,44,28,.2)",
      overflow: "hidden",
    },
  },
  {
    ".ux-v54 .ux-command-input": {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 17px",
      borderBottom: "1px solid #e5ede7",
      color: "#56856c",
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
      background: "#fff",
      textAlign: "left",
      color: "#315e46",
      fontSize: "15px",
    },
  },
  {
    ".ux-v54 .ux-command-results button:hover,.ux-v54 .ux-command-results button:focus":
      {
        background: "#eff7f1",
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
      color: "#6e8879",
    },
  },
  {
    ".ux-v54 .ux-command-hint": {
      fontSize: "12px",
      color: "#6c8978",
      padding: "12px 18px",
      background: "#f8fbf8",
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
      color: "#5f7e6c",
      border: "1px solid var(--ux-border)",
      borderRadius: "12px",
      background: "#fff",
      padding: "10px 15px",
    },
  },
  {
    ".ux-v54 .ux-planner-summary strong": {
      fontSize: "18px",
      color: "#245b42",
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
      color: "#65836e",
      fontSize: "13px",
    },
  },
  {
    ".ux-v54 .ux-security": {
      borderTop: "1px solid #e3ebe3",
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
      color: "#617b6b",
      borderBottomWidth: "3px",
    },
  },
  {
    ".ux-v54 .tabs button.active": {
      color: "#276b52",
      borderBottomColor: "#308466",
    },
  },
  {
    ".ux-v54 .tabs button span": {
      fontSize: "12px",
      background: "#f2f7f3",
      color: "#668171",
    },
  },
  {
    ".ux-v54 .tabs button.active span": {
      color: "#226c50",
      background: "#e0f1e4",
    },
  },
  {
    ".ux-v54 .review-item-main strong": {
      fontSize: "14px",
      color: "#244837",
      whiteSpace: "normal",
      lineHeight: "1.4",
    },
  },
  {
    ".ux-v54 .review-item-main span": {
      fontSize: "12px",
      color: "#65806e",
      lineHeight: "1.4",
    },
  },
  {
    ".ux-v54 .review-meta>span": {
      fontSize: "12px",
      color: "#557265",
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
      color: "#61806c",
    },
  },
  {
    ".ux-v54 .mini-metric>strong": {
      fontSize: "26px",
      lineHeight: "1.2",
      color: "#1c4937",
    },
  },
  {
    ".ux-v54 .mini-metric>small": {
      fontSize: "12px",
      color: "#7a9080",
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
      color: "#244f3b",
      overflowWrap: "anywhere",
    },
  },
  {
    ".ux-v54 .mock-main span,.ux-v54 .note-source small,.ux-v54 .vault-card small":
      {
        fontSize: "12px",
        color: "#71897a",
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
      border: "1px solid #e5eee7",
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
      color: "#778d7f",
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
      color: "var(--text,#25343a)",
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
      background: "#edf4ef",
      border: "1px solid #d8e5dd",
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
      color: "#526962",
      fontWeight: "650",
    },
  },
  {
    ".n55-calendar-switch button.selected": {
      background: "white",
      color: "#245d4b",
      boxShadow: "0 1px 5px #1b3d291a",
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
      border: "1px solid #e0eae5",
      borderRadius: "16px",
      background: "#fff",
      boxShadow: "0 2px 8px #283c2e09",
      color: "inherit",
    },
  },
  {
    ".n55-goal-stat:not(.n55-static):hover": {
      borderColor: "#6bb198",
      background: "#fbfefa",
    },
  },
  {
    ".n55-goal-stat>span": {
      fontSize: "13px",
      color: "#60776c",
      fontWeight: "600",
    },
  },
  {
    ".n55-goal-stat>strong": {
      fontSize: "24px",
      lineHeight: "1.15",
      letterSpacing: "-.045em",
      color: "#20362d",
      fontWeight: "780",
    },
  },
  {
    ".n55-goal-stat>small": {
      color: "#688074",
      fontSize: "12px",
    },
  },
  {
    ".n55-goal-stat .progress-track": {
      width: "100%",
      marginTop: "auto",
      background: "#eaf1ec",
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
      color: "#546c60",
      fontSize: "14px",
    },
  },
  {
    ".n55-metrics-detail b": {
      color: "#334c3f",
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
      background: "#fff",
      border: "1px solid #e0e9e3",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 3px 12px #1a382c07",
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
      borderBottom: "1px solid #e8eee9",
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
      color: "#274839",
    },
  },
  {
    ".n55-area": {
      display: "flex",
      alignItems: "center",
      gap: "9px",
      fontSize: "13px",
      color: "#637b6b",
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
      borderRight: "1px solid #e7eee8",
      background: "white",
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
      background: "#f6fbf7",
    },
  },
  {
    ".n55-week-day>header": {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      padding: "11px 10px",
      borderBottom: "1px solid #e7eee8",
      color: "#63756a",
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
      color: "#2b4438",
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
      background: "#f0f6f1",
      color: "#33785b",
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
      background: "#f5f8f5",
      border: "1px solid #e5ece5",
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
      background: "#f1f8f4",
      borderColor: "#dceadf",
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
      color: "#2b4638",
      overflowWrap: "anywhere",
      fontWeight: "680",
    },
  },
  {
    ".n55-event-body small": {
      fontSize: "12px",
      color: "#708478",
    },
  },
  {
    ".n55-event-progress": {
      fontSize: "12px",
      lineHeight: "1.4",
      color: "#3b795b",
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
      background: "#e5f0e7",
      color: "#326b53",
    },
  },
  {
    ".n55-minibutton:hover": {
      background: "#d3e7d8",
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
      border: "1.5px solid #93b6a0",
      borderRadius: "5px",
      background: "white",
      color: "white",
    },
  },
  {
    ".n55-check.checked": {
      background: "#3e896a",
      borderColor: "#3e896a",
    },
  },
  {
    ".n55-review-event": {
      display: "flex",
      alignItems: "flex-start",
      gap: "5px",
      width: "100%",
      textAlign: "left",
      border: "1px solid #f3dec1",
      background: "#fff8ee",
      color: "#92602d",
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
      color: "#687d70",
      fontSize: "11px",
      lineHeight: "1.4",
      padding: "4px 6px",
      borderTop: "1px solid #edf1ed",
    },
  },
  {
    ".n55-day-empty": {
      border: "1px dashed #dae7de",
      background: "transparent",
      borderRadius: "9px",
      color: "#809588",
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
    },
  },
  {
    ".n55-weekday": {
      textAlign: "center",
      padding: "11px 4px",
      fontWeight: "700",
      color: "#778a7c",
      fontSize: "12px",
      borderBottom: "1px solid #e9eee9",
      background: "#fafcfa",
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
      border: "0",
      borderRight: "1px solid #e7eee8",
      borderBottom: "1px solid #e7eee8",
      background: "white",
      padding: "11px",
      fontSize: "12px",
      color: "#2a4436",
      minWidth: "0",
    },
  },
  {
    ".n55-month-day.outside": {
      background: "#f8faf8",
      opacity: ".5",
    },
  },
  {
    ".n55-month-day.today": {
      background: "#f1faf3",
      boxShadow: "inset 0 0 0 2px #66ad83",
    },
  },
  {
    ".n55-month-day:hover": {
      background: "#eef8f1",
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
      color: "#6b8273",
    },
  },
  {
    ".n55-month-text": {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
      overflow: "hidden",
      color: "#647b6b",
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
      background: "#f9fcf9",
      border: "1px solid #dbeadd",
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
      borderTop: "1px solid #e5eee7",
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
      color: "#6d8172",
    },
  },
  {
    ".n55-editor details": {
      border: "1px solid #e5ece8",
      borderRadius: "9px",
      padding: "11px",
    },
  },
  {
    ".n55-editor details summary": {
      cursor: "pointer",
      color: "#5d7967",
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
      color: "#456251",
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
      border: "1px solid #dce8dd",
      borderRadius: "12px",
      cursor: "pointer",
      background: "#fff",
    },
  },
  {
    ".assimilation-choice.selected": {
      background: "#f1f9f3",
      borderColor: "#67ae85",
      boxShadow: "inset 0 0 0 1px #8abc95",
    },
  },
  {
    ".assimilation-choice input:not(.MuiInputBase-input)": {
      accentColor: "#3c8767",
      width: "18px",
      height: "18px",
    },
  },
  {
    ".assimilation-number": {
      fontWeight: "800",
      color: "#4d9270",
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
      color: "#2a4638",
    },
  },
  {
    ".assimilation-copy small": {
      fontSize: "12px",
      color: "#667f6d",
    },
  },
  {
    ".assimilation-days": {
      borderRadius: "999px",
      background: "#e3f0e8",
      color: "#417657",
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
      color: "#517a64",
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
      background: "#f5f4fc",
      border: "1px solid #e2def5",
    },
  },
  {
    ".n55-logged-event span": {
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color: "#6b63a5",
      fontWeight: "780",
    },
  },
  {
    ".n55-logged-event strong": {
      fontSize: "13px",
      overflowWrap: "anywhere",
      color: "#504c7b",
    },
  },
  {
    ".n55-logged-event small": {
      fontSize: "12px",
      color: "#77709b",
    },
  },
  {
    ".nimbo-theme .search-wrap": {
      border: 0,
      padding: 0,
      background: "transparent",
    },
  },
];
