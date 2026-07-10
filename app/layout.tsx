import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Bob’Répar | Atelier de réparation de trottinettes électriques à Nantes',
  description: 'Diagnostic rapide, réparation précise et entretien de trottinettes électriques sur l’Île de Nantes. Pannes, freins, batterie, moteur, contrôleur et crevaisons.',
  icons: {
    icon: '/icon.svg'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
