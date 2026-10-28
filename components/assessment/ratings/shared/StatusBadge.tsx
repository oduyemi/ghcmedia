
import { CheckCircle2, Clock3, FileEdit, ShieldCheck } from "lucide-react";
import { reportStatusLabels, type ReportStatus } from "@/data/ratings";


interface StatusBadgeProps {
  status: ReportStatus;
  className?: string;
}

const statusStyles: Record<
  ReportStatus,
  {
    icon: typeof CheckCircle2;
    className: string;
  }
> = {
  draft: {
    icon: FileEdit,
    className: "border-slate-200 bg-slate-100 text-slate-600",
  },
  "pending-review": {
    icon: Clock3,
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  approved: {
    icon: ShieldCheck,
    className: "border-sky-200 bg-sky-50 text-sky-800",
  },
  published: {
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
};

export const StatusBadge = ({
  status,
  className = "",
}: StatusBadgeProps) => {
  const config = statusStyles[status];
  const Icon = config.icon;

  return (
    <span
      className={[
        "inline-flex w-fit items-center gap-1.5 rounded-full border",
        "px-2.5 py-1 text-xs font-semibold leading-4",
        "whitespace-nowrap",
        config.className,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      <span>{reportStatusLabels[status]}</span>
    </span>
  );
}
