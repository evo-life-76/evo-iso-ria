"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export function Login({ onLogin }: { onLogin: (email: string, password: string) => boolean }) {
  const [email, setEmail] = useState("admin@ria.local");
  const [password, setPassword] = useState("Admin123!");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  return <main className="login-page"><div className="login-glow" /><section className="login-card"><div className="login-logo"><svg width="86" height="86" viewBox="0 0 64 64" fill="none"><path d="M22 8h20v8H22z" fill="currentColor"/><path d="M27 16h10v12l8 10v5H19v-5l8-10V16z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M14 44h36M20 50h24M26 56h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx="32" cy="31" r="3" fill="#ef4444"/></svg></div><form onSubmit={(e) => { e.preventDefault(); const ok = onLogin(email, password); setError(ok ? "" : "Identifiants incorrects ou compte désactivé."); }}><label>Adresse e-mail<div className="input-with-icon"><Mail size={18} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></div></label><label>Mot de passe<div className="input-with-icon"><LockKeyhole size={18} /><input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>{error && <p className="form-error">{error}</p>}<button className="login-button" type="submit">Se connecter</button></form><p className="demo-note">Compte de démonstration prérempli</p></section></main>;
}
