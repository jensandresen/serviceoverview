import React from "react";

export default class Component extends React.Component {
    render() {
        const iconUrl = this.props.iconUrl;

        const txtstyles = {
            fill: "red",
            fontSize: "10px",
            textAnchor: "middle",
        };

        const width = parseInt(this.props.width);
        const left = parseInt(this.props.x);
        const top = parseInt(this.props.y);
        const height = parseInt(this.props.height);

        return (
            <g>
                <image 
                    x={this.props.x} 
                    y={this.props.y} 
                    width={this.props.width}
                    height={this.props.height}
                    xlinkHref={iconUrl}
                />

                <text 
                    x={left + (width/2)}
                    y={top+height+15}
                    width={this.props.width}
                    height={10}
                    style={txtstyles}
                    >{this.props.name}</text>
            </g>
        );
    }
}
