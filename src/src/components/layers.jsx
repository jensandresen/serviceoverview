import React from "react";

export default class Layers extends React.Component {
    render() {
        const layerWidth = this.props.width / this.props.layers.length;
        
        const layers = this.props.layers.map((x,i) => {
            const hasLeftBorder = i == 0;
            const left = layerWidth*i;
            const textLeft = left + Math.floor(layerWidth/2);
            const textStyles = {
                fontSize: "10px",
                textAnchor: "middle"
            };            

            return (
                <g key={`layer-${x.id}`}>
                    <text x={textLeft} y="20" style={textStyles}>{x.name}</text>
                </g>
            );
        });

        return (
            <g>{layers}</g>
        );        
    }
}
