import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-violet-500/20 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-violet-500/[0.02] bg-[size:32px_32px]" />

      <div className="container relative mx-auto px-4 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            <span>Welcome to DevGiroux</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-violet-50 sm:text-6xl lg:text-7xl">
            Exploring Code,
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              One Post at a Time
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Dive into the world of web development, programming, and technology.
            Join me on a journey of continuous learning and discovery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/20"
            >
              <Link href="/blog">
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-violet-500/20 hover:border-violet-400/50 hover:bg-violet-500/10"
            >
              <Link href="#latest">
                Latest Posts
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-violet-500/20 pt-12">
            <div>
              <div className="text-3xl font-bold text-violet-400">50+</div>
              <div className="mt-1 text-sm text-zinc-500">Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-400">10+</div>
              <div className="mt-1 text-sm text-zinc-500">Topics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-400">1k+</div>
              <div className="mt-1 text-sm text-zinc-500">Readers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
