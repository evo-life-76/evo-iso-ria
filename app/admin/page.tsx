'use client';

import Link from 'next/link';
import { FormEvent, useCallback, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const loadUsers = useCallback(async () => {
    const response = await fetch('/api/users');

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setUsers(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function addUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      return;
    }

    setForm({
      name: '',
      email: '',
      password: '',
    });

    await loadUsers();
  }

  return (
    <main className="wrap">
      <Link href="/dashboard">← Accueil</Link>

      <h1>Administration</h1>

      <form className="panel" onSubmit={addUser}>
        <h2>Créer un utilisateur</h2>

        <input
          placeholder="Nom"
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
          required
        />

        <input
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm({ ...form, email: event.target.value })
          }
          required
        />

        <input
          placeholder="Mot de passe"
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          required
        />

        <button type="submit">Créer le compte</button>
      </form>

      <div className="panel">
        <h2>Utilisateurs</h2>

        {users.map((user) => (
          <div className="user-row" key={user.id}>
            <b>{user.name}</b>
            <span>{user.email}</span>
            <small>{user.role}</small>
          </div>
        ))}
      </div>
    </main>
  );
}
