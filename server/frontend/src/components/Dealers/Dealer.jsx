import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState(null);
  const [dealerError, setDealerError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const params = useParams();
  const id = params.id;
  const root_url = window.location.origin + "/";
  const dealer_url = root_url + `djangoapp/dealer/${id}`;
  const reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  const post_review = root_url + `postreview/${id}`;

  const get_dealer = async () => {
    const res = await fetch(dealer_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      const dealerData = retobj.dealer;
      if (dealerData && !Array.isArray(dealerData)) setDealer(dealerData);
      else if (Array.isArray(dealerData) && dealerData.length > 0) setDealer(dealerData[0]);
      else setDealerError('Dealer not found.');
    } else setDealerError('Unable to load dealer details.');
  };

  const get_reviews = async () => {
    const res = await fetch(reviews_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      if (retobj.reviews.length > 0) setReviews(retobj.reviews);
      else setUnreviewed(true);
    }
  };

  const senti_icon = (sentiment) => sentiment === "positive" ? positive_icon : sentiment === "negative" ? negative_icon : neutral_icon;

  useEffect(() => { get_dealer(); get_reviews(); }, []);

  return (
    <div className="page-shell">
      <Header />
      <main className="page-container dealer-detail-page">
        {dealerError ? <p className="error-message">{dealerError}</p> : dealer ? (
          <section className="dealer-detail-header">
            <div className="eyebrow">Dealership profile</div>
            <div className="dealer-title-row">
              <h1 className="dealer-title">{dealer.full_name}</h1>
              {sessionStorage.getItem("username") && (
                <a className="write-review-link" href={post_review}>
                  <img src={review_icon} alt="" /> Write a review
                </a>
              )}
            </div>
            <p className="dealer-location">{dealer.city}, {dealer.address}, Zip — {dealer.zip}, {dealer.state}</p>
          </section>
        ) : <p className="loading-copy">Loading dealer...</p>}

        <section className="reviews-section">
          <div className="eyebrow">Customer voice</div>
          <h2 className="reviews-heading">Reviews</h2>
          <div className="reviews_panel">
            {reviews.length === 0 && !unreviewed ? <p className="loading-copy">Loading reviews...</p> : unreviewed ? <p className="empty-copy">No reviews yet.</p> :
              reviews.map((review, index) => (
                <article className="review_panel" key={`${review.name}-${index}`}>
                  <img src={senti_icon(review.sentiment)} className="emotion_icon" alt={`${review.sentiment || 'neutral'} sentiment`} />
                  <div className="review">“{review.review}”</div>
                  <div className="reviewer">{review.name} · {review.car_make} {review.car_model} · {review.car_year}</div>
                </article>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dealer;
