export const THEMES = [
  { name: "dark", label: "Dark" },
  { name: "light", label: "Light" },
] as const;

export type ThemeName = (typeof THEMES)[number]["name"];

export const DEFAULT_THEME: ThemeName = "dark";
export const THEME_STORAGE_KEY = "webo.ui.theme";

export function isThemeName(value: string): value is ThemeName {
  return THEMES.some((theme) => theme.name === value);
}

export function getNextTheme(current: ThemeName): ThemeName {
  const currentIndex = THEMES.findIndex((theme) => theme.name === current);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  return THEMES[nextIndex].name;
}

export function getThemeLabel(themeName: ThemeName): string {
  return THEMES.find((theme) => theme.name === themeName)?.label ?? themeName;
}
