import React, { useEffect, useState } from "react";
import { Card } from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealIteams from "./Mealtems/MealIteams";
import axios from "../../axois";


export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [err,setError]=useState(false);
  const [errMessage,setErrorMessage]=useState('');
  const fatchMeals = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "/Meals/GetAllMeals.php"
      );

      console.log(res.data.meals);

      setMeals(res.data.meals);
      
      // for (const key in resData) {
      //   loadedmeals.push({
      //     id: key,
      //     name: resData[key].name,
      //     description: resData[key].description,
      //     price: resData[key].price,
      //   });
        
      // }
      //setMeals(loadedmeals);
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Something went Wrong");
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fatchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealIteams
      key={meal.meal_id}
      id={meal.meal_id}
      name={meal.name}
      des={meal.description}
      price={parseInt(meal.price)}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
      {!isLoading &&  err &&<p>{errMessage}</p>}
        {isLoading &&  !err &&<p>Menu is Getting Loaded</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
