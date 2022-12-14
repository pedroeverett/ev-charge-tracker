/* eslint-disable jsx-a11y/anchor-is-valid */
import { Spinner } from 'grommet';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ChargeCard from '../../components/chargeCard/chargeCard';
import Layout from '../../components/layout/layout';
import styles from './charges-list.module.css';

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

export default function ChargesList({ charges }) {
  const [listOfCharges, setListOfCharges] = useState();

  useEffect(() => {
    if (charges) setListOfCharges(charges);
  }, [charges]);

  // if (!charges) return null;

  return (
    <Layout>
      {!listOfCharges ? (
        <Spinner />
      ) : (
        <ul className={styles.noBullets}>
          {charges.map((charge) => (
            <li className={styles.card} key={charge._id}>
              <Link href={`/charges/${charge._id}`}>
                <a>
                  <ChargeCard charge={charge} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
