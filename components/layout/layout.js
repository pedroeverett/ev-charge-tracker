/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'grommet';
import { Add, Capacity, List } from 'grommet-icons';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';
import breakpoints from '../../styles/breakpoints';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Colours } from '../../styles/theme';

const name = 'Ev Charging Tracker';
export const siteTitle = 'Ev Charging Tracker';

export default function Layout({ children, home }) {
  // do I need the mediaQuery or not?
  const isMobile = useMediaQuery(breakpoints.mobileDown);
  console.log('isMobile', isMobile);
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Ev Charging Tracker" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {home ? (
            <>
              <Capacity color={Colours.brand} size="large" />
              <h2 className={utilStyles.headingLg}>{name}</h2>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <Capacity color={Colours.brand} size="large" />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </div>
        <div className={styles.headerRight}>
          <Link href="/charges/add-charge">
            <a>
              <Button primary icon={<Add color="white" />} />
            </a>
          </Link>
          <Link href="/charges/charges-list">
            <a>
              <Button primary icon={<List color="white" />} />
            </a>
          </Link>
        </div>
      </header>
      {/* <main>{children}</main> */}
      <div className={styles.main}>{children}</div>
    </div>
  );
}
