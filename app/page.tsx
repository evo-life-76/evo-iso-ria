"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Copy,
  FileDown,
  FolderOpen,
  LogOut,
  Plus,
  Search,
  Settings,
  Shield,
  Trash2,
  Users,
  Wrench,
} from "lucide-react";
import { IsoEditor } from "@/components/IsoEditor";
import { Login } from "@/components/Login";
import { Modal } from "@/components/Modal";
import {
  demoUsers,
  initialProjects,
  loadState,
  saveState,
  type AppState,
  type Isometry,
  type Project,
  type User,
} from "@/lib/store";

type View =
  | { name: "home" }
  | { name: "projects" }
  | { name: "project"; projectId: string }
  | { name: "editor"; projectId: string; isoId: string }
  | { name: "admin" };

const makeId = () => crypto.randomUUID();

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<User | null>(null);
  const [state, setState] = useState<AppState>({ users: demoUsers, projects: initialProjects });
  const [view, setView] = useState<View>({ name: "home" });
  const [createOpen, setCreateOpen] = useState(false);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [isoName, setIsoName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = loadState();
    setState(saved);
    const sessionId = localStorage.getItem("evo-iso-session");
    const current = saved.users.find((u) => u.id === sessionId && u.active);
    if (current) setSession(current);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveState(state);
  }, [state, ready]);

  const currentProject = useMemo(() => {
    if (view.name !== "project" && view.name !== "editor") return null;
    return state.projects.find((p) => p.id === view.projectId) ?? null;
  }, [state.projects, view]);

  const currentIso = useMemo(() => {
    if (view.name !== "editor" || !currentProject) return null;
    return currentProject.isometries.find((i) => i.id === view.isoId) ?? null;
  }, [currentProject, view]);

  if (!ready) return <div className="loading">Chargement…</div>;

  if (!session) {
    return (
      <Login
        onLogin={(email, password) => {
          const user = state.users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.active,
          );
          if (!user) return false;
          localStorage.setItem("evo-iso-session", user.id);
          setSession(user);
          setView({ name: "home" });
          return true;
        }}
      />
    );
  }

  const logout = () => {
    localStorage.removeItem("evo-iso-session");
    setSession(null);
    setView({ name: "home" });
  };

  const createIso = () => {
    if (!selectedProjectId || !isoName.trim()) return;
    const iso: Isometry = {
      id: makeId(),
      name: isoName.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes: [],
      segments: [],
      settings: { paper: "A3", showGrid: true },
    };
    setState((s) => ({
      ...s,
      projects: s.projects.map((p) =>
        p.id === selectedProjectId ? { ...p, isometries: [...p.isometries, iso] } : p,
      ),
    }));
    setCreateOpen(false);
    setIsoName("");
    setView({ name: "editor", projectId: selectedProjectId, isoId: iso.id });
  };

  const createProject = (form: { name: string; address: string; city: string; client: string }) => {
    const project: Project = { id: makeId(), ...form, isometries: [], createdAt: new Date().toISOString() };
    setState((s) => ({ ...s, projects: [...s.projects, project] }));
    setSelectedProjectId(project.id);
    setNewProjectOpen(false);
  };

  const updateIso = (iso: Isometry) => {
    if (view.name !== "editor") return;
    setState((s) => ({
      ...s,
      projects: s.projects.map((p) =>
        p.id === view.projectId
          ? { ...p, isometries: p.isometries.map((i) => (i.id === iso.id ? iso : i)) }
          : p,
      ),
    }));
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand-button" onClick={() => setView({ name: "home" })} aria-label="Accueil">
          <SprinklerLogo size={40} />
        </button>
        <div className="topbar-actions">
          {session.role === "ADMIN" && (
            <button className="ghost-button" onClick={() => setView({ name: "admin" })}>
              <Shield size={18} /> Admin
            </button>
          )}
          <div className="user-chip">
            <span className="avatar">{session.name.slice(0, 1).toUpperCase()}</span>
            <span>{session.name}</span>
          </div>
          <button className="icon-button" onClick={logout} aria-label="Déconnexion">
            <LogOut size={19} />
          </button>
        </div>
      </header>

      <main className={view.name === "editor" ? "editor-main" : "main-content"}>
        {view.name === "home" && (
          <section className="hero-section">
            <div className="hero-copy">
              <span className="eyebrow">OUTIL RIA</span>
              <h1>Vos isométries, sans complication.</h1>
              <p>Créez, retrouvez et exportez vos réseaux RIA depuis une interface pensée pour le terrain.</p>
            </div>
            <div className="home-actions">
              <button className="action-card" onClick={() => setView({ name: "projects" })}>
                <div className="action-icon"><FolderOpen size={30} /></div>
                <div><strong>Consulter les isométries</strong><span>Parcourir les chantiers existants</span></div>
                <ChevronRight />
              </button>
              <button className="action-card primary-card" onClick={() => setCreateOpen(true)}>
                <div className="action-icon"><Plus size={30} /></div>
                <div><strong>Créer une isométrie</strong><span>Démarrer un nouveau plan RIA</span></div>
                <ChevronRight />
              </button>
            </div>
          </section>
        )}

        {view.name === "projects" && (
          <section className="page-section">
            <PageHeader title="Chantiers" subtitle="Choisissez un chantier pour consulter ses isométries." onBack={() => setView({ name: "home" })} />
            <div className="toolbar-row">
              <div className="searchbox"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un chantier…" /></div>
              <button className="primary-button" onClick={() => setCreateOpen(true)}><Plus size={18} /> Créer une isométrie</button>
            </div>
            <div className="project-grid">
              {state.projects
                .filter((p) => `${p.name} ${p.city} ${p.client}`.toLowerCase().includes(search.toLowerCase()))
                .map((project) => (
                  <button className="project-card" key={project.id} onClick={() => setView({ name: "project", projectId: project.id })}>
                    <div className="project-icon"><Building2 size={24} /></div>
                    <div className="project-card-body">
                      <strong>{project.name}</strong>
                      <span>{[project.address, project.city].filter(Boolean).join(" · ") || "Adresse non renseignée"}</span>
                      <small>{project.isometries.length} isométrie{project.isometries.length > 1 ? "s" : ""}</small>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                ))}
            </div>
          </section>
        )}

        {view.name === "project" && currentProject && (
          <section className="page-section">
            <PageHeader title={currentProject.name} subtitle={[currentProject.client, currentProject.city].filter(Boolean).join(" · ")} onBack={() => setView({ name: "projects" })} />
            <div className="toolbar-row"><div /><button className="primary-button" onClick={() => { setSelectedProjectId(currentProject.id); setCreateOpen(true); }}><Plus size={18} /> Nouvelle isométrie</button></div>
            <div className="iso-list">
              {currentProject.isometries.length === 0 ? (
                <div className="empty-state"><Wrench size={42} /><h3>Aucune isométrie</h3><p>Créez le premier plan de ce chantier.</p></div>
              ) : currentProject.isometries.map((iso) => (
                <div className="iso-row" key={iso.id}>
                  <button className="iso-open" onClick={() => setView({ name: "editor", projectId: currentProject.id, isoId: iso.id })}>
                    <div className="iso-thumb"><IsoMiniPreview iso={iso} /></div>
                    <div><strong>{iso.name}</strong><span>Modifiée le {new Date(iso.updatedAt).toLocaleDateString("fr-FR")}</span></div>
                  </button>
                  <div className="row-actions">
                    <button className="icon-button" title="Dupliquer" onClick={() => {
                      const copy: Isometry = { ...structuredClone(iso), id: makeId(), name: `${iso.name} - copie`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
                      setState((s) => ({ ...s, projects: s.projects.map((p) => p.id === currentProject.id ? { ...p, isometries: [...p.isometries, copy] } : p) }));
                    }}><Copy size={18} /></button>
                    <button className="icon-button danger" title="Supprimer" onClick={() => {
                      if (!confirm(`Supprimer « ${iso.name} » ?`)) return;
                      setState((s) => ({ ...s, projects: s.projects.map((p) => p.id === currentProject.id ? { ...p, isometries: p.isometries.filter((i) => i.id !== iso.id) } : p) }));
                    }}><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {view.name === "editor" && currentProject && currentIso && (
          <IsoEditor project={currentProject} isometry={currentIso} onChange={updateIso} onBack={() => setView({ name: "project", projectId: currentProject.id })} />
        )}

        {view.name === "admin" && session.role === "ADMIN" && (
          <AdminPage users={state.users} onChange={(users) => {
            setState((s) => ({ ...s, users }));
            const refreshed = users.find((u) => u.id === session.id);
            if (refreshed) setSession(refreshed);
          }} onBack={() => setView({ name: "home" })} />
        )}
      </main>

      <Modal open={createOpen} title="Créer une isométrie" onClose={() => setCreateOpen(false)}>
        <div className="form-stack">
          <label>Chantier<select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}><option value="">Sélectionner un chantier</option>{state.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <button className="secondary-button full" onClick={() => setNewProjectOpen(true)}><Plus size={17} /> Créer un nouveau chantier</button>
          <div className="separator"><span>puis</span></div>
          <label>Nom de l’isométrie<input value={isoName} onChange={(e) => setIsoName(e.target.value)} placeholder="Ex. Réseau principal RDC" /></label>
          <div className="modal-actions"><button className="ghost-button" onClick={() => setCreateOpen(false)}>Annuler</button><button className="primary-button" disabled={!selectedProjectId || !isoName.trim()} onClick={createIso}>Continuer</button></div>
        </div>
      </Modal>

      <NewProjectModal open={newProjectOpen} onClose={() => setNewProjectOpen(false)} onCreate={createProject} />
    </div>
  );
}

function PageHeader({ title, subtitle, onBack }: { title: string; subtitle?: string; onBack: () => void }) {
  return <div className="page-header"><button className="icon-button" onClick={onBack}><ArrowLeft /></button><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>;
}

function NewProjectModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (form: { name: string; address: string; city: string; client: string }) => void }) {
  const [form, setForm] = useState({ name: "", address: "", city: "", client: "" });
  useEffect(() => { if (!open) setForm({ name: "", address: "", city: "", client: "" }); }, [open]);
  return <Modal open={open} title="Nouveau chantier" onClose={onClose}><div className="form-stack"><label>Nom du chantier<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Adresse<input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label><div className="two-cols"><label>Ville<input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></label><label>Client<input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></label></div><div className="modal-actions"><button className="ghost-button" onClick={onClose}>Annuler</button><button className="primary-button" disabled={!form.name.trim()} onClick={() => onCreate(form)}>Créer le chantier</button></div></div></Modal>;
}

function AdminPage({ users, onChange, onBack }: { users: User[]; onChange: (users: User[]) => void; onBack: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const add = () => {
    if (!form.name || !form.email || !form.password) return;
    onChange([...users, { id: makeId(), ...form, role: "USER", active: true, createdAt: new Date().toISOString() }]);
    setForm({ name: "", email: "", password: "" }); setOpen(false);
  };
  return <section className="page-section"><PageHeader title="Administration" subtitle="Création et gestion des accès utilisateurs." onBack={onBack} /><div className="toolbar-row"><div className="stat-chip"><Users size={18} /> {users.length} comptes</div><button className="primary-button" onClick={() => setOpen(true)}><Plus size={18} /> Nouvel utilisateur</button></div><div className="admin-table"><div className="admin-head"><span>Utilisateur</span><span>Rôle</span><span>Statut</span><span /></div>{users.map((u) => <div className="admin-row" key={u.id}><div><strong>{u.name}</strong><small>{u.email}</small></div><span className="role-badge">{u.role}</span><button className={`status-toggle ${u.active ? "active" : ""}`} onClick={() => onChange(users.map((x) => x.id === u.id ? { ...x, active: !x.active } : x))}>{u.active ? "Actif" : "Désactivé"}</button><button className="icon-button danger" disabled={u.role === "ADMIN"} onClick={() => onChange(users.filter((x) => x.id !== u.id))}><Trash2 size={17} /></button></div>)}</div><Modal open={open} title="Créer un utilisateur" onClose={() => setOpen(false)}><div className="form-stack"><label>Nom<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>E-mail<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Mot de passe provisoire<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label><div className="modal-actions"><button className="ghost-button" onClick={() => setOpen(false)}>Annuler</button><button className="primary-button" onClick={add}>Créer</button></div></div></Modal></section>;
}

function SprinklerLogo({ size = 48 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M22 8h20v8H22z" fill="currentColor"/><path d="M27 16h10v12l8 10v5H19v-5l8-10V16z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M14 44h36M20 50h24M26 56h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx="32" cy="31" r="3" fill="#ef4444"/></svg>;
}

function IsoMiniPreview({ iso }: { iso: Isometry }) {
  return <svg viewBox="0 0 120 70" role="img"><defs><pattern id={`g-${iso.id}`} width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="#d8dee8" strokeWidth="0.6"/></pattern></defs><rect width="120" height="70" fill={`url(#g-${iso.id})`} />{iso.segments.slice(0, 10).map((s) => <line key={s.id} x1={s.x1 / 8 + 10} y1={s.y1 / 8 + 10} x2={s.x2 / 8 + 10} y2={s.y2 / 8 + 10} stroke="#ef4444" strokeWidth="2" />)}{iso.segments.length === 0 && <path d="M18 52L45 36l25 12 30-28" fill="none" stroke="#ef4444" strokeWidth="2.5" />}</svg>;
}
