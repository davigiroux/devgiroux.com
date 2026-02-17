'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('share');

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <p className="text-sm text-muted-foreground">
      <span className="text-foreground">Share:</span>
      {' '}
      <button
        onClick={() => handleShare('twitter')}
        className="transition-colors hover:text-primary"
      >
        Twitter
      </button>
      <span className="mx-1.5 text-muted-foreground/30 select-none">/</span>
      <button
        onClick={() => handleShare('linkedin')}
        className="transition-colors hover:text-primary"
      >
        LinkedIn
      </button>
      <span className="mx-1.5 text-muted-foreground/30 select-none">/</span>
      <button
        onClick={() => handleShare('whatsapp')}
        className="transition-colors hover:text-primary"
      >
        WhatsApp
      </button>
      <span className="mx-1.5 text-muted-foreground/30 select-none">/</span>
      <button
        onClick={handleCopyLink}
        className={`transition-colors ${copied ? 'text-primary' : 'hover:text-primary'}`}
      >
        {copied ? t('copied') : t('copyLink')}
      </button>
    </p>
  );
}
