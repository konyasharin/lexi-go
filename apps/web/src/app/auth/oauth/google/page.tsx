"use client";

import { useEffect } from "react";

import { useGoogleAuth } from "@/modules/auth/client";

import { BaseLoader } from "@/shared/ui";

export default function GoogleOauth() {
  const googleAuth = useGoogleAuth();

  useEffect(() => {
    googleAuth.sendCode();
  }, []);

  return <BaseLoader />;
}
