/** @format */

// DynamicHelmet.js
import React from "react";
import { Helmet } from "react-helmet";

// A dynamic component to update the meta tags based on the current content
const DynamicHelmet = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title || "Shahina Hoja Aesthetics"}</title>
      <meta
        name="description"
        content={description || "Shahina Hoja Aesthetics"}
      />

      {/* <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} /> */}
    </Helmet>
  );
};

export default DynamicHelmet;
