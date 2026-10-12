import type {NextConfig} from 'next';
const config:NextConfig={reactStrictMode:true,async redirects(){return [{source:'/produkt/smartsleep-recovery-pillow',destination:'/produkt/blackroll-recovery-pillow',permanent:true}]}};
export default config;
