import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WatchList({ provider, account }){
    const [tokenAddress,setTokenAddress]=useState('');
    const [tokens,setTokens]=useState([]);
    const [balances,setBalances]=useState({});

    const handleAddToken = () =>{
        if(tokenAddress && !tokens.includes(tokenAddress)){
            setTokens([...tokens,tokenAddress]);
            setTokenAddress('');
        }
    };

    useEffect(()=>{
        const fetchBalances = async () => {
            const newBalances = {};
            for(const token of tokens){
                const contract = new ethers.Contract(
                    token,
                    ["function balanceOf(address owner) view returns (uint256)"],
                    provider
                );
                const balance=await contract.balanceOf(account);
                newBalances[token]=ethers.formatEther(balance);
            }
            setBalances(newBalances);
        };

        if(provider && account){
            fetchBalances();
        }

    },[tokens,provider,account]);

    return(
        <div>
            <h2>Watch List</h2>
            <input
                type="text"
                placeholder="Enter Token Contract Address"
                value={tokenAddress}
                onChange={(e)=>setTokenAddress(e.target.value)}
            />
            <button onClick={handleAddToken}>Add Token</button>
        <ul>
            {tokens.map((token)=>(
                <li key={token}>
                    {token}: {balances[token] || 'Loading...'}
                </li>
            ))}
        </ul>
        </div>
    );
}

export default WatchList;