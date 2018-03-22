import React, { Component } from 'react';
import CarouselEntity from './CarouselEntity'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

const items = [
  {
    thumbnail: "https://http2.mlstatic.com/celulares-motorola-D_Q_NP_781526-MLA26962080389_032018-X.webp",
    price: 2.499,
    tittle: "Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel",
    location: "Cordoba",
    condition: "Nuevo"
  },
  {
    thumbnail: "https://http2.mlstatic.com/camas-cuchetas-D_Q_NP_970172-MLA26064700803_092017-X.webp",
    price: 5.309,
    tittle: "Cama Cucheta Triple Superpuesta Mdf Laqueada Blanco Infantil",
    location: "Mendoza",
    condition: "Nuevo"
  },
  {
    thumbnail: "https://http2.mlstatic.com/zapatillas-D_Q_NP_887999-MLA26260623016_102017-X.webp",
    price: 849,
    tittle: "Zapatillas Volcom Hombre Ninety One",
    location: "Buenos Aires",
    condition: "Usado"
  },
  {
    thumbnail: "https://http2.mlstatic.com/celulares-motorola-D_Q_NP_781526-MLA26962080389_032018-X.webp",
    price: 2.499,
    tittle: "Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel Motorola Moto C 4g 8gb Nuevo Libre Gtía 1 Año Techcel",
    location: "Cordoba",
    condition: "Nuevo"
  },
  {
    thumbnail: "https://http2.mlstatic.com/camas-cuchetas-D_Q_NP_970172-MLA26064700803_092017-X.webp",
    price: 5.309,
    tittle: "Cama Cucheta Triple Superpuesta Mdf Laqueada Blanco Infantil",
    location: "Mendoza",
    condition: "Nuevo"
  },
  {
    thumbnail: "https://http2.mlstatic.com/zapatillas-D_Q_NP_887999-MLA26260623016_102017-X.webp",
    price: 849,
    tittle: "Zapatillas Volcom Hombre Ninety One",
    location: "Buenos Aires",
    condition: "Usado"
  }
];

class CarouselDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          style={{ "padding-left": "70px" }}
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <CarouselEntity obj={item} reference={"https://google.com.ar/"} thumbnail={item.thumbnail} price={item.price} tittle={item.tittle} location={item.location} condition={item.condition} />
          { /* <CarouselCaption captionText={item.altText} captionHeader={item.caption} style={{ position: "absolute", right: "0px", top: "10%", margin: "0% 10%", marginLeft: "30%" }} />*/}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        style={{ paddingLeft: "7%" }}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}
export default CarouselDisplay;