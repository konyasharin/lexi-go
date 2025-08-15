import {
  Button,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/components/shadcn";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { GoogleOauthButton, OAUTH_SERVICES } from "@/modules/auth";

import { APP_PATHS } from "@/shared/constants";

export default function SignIn() {
  const t = useTranslations("AUTH");

  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle>{t("SIGN_IN")}</CardTitle>
        <CardDescription>
          {t("SIGN_IN_WITH", { serviceName: OAUTH_SERVICES.GOOGLE })}
        </CardDescription>
        <CardAction>
          <Link href={APP_PATHS.SIGN_UP}>
            <Button variant="link">{t("SIGN_UP")}</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <GoogleOauthButton>
          {t("SIGN_IN_WITH", { serviceName: OAUTH_SERVICES.GOOGLE })}
        </GoogleOauthButton>
      </CardFooter>
    </Card>
  );
}
