import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: unknown = useRouteError();
  const myError = error as Error;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>ENV {import.meta.env.NODE_ENV}</p>
      <p>
        {/* // disable-next-line */}
        <i>{ myError.message}</i>
      </p>
    </div>
  );
}