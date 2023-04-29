export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-screen p-16">
      <nav className="grid grid-cols-3 m-auto w-max gap-32">
        <div className="col-span-2">
          <ul className="list-none flex justify-start gap-8">
            <li>Home</li>
            <li>About</li>
            <li>needfuls</li>
          </ul>
        </div>
        <div className="flex justify-end gap-4">
          <button>Sign Up</button>
          <a href="/signin">Sign In</a>
        </div>
      </nav>
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <div className="flex flex-col h-16 items-center w-full gap-8">
          <h1 className="text-3xl">Who's in</h1>
          <p>An app to help you organise those group events. No more texting your friends, who wants to play football</p>
        </div>
          
      </div>
    </main>
  );
}
