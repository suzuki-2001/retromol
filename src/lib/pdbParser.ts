// Simple PDB Parser for protein structure data
export interface Atom {
  serial: number;
  name: string;
  resName: string;
  chainId: string;
  resSeq: number;
  x: number;
  y: number;
  z: number;
  element: string;
}

export interface Bond {
  atom1: number;
  atom2: number;
}

export interface PDBData {
  atoms: Atom[];
  bonds: Bond[];
  title: string;
}

// Element colors for atoms (CPK coloring)
export const ELEMENT_COLORS: Record<string, string> = {
  H: '#FFFFFF',
  C: '#909090',
  N: '#3050F8',
  O: '#FF0D0D',
  S: '#FFFF30',
  P: '#FF8000',
  FE: '#E06633',
  ZN: '#7D80B0',
  MG: '#8AFF00',
  CA: '#3DFF00',
  CL: '#1FF01F',
  NA: '#AB5CF2',
  K: '#8F40D4',
  DEFAULT: '#FF1493',
};

// Retro color palette (limited 16 colors like NES)
export const RETRO_COLORS = [
  '#000000', // Black
  '#FCFCFC', // White
  '#F83800', // Red
  '#F0D0B0', // Peach
  '#503000', // Brown
  '#58F898', // Light Green
  '#00A800', // Green
  '#00A844', // Dark Green
  '#0058F8', // Blue
  '#6888FC', // Light Blue
  '#9878F8', // Purple
  '#F878F8', // Pink
  '#F8B8F8', // Light Pink
  '#FCFC54', // Yellow
  '#F87858', // Orange
  '#787878', // Gray
];

// Map element colors to retro palette
export function getRetroColor(element: string): string {
  const originalColor = ELEMENT_COLORS[element.toUpperCase()] || ELEMENT_COLORS.DEFAULT;

  // Find closest retro color
  const r1 = parseInt(originalColor.slice(1, 3), 16);
  const g1 = parseInt(originalColor.slice(3, 5), 16);
  const b1 = parseInt(originalColor.slice(5, 7), 16);

  let closestColor = RETRO_COLORS[0];
  let minDistance = Infinity;

  for (const retroColor of RETRO_COLORS) {
    const r2 = parseInt(retroColor.slice(1, 3), 16);
    const g2 = parseInt(retroColor.slice(3, 5), 16);
    const b2 = parseInt(retroColor.slice(5, 7), 16);

    const distance = Math.sqrt(
      Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = retroColor;
    }
  }

  return closestColor;
}

export function parsePDB(pdbText: string): PDBData {
  const lines = pdbText.split('\n');
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  let title = '';

  for (const line of lines) {
    const recordType = line.substring(0, 6).trim();

    if (recordType === 'TITLE') {
      title += line.substring(10).trim() + ' ';
    } else if (recordType === 'ATOM' || recordType === 'HETATM') {
      const atom: Atom = {
        serial: parseInt(line.substring(6, 11).trim()),
        name: line.substring(12, 16).trim(),
        resName: line.substring(17, 20).trim(),
        chainId: line.substring(21, 22).trim(),
        resSeq: parseInt(line.substring(22, 26).trim()),
        x: parseFloat(line.substring(30, 38).trim()),
        y: parseFloat(line.substring(38, 46).trim()),
        z: parseFloat(line.substring(46, 54).trim()),
        element: line.substring(76, 78).trim() || line.substring(12, 14).trim().charAt(0),
      };
      atoms.push(atom);
    } else if (recordType === 'CONECT') {
      const serial = parseInt(line.substring(6, 11).trim());
      const bondedAtoms = [
        line.substring(11, 16),
        line.substring(16, 21),
        line.substring(21, 26),
        line.substring(26, 31),
      ]
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));

      for (const bonded of bondedAtoms) {
        if (serial < bonded) {
          bonds.push({ atom1: serial, atom2: bonded });
        }
      }
    }
  }

  // If no CONECT records, generate bonds based on distance
  if (bonds.length === 0) {
    const bondDistance = 1.9; // Angstroms
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const dx = atoms[i].x - atoms[j].x;
        const dy = atoms[i].y - atoms[j].y;
        const dz = atoms[i].z - atoms[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < bondDistance) {
          bonds.push({ atom1: atoms[i].serial, atom2: atoms[j].serial });
        }
      }
    }
  }

  return { atoms, bonds, title: title.trim() };
}

// Sample PDB data for common proteins
export const SAMPLE_PROTEINS: Record<string, { name: string; pdbId: string; description: string }> = {
  '1CRN': { name: 'Crambin', pdbId: '1CRN', description: 'Small plant protein' },
  '1UBQ': { name: 'Ubiquitin', pdbId: '1UBQ', description: 'Regulatory protein' },
  '2PTC': { name: 'Trypsin', pdbId: '2PTC', description: 'Digestive enzyme' },
  '1HHO': { name: 'Hemoglobin', pdbId: '1HHO', description: 'Oxygen carrier' },
  '3NIR': { name: 'GFP', pdbId: '3NIR', description: 'Green fluorescent protein' },
};
