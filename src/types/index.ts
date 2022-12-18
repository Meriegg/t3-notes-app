export interface NoteType {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export type CurrentAuthProviders = "google";
