// src/types/dashboardPayload.ts
export interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  unknownDetections: number;
  lastEvent: {
    name: string;
    eventType: "Entry" | "Exit" | "Unknown";
    timestamp: string;
  } | null;
}
