import './globals.css';

export const metadata = {
  title: 'Bob Repare - Reparation trottinettes Nantes',
  description: 'Reparation de trottinettes electriques a Nantes sur l ile de Nantes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
