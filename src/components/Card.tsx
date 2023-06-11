"use client";

import { twMerge } from "tailwind-merge";

export function Card({
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
        `m-4 flex w-[360px] flex-col space-y-2 rounded-lg border border-gray-500 p-2 shadow-sm`
      )}
    >
      {children}
      {/* <div></div> */}
    </div>
  );
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2 p-4">{children}</div>;
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={twMerge(className, "space-y-1 p-4")}>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-lg font-semibold leading-none">{children}</h1>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm opacity-70">{children}</p>;
}
