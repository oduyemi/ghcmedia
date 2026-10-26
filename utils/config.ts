import homeConfig from '../config/home.json'
import type { Category, Album, HomeConfig } from '../types/config'

const home = homeConfig as HomeConfig

export function getCategoryInfo(category: string): Category | undefined {
  return config.categories[category]
}

export function getAlbumsByCategory(category: string): Album[] {
  return config.categories[category]?.albums || []
}

export function getAlbumById(categoryId: string, albumId: string): Album | undefined {
  let albums = config.categories[categoryId]?.albums.find(album => album.id === albumId);
  return albums;
}

export function getAllCategories(): string[] {
  return Object.keys(config.categories)
}

export function getHomeConfig(): HomeConfig {
  return home
} 