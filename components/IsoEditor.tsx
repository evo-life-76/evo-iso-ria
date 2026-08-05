'use client';

import { useEffect, useRef, useState } from 'react';

type IsoNode = {
  id: string;
  x: number;
  y: number;
  kind: 'start' | 'junction' | 'ria';
  label?: string;
};

type Segment = {
  id: string;
  a: string;
  b: string;
  dn: number;
  length: number;
};

type IsoEditorProps = {
  initial: {
    nodes?: IsoNode[];
    segments?: Segment[];
    settings?: {
      dn?: number;
      length?: number;
    };
  };
  onSave: (data: {
    nodes: IsoNode[];
    segments: Segment[];
    settings: {
      dn: number;
      length: number;
    };
  }) => void;
};

const directions: Array<[number, number]> = [
  [1, 0],
  [-1, 0],
  [0.5, 0.866],
  [-0.5, -0.866],
  [0.5, -0.866],
  [-0.5, 0.866],
  [0, 1],
  [0, -1],
];

export default function IsoEditor({
  initial,
  onSave,
}: IsoEditorProps) {
  const [nodes, setNodes] = useState<IsoNode[]>(
    initial?.nodes?.length
      ? initial.nodes
      : [
          {
            id: 'n0',
            x: 260,
            y: 500,
            kind: 'start',
            label: 'Départ réseau',
          },
        ],
  );

  const [segments, setSegments] = useState<Segment[]>(
    initial?.segments ?? [],
  );

  const [selected, setSelected] = useState('n0');

  const [tool, setTool] = useState<'pipe' | 'ria' | 'delete'>(
    'pipe',
  );

  const [dn, setDn] = useState(
    initial?.settings?.dn ?? 65,
  );

  const [length, setLength] = useState(
    initial?.settings?.length ?? 10,
  );

  const timer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      onSave({
        nodes,
        segments,
        settings: {
          dn,
          length,
        },
      });
    }, 700);

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, [nodes, segments, dn, length, onSave]);

  function handleCanvasClick(
    event: React.MouseEvent<SVGSVGElement>,
  ) {
    const target = event.target as SVGElement;
    const tagName = target.tagName.toLowerCase();

    if (tagName !== 'svg' && tagName !== 'rect') {
      return;
    }

    const canvasRect =
      event.currentTarget.getBoundingClientRect();

    let x = event.clientX - canvasRect.left;
    let y = event.clientY - canvasRect.top;

    const base =
      nodes.find((node) => node.id === selected) ??
      nodes[0];

    if (!base) {
      return;
    }

    const dx = x - base.x;
    const dy = y - base.y;

    const direction = directions.reduce(
      (best, current) => {
        const currentProjection = Math.abs(
          dx * current[0] + dy * current[1],
        );

        const bestProjection = Math.abs(
          dx * best[0] + dy * best[1],
        );

        return currentProjection > bestProjection
          ? current
          : best;
      },
      directions[0],
    );

    const projection =
      dx * direction[0] + dy * direction[1];

    const distance =
      Math.round(projection / 40) * 40;

    if (distance === 0) {
      return;
    }

    x = base.x + direction[0] * distance;
    y = base.y + direction[1] * distance;

    const nodeId = crypto.randomUUID();

    const newNode: IsoNode = {
      id: nodeId,
      x,
      y,
      kind: tool === 'ria' ? 'ria' : 'junction',
      label:
        tool === 'ria'
          ? `RIA ${
              nodes.filter((node) => node.kind === 'ria')
                .length + 1
            }`
          : undefined,
    };

    setNodes((currentNodes) => [
      ...currentNodes,
      newNode,
    ]);

    setSegments((currentSegments) => [
      ...currentSegments,
      {
        id: crypto.randomUUID(),
        a: base.id,
        b: nodeId,
        dn,
        length,
      },
    ]);

    setSelected(nodeId);
  }

  function deleteNode(nodeId: string) {
    if (nodeId === 'n0') {
      return;
    }

    setNodes((currentNodes) =>
      currentNodes.filter((node) => node.id !== nodeId),
    );

    setSegments((currentSegments) =>
      currentSegments.filter(
        (segment) =>
          segment.a !== nodeId &&
          segment.b !== nodeId,
      ),
    );

    setSelected('n0');
  }

  return (
    <div className="editor-shell">
      <aside>
        <h3>Outils</h3>

        <button
          type="button"
          className={tool === 'pipe' ? 'active' : ''}
          onClick={() => setTool('pipe')}
        >
          Tuyau
        </button>

        <button
          type="button"
          className={tool === 'ria' ? 'active' : ''}
          onClick={() => setTool('ria')}
        >
          RIA
        </button>

        <button
          type="button"
          className={tool === 'delete' ? 'active' : ''}
          onClick={() => setTool('delete')}
        >
          Supprimer
        </button>

        <label>
          Diamètre

          <select
            value={dn}
            onChange={(event) =>
              setDn(Number(event.target.value))
            }
          >
            {[25, 32, 40, 50, 65, 80, 100].map(
              (diameter) => (
                <option
                  key={diameter}
                  value={diameter}
                >
                  DN{diameter}
                </option>
              ),
            )}
          </select>
        </label>

        <label>
          Longueur réelle

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={length}
            onChange={(event) =>
              setLength(Number(event.target.value))
            }
          />
        </label>

        <p>
          Clique sur un point, puis clique sur la
          grille. Le tracé est automatiquement verrouillé
          en direction isométrique.
        </p>
      </aside>

      <svg
        className="canvas"
        onClick={handleCanvasClick}
        viewBox="0 0 1200 700"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="34.64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 34.64L20 0M20 0L40 34.64M0 17.32H40"
              fill="none"
              stroke="#e7ebf0"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect
          width="1200"
          height="700"
          fill="url(#grid)"
        />

        {segments.map((segment) => {
          const startNode = nodes.find(
            (node) => node.id === segment.a,
          );

          const endNode = nodes.find(
            (node) => node.id === segment.b,
          );

          if (!startNode || !endNode) {
            return null;
          }

          return (
            <g key={segment.id}>
              <line
                x1={startNode.x}
                y1={startNode.y}
                x2={endNode.x}
                y2={endNode.y}
                stroke="#111827"
                strokeWidth="4"
              />

              <text
                x={(startNode.x + endNode.x) / 2 + 8}
                y={(startNode.y + endNode.y) / 2 - 8}
                fontSize="14"
                fill="#b42318"
              >
                DN{segment.dn} · {segment.length} m
              </text>
            </g>
          );
        })}

        {nodes.map((node) => (
          <g
            key={node.id}
            className="node"
            onClick={(event) => {
              event.stopPropagation();

              if (tool === 'delete') {
                deleteNode(node.id);
                return;
              }

              setSelected(node.id);
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.kind === 'ria' ? 12 : 7}
              fill={
                selected === node.id
                  ? '#dc2626'
                  : '#ffffff'
              }
              stroke="#111827"
              strokeWidth="3"
            />

            {node.kind === 'ria' && (
              <>
                <path
                  d={`M${node.x - 14} ${
                    node.y - 18
                  }h28v12h-28z`}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="3"
                />

                <text
                  x={node.x + 18}
                  y={node.y + 5}
                  fontSize="16"
                  fontWeight="700"
                >
                  {node.label}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
