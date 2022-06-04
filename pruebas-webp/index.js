import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

(async () => {
  await imagemin(["img/*.{jpg,png}"], {
    destination: "build/images",
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.5, 0.7],
      }),
      imageminWebp({ quality: 50 }),
    ],
  });

  console.log("Images optimized");
})();
