import React, { useEffect, useState } from 'react'
import Card from './components/Card/Card';
import { getAllPokemon, getEachPokemon } from './utils/pokemon';
import "./App.css";


function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      let res = await getAllPokemon(initialURL);
      // console.log(res)
      eachPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous)
      setLoading(false);
    }
    fetchPokemon()
  }, [])

  const eachPokemon = async (data) => {
    let eachPokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonURL = getEachPokemon(pokemon.url);
        return pokemonURL;
      })
    )
    setPokemonData(eachPokemonData);
  }

  // console.log(pokemonData);

  const handlePrev = async () => {
    if (prevURL === null) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    // console.log(data);
    await eachPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  }

  const handleNext = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await eachPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  }

  return (
    <>
    <div className='navbar'>ポケモン図鑑</div>
    <div>
      {loading ? (
        <h1>
          ロード中...
        </h1>
      ) : (
        <h1>
          <div className='cardContainer'>
            {pokemonData.map((pokemon, i) => {
             return <Card key={i} pokemon={pokemon} />
            })}
          </div>
        </h1>
      )}
    </div>
    <div className='btn'>
      <button onClick={handlePrev}>前へ</button>
      <button onClick={handleNext}>次へ</button>
    </div>
    </>
  )
}

export default App