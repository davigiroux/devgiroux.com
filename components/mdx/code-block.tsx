"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
}

export function CodeBlock({ children, ...props }: CodeBlockProps & React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (!preRef.current) return;

    // Get text content from the pre element
    const code = preRef.current.textContent || "";

    if (code) {
      try {
        await navigator.clipboard.writeText(code.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="relative group my-6">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-lg border border-violet-500/20 bg-zinc-950 p-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
