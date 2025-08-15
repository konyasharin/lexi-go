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

export default function SignUp() {
  const t = useTranslations("AUTH");

  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle>{t("SIGN_UP_NEW_ACCOUNT")}</CardTitle>
        <CardDescription>
          {t("SIGN_UP_WITH", { serviceName: OAUTH_SERVICES.GOOGLE })}
        </CardDescription>
        <CardAction>
          <Link href={APP_PATHS.SIGN_IN}>
            <Button variant="link">{t("SIGN_IN")}</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <GoogleOauthButton>
          {t("SIGN_UP_WITH", { serviceName: OAUTH_SERVICES.GOOGLE })}
        </GoogleOauthButton>
      </CardFooter>
    </Card>
  );
}
