'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import IsoEditor from '@/components/IsoEditor';

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const [iso, setIso] = useState<any>();
  const [status, setStatus] = useState('Chargement…');

  useEffect(() => {
    fetch(`/api/isometries/${id}`)
      .then((response) => response.json())
      .then((value) => {
        setIso(value);
        setStatus('Enregistré');
      });
  }, [id]);

  async function save(data: any) {
    setStatus('Enregistrement…');
    await fetch(`/api/isometries/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: iso.name, data }),
    });
    setStatus('Enregistré automatiquement');
  }

  if (!iso) return <main className="wrap">Chargement…</main>;

  return (
    <>
      <header>
        <Link href={`/projects/${iso.projectId}`}>← {iso.project.name}</Link>
        <b>{iso.name}</b>
        <span>{status}</span>
        <button onClick={() => window.dispatchEvent(new Event('evo-open-pdf-export'))}>Exporter PDF</button>
      </header>
      <IsoEditor
        initial={iso.data}
        onSave={save}
        documentMeta={{
          isometryId: iso.id,
          isometryName: iso.name,
          projectName: iso.project?.name,
          address: iso.project?.address,
          city: iso.project?.city,
          client: iso.project?.client,
          author: iso.createdBy?.name,
        }}
      />
    </>
  );
}
