import React, { useState, useEffect } from "react";
import axios from "axios";

import {axiosWithAuth} from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
    .get("http://localhost:5000/api/colors")
    .then(res => {
      console.log("useEffect fetching colors data from server when component mounts : ", res);
      setColorList(res.data);
    })
    .catch(err => {
      console.log("useEffect fetching colors data from server when component mounts failed ! Try again : ", err);
    });
  },[]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
