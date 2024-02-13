import Head from 'next/head'

const PageHead = ({ title = '' }) => (
  <Head>
    <title>
      {title
        ? `${title} - EventList.africa`
        : 'EventList.africa - Events in South Africa'}
    </title>
    <meta
      name="viewport"
      content="initial-scale=1, width=device-width"
      key="viewport"
    />
    <link rel="icon" href="/favicon.png" key="favicon" />
  </Head>
)

export default PageHead
