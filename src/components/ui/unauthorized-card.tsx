import Link from "next/link";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import Image from "next/image";

export default function UnauthorizedCard({ className }: any) {
  return (
    <Card className="p-0 max-w-xs w-full border-0 shadow-none">
      <CardHeader className="relative hidden md:block p-0 w-full h-[130px]">
        <Image
          src={"/gpt_image.webp"}
          className="hidden md:block w-full h-[100px] rounded-t-2xl"
          alt="card_image"
          fill
        />
      </CardHeader>

      <CardContent className="flex flex-col items-start mt-2">
        <h4 className="text-lg font-medium">Try advanced features for free</h4>
        <p className="text-sm text-pretty">
          Get smarter responses, upload files, create images, and more by
          logging in.
        </p>
      </CardContent>

      <CardFooter className="mb-5 flex items-center justify-start space-x-2">
        <Link href={"/sign-in"}>
          <Button className="rounded-full cursor-pointer">Login</Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button variant={"outline"} className="rounded-full cursor-pointer">
            Sign up for free
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
