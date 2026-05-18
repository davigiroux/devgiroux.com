'use client';

import { useTranslations } from 'next-intl';
import { ProjectCard, type Project } from './project-card';

export function ProjectsGrid() {
  const t = useTranslations('projects');

  const projects: Project[] = [
    {
      name: 'SafeNudge',
      description: t('items.safenudge.description'),
      status: t('items.safenudge.status'),
      tags: ['Rust', 'Anchor', 'Solana', 'TypeScript', 'React'],
      githubUrl: 'https://github.com/davigiroux/safenudge.xyz',
      liveUrl: 'https://safenudge.xyz',
      blogPostPath: '/blog/building-safenudge-my-first-onchain-app',
    },
    {
      name: 'BaseVault',
      description: t('items.basevault.description'),
      status: t('items.basevault.status'),
      tags: ['Solidity', 'Foundry', 'EVM', 'React', 'TypeScript', 'wagmi'],
      githubUrl: 'https://github.com/davigiroux/BaseVault',
    },
    {
      name: 'FlagKit',
      description: t('items.flagkit.description'),
      status: t('items.flagkit.status'),
      tags: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/davigiroux/flagkit',
    },
    {
      name: 'SolEscrow',
      description: t('items.solescrow.description'),
      status: t('items.solescrow.status'),
      tags: ['Rust', 'Anchor', 'Solana', 'TypeScript'],
      githubUrl: 'https://github.com/davigiroux/sol-escrow',
    },
  ];

  const labels = {
    code: t('links.code'),
    visit: t('links.visit'),
    readPost: t('links.readPost'),
  };

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t('list.label')}
        </p>
        <div className="mb-8 h-px bg-border animate-draw-line" />

        <div className="max-w-4xl">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  );
}
