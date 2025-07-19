import { formats } from './utils/request';

import messages from '@/static/locales/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: 'en';
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
