"use client";

import { useEffect } from "react";

import { useAuthContext } from "@/modules/auth/client";

import { BaseLoader } from "@/shared/ui";

export default function GoogleOauth() {
  const context = useAuthContext();

  useEffect(() => {
    context?.authProcess.setInProcessInfluence(true);
    context?.googleAuth.sendCode();

    return () => {
      context?.authProcess.setInProcessInfluence(false);
    };
  }, []);

  return <BaseLoader />;
}
