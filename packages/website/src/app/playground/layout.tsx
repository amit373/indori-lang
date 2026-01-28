import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Try IndoriLang in your browser with our interactive playground. No installation required.',
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
