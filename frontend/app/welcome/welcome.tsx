import { Button } from "~/components/ui/button";

export function Welcome() {
  return (
    <main className="flex items-center justify-around pt-16 pb-4">
      <p>Hi </p>
      <Button variant={"outline"} className="cursor-pointer">
        HI there
      </Button>
    </main>
  );
}
