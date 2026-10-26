
import homeConfig from "../config/home.json";
import type { HomeConfig } from "../types/config";

const home = homeConfig as HomeConfig;

export function getHomeConfig(): HomeConfig {
  return home;
}
