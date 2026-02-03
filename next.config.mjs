// next.config.mjs
export default {
  output: 'export',           // создаёт папку out/ с готовым статическим сайтом
  images: { unoptimized: true } // чтобы картинки не ломались при экспорте
};
