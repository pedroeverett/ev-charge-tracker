import React from 'react';
import { Box, FormField, TextInput, DateInput, Select } from 'grommet';
import { Trigger, Map, Connectivity, Money, Car, Calendar } from 'grommet-icons';
import { Controller } from 'react-hook-form';
import { Colours } from '../../styles/theme';
import styles from './formBody.module.css';

export default function FormBody({ control }) {
  return (
    <>
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
            <FormField name="kwh" htmlFor="kwh-input-id" label="Kw Charged">
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
            <FormField name="pricePerKwh" htmlFor="pricePerKwh-input-id" label="Price Per Kw">
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
              className={styles.select}
              options={['Tesla', 'Charge Place Scotland', 'PlugShare', 'Home', 'Miio', 'Other']}
              {...field}
              icon={<Connectivity color="white" />}
              dropProps={{ background: { color: `${Colours.darkGrey}` } }}
            />
          </FormField>
        )}
      />
    </>
  );
}
