import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HistoricalData from './HistoricalData';
import HistoricalChart from './HistoricalChart';

import './watchList.css';
import { generateMockHistoricalData } from '../utils/mockData';

function WatchList({ provider, account }){
    const [tokenAddress,setTokenAddress]=useState('');
    const [tokens,setTokens]=useState([]);
    const [balances,setBalances]=useState({});
    const [selectedToken,setSelectedToken]=useState(null);

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
        <div className="watchList">
            <h2 className='watchListTitle'><span>Watch</span> List</h2>
            <div className="Addtoken">
            <input
                type="text"
                placeholder="Enter Token Contract Address"
                value={tokenAddress}
                onChange={(e)=>setTokenAddress(e.target.value)}
            />
            <button onClick={handleAddToken}>Add Token</button>
            </div>
            {tokens.length > 0 && (
                <div className="tablewatchlist">
                    <table className="watchlist-table">
                        <thead>
                            <tr>
                                <th>Token Address</th>
                                <th>Balance</th>
                                <th>Historical Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tokens.map((token) => (
                                <tr key={token}>
                                    <td>{token}</td>
                                    <td>{balances[token] || 'Loading...'}</td>
                                    <td>
                                        <button onClick={() => setSelectedToken(token)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedToken && (
                <div className="historical-data-container">
                    <HistoricalData token={selectedToken} />
                    <HistoricalChart data={generateMockHistoricalData(selectedToken,new Date(2024,5,1),new Date())}/>
                </div>
            )}
        </div>
    );
}

export default WatchList;