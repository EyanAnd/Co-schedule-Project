import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './redux/store';
import App from './components/App';
import { Provider } from 'react-redux'; // bring in provider for redux to managae our store
// chakra componenets
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// grab colors for the theme 
const colors = {
  brand: {
  orange: '#d4765d',
  accent: '#ffe1d1',
  text: '#595959',
  },
};

// create theme
const theme = extendTheme({
  colors,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // wrap in a chakra provider and pass in the theme to use
  <ChakraProvider theme={theme}>
    {/* wrap app in the store of our redux middleware */}
    <Provider store={store}> 
      <App />
    </Provider>
  </ChakraProvider>
);

