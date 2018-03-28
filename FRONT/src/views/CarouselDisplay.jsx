import React, { Component } from 'react';
import api from "../api"
import CarouselEntity from './CarouselEntity'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

class CarouselDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      items: []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.checkChanges = this.checkChanges.bind(this);
  }

  changeProduct(id) {
    this.props.changeProduct(id)
  }

    componentWillMount() {
        if(!this.props.items) {
            api.getItemsPreferences()
                .then(res => {
                    this.setState({items: res.data})
                });
        } else {
            this.setState({items: this.props.items})
        }
    }

    checkChanges(){
        if(this.props.items) {
            if(this.props.items !== this.state.items) {
                this.setState({items: this.props.items, all: false})
            }
        } else {
            if(!this.state.all){
                api.getItemsPreferences()
                    .then(res => {
                        if(res.data !== this.state.items) {
                            this.setState({items: res.data, all: true})
                        }
                    });
            }
        }
    }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    this.checkChanges();
    const { activeIndex } = this.state;

    const slides = this.state.items.map((item, i) => {
      return (
        <CarouselItem
          style={{ "padding-left": "70px" }}
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={i}
        >
          <CarouselEntity obj={item} key={i} changeProduct={this.changeProduct} reference={item.id} thumbnail={item.thumbnail} price={item.price} title={item.title} location={item.state_name} condition={item.item_condition} />

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
        <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}
export default CarouselDisplay;