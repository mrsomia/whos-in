"use client";

export default function Home() {
  return (
    <main className="flex w-screen flex-col items-center justify-between p-16">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <div className="flex h-16 w-full flex-col items-center gap-8">
          <h1 className="text-3xl">Who&apos;s in</h1>
          <p>
            An app to help you organise those group events. No more texting your
            friends, who wants to play football
          </p>
        </div>
      </div>
    </main>
  );
}
