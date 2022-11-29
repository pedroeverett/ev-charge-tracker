import { Grommet } from 'grommet';
import React from 'react';
import '../styles/global.css';
import { EvTheme } from '../styles/theme';

function App({ Component, pageProps }) {
  return (
    <Grommet className="App" theme={EvTheme}>
      <Component {...pageProps} />
    </Grommet>
  );
}

export default App;
