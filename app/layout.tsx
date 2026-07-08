import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bobrepar | Réparation de trottinettes électriques',
  description: 'Bobrepar propose un site vitrine professionnel pour diagnostic, entretien et réparation de trottinettes électriques : freins, pneus, batterie, moteur, éclairage et révision.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='fr'>
      <body>{children}</body>
    </html>
  );
}
