"use client";

import { ActivityCalendar, type ThemeInput } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Day = { date: string; count: number; level: number };

const themeAccent: ThemeInput = {
  light: ["rgba(26,24,21,0.06)", "#F5C8A8", "#E89B6E", "#DC7A40", "#B85F2D"],
  dark: ["rgba(232,230,224,0.06)", "#3A2519", "#7A4222", "#B85F2D", "#E07A3C"],
};

export function GitHubCalendarClient({ data }: { data: Day[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Hide until theme is known to avoid FOUC of wrong palette
  if (!mounted) {
    return <div className="h-[110px]" aria-hidden />;
  }

  return (
    <ActivityCalendar
      data={data}
      theme={themeAccent}
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      blockSize={11}
      blockMargin={4}
      blockRadius={2}
      fontSize={11}
      labels={{
        totalCount: "{{count}} contributions in the last year",
      }}
    />
  );
}
