import React, { useState, useEffect } from "react";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {
  collection,
  where,
  getDocs,
  doc,
  setDoc,
  query,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { loadStripe } from "@stripe/stripe-js";

import "./Plans.css";

const Plans = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchActiveSubscription = async () => {
      const querySnapshot = await getDocs(
        collection(db, "customers", user.uid, "subscriptions")
      );
      querySnapshot.forEach(async (subscription) => {
        console.log(subscription.data());
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    };

    fetchActiveSubscription();
  }, [user.uid]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");
      const productsQuery = query(productsRef, where("active", "==", true));
      const productsQuerySnap = await getDocs(productsQuery);
      const products = {};
      productsQuerySnap.docs.forEach(async (doc) => {
        products[doc.id] = doc.data();
        const pricesRef = collection(db, "products", doc.id, "prices");
        const pricesQuerySnap = await getDocs(pricesRef);
        pricesQuerySnap.docs.forEach((price) => {
          products[doc.id].prices = {
            priceId: price.id,
            priceData: price.data,
          };
        });

        setProducts(products);
      });
    };
    fetchProducts();
  }, []);

  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const collectionRef = collection(
      db,
      "customers",
      user.uid,
      "checkout_sessions"
    );
    const docRef = await addDoc(collectionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        //show an error
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51KaljOHXvD3U9mNm4lRNKL6ms3nuX0FJZHazrp5htlqfEBIj5hMdOSVDxNgfholefj3hLFKg4iU33ZfNCBFkRjP200hxAvLAzB"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans-page">
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plans-page__plan--disabled"
            } plans-page__plan`}
          >
            <div className="plans-page__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
