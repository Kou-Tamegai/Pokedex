import React from 'react'
import "./Card.css"

const Card = ({pokemon}) => {
  return (
    <div className='card'>
      <div className='cardImg'>
      <img src={pokemon.sprites.front_default}/>
      </div>
      <div className='cardName'>
      <p>{pokemon.name}</p>
      </div>
      <div className='cardTypes'>
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return <div key={type.type.name}>
            <span>{type.type.name}</span>
          </div>
        })}
      </div>
      <div className='cardInfo'>
        <p>重さ:{pokemon.weight}</p>
        <p>高さ:{pokemon.height}</p>
        <p>能力:{pokemon.abilities[0].ability.name}</p>
      </div>
    </div>
  )
}

export default Card