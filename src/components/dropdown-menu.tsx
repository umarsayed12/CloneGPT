"use client";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, StarsIcon } from "lucide-react";
import Link from "next/link";
import { SiOpenbadges } from "react-icons/si";
import { useAuth } from "@clerk/nextjs";
type Checked = DropdownMenuCheckboxItemProps["checked"];
export default function DropdownMenuTitle() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h1 className="flex items-center gap-1 text-lg font-semibold cursor-pointer hover:bg-sidebar-accent p-1 rounded-md">
          CloneGPT <ChevronDown className="h-5 w-5" />
        </h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${
          isSignedIn
            ? "w-80 ml-1 md:ml-[30%]"
            : "w-80 h-40 flex items-center md:h-80"
        } rounded-2xl`}
      >
        {isSignedIn ? (
          <>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowStatusBar}
            >
              <div className="flex items-center gap-2">
                <div>
                  <StarsIcon />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">CloneGPT Plus</p>
                  <p className="text-xs">Our smartest model & more</p>
                </div>
                <div>
                  <button className="bg-black cursor-pointer text-white p-1 rounded-3xl px-3">
                    Upgrade
                  </button>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowActivityBar}
            >
              <div className="flex items-center gap-2">
                <div>
                  <SiOpenbadges />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">CloneGPT</p>
                  <p className="text-xs">Great for everyday tasks</p>
                </div>
              </div>
            </DropdownMenuCheckboxItem>
          </>
        ) : (
          <div className="w-full flex flex-col justify-center gap-4">
            <img
              alt="image"
              src="/gpt_image.webp"
              className="hidden md:block w-full h-[150px] rounded-t-2xl"
            ></img>
            <div className="flex flex-col text-start px-3 gap-1">
              <h2 className="text-lg font-semibold">
                Try advanced features for free
              </h2>
              <p className="text-sm">
                Get smarter responses, upload files, create images, and more by
                logging in.
              </p>
            </div>
            <div className="flex justify-start px-3 gap-x-3">
              <Link href={"/sign-in"}>
                <Button className="rounded-full cursor-pointer">Login</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button
                  variant={"outline"}
                  className="rounded-full cursor-pointer"
                >
                  Sign up for free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
