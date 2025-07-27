import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true
};

const withI18N = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './src/static/locales/en.json',
  },
  requestConfig: './src/modules/i18n/utils/request.ts',
});

export default withI18N(nextConfig);
