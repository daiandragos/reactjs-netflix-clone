import React from "react";
import Nav from "../components/Nav";
import PlansScreen from "./Plans";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Profile.css";

const Profile = () => {
  const user = useSelector(selectUser);
  return (
    <div className="profile-page">
      <Nav />
      <div className="profile-page__body">
        <h1>Edit Profile</h1>
        <div className="profile-page__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
          />
          <div className="profile-page__details">
            <h2>{user.email}</h2>
            <div className="profile-page__plans">
              <h3>Plans</h3>

              <PlansScreen />
              <button
                onClick={() => signOut(auth)}
                className="profile-page__sign-out"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
