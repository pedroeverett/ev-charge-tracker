import React from 'react';
import { Calculator, Car } from 'grommet-icons';
import { Colours } from '../../styles/theme';
import utilStyles from '../../styles/utils.module.css';
import styles from './driveCard.module.css';

export default function DriveCard({ charges }) {
  const totalCost = () => {
    let total = 0;
    charges.forEach((charge) => {
      total += charge.chargeCost;
    });
    return total;
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardSection}>
        <div className={styles.item}>
          <h2 className={utilStyles.headingLg}>You&apos;ve driven:</h2>
        </div>
        <div className={styles.item}>
          <h2 className={utilStyles.headingLg}>It cost:</h2>
        </div>
      </div>

      <div className={styles.cardSection}>
        <div className={styles.item}>
          <Car color="white" />
          {charges[0].mileage} miles
        </div>
        <div className={styles.item}>
          <Calculator color={Colours.brand} />
          {totalCost()} £
        </div>
      </div>
    </div>
  );
}
