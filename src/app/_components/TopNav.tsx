"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./uploadButton";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex h-20 w-full items-center justify-between border-b p-4 pr-20 text-xl font-semibold">
      <div>
        <Link href="/">Gallery</Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
