import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const dealer_url = "/djangoapp/get_dealers";
  const dealer_url_by_state = "/djangoapp/get_dealers/";

  const filterDealers = async (state) => {
    const requestUrl = state === "All" ? dealer_url : dealer_url_by_state + encodeURIComponent(state);
    const res = await fetch(requestUrl, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) setDealersList(Array.from(retobj.dealers));
  };

  const get_dealers = async () => {
    const res = await fetch(dealer_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      const all_dealers = Array.from(retobj.dealers);
      setStates(Array.from(new Set(all_dealers.map((dealer) => dealer.state))));
      setDealersList(all_dealers);
    }
  };

  useEffect(() => { get_dealers(); }, []);

  const isLoggedIn = sessionStorage.getItem("username") != null;

  return (
    <div className="page-shell">
      <Header />
      <main className="page-container dealers-page">
        <section className="dealers-hero">
          <div className="eyebrow">Our network</div>
          <h1 className="page-title">Discover your next destination.</h1>
          <p className="page-subtitle">Explore trusted dealership locations and connect with a team ready to help you find the right vehicle.</p>
        </section>

        <section className="dealers-toolbar" aria-label="Dealer filters">
          <div>
            <label className="filter-label" htmlFor="state">Browse by state</label>
            <select className="state-select" name="state" id="state" defaultValue="" onChange={(e) => filterDealers(e.target.value)}>
              <option value="" disabled>State</option>
              <option value="All">All States</option>
              {states.map((state) => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
          <div className="dealer-count">{dealersList.length} dealerships</div>
        </section>

        <div className="dealer-table-wrap">
          <table className="dealer-table">
            <thead><tr>
              <th>ID</th><th>Dealer Name</th><th>City</th><th>Address</th><th>Zip</th><th>State</th>
              {isLoggedIn && <th>Review Dealer</th>}
            </tr></thead>
            <tbody>
              {dealersList.map((dealer) => (
                <tr key={dealer.id}>
                  <td className="dealer-id">{dealer.id}</td>
                  <td><a className="dealer-name-link" href={'/dealer/' + dealer.id}>{dealer.full_name}</a></td>
                  <td>{dealer.city}</td><td>{dealer.address}</td><td>{dealer.zip}</td><td>{dealer.state}</td>
                  {isLoggedIn && <td><a className="review-action" href={`/postreview/${dealer.id}`}><img src={review_icon} className="review_icon" alt="Post Review" /></a></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dealers;
