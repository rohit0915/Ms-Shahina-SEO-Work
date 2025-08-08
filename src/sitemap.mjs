/** @format */

import path from "path";
import fs from "fs-extra";
import { SitemapStream, streamToPromise } from "sitemap";

const routes = [
  { path: "/" },
  { path: "/login" },
  { path: "/allproducts/:taype/:id/:name" },
  { path: "/contact" },
  { path: "/aboutus" },
  { path: "/membership" },
  { path: "/shop" },
  { path: "/services/:name" },
  { path: "/gallery" },
  { path: "/paymentplan" },
  { path: "/giftcards" },
  { path: "/acnequiz" },
  { path: "/checkIngredients" },
  { path: "/appointment" },
  { path: "/indiAppointment" },
  { path: "/schedule1" },
  { path: "/schedule2" },
  { path: "/thanks/:id" },
  { path: "/failed/:id" },
  { path: "/indi-services/:id" },
  { path: "/privacy-policy" },
  { path: "/shipping-policy" },
  { path: "/return-policy" },
  { path: "/terms" },
  { path: "/faq" },
  { path: "/forget-password" },
  { path: "/changePassword" },
  { path: "/signup" },
  { path: "/product/:id" },
  { path: "/mycart" },
  { path: "/my-profile" },
  { path: "/password-changed" },
  { path: "/verifySubscription/:id" },
  { path: "/allNews" },
  { path: "/news/:id" },
  { path: "/returningMember" },
  { path: "/product-orders" },
  { path: "/upcoming-orders" },
  { path: "/past-orders" },
  { path: "/guestthanks" },
  { path: "/guestfailed" },
  { path: "/guest-card-saver/:email/:orderId" },
  { path: "/guest-card-saver1/:email" },
  { path: "/confirmation" },
  { path: "/service-booked/:id" },
  { path: "/limited-deals" },
  { path: "/reschedule/:id" },
  { path: "/verifySubscriptionApp" },
  { path: "/faildeSubApp" },
  { path: "/booking-msg/:id" },
  { path: "/give-rating" },
];

async function generateSitemap() {
  const hostname = "https://www.shahinahoja.com";
  const sitemapStream = new SitemapStream({ hostname });
  
  routes.forEach((route) => {
    sitemapStream.write({
      url: route.path,
      changefreq: "daily",
      priority: 0.7,
    });
  });
  
  sitemapStream.end();
  
  const sitemap = await streamToPromise(sitemapStream);
  const outputPath = path.resolve("public", "sitemap.xml");
  
  // Save the sitemap to the public folder
  fs.outputFileSync(outputPath, sitemap.toString());
  console.log("Sitemap has been generated!");
}

generateSitemap().catch((err) => console.error("Error generating sitemap:", err));
