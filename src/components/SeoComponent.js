import Head from 'next/head'
import React from 'react'

export default function SeoComponent({pageTitle, seo}) {
  return (
    <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="https://res.cloudinary.com/dbqfsf3wi/image/upload/v1742291097/logo_tnnclr.png" />
        <meta name="description" content={seo?.desc} />
        <meta name="keywords" content={seo?.keywords} />
    </Head>
  )
}
