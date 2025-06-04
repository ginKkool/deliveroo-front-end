import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";
import logo from "./assets/Deliveroo-logo.png";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
              <section>
                {data.categories.map((category, index) => {
                  // console.log(category); // {name: 'Salades', meals: Array(7)}

                  return (
                    <div>
                      <p key={index}>{category.name}</p>
                      {category.meals.map((meals, index) => {
                        // console.log(meals); // {id: '1519055545-91', title: 'Fromage blanc bio au miel', description: '', price: '10.40'}
                        return;
                        <div key={meals.id} className="meal">
                          <div>
                            <h3>{meals.title}</h3>
                          </div>
                        </div>;
                      })}
                    </div>
                  );
                })}
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
