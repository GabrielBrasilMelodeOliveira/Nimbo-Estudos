import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronDown,
  Leaf,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { designColors } from "../../theme/designColors.js";

export const sidebarWidths = {
  compact: 76,
  narrow: 204,
  medium: 220,
  wide: 244,
};

export default function Sidebar({
  mainMenu,
  extraMenu,
  page,
  navigate,
  pending,
  version,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onMobileClose,
  more,
  onToggleMore,
}) {
  const isMobile = useMediaQuery("(max-width:760px)");
  const compact = collapsed && !isMobile;
  const width = isMobile
    ? "min(82vw,288px)"
    : compact
      ? sidebarWidths.compact
      : sidebarWidths.narrow;
  const navigationItem = (item) => {
    const selected = page === item.key;
    const hasPending = item.key === "reviews" && pending > 0;
    return (
      <Tooltip
        key={item.key}
        title={compact ? item.label : ""}
        placement="right"
        arrow
      >
        <ListItemButton
          component="button"
          type="button"
          selected={selected}
          aria-label={item.label}
          aria-current={selected ? "page" : undefined}
          aria-description={
            hasPending ? `${pending} revisões pendentes` : undefined
          }
          onClick={() => navigate(item.key)}
          sx={{
            width: "100%",
            minWidth: 0,
            minHeight: 46,
            my: 0.5,
            borderRadius: 2,
            px: compact ? 1 : 1.5,
            gap: 1.5,
            justifyContent: compact ? "center" : "flex-start",
            color: designColors.light,
            textAlign: "left",
            "&.Mui-selected, &.Mui-selected:hover": {
              bgcolor: "primary.main",
              color: "common.white",
            },
            "&:hover": { bgcolor: "primary.dark", color: "common.white" },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.light",
              outlineOffset: -2,
            },
          }}
        >
          <Badge
            variant="dot"
            color="secondary"
            invisible={!compact || !hasPending}
            sx={{ flexShrink: 0 }}
          >
            <item.icon size={20} aria-hidden="true" />
          </Badge>
          {!compact && (
            <Typography
              component="span"
              variant="body2"
              sx={{
                flex: 1,
                minWidth: 0,
                overflowWrap: "anywhere",
                fontWeight: selected ? 700 : 500,
              }}
            >
              {item.label}
            </Typography>
          )}
          {!compact && hasPending && (
            <Box
              component="span"
              sx={{
                flexShrink: 0,
                bgcolor: "primary.main",
                color: "common.white",
                borderRadius: 3,
                px: 0.75,
                fontSize: 12,
              }}
            >
              {pending}
            </Box>
          )}
        </ListItemButton>
      </Tooltip>
    );
  };
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={!isMobile || mobileOpen}
      onClose={onMobileClose}
      slotProps={{
        paper: {
          component: "aside",
          "aria-label": "Barra lateral principal",
          sx: {
            width,
            boxSizing: "border-box",
            minWidth: 0,
            maxWidth: "100vw",
            overflowX: "hidden",
            overflowY: "auto",
            bgcolor: designColors.sidebar,
            color: designColors.light,
            borderRight: 0,
            ...(!isMobile && !compact
              ? {
                  "@media (min-width:1021px)": { width: sidebarWidths.medium },
                  "@media (min-width:1261px)": { width: sidebarWidths.wide },
                }
              : {}),
          },
        },
      }}
    >
      <Stack
        direction={compact ? "column" : "row"}
        spacing={0.5}
        sx={{ alignItems: "center", p: 1.5, minWidth: 0 }}
      >
        <Button
          aria-label="Ir para o início"
          onClick={() => navigate("dashboard")}
          sx={{
            color: "inherit",
            p: 0.5,
            minWidth: 0,
            flex: compact ? undefined : 1,
            justifyContent: "flex-start",
            gap: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "common.white",
              p: 0.75,
              borderRadius: 2,
              display: "flex",
              flexShrink: 0,
            }}
          >
            <Leaf size={22} />
          </Box>
          {!compact && (
            <Typography
              component="span"
              sx={{
                color: "common.white",
                fontWeight: 800,
                fontSize: 24,
                letterSpacing: -1,
              }}
            >
              nimbo.
            </Typography>
          )}
        </Button>
        <Tooltip
          title={
            isMobile
              ? "Fechar menu"
              : compact
                ? "Expandir barra lateral"
                : "Recolher barra lateral"
          }
        >
          <IconButton
            aria-label={
              isMobile
                ? "Fechar menu"
                : compact
                  ? "Expandir barra lateral"
                  : "Recolher barra lateral"
            }
            aria-expanded={isMobile ? mobileOpen : !compact}
            onClick={isMobile ? onMobileClose : onToggleCollapsed}
            sx={{ color: "inherit", flexShrink: 0, width: 36, height: 36 }}
          >
            {isMobile ? (
              <X size={20} />
            ) : compact ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
      <Box
        component="nav"
        aria-label="Navegação principal"
        sx={{ px: 1, minWidth: 0 }}
      >
        {!compact && (
          <Typography variant="overline" sx={{ px: 1.5, color: "inherit" }}>
            Principal
          </Typography>
        )}
        <List disablePadding>{mainMenu.map(navigationItem)}</List>
        <Divider sx={{ my: 1.5, borderColor: "divider" }} />
        {!compact && (
          <Button
            onClick={onToggleMore}
            aria-expanded={more}
            aria-controls="additional-navigation"
            sx={{
              width: "100%",
              minWidth: 0,
              color: "inherit",
              gap: 1,
              justifyContent: "space-between",
              textAlign: "left",
              px: 1.5,
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{ minWidth: 0, overflowWrap: "anywhere" }}
            >
              Outras ferramentas
            </Typography>
            <ChevronDown
              size={17}
              style={{
                flexShrink: 0,
                transform: more ? "rotate(180deg)" : undefined,
              }}
            />
          </Button>
        )}
        <List
          id="additional-navigation"
          disablePadding
          hidden={!compact && !more}
          sx={{ "&[hidden]": { display: "none" } }}
        >
          {extraMenu.map(navigationItem)}
        </List>
      </Box>
      <Typography
        variant="caption"
        sx={{
          mt: "auto",
          p: compact ? 1 : 3,
          color: "inherit",
          textAlign: compact ? "center" : "left",
          overflowWrap: "anywhere",
        }}
      >
        {compact ? `v${version}` : `Nimbo v${version}`}
      </Typography>
    </Drawer>
  );
}
