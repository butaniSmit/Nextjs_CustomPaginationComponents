import Head from 'next/head'
import { Inter } from 'next/font/google'
import Table from '@/components/table'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Custom Pagination</title>
        <meta name="description" content="Create your own Pagination Component using React without any external libraries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table/>
    </>
  )
}
