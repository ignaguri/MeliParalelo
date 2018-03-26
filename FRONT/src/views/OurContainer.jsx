import React from 'react';
import Banner from './Banner'
import CarouselDisplay from './CarouselDisplay'
import ListItems from './ListItems'
import CardItems from './CardItems'
import ChatSlide from './ChatSlide'

export default class OurContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            displayType: "carousel"
        }
    }
    // landing, login, preferences, registration
    render() {
        if (this.state.displayType === "list") {
            return (
                <div>
                    <Banner />
                    <div style={{ textAlign: "left" }}>
                        <ChatSlide />
                        <ListItems />
                    </div>
                </div>
            );
        }
        if (this.state.displayType === "card") {
            return (
                <div>
                    <Banner />
                    <div style={{ textAlign: "left" }}>
                        <ChatSlide />
                        <CardItems />
                    </div>
                </div>
            );
        }
        if (this.state.displayType === "carousel") {
            return (
                <div>
                    <Banner />
                    <div style={{ textAlign: "left" }}>
                        <ChatSlide />
                        <CarouselDisplay />
                    </div>
                </div>
            );
        }
    }
}