import type { ManualOpportunityFormData } from "@/types/opportunity";
import type { StoredTracker } from "@/types/tracker";

const STORAGE_KEY = "tracko-trackers";

export function getStoredTrackers(): StoredTracker[] {
  const storedTrackers = window.localStorage.getItem(STORAGE_KEY);

  if (!storedTrackers) return [];

  try {
    const trackers: unknown = JSON.parse(storedTrackers);
    return Array.isArray(trackers)
      ? (trackers as StoredTracker[]).map((tracker) => ({
          ...tracker,
          isCompleted: tracker.isCompleted ?? false,
          completedAt: tracker.completedAt ?? "",
        }))
      : [];
  } catch {
    return [];
  }
}

export function saveTracker(formData: ManualOpportunityFormData): StoredTracker {
  const newTracker: StoredTracker = {
    ...formData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    isCompleted: false,
    completedAt: "",
  };

  const trackers = [newTracker, ...getStoredTrackers()];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trackers));

  return newTracker;
}

export function markTrackerComplete(id: string): StoredTracker[] {
  const trackers = getStoredTrackers().map((tracker) =>
    tracker.id === id
      ? { ...tracker, isCompleted: true, completedAt: new Date().toISOString() }
      : tracker,
  );

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trackers));
  return trackers;
}
