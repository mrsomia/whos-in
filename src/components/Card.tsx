"use client";

import { twMerge } from "tailwind-merge";

export function Card({
  className,
  title,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        className,
        `shadowm-sm m-4 flex w-[360px] flex-col space-y-2 rounded-lg border border-gray-500 p-2`
      )}
    >
      <CardHeader title={title} subheading="Lorem psum dolor sit amet." />
      <div className="space-y-2 p-6">
        <div>
          <h5>Event title</h5>
        </div>
        <div>
          <h5>Event title</h5>
        </div>
      </div>
      <div></div>
    </div>
  );
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
