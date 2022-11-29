import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Dashboard from '../components/dashboard/dashboard';
import Layout, { siteTitle } from '../components/layout/layout';

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/getCharges`);
    const charges = await response.json();
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

export default function Home({ charges, isConnected }) {
  const [listOfCharges, setListOfCharges] = useState();

  useEffect(() => {
    console.log('charges in use effect', charges, isConnected);

    if (charges) setListOfCharges(charges);
  }, [charges]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        {listOfCharges && <Dashboard charges={listOfCharges} />}
        {!isConnected && <div>Error connecting to the DB!!</div>}
      </div>
    </Layout>
  );
}
