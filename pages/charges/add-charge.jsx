import { Box, Button } from 'grommet';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/layout/layout';
import styles from './add-charge.module.css';
import FormBody from '../../components/formBody/formBody';

export default function AddChage() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {}, // TODO: Add default values here to edit?
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
        let response = await fetch('/api/addCharge', {
          method: 'POST',
          body: JSON.stringify(convertedData),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        });
        response = await response.json();
        router.push('/');
      } catch (errorMessage) {
        console.log('errorMessage', errorMessage);
      }
    } else {
      console.log('All fields are required');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add Charge</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <FormBody control={control} />
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
        </Box>
      </form>
    </Layout>
  );
}
