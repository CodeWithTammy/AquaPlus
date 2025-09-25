import {SitemapStream, streamToPromise} from "sitemap";
import { createWriteStream } from "fs";


async function generateSitemap() {
  const smStream = new SitemapStream({ hostname: "https://aquacarepluspoolsja.com" });
  const writeStream = createWriteStream("./public/sitemap.xml");

  smStream.pipe(writeStream);

  // Add your routes here
  smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
  smStream.write({ url: "/Services", changefreq: "weekly", priority: 0.8 });
  smStream.write({ url: "/AboutUs", changefreq: "monthly", priority: 0.7 });
  smStream.write({ url: "/Rentals", changefreq: "weekly", priority: 0.8 });
  smStream.write({ url: "/Contact-Us", changefreq: "monthly", priority: 0.6 });
  smStream.write({ url: "/Pricing", changefreq: "weekly", priority: 0.8 });

  smStream.end();
  await streamToPromise(smStream);
  console.log("Sitemap generated!");
}

generateSitemap();
