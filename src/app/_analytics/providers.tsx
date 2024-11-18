// app/providers.js
"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const UserInfo = useUser();
  useEffect(() => {
    if (auth.isLoaded && UserInfo.isLoaded) {
      if (UserInfo.user) {
        posthog.identify(UserInfo.user.id, {
          email: UserInfo.user.emailAddresses[0]?.emailAddress,
          name: UserInfo.user.fullName,
        });
      } else if (!auth.isSignedIn) {
        posthog.reset();
      }
    }
  }, [UserInfo.isLoaded, UserInfo.user, auth.isLoaded, auth.isSignedIn]);

  return children;
}
