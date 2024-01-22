import { StorageService } from "@app-core/services/storage.service";

export function initAppDataFactory(storageService: StorageService) {
  return () => storageService.initialize();
}