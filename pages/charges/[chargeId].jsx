import { Box, Button } from 'grommet';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/layout/layout';
import styles from './add-charge.module.css';
import utilStyles from '../../styles/utils.module.css';
import { Colours } from '../../styles/theme';
import FormBody from '../../components/formBody/formBody';

export async function getServerSideProps(context) {
  const { chargeId } = context.query;
  try {
    const response = await fetch(`/api/getCharge?id=${chargeId}`);
    const charge = await response.json();
    return {
      props: { charge: JSON.parse(JSON.stringify(charge)), isConnected: true },
    };
  } catch (e) {
    console.log('error', e);
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function EditChage({ charge }) {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: { ...charge },
  });

  const onSubmit = async (data) => {
    const convertedData = {
      ...data,
      kwh: Number(data.kwh),
      mileage: Number(data.mileage),
      pricePerKwh: Number(data.pricePerKwh),
      chargeCost: Number((Number(data.kwh) * Number(data.pricePerKwh)).toFixed(2)),
    };

    if (convertedData) {
      try {
        let response = await fetch(`/api/editCharge?id=${charge._id}`, {
          method: 'POST',
          body: JSON.stringify(convertedData),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        });
        response = await response.json();
        console.log('Charge eddited successfully', response);
        router.push('/');
      } catch (errorMessage) {
        console.log('errorMessage', errorMessage);
      }
    } else {
      console.log('All fields are required');
    }
  };

  const handleDeleteCharge = async (chargeId) => {
    try {
      const response = await fetch(`/api/deleteCharge?id=${chargeId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      console.log('Charge deleted successfully', response);
      router.push('/');
    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Edit Charge</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Box direction="row" margin="medium">
          <h2 className={utilStyles.headingXl}>Edit Charge</h2>
        </Box>
        <FormBody control={control} />
        <Box direction="row" gap="medium" justify="between">
          <Button type="submit" primary label="Update" />
          <Button
            type="button"
            color={Colours.red}
            primary
            label="Delete"
            onClick={() => handleDeleteCharge(charge._id)}
          />
        </Box>
      </form>
    </Layout>
  );
}
