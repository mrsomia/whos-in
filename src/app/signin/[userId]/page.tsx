
export default function Page({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <main>
      <h2>Sign in</h2>
      <p>Sign in for {params.userId}</p>
      <form>
        <label htmlFor="code">
          Enter Code:
        </label>
        <input
          type="text"
          maxLength={6}
        />
      </form>
    </main>
  )
}

