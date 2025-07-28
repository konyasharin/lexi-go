import {
  Button,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/components/shadcn';
import { useTranslations } from 'next-intl';

import { GoogleButton } from '../_components';

export default function SignUp() {
  const t = useTranslations('AUTH');

  return (
    <Card className={'w-full'}>
      <CardHeader>
        <CardTitle>{t('SIGN_UP_NEW_ACCOUNT')}</CardTitle>
        <CardDescription>
          {t('SIGN_UP_WITH', { serviceName: 'Google' })}
        </CardDescription>
        <CardAction>
          <Button variant="link">{t('SIGN_IN')}</Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <GoogleButton>
          {t('SIGN_UP_WITH', { serviceName: 'Google' })}
        </GoogleButton>
      </CardFooter>
    </Card>
  );
}
