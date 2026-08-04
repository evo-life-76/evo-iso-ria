export type User = { id: string; name: string; email: string; password: string; role: "ADMIN" | "USER"; active: boolean; createdAt: string };
export type IsoNode = { id: string; type: "START" | "RIA" | "VALVE"; x: number; y: number; label: string; dn?: number; altitude?: number };
export type IsoSegment = { id: string; x1: number; y1: number; x2: number; y2: number; length: number; dn: number; material: string; label: string };
export type Isometry = { id: string; name: string; createdAt: string; updatedAt: string; nodes: IsoNode[]; segments: IsoSegment[]; settings: { paper: "A3"; showGrid: boolean } };
export type Project = { id: string; name: string; address: string; city: string; client: string; createdAt: string; isometries: Isometry[] };
export type AppState = { users: User[]; projects: Project[] };

export const demoUsers: User[] = [{ id: "admin-1", name: "Mathys", email: "admin@ria.local", password: "Admin123!", role: "ADMIN", active: true, createdAt: new Date().toISOString() }];

export const initialProjects: Project[] = [{ id: "project-demo", name: "Chantier démonstration", address: "12 rue du Réseau", city: "Rouen", client: "Client démo", createdAt: new Date().toISOString(), isometries: [{ id: "iso-demo", name: "Réseau principal", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), settings: { paper: "A3", showGrid: true }, nodes: [{ id: "n1", type: "START", x: 180, y: 520, label: "Départ réseau", dn: 65 }, { id: "n2", type: "RIA", x: 680, y: 250, label: "RIA 1", dn: 33, altitude: 3.2 }], segments: [{ id: "s1", x1: 180, y1: 520, x2: 360, y2: 420, length: 15, dn: 65, material: "Acier galvanisé", label: "T1" }, { id: "s2", x1: 360, y1: 420, x2: 360, y2: 270, length: 3.2, dn: 65, material: "Acier galvanisé", label: "T2" }, { id: "s3", x1: 360, y1: 270, x2: 680, y2: 250, length: 22, dn: 50, material: "Acier galvanisé", label: "T3" }] }] }];

const KEY = "evo-iso-ria-state-v1";
export function loadState(): AppState {
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) as AppState : { users: demoUsers, projects: initialProjects }; }
  catch { return { users: demoUsers, projects: initialProjects }; }
}
export function saveState(state: AppState) { localStorage.setItem(KEY, JSON.stringify(state)); }
