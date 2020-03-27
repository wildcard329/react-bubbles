import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { getDefaultNormalizer } from "@testing-library/react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axiosWithAuth()
      .get('/api/colors')
      .then(res => {
        // console.log("colorlist",res)
        setColorList(res.data)
      })
      .catch(err => {
        console.error("BubblePage Error", err,err.message)
      })
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getData={getData} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
