import { cn } from "../lib/utils";

export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-[#2d1e16]/50 rounded-md",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
}
