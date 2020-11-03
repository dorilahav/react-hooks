export enum StorageType {
  LocalStorage,
  SessionStorage
}

export const storages: Record<StorageType, Storage> = {
  [StorageType.LocalStorage]: localStorage,
  [StorageType.SessionStorage]: sessionStorage
};