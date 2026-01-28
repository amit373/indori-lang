import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Complete feature list and support matrix for IndoriLang.',
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
