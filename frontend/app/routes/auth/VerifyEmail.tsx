import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Card, CardHeader } from "~/components/ui/card";
import { ArrowLeft } from "lucide-react";
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const [isSunccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-gray-500">Verifying your email .... </p>

      <Card className="w-full max-w-md">
        <CardHeader>
          <Link to={"/sign-in"}>
            <ArrowLeft className="size-4 mr-2" />
            Back to sign in
          </Link>
        </CardHeader>
      </Card>
    </div>
  );
};

export default VerifyEmail;
