import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withI18N = createNextIntlPlugin('./src/modules/i18n/utils/request.ts');

export default withI18N(nextConfig);
