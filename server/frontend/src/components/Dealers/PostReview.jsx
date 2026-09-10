import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);
  const { id } = useParams();
  const root_url = window.location.origin + "/";
  const dealer_url = root_url + `djangoapp/dealer/${id}`;
  const review_url = root_url + `djangoapp/add_review`;
  const carmodels_url = root_url + `djangoapp/get_cars`;

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    if (name.includes("null")) name = sessionStorage.getItem("username");
    if (!model || review === "" || date === "" || year === "") { alert("All details are mandatory"); return; }

    const model_split = model.split(" ");
    const make_chosen = model_split[0];
    const model_chosen = model_split.slice(1).join(" ");
    const jsoninput = JSON.stringify({ name, dealership: id, review, purchase: true, purchase_date: date, car_make: make_chosen, car_model: model_chosen, car_year: year });

    const res = await fetch(review_url, { method: "POST", headers: { "Content-Type": "application/json" }, body: jsoninput });
    const json = await res.json();
    if (json.status === 200) window.location.href = window.location.origin + "/dealer/" + id;
  };

  const get_dealer = async () => {
    const res = await fetch(dealer_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      const dealerobj = Array.isArray(retobj.dealer) ? retobj.dealer[0] : retobj.dealer;
      if (dealerobj) setDealer(dealerobj);
    }
  };

  const get_cars = async () => {
    try {
      const res = await fetch(carmodels_url, { method: "GET" });
      if (!res.ok) throw new Error(`get_cars returned HTTP ${res.status}`);
      const retobj = await res.json();
      const cars = Array.isArray(retobj.CarModels) ? retobj.CarModels : [];
      setCarmodels(cars);
      if (!cars.length) console.warn('No car models were returned by /djangoapp/get_cars');
    } catch (error) {
      console.error("Unable to load car makes/models", error);
      setCarmodels([]);
    }
  };

  useEffect(() => { get_dealer(); get_cars(); }, []);

  return (
    <div className="page-shell">
      <Header />
      <main className="page-container review-page">
        <section className="review-card">
          <div className="eyebrow">Customer experience</div>
          <h1 className="review-card-title">Write a review</h1>
          <p className="review-card-subtitle">Share your experience with {dealer.full_name || 'this dealership'}.</p>
          <form className="review-form" onSubmit={(e) => { e.preventDefault(); postreview(); }}>
            <div className="form-group">
              <label htmlFor="review">Your review</label>
              <textarea id="review" className="review-textarea" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Tell us about your experience..." />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="purchase-date">Purchase date</label>
                <input id="purchase-date" className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="cars">Car make & model</label>
                <select name="cars" id="cars" className="form-control" value={model} onChange={(e) => setModel(e.target.value)}>
                  <option value="" disabled>Choose car make and model</option>
                  {carmodels.map((carmodel, index) => <option key={`${carmodel.CarMake}-${carmodel.CarModel}-${index}`} value={`${carmodel.CarMake} ${carmodel.CarModel}`}>{carmodel.CarMake} {carmodel.CarModel}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="car-year">Car year</label>
              <input id="car-year" className="form-control" type="number" value={year} onChange={(e) => setYear(e.target.value)} max={2023} min={2015} />
            </div>
            <button className="postreview" type="submit">Post Review</button>
          </form>
        </section>
      </main>
    </div>
  );
};
export default PostReview;
