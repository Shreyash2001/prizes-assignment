import { useEffect, useState } from 'react';
import './App.css';
import Winner from './Winner';
import axios from "axios";
import Category from './Category';
import SpecialWinner from './SpecialWinner';

function App() {
  const [winner, setWinner] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState(0);
  const [special, setSpecial] = useState([]);

  const getCategory = (category) => {
    if(typeof category === "string") {
      setSelectedCategory(category);
      setSpecial([])
    }
  };

  const getDate = (date) => {
    if(typeof date === "string") {
      setDate(date);
      setSelectedCategory("");
      setSpecial([])
    }
  };

  const unique = new Set();
    winner?.map((val) => (unique.add(val.category)));
    const categories = Array.from(unique);

  const map = new Map();
  winner?.map((val) => {
    val?.laureates?.map((key) => {
      var name = key.firstname + " " + key.surname;
      if(map.has(name)) {
        var count = map.get(name);
        map.set(name, count + 1);
      } else {
        var val = 1;
        map.set(name, val);
      }
    })
    
  });
  

  const getSpecial = () => {
    var temp = [];
    for (const [key, value] of map) {
      if(value > 1)
      temp.push(key);
    }
    setSpecial(temp);
  };

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get("https://api.nobelprize.org/v1/prize.json");
      if(data) {
        setWinner(data.prizes);
      }
      return data;
    }
    
    fetchData();


    return () => {
      setWinner([]);
    }
  }, [])
  return (
    <div className="app">
      <div>
          <Category 
          categories={categories} 
          getCategory={getCategory} 
          getDate={getDate}
          getSpecial={getSpecial}
           />
      </div>
      {
        special.length !== 0 
        ?
        <SpecialWinner data={special} />
        :

        selectedCategory.length !== 0 
        ?
        <div>
          <span className="app_categoryInfo">{"Selected Category: " + selectedCategory}</span>
          <Winner winners={winner?.filter((win) => win.category === selectedCategory)} />;
        </div>
        :
        date !== 0 
        ?
        <div>
          <span className="app_categoryInfo">{"Selected Date: " + date}</span>
          <Winner winners={winner?.filter((win) => win.year === date.toString())} />
        </div>
        :
      <Winner winners={winner} />
      }
    </div>
  );
}

export default App;
