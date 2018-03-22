import React from 'react';
import CardItem from './CardItem'

export default class CardItems extends React.Component {
  render() {
    var data = []
    data.push({
      thumbnail: "https://http2.mlstatic.com/celulares-motorola-D_Q_NP_781526-MLA26962080389_032018-X.webp",
      price: 2.499,
      tittle: "Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel",
      location: "Cordoba"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/camas-cuchetas-D_Q_NP_970172-MLA26064700803_092017-X.webp",
      price: 5.309,
      tittle: "Cama Cucheta Triple Superpuesta Mdf Laqueada Blanco Infantil",
      location: "Mendoza"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/zapatillas-D_Q_NP_887999-MLA26260623016_102017-X.webp",
      price: 849,
      tittle: "Zapatillas Volcom Hombre Ninety One",
      location: "Buenos Aires"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/celulares-motorola-D_Q_NP_781526-MLA26962080389_032018-X.webp",
      price: 2.499,
      tittle: "Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel",
      location: "Cordoba"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/camas-cuchetas-D_Q_NP_970172-MLA26064700803_092017-X.webp",
      price: 5.309,
      tittle: "Cama Cucheta Triple Superpuesta Mdf Laqueada Blanco Infantil",
      location: "Mendoza"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/zapatillas-D_Q_NP_887999-MLA26260623016_102017-X.webp",
      price: 849,
      tittle: "Zapatillas Volcom Hombre Ninety One",
      location: "Buenos Aires"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/celulares-motorola-D_Q_NP_781526-MLA26962080389_032018-X.webp",
      price: 2.499,
      tittle: "Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel",
      location: "Cordoba"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/camas-cuchetas-D_Q_NP_970172-MLA26064700803_092017-X.webp",
      price: 5.309,
      tittle: "Cama Cucheta Triple Superpuesta Mdf Laqueada Blanco Infantil",
      location: "Mendoza"
    })
    data.push({
      thumbnail: "https://http2.mlstatic.com/zapatillas-D_Q_NP_887999-MLA26260623016_102017-X.webp",
      price: 849,
      tittle: "Zapatillas Volcom Hombre Ninety One",
      location: "Buenos Aires"
    })
    return (
        <div>
            {data.map((item, i) => {
                return <CardItem key={i} obj={item} reference={"https://google.com.ar/" + i} thumbnail={item.thumbnail} price={item.price} tittle={item.tittle} location={item.location} />
            })}
        </div>
    );
  }
}