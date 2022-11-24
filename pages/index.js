import Head from 'next/head';
import { useState, useEffect } from 'react';
import Dashboard from '../components/dashboard/dashboard';
import Layout, { siteTitle } from '../components/layout/layout';

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3000/api/getCharges');
    const charges = await response.json();
    console.log('charges', charges);
    return {
      props: { charges: JSON.parse(JSON.stringify(charges)), isConnected: true },
    };
  } catch (e) {
    console.log('error', e);
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({ charges }) {
  const [listOfCharges, setListOfCharges] = useState();

  useEffect(() => {
    if (charges) setListOfCharges(charges);
  }, [charges]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div>{listOfCharges && <Dashboard charges={listOfCharges} />}</div>
    </Layout>
  );
}
