import Head from 'next/head'
import React from 'react'

export default function SeoComponent({pageTitle, seo}) {
  return (
    <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={seo?.desc} />
        <meta name="keywords" content={seo?.keywords} />
    </Head>
  )
}
