export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-screen p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <div className="flex flex-col h-16 items-center w-full gap-8">
          <h1 className="text-3xl">Who's in</h1>
          <p>An app to help you organise those group events. No more texting your friends, who wants to play football</p>
        </div>
          
      </div>
      <div className="flex justify-between gap-4">
        <button>Sign Up</button>
        <button>Sign In</button>
      </div>
    </main>
  );
}
