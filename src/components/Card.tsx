"use client";

export default function Card({
  className,
  title,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} shadowm-sm m-4 flex w-[360px] flex-col space-y-2 rounded-lg border border-gray-500 p-2`}
    >
      <div className="space-y-1 p-6">
        <h1 className="text-lg font-semibold leading-none">{title}</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="p-6">
        <div>
          <h5>Event title</h5>
        </div>
      </div>
      <div></div>
    </div>
  );
}
