import utilStyles from '../../styles/utils.module.css';
import styles from './metricsCard.module.css';

export default function MetricsCard({ icon, text1, text2, value }) {
  return (
    <div className={styles.card}>
      <div className={styles.item}>
        {icon}
        <h1 className={utilStyles.headingMd}>{text1}</h1>
        <h1 className={utilStyles.headingXl}>{value}</h1>
        <h1 className={utilStyles.headingMd}>{text2}</h1>
      </div>
    </div>
  );
}
