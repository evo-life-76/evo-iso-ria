"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Download, MousePointer2, Plus, RotateCcw, Save, Trash2, Undo2, ZoomIn, ZoomOut } from "lucide-react";
import jsPDF from "jspdf";
import type { Isometry, IsoNode, IsoSegment, Project } from "@/lib/store";

type Tool = "select" | "pipe" | "ria" | "valve" | "delete";

const snap = (n: number) => Math.round(n / 20) * 20;
const directions = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 0.866, dy: 0.5 },
  { dx: -0.866, dy: -0.5 },
  { dx: 0.866, dy: -0.5 },
  { dx: -0.866, dy: 0.5 },
];

function constrain(x1: number, y1: number, x2: number, y2: number) {
  const vx = x2 - x1;
  const vy = y2 - y1;
  const length = Math.sqrt(vx * vx + vy * vy) || 1;
  const unit = { x: vx / length, y: vy / length };
  let best = directions[0];
  let score = -Infinity;
  for (const d of directions) {
    const dot = unit.x * d.dx + unit.y * d.dy;
    if (dot > score) { score = dot; best = d; }
  }
  const projected = vx * best.dx + vy * best.dy;
  return { x: snap(x1 + best.dx * projected), y: snap(y1 + best.dy * projected) };
}

export function IsoEditor({ project, isometry, onChange, onBack }: { project: Project; isometry: Isometry; onChange: (iso: Isometry) => void; onBack: () => void }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tool, setTool] = useState<Tool>("select");
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftStart, setDraftStart] = useState<{ x: number; y: number } | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState<Isometry[]>([]);

  const selectedSegment = useMemo(() => isometry.segments.find((s) => s.id === selectedId) ?? null, [isometry.segments, selectedId]);
  const selectedNode = useMemo(() => isometry.nodes.find((n) => n.id === selectedId) ?? null, [isometry.nodes, selectedId]);

  const commit = (next: Isometry) => {
    setHistory((h) => [...h.slice(-24), structuredClone(isometry)]);
    onChange({ ...next, updatedAt: new Date().toISOString() });
  };

  const coords = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: snap((e.clientX - rect.left) / zoom), y: snap((e.clientY - rect.top) / zoom) };
  };

  const onCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as Element).closest("[data-item]")) return;
    const p = coords(e);
    if (tool === "pipe") {
      if (!draftStart) { setDraftStart(p); return; }
      const end = constrain(draftStart.x, draftStart.y, p.x, p.y);
      const segment: IsoSegment = {
        id: crypto.randomUUID(),
        x1: draftStart.x, y1: draftStart.y, x2: end.x, y2: end.y,
        length: Math.max(0.1, Math.round((Math.hypot(end.x - draftStart.x, end.y - draftStart.y) / 20) * 10) / 10),
        dn: 50, material: "Acier galvanisé", label: `T${isometry.segments.length + 1}`,
      };
      commit({ ...isometry, segments: [...isometry.segments, segment] });
      setDraftStart(end);
      setSelectedId(segment.id);
      return;
    }
    if (tool === "ria" || tool === "valve") {
      const count = isometry.nodes.filter((n) => n.type === (tool === "ria" ? "RIA" : "VALVE")).length + 1;
      const node: IsoNode = { id: crypto.randomUUID(), type: tool === "ria" ? "RIA" : "VALVE", x: p.x, y: p.y, label: tool === "ria" ? `RIA ${count}` : `Vanne ${count}`, dn: tool === "ria" ? 33 : 50, altitude: 0 };
      commit({ ...isometry, nodes: [...isometry.nodes, node] }); setSelectedId(node.id); setTool("select"); return;
    }
    setSelectedId(null);
  };

  const removeSelected = () => {
    if (!selectedId) return;
    commit({ ...isometry, nodes: isometry.nodes.filter((n) => n.id !== selectedId), segments: isometry.segments.filter((s) => s.id !== selectedId) });
    setSelectedId(null);
  };

  const updateSegment = (patch: Partial<IsoSegment>) => {
    if (!selectedSegment) return;
    onChange({ ...isometry, updatedAt: new Date().toISOString(), segments: isometry.segments.map((s) => s.id === selectedSegment.id ? { ...s, ...patch } : s) });
  };
  const updateNode = (patch: Partial<IsoNode>) => {
    if (!selectedNode) return;
    onChange({ ...isometry, updatedAt: new Date().toISOString(), nodes: isometry.nodes.map((n) => n.id === selectedNode.id ? { ...n, ...patch } : n) });
  };

  const undo = () => {
    const prev = history.at(-1); if (!prev) return;
    setHistory((h) => h.slice(0, -1)); onChange(prev); setSelectedId(null); setDraftStart(null);
  };

  const exportPdf = () => {
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a3" });
    pdf.setDrawColor(25); pdf.rect(8, 8, 404, 281);
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(17); pdf.text("ISOMETRIE DE CALCUL RESEAU RIA", 18, 22);
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.text(`${project.name} — ${isometry.name}`, 18, 29);
    pdf.text(`${project.address} ${project.city}`.trim(), 18, 34);
    const scaleX = 0.42, scaleY = 0.34, ox = 24, oy = 48;
    pdf.setLineWidth(0.6);
    for (const s of isometry.segments) {
      pdf.setDrawColor(20); pdf.line(ox + s.x1 * scaleX, oy + s.y1 * scaleY, ox + s.x2 * scaleX, oy + s.y2 * scaleY);
      const mx = ox + ((s.x1 + s.x2) / 2) * scaleX; const my = oy + ((s.y1 + s.y2) / 2) * scaleY;
      pdf.setFontSize(6.5); pdf.setTextColor(175, 20, 55); pdf.text(`${s.label}  DN${s.dn}  ${s.length.toFixed(1)} m`, mx, my - 2);
    }
    for (const n of isometry.nodes) {
      const x = ox + n.x * scaleX, y = oy + n.y * scaleY;
      if (n.type === "RIA") { pdf.setDrawColor(210, 0, 35); pdf.circle(x, y, 3); pdf.setFontSize(7); pdf.setTextColor(210, 0, 35); pdf.text(`${n.label} DN${n.dn ?? 33}`, x + 5, y - 1); }
      if (n.type === "VALVE") { pdf.setDrawColor(0); pdf.triangle(x - 2, y - 2, x + 2, y, x - 2, y + 2, "S"); }
    }
    pdf.setTextColor(20); pdf.setDrawColor(20);
    pdf.rect(295, 250, 117, 39); pdf.setFontSize(7); pdf.text("AFFAIRE", 299, 257); pdf.setFont("helvetica", "bold"); pdf.setFontSize(10); pdf.text(project.name, 299, 265); pdf.setFont("helvetica", "normal"); pdf.setFontSize(7); pdf.text("DOCUMENT : ISOMETRIE RIA", 299, 273); pdf.text(`DATE : ${new Date().toLocaleDateString("fr-FR")}`, 299, 280); pdf.text("FORMAT : A3   ECHELLE : SANS", 355, 280);
    pdf.save(`${project.name}-${isometry.name}.pdf`.replaceAll(" ", "-").toLowerCase());
  };

  return <div className="iso-editor">
    <div className="editor-topbar">
      <button className="icon-button" onClick={onBack}><ArrowLeft /></button>
      <div className="editor-title"><strong>{isometry.name}</strong><span>{project.name}</span></div>
      <div className="editor-status"><Save size={15} /> Sauvegarde automatique</div>
      <button className="secondary-button" onClick={exportPdf}><Download size={17} /> Exporter PDF</button>
    </div>
    <div className="editor-workspace">
      <aside className="toolbox">
        <ToolButton active={tool === "select"} label="Sélection" onClick={() => { setTool("select"); setDraftStart(null); }} icon={<MousePointer2 />} />
        <ToolButton active={tool === "pipe"} label="Tuyau" onClick={() => setTool("pipe")} icon={<PipeIcon />} />
        <ToolButton active={tool === "ria"} label="RIA" onClick={() => { setTool("ria"); setDraftStart(null); }} icon={<RiaIcon />} />
        <ToolButton active={tool === "valve"} label="Vanne" onClick={() => { setTool("valve"); setDraftStart(null); }} icon={<ValveIcon />} />
        <div className="tool-separator" />
        <ToolButton active={false} label="Annuler" onClick={undo} disabled={history.length === 0} icon={<Undo2 />} />
        <ToolButton active={false} label="Supprimer" onClick={removeSelected} disabled={!selectedId} icon={<Trash2 />} danger />
      </aside>

      <div className="canvas-shell">
        <div className="canvas-zoom"><button onClick={() => setZoom((z) => Math.min(1.6, z + .1))}><ZoomIn /></button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom((z) => Math.max(.6, z - .1))}><ZoomOut /></button><button onClick={() => setZoom(1)}><RotateCcw /></button></div>
        <svg ref={svgRef} className="iso-canvas" width={1100 * zoom} height={720 * zoom} viewBox={`0 0 ${1100 / zoom} ${720 / zoom}`} onMouseMove={(e) => setPointer(coords(e))} onClick={onCanvasClick}>
          <defs>
            <pattern id="iso-grid" width="40" height="34.64" patternUnits="userSpaceOnUse"><path d="M0 17.32L20 0M0 17.32L20 34.64M20 0L40 17.32M20 34.64L40 17.32" stroke="#dfe5ee" strokeWidth="0.8" fill="none" /></pattern>
          </defs>
          <rect width="1100" height="720" fill="#fff" />
          {isometry.settings.showGrid && <rect width="1100" height="720" fill="url(#iso-grid)" />}
          {draftStart && <line x1={draftStart.x} y1={draftStart.y} x2={constrain(draftStart.x, draftStart.y, pointer.x, pointer.y).x} y2={constrain(draftStart.x, draftStart.y, pointer.x, pointer.y).y} stroke="#ef4444" strokeWidth="3" strokeDasharray="8 7" />}
          {isometry.segments.map((s) => <g key={s.id} data-item="segment" onClick={(e) => { e.stopPropagation(); if (tool === "delete") { setSelectedId(s.id); removeSelected(); } else { setSelectedId(s.id); setTool("select"); } }} className={selectedId === s.id ? "selected-segment" : ""}><line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#1e293b" strokeWidth="5" strokeLinecap="round" /><line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="transparent" strokeWidth="20" /><text x={(s.x1+s.x2)/2} y={(s.y1+s.y2)/2 - 12} textAnchor="middle" className="pipe-label">{s.label} · DN{s.dn} · {s.length.toFixed(1)} m</text><circle cx={s.x1} cy={s.y1} r="4" className="joint"/><circle cx={s.x2} cy={s.y2} r="4" className="joint"/></g>)}
          {isometry.nodes.map((n) => <g key={n.id} data-item="node" transform={`translate(${n.x} ${n.y})`} onClick={(e) => { e.stopPropagation(); setSelectedId(n.id); setTool("select"); }} className={selectedId === n.id ? "selected-node" : ""}>{n.type === "RIA" ? <><circle r="15" fill="#fff" stroke="#dc2626" strokeWidth="4"/><path d="M-7 0h14M0-7v14" stroke="#dc2626" strokeWidth="2"/><text x="22" y="4" className="ria-label">{n.label}</text></> : n.type === "VALVE" ? <><path d="M-12-9L0 0-12 9ZM12-9L0 0 12 9Z" fill="#fff" stroke="#0f172a" strokeWidth="2"/><text x="20" y="4" className="node-label">{n.label}</text></> : <><rect x="-15" y="-12" width="30" height="24" rx="5" fill="#0f172a"/><text x="22" y="4" className="node-label">{n.label}</text></>}</g>)}
        </svg>
      </div>

      <aside className="properties-panel">
        <div className="panel-heading"><span>Propriétés</span><small>{selectedSegment ? "Tronçon" : selectedNode ? "Équipement" : "Aucune sélection"}</small></div>
        {!selectedSegment && !selectedNode && <div className="panel-empty"><MousePointer2 size={30}/><p>Sélectionnez un tuyau ou un équipement pour modifier ses informations.</p></div>}
        {selectedSegment && <div className="property-form"><label>Repère<input value={selectedSegment.label} onChange={(e) => updateSegment({ label: e.target.value })}/></label><label>Longueur réelle (m)<input type="number" step="0.1" value={selectedSegment.length} onChange={(e) => updateSegment({ length: Number(e.target.value) })}/></label><label>Diamètre<select value={selectedSegment.dn} onChange={(e) => updateSegment({ dn: Number(e.target.value) })}>{[25,32,40,50,65,80,100].map((dn) => <option key={dn} value={dn}>DN{dn}</option>)}</select></label><label>Matériau<select value={selectedSegment.material} onChange={(e) => updateSegment({ material: e.target.value })}><option>Acier galvanisé</option><option>Acier noir</option><option>Inox</option><option>Cuivre</option></select></label><div className="info-box">Les angles sont automatiquement alignés sur les directions isométriques.</div></div>}
        {selectedNode && <div className="property-form"><label>Nom<input value={selectedNode.label} onChange={(e) => updateNode({ label: e.target.value })}/></label><label>Diamètre<select value={selectedNode.dn ?? 33} onChange={(e) => updateNode({ dn: Number(e.target.value) })}>{[25,33,40,50,65].map((dn) => <option key={dn} value={dn}>DN{dn}</option>)}</select></label><label>Altitude (m)<input type="number" step="0.1" value={selectedNode.altitude ?? 0} onChange={(e) => updateNode({ altitude: Number(e.target.value) })}/></label></div>}
        <div className="panel-summary"><strong>Résumé du plan</strong><div><span>Tronçons</span><b>{isometry.segments.length}</b></div><div><span>RIA</span><b>{isometry.nodes.filter(n => n.type === "RIA").length}</b></div><div><span>Longueur totale</span><b>{isometry.segments.reduce((a,s)=>a+s.length,0).toFixed(1)} m</b></div></div>
      </aside>
    </div>
  </div>;
}

function ToolButton({ active, label, icon, onClick, disabled, danger }: { active: boolean; label: string; icon: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return <button className={`tool-button ${active ? "active" : ""} ${danger ? "danger" : ""}`} onClick={onClick} disabled={disabled}>{icon}<span>{label}</span></button>;
}
function PipeIcon(){return <svg width="23" height="23" viewBox="0 0 24 24"><path d="M4 18L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><circle cx="4" cy="18" r="2" fill="currentColor"/><circle cx="20" cy="6" r="2" fill="currentColor"/></svg>}
function RiaIcon(){return <svg width="23" height="23" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2"/></svg>}
function ValveIcon(){return <svg width="23" height="23" viewBox="0 0 24 24"><path d="M3 5l9 7-9 7V5zm18 0l-9 7 9 7V5z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>}
