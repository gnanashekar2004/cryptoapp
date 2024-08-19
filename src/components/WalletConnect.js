import React, { useState } from 'react';
import { ethers } from 'ethers';

import './WalletConnect.css';

const WalletConnect = ({onConnect}) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [provider,setProvider]=useState(null);

    const connectWallet = async () => {
        if(window.ethereum){
            try{
                const providerInstance=new ethers.BrowserProvider(window.ethereum);
                setProvider(providerInstance);

                const accounts=await providerInstance.send('eth_requestAccounts',[]);	
                setCurrentAccount(accounts[0]);
                onConnect(providerInstance,accounts[0]);
            }catch(err){
                console.log("Error connecting to Metamask",err);
            }
        }else{
            alert("Metamask is not installed. Please Install Metamask to sue this feature.");
        }
    };

    return(
        <div className="buttonContainer">
            {!currentAccount ? (
                <button className="connectButton" onClick={connectWallet}>Connect Wallet</button>
            ):(
                <p className="accountNo"><span>Connected Account:</span> {currentAccount}</p>
            )}
        </div>
    );
};

export default WalletConnect;