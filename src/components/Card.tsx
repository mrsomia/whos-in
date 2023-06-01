"use client";

import { twMerge } from "tailwind-merge";

export function Card({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        className,
        `shadowm-sm m-4 flex w-[360px] flex-col space-y-2 rounded-lg border border-gray-500 p-2`
      )}
    >
      {children}

      <div></div>
    </div>
  );
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2 p-6">{children}</div>;
}

export function CardHeader({
  className,
  subheading,
  title,
}: {
  title: string;
  subheading?: string;
  className?: string;
}) {
  return (
    <div className={twMerge(className, "space-y-1 p-6")}>
      <h1 className="text-lg font-semibold leading-none">{title}</h1>
      {subheading && <p className="text-sm opacity-70">{subheading}</p>}
    </div>
  );
}
