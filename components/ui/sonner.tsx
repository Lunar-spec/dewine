"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast text-base bg-black/90 text-white group-[.toaster]:shadow-lg group-[.toast]:shadow-white/90",
          description: "group-[.toast]:text-white/60 text-sm",
          actionButton:
            "group-[.toast]:bg-white/90 group-[.toast]:text-black/80",
          cancelButton:
            "group-[.toast]:bg-black/80 group-[.toast]:border-white group-[.toast]:text-white/80",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
