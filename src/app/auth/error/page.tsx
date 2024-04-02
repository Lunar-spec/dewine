import Button from "@/components/shared/Button/Button";

const ErrorPage = () => {
  return (
    <div className="flex-center h-screen p-4">
      <article className="bg-white/10 w-full md:w-3/4 flex-col flex-center gap-8 p-4 rounded">
        <section className="flex-center gap-4 flex-col">
          <p className="h3-bold py-2">Oops! something went wrong!</p>
          <p className="text-lg">Please try again later</p>
        </section>
        <section className="flex justify-center items-center w-3/4">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">OR</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </section>
        <div className="flex flex-col gap-4">
          Some solutions:
          <ul className="flex gap-2 flex-col">
            <li>
              1. Double-check your username/email and password for any typos or
              mistakes.
            </li>
            <li>
              2. If you&apos;ve forgotten your password, use the &quot;Forgot
              Password&quot; feature to reset it.
            </li>
            <li>
              3. Make sure your account is not locked or suspended due to
              multiple failed login attempts.
            </li>
            <li>
              4. Verify that your account is active and not deactivated for any
              reason.
            </li>
            <li>
              5. If you&apos;re still unable to log in, try resetting your
              account password or contacting support for assistance.
            </li>
          </ul>
        </div>
        <Button text="Home" to="/" />
      </article>
    </div>
  );
};

export default ErrorPage;
