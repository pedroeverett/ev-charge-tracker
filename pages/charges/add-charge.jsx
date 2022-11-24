import { Box, Button, FormField, TextInput, DateInput, Select } from 'grommet';
import { Trigger, Map, Connectivity, Money, Car, Calendar } from 'grommet-icons';
import { useForm, Controller } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/layout';
import styles from './add-charge.module.css';

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
    console.log(convertedData);

    if (convertedData) {
      try {
        let response = await fetch('http://localhost:3000/api/addCharge', {
          method: 'POST',
          body: JSON.stringify(convertedData),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        });
        response = await response.json();
        console.log('Post added successfully', response);
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
        <Box direction="row" gap="medium" fill="horizontal" justify="between">
          <Controller
            name="date"
            control={control}
            defaultValue={new Date().toISOString()}
            render={({ field }) => (
              <FormField name="date" htmlFor="date-input-id" label="Date">
                <DateInput
                  id="date-input-id"
                  name="date"
                  format="dd/mm/yyyy"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                  icon={<Calendar color="white" />}
                  style={{ color: 'white' }}
                />
              </FormField>
            )}
          />
          <Controller
            name="mileage"
            control={control}
            render={({ field }) => (
              <FormField name="mileage" htmlFor="mileage-input-id" label="Mileage">
                <TextInput
                  id="mileage-input-id"
                  name="mileage"
                  type="number"
                  {...field}
                  icon={<Car color="white" />}
                  reverse
                  style={{ color: 'white' }}
                />
              </FormField>
            )}
          />
        </Box>
        <Box direction="row" gap="medium" fill="horizontal" justify="between">
          <Controller
            name="kwh"
            control={control}
            render={({ field }) => (
              <FormField name="kwh" htmlFor="kwh-input-id" label="Kwh Charged">
                <TextInput
                  id="kwh-input-id"
                  name="kwh"
                  type="number"
                  {...field}
                  icon={<Trigger color="white" />}
                  reverse
                  style={{ color: 'white' }}
                />
              </FormField>
            )}
          />
          <Controller
            name="pricePerKwh"
            control={control}
            render={({ field }) => (
              <FormField name="pricePerKwh" htmlFor="pricePerKwh-input-id" label="Price Per Kwh">
                <TextInput
                  id="pricePerKwh-input-id"
                  name="pricePerKwh"
                  type="number"
                  {...field}
                  icon={<Money color="white" />}
                  reverse
                  style={{ color: 'white' }}
                />
              </FormField>
            )}
          />
        </Box>
        <Controller
          name="chargerLocation"
          control={control}
          render={({ field }) => (
            <FormField
              name="chargerLocation"
              htmlFor="chargerLocation-input-id"
              label="Charger Location"
            >
              <TextInput
                id="chargerLocation-input-id"
                name="chargerLocation"
                {...field}
                icon={<Map color="white" />}
                reverse
                style={{ color: 'white' }}
              />
            </FormField>
          )}
        />
        <Controller
          name="network"
          control={control}
          render={({ field }) => (
            <FormField name="network" htmlFor="network-input-id" label="Network">
              <Select
                options={['Tesla', 'Charge Place Scotland', 'PlugShare', 'Home', 'Miio', 'Other']}
                {...field}
                icon={<Connectivity color="white" />}
              />
            </FormField>
          )}
        />

        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
        </Box>
      </form>
    </Layout>
  );
}
