import { MonitorSmartphone } from "lucide-react";

export function ETCIOLogo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-red-600 p-1 rounded-sm mr-1">
        <MonitorSmartphone className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-xl">ETCIO</span>
      <span className="text-sm text-muted-foreground">.com</span>
    </div>
  );
}