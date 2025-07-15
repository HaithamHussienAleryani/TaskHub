import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ArrowLeft, CheckCircle, Loader, XCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useVerifyEmailMutation } from "~/hooks/use-auth";
import { toast } from "sonner";
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  useEffect(() => {
    if (!token) {
      setIsSuccess(false);
    } else {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
            setIsSuccess(false);
            console.log(error);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying || isSuccess === undefined ? (
              <>
                <Loader className="size-10 text-gray-500 animate-spin " />
                <h3 className="text-lg font-semibold">Verifying Email</h3>
                <p className="text-sm text-gray-500">
                  Please wait while we verify your email
                </p>
              </>
            ) : isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-y-2">
                <CheckCircle className="size-10 text-green-500" />
                <h3 className="text-lg font-semibold">Email Verified</h3>
                <p className="text-sm text-gray-500">
                  Your email has been verified successfully
                </p>
                <Link to={"/sign-in"} className="text-sm mt-4 text-blue-500">
                  <Button>Back to sign in </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-y-2">
                <XCircle className="size-10 text-red-500" />
                <h3 className="text-lg font-semibold">
                  Email Verification Failed
                </h3>
                <p className="text-sm text-gray-500">
                  Your email verification has failed. Please try again.
                </p>
                <Link to={"/sign-in"} className="text-sm mt-4 text-blue-500">
                  <Button>Back to sign in </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
