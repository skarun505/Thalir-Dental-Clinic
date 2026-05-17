import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image, url }) {
    const siteTitle = 'Thalir Kids Dental Clinic in Erode';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    
    const defaultDescription = "Thalir Kids Dental Clinic in Erode is a premium pediatric dental clinic offering pain-free, fun dental care for kids. Win exciting surprise gifts on every visit!";
    const finalDescription = description || defaultDescription;
    
    const defaultKeywords = "kids dental clinic erode, pediatric dentist erode, children dentist, pain-free dental care for kids, kids dental care near me, baby teeth cleaning, tongue tie treatment erode, kids cavity treatment";
    const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
    
    const finalImage = image || "https://thalirdental.com/images-optimized/thalir-logo.webp";
    const finalUrl = url ? `https://thalirdental.com${url}` : "https://thalirdental.com/";

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={finalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />
        </Helmet>
    );
}
