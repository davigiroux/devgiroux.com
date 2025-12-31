import { AlertCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'tip';
  children: React.ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-500/10 border-blue-500/30 text-blue-100',
      icon: 'text-blue-400',
      Icon: Info,
    },
    tip: {
      container: 'bg-green-500/10 border-green-500/30 text-green-100',
      icon: 'text-green-400',
      Icon: Lightbulb,
    },
    warning: {
      container: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-100',
      icon: 'text-yellow-400',
      Icon: AlertTriangle,
    },
    error: {
      container: 'bg-red-500/10 border-red-500/30 text-red-100',
      icon: 'text-red-400',
      Icon: AlertCircle,
    },
  };

  const { container, icon, Icon } = styles[type];

  return (
    <div className={`my-6 flex gap-3 rounded-lg border p-4 ${container}`}>
      <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${icon}`} />
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
