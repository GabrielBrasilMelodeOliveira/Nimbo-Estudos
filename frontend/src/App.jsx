import {
  FocusTimerProvider,
  HideDuringFocus,
} from "./shared/hooks/FocusTimerContext.jsx";
import FocusTimerOverlay from "./shared/components/focus/FocusTimerOverlay.jsx";
import Flashcards from "./pages/flashcards/Flashcards.jsx";
import { version as appVersion } from "../package.json";
import { Input } from "./shared/components/FormControls.jsx";
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  BookOpenText,
  ListChecks,
  Timer,
  Layers,
  Repeat2,
  ClipboardCheck,
  LibraryBig,
  NotebookPen,
  Settings2,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Leaf,
  CalendarDays,
  BarChart3,
  UsersRound,
  Search,
  ArrowRight,
} from "lucide-react";
import { api, endpoints } from "./shared/services/api.js";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import WeeklyPlanner from "./pages/weeklyPlanner/WeeklyPlanner.jsx";
import Analytics from "./pages/analytics/Analytics.jsx";
import Collection from "./pages/collection/Collection.jsx";
import PetCompanion from "./shared/components/PetCompanion.jsx";
import Edital from "./pages/edital/Edital.jsx";
import Questions from "./pages/questions/Questions.jsx";
import StudyCycle from "./pages/studyCycle/StudyCycle.jsx";
import Reviews from "./pages/reviews/Reviews.jsx";
import MockExams from "./pages/mockExams/MockExams.jsx";
import Materials from "./pages/materials/Materials.jsx";
import ErrorNotes from "./pages/errorNotes/ErrorNotes.jsx";
import Settings from "./pages/settings/Settings.jsx";
const mainMenu = [
  {
    key: "dashboard",
    label: "Início",
    icon: LayoutDashboard,
  },
  {
    key: "weekly",
    label: "Agenda",
    icon: CalendarDays,
  },
  {
    key: "edital",
    label: "Meu edital",
    icon: BookOpenText,
  },
  {
    key: "cycle",
    label: "Estudar",
    icon: Timer,
  },
  {
    key: "flashcards",
    label: "Flashcards",
    icon: Layers,
  },
  {
    key: "questions",
    label: "Questões",
    icon: ListChecks,
  },
];
const extraMenu = [
  {
    key: "reviews",
    label: "Revisões",
    icon: Repeat2,
  },
  {
    key: "analytics",
    label: "Desempenho",
    icon: BarChart3,
  },
  {
    key: "errors",
    label: "Caderno de erros",
    icon: NotebookPen,
  },
  {
    key: "exams",
    label: "Simulados",
    icon: ClipboardCheck,
  },
  {
    key: "materials",
    label: "Materiais",
    icon: LibraryBig,
  },
  {
    key: "collection",
    label: "Meu Nimbo",
    icon: UsersRound,
  },
  {
    key: "settings",
    label: "Configurações",
    icon: Settings2,
  },
];
const labels = {
  dashboard: "Hoje",
  weekly: "Agenda",
  edital: "Meu edital",
  cycle: "Estudar",
  flashcards: "Flashcards",
  questions: "Questões",
  materials: "Materiais",
  analytics: "Desempenho",
  reviews: "Revisões",
  exams: "Simulados",
  errors: "Caderno de erros",
  collection: "Meu Nimbo",
  settings: "Configurações",
};
const initial = {
  disciplines: [],
  topics: [],
  questions: [],
  "study-sessions": [],
  reviews: [],
  "mock-exams": [],
  materials: [],
  "error-notes": [],
  agenda: [],
  "study-plan": [],
  "agenda/goals": [],
  "edital/imports": [],
  plan: {
    name: "Concurso de TI",
    weeklyGoalMinutes: 900,
    weeklyGoalTopics: 5,
  },
  dashboard: {},
  pet: null,
  analytics: {
    disciplines: [],
    topics: [],
    recommendations: [],
  },
};
export default function App() {
  const [data, setData] = useState(initial),
    [page, setPage] = useState("dashboard"),
    [focusTopicId, setFocusTopicId] = useState(""),
    [focusDisciplineId, setFocusDisciplineId] = useState(""),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [toast, setToast] = useState(null),
    [working, setWorking] = useState(false),
    [mobileNav, setMobileNav] = useState(false),
    [more, setMore] = useState(false),
    [quickOpen, setQuickOpen] = useState(false),
    [quickSearch, setQuickSearch] = useState("");
  const refresh = useCallback(async (first = false) => {
    try {
      const results = await Promise.all(endpoints.map((p) => api(p)));
      setData(Object.fromEntries(endpoints.map((p, i) => [p, results[i]])));
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      if (first) setLoading(false);
    }
  }, []);
  useEffect(() => {
    refresh(true);
  }, [refresh]);
  useEffect(() => {
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    const timer = setInterval(() => refresh(), 90000);
    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(timer);
    };
  }, [refresh]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3900);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    const onShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuickOpen((x) => !x);
      } else if (e.key === "Escape") {
        setQuickOpen(false);
        setMobileNav(false);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);
  const action = async (
    path,
    method = "POST",
    payload = undefined,
    message = "Salvo com sucesso!",
  ) => {
    if (working) return false;
    try {
      setWorking(true);
      await api(path, method, payload);
      await refresh();
      setToast({ message, success: true });
      return true;
    } catch (e) {
      if (e.status === 409) await refresh();
      setToast({
        message: e.message,
        success: false,
      });
      return false;
    } finally {
      setWorking(false);
    }
  };
  const navigate = (key, options = {}) => {
    setFocusDisciplineId(
      options?.disciplineId != null ? String(options.disciplineId) : "",
    );
    setFocusTopicId(options?.topicId != null ? String(options.topicId) : "");
    if (extraMenu.some((item) => item.key === key)) setMore(true);
    setPage(key);
    setQuickOpen(false);
    setMobileNav(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const views = {
    dashboard: Dashboard,
    weekly: WeeklyPlanner,
    edital: Edital,
    cycle: StudyCycle,
    flashcards: Flashcards,
    questions: Questions,
    materials: Materials,
    analytics: Analytics,
    reviews: Reviews,
    exams: MockExams,
    errors: ErrorNotes,
    collection: Collection,
    settings: Settings,
  };
  const Screen = views[page],
    pending = data.dashboard?.dueReviews || 0;
  const allMenu = [...mainMenu, ...extraMenu];
  const quickResults = useMemo(
    () =>
      allMenu.filter((item) =>
        item.label
          .toLocaleLowerCase("pt-BR")
          .includes(quickSearch.trim().toLocaleLowerCase("pt-BR")),
      ),
    [quickSearch],
  );
  const navItem = (item) => (
    <Button
      type="button"
      key={item.key}
      className={`nav-item ${page === item.key ? "selected" : ""}`}
      aria-current={page === item.key ? "page" : undefined}
      onClick={() => navigate(item.key)}
    >
      <item.icon size={19} aria-hidden="true" />
      <span>{item.label}</span>
      {item.key === "reviews" && pending > 0 && (
        <span
          className="nav-count"
          aria-label={`${pending} revisões pendentes`}
        >
          {pending}
        </span>
      )}
    </Button>
  );
  return (
    <FocusTimerProvider data={data} action={action} working={working}>
      <Box
        className="app-shell nimbo-theme ux-v54"
        sx={{ width: "100%", minWidth: 0 }}
      >
        {mobileNav && (
          <div className="mobile-dim" onClick={() => setMobileNav(false)} />
        )}
        <aside className={`sidebar ${mobileNav ? "nav-visible" : ""}`}>
          <div className="brand">
            <Button
              type="button"
              className="ux-brand-home"
              onClick={() => navigate("dashboard")}
              aria-label="Ir para o início"
            >
              <span className="brand-mark">
                <Leaf size={22} />
              </span>
              <span className="brand-wordmark">
                <strong>
                  nimbo<span>.</span>
                </strong>
                <small>ESTUDOS & ROTINA</small>
              </span>
            </Button>
            <Button
              type="button"
              className="nav-close"
              onClick={() => setMobileNav(false)}
              aria-label="Fechar menu"
            >
              <X size={20} />
            </Button>
          </div>
          <nav className="nav-sections" aria-label="Navegação principal">
            <div className="nav-section">
              <div className="nav-label">PRINCIPAL</div>
              {mainMenu.map(navItem)}
            </div>
            <div className="nav-section extra-section">
              <Button
                type="button"
                className="more-toggle"
                onClick={() => setMore((x) => !x)}
                aria-expanded={more}
                aria-controls="additional-navigation"
              >
                Outras ferramentas{" "}
                <ChevronDown size={17} className={more ? "rotated" : ""} />
              </Button>
              <div
                id="additional-navigation"
                className="ux-extra-links"
                hidden={!more}
              >
                {extraMenu.map(navItem)}
              </div>
            </div>
          </nav>
          <Typography
            variant="caption"
            sx={{ display: "block", px: 3, py: 2, color: "#bed6cc" }}
          >
            Nimbo v{appVersion}
          </Typography>
        </aside>
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            ml: 0,
            "@media (min-width:761px)": { ml: "204px" },
            "@media (min-width:1021px)": { ml: "220px" },
            "@media (min-width:1261px)": { ml: "244px" },
          }}
        >
          <header className="topbar">
            <div className="topbar-left">
              <Button
                type="button"
                className="mobile-menu icon-button"
                onClick={() => setMobileNav(true)}
                aria-label="Abrir menu"
              >
                <Menu size={22} />
              </Button>
              <span className="topbar-path">
                Nimbo <span>/</span> {labels[page]}
              </span>
            </div>
            <div className="topbar-right">
              <Button
                type="button"
                sx={{
                  width: { xs: 160, sm: 260 },
                  justifyContent: "flex-start",
                  px: 2,
                  gap: 1,
                  minHeight: 44,
                  "& kbd": { ml: "auto" },
                }}
                onClick={() => {
                  setQuickSearch("");
                  setQuickOpen(true);
                }}
                aria-label="Encontrar uma página"
              >
                <Search size={18} /> <span>Ir para...</span>
                <kbd>Ctrl K</kbd>
              </Button>
              <span className="edition-chip" title="Concurso atual">
                {data.plan?.name || "Concurso de TI"}
              </span>
            </div>
          </header>
          <Box
            component="main"
            id="conteudo"
            sx={{
              width: "100%",
              minWidth: 0,
              p: { xs: 2, sm: 3, lg: 4 },
              pb: 12,
            }}
          >
            {error && (
              <div className="api-error" role="alert">
                <AlertCircle size={20} />
                <div>
                  <strong>Não foi possível carregar seus dados.</strong>
                  <p>{error}</p>
                </div>
                <Button
                  type="button"
                  className="btn btn-subtle"
                  onClick={() => refresh(true)}
                >
                  Tentar novamente
                </Button>
              </div>
            )}
            <div className="page-header">
              <h1>{labels[page]}</h1>
            </div>
            {loading ? (
              <div className="skeleton-layout">
                <div />
                <div />
                <div />
              </div>
            ) : (
              <Screen
                data={data}
                action={action}
                working={working}
                navigate={navigate}
                focusTopicId={focusTopicId}
                focusDisciplineId={focusDisciplineId}
              />
            )}
          </Box>
        </Box>
        {!loading && (
          <HideDuringFocus>
            <PetCompanion
              pet={data.pet}
              navigate={navigate}
              action={action}
              working={working}
            />
          </HideDuringFocus>
        )}
        {quickOpen && (
          <div
            className="ux-command-backdrop"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setQuickOpen(false);
            }}
            role="presentation"
          >
            <div
              className="ux-command-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Ir para uma página"
            >
              <div className="ux-command-input">
                <Search size={20} />
                <Input
                  autoFocus
                  type="search"
                  aria-label="Buscar página"
                  placeholder="Qual página você quer abrir?"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && quickResults[0])
                      navigate(quickResults[0].key);
                  }}
                />
                <Button
                  type="button"
                  className="icon-button"
                  onClick={() => setQuickOpen(false)}
                  aria-label="Fechar"
                >
                  <X size={19} />
                </Button>
              </div>
              <div className="ux-command-results">
                {quickResults.length ? (
                  quickResults.map((item) => (
                    <Button
                      type="button"
                      key={item.key}
                      onClick={() => navigate(item.key)}
                    >
                      <item.icon size={19} />
                      <span>{item.label}</span>
                      <ArrowRight size={16} />
                    </Button>
                  ))
                ) : (
                  <p>Nenhuma página encontrada.</p>
                )}
              </div>
              <div className="ux-command-hint">
                Enter para abrir o primeiro resultado · Esc para fechar
              </div>
            </div>
          </div>
        )}
        {toast && (
          <div
            className={`toast ${toast.success ? "toast-ok" : "toast-error"}`}
            role="status"
          >
            {toast.success ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{toast.message}</span>
            <Button
              type="button"
              aria-label="Fechar aviso"
              onClick={() => setToast(null)}
            >
              <X size={16} />
            </Button>
          </div>
        )}
        <FocusTimerOverlay
          page={page}
          navigate={navigate}
          working={working}
          action={action}
        />
      </Box>
    </FocusTimerProvider>
  );
}
