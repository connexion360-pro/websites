import './globals.css';

export const metadata = {
  title: 'Bob’Répar | Réparation de trottinettes électriques à Nantes',
  description: 'Bob’Répar répare les trottinettes électriques sur l’Île de Nantes : diagnostic, freins, batterie, moteur, crevaison et entretien complet.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
