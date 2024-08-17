import React, { useState } from 'react';
// import { ethers } from 'ethers';

const WalletConnect = () => {
    const [currentAccount, setCurrentAccount] = useState(null);

    const connectWallet = async () => {
        if(window.ethereum){
            try{
                const accounts=await window.ethereum.request({method: 'eth_requestAccounts'});	
                setCurrentAccount(accounts[0]);
            }catch(err){
                console.log("Error connecting to Metamask",err);
            }
        }else{
            alert("Metamask is not installed. Please Install Metamask to sue this feature.");
        }
    };

    return(
        <div>
            {!currentAccount ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ):(
                <p>Connected Account: {currentAccount}</p>
            )}
        </div>
    );
};

export default WalletConnect;