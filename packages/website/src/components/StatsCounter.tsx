'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Github, Download } from 'lucide-react';

interface StatsCounterProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
}

function AnimatedCounter({ value, label, icon }: StatsCounterProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon}
        <motion.span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {display}
        </motion.span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function StatsCounter() {
  const [githubStars, setGithubStars] = useState(0);
  const [npmDownloads, setNpmDownloads] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub stars
    fetch('https://api.github.com/repos/indori-lang/indori-lang')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setGithubStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Fallback if API fails
        setGithubStars(0);
      });

    // Fetch npm downloads (last 30 days)
    fetch('https://api.npmjs.org/downloads/range/last-month/@indori-lang/compiler')
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads) {
          const total = data.downloads.reduce((sum: number, day: { downloads: number }) => sum + day.downloads, 0);
          setNpmDownloads(total);
        }
      })
      .catch(() => {
        // Fallback if API fails
        setNpmDownloads(0);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading && githubStars === 0 && npmDownloads === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <div className="text-center">
          <div className="h-12 w-12 bg-muted animate-pulse rounded mx-auto mb-2" />
          <div className="h-4 w-24 bg-muted animate-pulse rounded mx-auto" />
        </div>
        <div className="text-center">
          <div className="h-12 w-12 bg-muted animate-pulse rounded mx-auto mb-2" />
          <div className="h-4 w-24 bg-muted animate-pulse rounded mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <AnimatedCounter
        value={githubStars}
        label="GitHub Stars"
        icon={<Github className="h-6 w-6 text-primary" />}
      />
      <AnimatedCounter
        value={npmDownloads}
        label="NPM Downloads (30 days)"
        icon={<Download className="h-6 w-6 text-primary" />}
      />
    </div>
  );
}
