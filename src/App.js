import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { theme, themeWithRtl } from './theme';
import { configureStore } from './store';
import routes from './routes';
import TronWeb from 'tronweb';
import GoogleAnalytics from './components/GoogleAnalytics';
import ScrollReset from './components/ScrollReset';
import StylesProvider from './components/StylesProvider';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/main.scss';

const history = createBrowserHistory();
const store = configureStore();

//const FOUNDATION_ADDRESS = 'TYrNrk11FhuZWZEzPZTf6YqaKA6joeApaa';
const FOUNDATION_ADDRESS = 'TQTwzERKEtEGMskK5dTYPWHuk7Z5nLeXSJ';

const waitTron = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0,
      maxAttempts = 10;
    const checkTron = () => {
      if (window.tronWeb) {
        resolve(true);
        return;
      }
      attempts++;
      if (attempts >= maxAttempts) {
        //set a default address
        const TRONGRID_API = 'https://api.trongrid.io';
        window.tronWeb = new TronWeb(TRONGRID_API, TRONGRID_API, TRONGRID_API);

        window.tronWeb.defaultAddress = {
          hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
          base58: FOUNDATION_ADDRESS
        };

        resolve(true);
        return;
      }
      setTimeout(checkTron, 100);
    };
    checkTron();
  });
};

const initContract = async () => {
  let tronExists = await waitTron();
  if (!tronExists) {
    // alert('please install TronLink extension');
    return null;
  }
  //let contract = await window.tronWeb.contract().at('413570caa837e4eb4b93b1f53d7ef8b1d64a933921');
  let contract = await window.tronWeb
    .contract()
    .at('THDwuQsEiNqh8oLFhi7pjcyWCoYv4hSohL');
  return contract;
};

function App() {
  const [direction, setDirection] = useState('ltr');
  const [contract, setContract] = useState(null);
  const [currentPage, setCurrentPage] = useState('avatars');
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    let tronWebCheckerInterval;
    initContract().then(contract => {
      setCurrentAddress(window.tronWeb.defaultAddress.base58);
      setContract(contract);
      tronWebCheckerInterval = setInterval(() => {
        if (currentAddress !== window.tronWeb.defaultAddress.base58) {
          setCurrentAddress(window.tronWeb.defaultAddress.base58);
        }
      }, 1000);
    });
    return () => {
      clearInterval(tronWebCheckerInterval);
    };
  }, []);

  const handleDirecitonToggle = () => {
    setDirection(prevDirection => (prevDirection === 'ltr' ? 'rtl' : 'ltr'));
  };

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={direction === 'rtl' ? themeWithRtl : theme}>
        <StylesProvider direction={direction}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router history={history}>
              <ScrollReset />
              <GoogleAnalytics />

              {!contract && <div>loading</div>}
              {contract && renderRoutes(routes)}
            </Router>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
