import { Deploy, Grow, Time } from 'grommet-icons';
import { Colours } from '../../styles/theme';
import utilStyles from '../../styles/utils.module.css';
import ChargeCard from '../chargeCard/chargeCard';
import DriveCard from '../driveCard/driveCard';
import MetricsCard from '../metricsCard/metricsCard';
import styles from './dashboard.module.css';

export default function Dashboard({ charges }) {
  console.log('charges', charges[0]);
  if (!charges) return null;

  const avgMilesKwh = () => {
    let totalKwhCharged = 0;
    const totalMiles = charges[0].mileage;
    charges.forEach((charge) => {
      totalKwhCharged += charge.kwh;
    });
    return (totalMiles / totalKwhCharged).toFixed(2);
  };

  const totalFreeKwh = () => {
    let totalKwhCharged = 0;
    charges.forEach((charge) => {
      if (charge.pricePerKwh === 0) {
        totalKwhCharged += charge.kwh;
      }
    });
    return totalKwhCharged;
  };

  const totalFreeMiles = () => avgMilesKwh() * totalFreeKwh();

  return (
    <div className={styles.dashboardBody}>
      <div>
        <h2 className={utilStyles.headingLg}>Last Charge</h2>
        <ChargeCard charge={charges[0]} />
      </div>
      <div>
        <h2 className={utilStyles.headingLg}>Driving Stats</h2>
        <DriveCard charges={charges} />
      </div>
      <MetricsCard
        value={avgMilesKwh()}
        icon={<Time color={Colours.blue} size="large" />}
        text1="Average efficiency is"
        text2="miles per kwh"
      />
      <MetricsCard
        value={totalFreeKwh()}
        icon={<Grow color={Colours.green} size="large" />}
        text1="You've charged"
        text2="kwh for free!!"
      />
      <MetricsCard
        value={totalFreeMiles()}
        icon={<Deploy color={Colours.pink} size="large" />}
        text1="You've driven"
        text2="miles for free!!"
      />
    </div>
  );
}
