import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {

  

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  


  return (
    <Base title="Home Page" description="Welcome to the Home Page">
      <div className="row text-center">
        <h1 className="text-white">News Feeds</h1>
        
      </div>
    </Base>
  );
}
