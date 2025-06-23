import React from "react";
import { cn } from "@/lib/utils"; // optional, or use your own class joiner

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}) {
  const calculatedDuration = duration / speed;

  return (
    <div
      className={cn("absolute", className)}
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {path && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            className="stroke-white/10 dark:stroke-white/20"
          />
        </svg>
      )}

      <div
        className={cn(
          "absolute inset-0",
          reverse ? "rotate-z-reverse" : "rotate-z"
        )}
        style={{
          animationDuration: `${calculatedDuration}s`,
          transformOrigin: "center",
        }}
      >
        {React.Children.map(children, (child, index) => {
          const count = React.Children.count(children);
          const angle = (360 / count) * index;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <div
              className="absolute"
              style={{
                left: `calc(50% + ${x}px - ${iconSize / 2}px)`,
                top: `calc(50% + ${y}px - ${iconSize / 2}px)`,
                width: `${iconSize}px`,
                height: `${iconSize}px`,
              }}
              {...props}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
