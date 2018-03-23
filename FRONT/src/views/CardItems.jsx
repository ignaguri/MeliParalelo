import React from 'react';
import CardItem from './CardItem'

export default class CardItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          thumbnail: "https://http2.mlstatic.com/celulares-motorola-D_Q_NP_781526-MLA26962080389_032018-X.webp",
          price: 2.499,
          title: "1Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel",
          location: "Cordoba",
          condition: "Nuevo"
        },
        {
          thumbnail: "https://http2.mlstatic.com/camas-cuchetas-D_Q_NP_970172-MLA26064700803_092017-X.webp",
          price: 5.309,
          title: "2Cama Cucheta Triple Superpuesta Mdf Laqueada Blanco Infantil",
          location: "Mendoza",
          condition: "Nuevo"
        },
        {
          thumbnail: "https://http2.mlstatic.com/zapatillas-D_Q_NP_887999-MLA26260623016_102017-X.webp",
          price: 849,
          title: "3Zapatillas Volcom Hombre Ninety One",
          location: "Buenos Aires",
          condition: "Usado"
        },
        {
          thumbnail: "https://http2.mlstatic.com/celulares-motorola-D_Q_NP_781526-MLA26962080389_032018-X.webp",
          price: 2.499,
          title: "4Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel",
          location: "Cordoba",
          condition: "Nuevo"
        },
        {
          thumbnail: "https://http2.mlstatic.com/camas-cuchetas-D_Q_NP_970172-MLA26064700803_092017-X.webp",
          price: 5.309,
          title: "5Cama Cucheta Triple Superpuesta Mdf Laqueada Blanco Infantil",
          location: "Mendoza",
          condition: "Nuevo"
        },
        {
          thumbnail: "https://http2.mlstatic.com/zapatillas-D_Q_NP_887999-MLA26260623016_102017-X.webp",
          price: 849,
          title: "6Zapatillas Volcom Hombre Ninety One",
          location: "Buenos Aires",
          condition: "Usado"
        }
      ]
    }
  }

  render() {
    return (
      <div className="text-center" >
        {this.state.items.map((item, i) => {
          return <CardItem key={i} obj={item} reference={"https://google.com.ar/" + i} thumbnail={item.thumbnail} price={item.price} title={item.title} location={item.location} />
        })}
      </div>
    );
  }
}