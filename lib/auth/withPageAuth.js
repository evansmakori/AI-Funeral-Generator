import { getSession } from "./session";

export function requirePageAuth(getServerSideProps = null) {
  return async function wrapped(ctx) {
    const session = getSession(ctx.req);
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      };
    }

    if (getServerSideProps) {
      const result = await getServerSideProps(ctx);
      return result;
    }

    return { props: {} };
  };
}
