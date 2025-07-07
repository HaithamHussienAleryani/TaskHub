import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub | Your task partner" },
    { name: "description", content: "Welecome to TaskHub ! " },
  ];
}

const HomePage = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <Link to={"/sign-in"}>
        <Button className="cursor-pointer" size={"lg"} variant={"outline"}>
          Login
        </Button>
      </Link>
      <Link to={"/sign-up"}>
        <Button className="cursor-pointer" size={"lg"} variant={"outline"}>
          Create account
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
