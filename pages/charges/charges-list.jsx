import { Spinner } from 'grommet';
import { useState, useEffect } from 'react';
import ChargeCard from '../../components/chargeCard/chargeCard';
import Layout from '../../components/layout/layout';
import styles from './charges-list.module.css';

export async function getServerSideProps() {
  try {
    // await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
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

export default function ChargesList({ charges }) {
  const [listOfCharges, setListOfCharges] = useState();

  useEffect(() => {
    if (charges) setListOfCharges(charges);
  }, [charges]);

  if (!charges) return null;

  return (
    <Layout>
      {!listOfCharges ? (
        <Spinner />
      ) : (
        <ul className={styles.noBullets}>
          {charges.map((charge) => (
            <li className={styles.card}>
              <ChargeCard charge={charge} />
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
