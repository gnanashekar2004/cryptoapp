import React, { useState } from 'react';

import WalletConnect from './components/WalletConnect';
import WatchList from './components/WatchList';

import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const handleWalletConnect = (providerInstance, accountAddress)=>{
    setProvider(providerInstance);
    setAccount(accountAddress);
  };

  return (
    <div className="App">
      <h1>Crypto Portfolio App</h1>
      <WalletConnect onConnect={handleWalletConnect}/>
      {account && provider && (
        <WatchList provider = {provider} account={account}/>
      )}
    </div>
  );
}

export default App;