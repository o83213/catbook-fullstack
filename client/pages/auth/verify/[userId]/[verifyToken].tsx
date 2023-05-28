import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useConfirmUserMutation } from "../../../../src/generated/graphql";
import { useRouter } from "next/router";
const EmailVerify = (props: VerifyUserProps) => {
  const [validUrl, setValidUrl] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userId, verifyToken } = props;
  const [confrimUser] = useConfirmUserMutation();
  const router = useRouter();
  useEffect(() => {
    const verifyUser = async (userId: string, token: string) => {
      try {
        const response = await confrimUser({
          variables: {
            confirmUserId: userId,
            token: token
          }
        });
        setValidUrl(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        const { message } = error as any;
        setErrorMessage(message);
        setValidUrl(false);
      }
    };
    verifyUser(userId, verifyToken);
  }, [confrimUser, userId, verifyToken, router]);
  return (
    <Fragment>
      {validUrl ? (
        <div>
          <h1>Email verified successfully</h1>
          <Image
            src="/images/success.png"
            width={300}
            height={300}
            alt="verify success image"
          />
          <h1>Redirect to home page after 3sec...</h1>
        </div>
      ) : (
        <div>
          <h1>Something went wrong...</h1>
          <h3>Error: {errorMessage}</h3>
        </div>
      )}
    </Fragment>
  );
};

interface VerifyUserProps {
  userId: string;
  verifyToken: string;
}

interface Params extends NextParsedUrlQuery {
  userId: string;
  verifyToken: string;
}

export const getServerSideProps: GetServerSideProps<
  VerifyUserProps,
  Params
> = async (context) => {
  const { userId, verifyToken } = context.params!;

  return {
    props: {
      userId,
      verifyToken
    }
  };
};

export default EmailVerify;
