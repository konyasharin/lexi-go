"use client";

import { useContext, useEffect } from "react";

import { AuthContext } from "@/modules/auth";

import { BaseLoader } from "@/shared/ui";

export default function GoogleOauth() {
  const context = useContext(AuthContext);

  useEffect(() => {
    context?.authProcess.setInProcessInfluence(true);
    context?.googleAuth.sendCode();

    return () => {
      context?.authProcess.setInProcessInfluence(false);
    };
  }, []);

  return <BaseLoader />;
}
