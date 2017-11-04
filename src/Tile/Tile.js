import React, { Component } from 'react';
import './Tile.css';

export default class Tile extends Component {
    constructor(props) {
        super(props);

        this.tileSpacing = 3;
        this.appPadding = 18; //make it dynamic with css
    }

    getNbOfColumns() {
        return Math.sqrt(this.props.total);
    }

    getTileSize() {
        return this.getNbOfColumns() / this.props.total * 100 + '%';
    }

    getTilePosition() {
        const posX = (this.props.position % this.getNbOfColumns()) * 100;
        const posY = Math.floor(this.props.position / this.getNbOfColumns()) * 100;
        return `translateX(${posX}%) translateY(${posY}%)`;
    }

    getSourceOffset() {
        const offsetX =
            (this.props.originalPosition % this.getNbOfColumns()) / this.getNbOfColumns() * 100;
        const offsetY =
            Math.floor(this.props.position / this.getNbOfColumns()) / this.getNbOfColumns() * 100;
        return `translateX(-${offsetX}%) translateY(-${offsetY}%)`;
    }

    render() {
        const tileStyles = {
            width: this.getTileSize(),
            transform: this.getTilePosition(),
            visibility: this.props.originalPosition === -1 ? 'hidden' : 'visible'
        };

        const tileContentStyles = {
            margin: this.tileSpacing
        };

        // Source dimension has to be full width
        const amountToRemove =
            this.tileSpacing * this.getNbOfColumns() + this.appPadding + this.tileSpacing * 2;
        const tileSourceStyles = {
            width: `calc(100vw - ${amountToRemove}px)`,
            maxWidth: this.props.sceneMaxSize - amountToRemove,
            transform: this.getSourceOffset()
        };

        return (
            <div className="Tile" style={tileStyles}>
                <div className="Tile-content" style={tileContentStyles}>
                    <div className="Tile-infos">
                        {this.props.originalPosition} | {this.props.position} of {this.props.total}
                    </div>
                    <img className="Tile-source" style={tileSourceStyles} src={this.props.source} />
                </div>
            </div>
        );
    }
}
