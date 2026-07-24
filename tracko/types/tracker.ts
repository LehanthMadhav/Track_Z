import type { ManualOpportunityFormData } from "@/types/opportunity";

export interface StoredTracker extends ManualOpportunityFormData {
  id: string;
  createdAt: string;
  isCompleted: boolean;
  completedAt: string;
}
