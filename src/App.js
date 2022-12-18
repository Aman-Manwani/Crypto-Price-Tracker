import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Coin";
import './App.css'

function App() {
  const [coins, setcoins] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setcoins(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        alert("Unable to fetch coins");
      });
  }, []);

  const handlesearch = (event) => {
    setsearch(event.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handlesearch}
          />
        </form>
      </div>
      {/* <div className="headings">
        <div className="name_was">Name</div>
        <div className="symbol_was">Symbol </div>
        <div className="price_was">Price</div>
        <div className="mktcap_was">Market Cap</div>
        <div className="cha_was">% change</div>
        <div className="tot_was">Tot. Volume</div>
      </div> */}
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
