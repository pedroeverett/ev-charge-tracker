import { format } from 'date-fns';
import React from 'react';
import { Calculator, Calendar, Car, Connectivity, Map, Money, Trigger } from 'grommet-icons';
import { Colours } from '../../styles/theme';
import utilStyles from '../../styles/utils.module.css';
import styles from './chargeCard.module.css';

export default function ChargeCard({ charge }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardSection}>
        <div className={styles.item}>
          <Calendar color="white" />
          <h1 className={utilStyles.headingLg}>{format(new Date(charge.date), 'dd MMM yyyy')}</h1>
        </div>
        <div className={styles.item}>
          <Car color="white" />
          <h1 className={utilStyles.headingLg}>{charge.mileage} miles</h1>
        </div>
      </div>

      <div className={styles.cardSection}>
        <div className={styles.item}>
          <Map color="white" />
          <h1 className={utilStyles.headingLg}> {charge.chargerLocation}</h1>
        </div>
        <div className={styles.item}>
          <Connectivity color="white" />
          <h1 className={utilStyles.headingLg}>{charge.network}</h1>
        </div>
      </div>
      <div className={styles.cardSection}>
        <div className={styles.item}>
          <Trigger color="white" />
          <h1 className={utilStyles.headingLg}>{charge.kwh} kw</h1>
        </div>
        <div className={styles.item}>
          <Money color="white" />
          <h1 className={utilStyles.headingLg}>{charge.pricePerKwh} £/kw</h1>
        </div>
        <div className={styles.item}>
          <Calculator color={Colours.brand} />
          <h1 className={utilStyles.headingLg}>{charge.chargeCost} £</h1>
        </div>
      </div>
    </div>
  );
}
