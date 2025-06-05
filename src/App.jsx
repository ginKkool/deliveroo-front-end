import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";
import logo from "./assets/Deliveroo-logo.png";
import { FaStar } from "react-icons/fa";
import defaultImage from "./assets/default-meal.png";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  const formatString = (str) => {
    if (str.length < 60) {
      return str;
    } else {
      return str.slice(0, 60) + "...";
    }
  };

  // console.log("composant déclenché");

  useEffect(() => {
    try {
      // console.log("useEffect déclenché");

      const fetchData = async () => {
        const response = await axios.get(
          "https://site--deliveroo-backend--jp4q4ccptfz7.code.run/"
        );

        // console.log(response.data);

        setData(response.data);

        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      // console.log(error.message);
    }
  }, []);

  const getTotal = (array) => {
    const initialValue = 0;
    const sumWithInitial = array.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      initialValue
    );
    return sumWithInitial.toFixed(2);
  };

  return (
    <>
      {isLoading ? (
        <PacmanLoader color="#00cdbd" />
      ) : (
        <>
          <header>
            <div className="wrapper">
              <img src={logo} alt="logo deliveroo" />
            </div>
          </header>
          <section className="hero">
            <div className="wrapper">
              <div className="hero-left">
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} alt="photo d'un plat" />
            </div>
          </section>
          <main>
            <div className="wrapper">
              <section className="menu">
                {data.categories.map((category, index) => {
                  // console.log(category); // {name: 'Salades', meals: Array(7)}

                  return (
                    category.meals.length > 0 && (
                      <div className="menu-card" key={index}>
                        <h2>{category.name}</h2>
                        <div className="card">
                          {category.meals.map((meals, index) => {
                            // console.log(meals); // {id: '1519055545-91', title: 'Fromage blanc bio au miel', description: '', price: '10.40'}
                            return (
                              <div
                                key={meals.id}
                                className="meal"
                                onClick={() => {
                                  console.log(meals);
                                  const copy = [...basket];
                                  copy.push(meals);
                                  setBasket(copy);
                                }}
                              >
                                <div>
                                  <h3>{meals.title}</h3>
                                  <p>{formatString(meals.description)}</p>
                                  <div className="price-popu">
                                    <p className="price">
                                      {meals.price + " €"}
                                    </p>
                                    {meals.popular && (
                                      <p className="popular">
                                        <FaStar /> Populaire
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {meals.picture ? (
                                  <img
                                    src={meals.picture}
                                    alt="presentation du plat"
                                  />
                                ) : (
                                  <img
                                    src={defaultImage}
                                    alt="presentation du plat"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  );
                })}
              </section>
              <section className="bucket">
                <p>Votre panier est vide</p>
                <div>console.log(copy);</div>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
