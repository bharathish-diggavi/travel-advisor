import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { toast } from "react-toastify";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData } from "./api/index";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autoComplete, setAutoComplete] = useState(null);

  useEffect(() => {
    setFilteredPlaces(places.filter((place) => place.rating > rating));
  }, [rating]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        toast(
          "🦄 I can show better places only if you let me where you are..!!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setCoordinates({ lat: 0, lng: 0 });
      }
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    if (bounds) {
      getPlacesData(bounds.sw, bounds.ne, type).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setRating("");
        setLoading(false);
      });
    }
  }, [type, bounds]);

  const onLoad = (autoC) => setAutoComplete(autoC);
  const onPlaceChanged = () => {
    console.log(autoComplete);

    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };
  return (
    <>
      <CssBaseline />
      <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
