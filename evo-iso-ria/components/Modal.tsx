"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="modal-card"><header><h3>{title}</h3><button className="icon-button" onClick={onClose}><X /></button></header>{children}</section></div>;
}
