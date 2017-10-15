import React from "react";
import HttpClient from "httpclient";
import Urls from "urls";
import Component from "./component.jsx";
import Layers from "./layers.jsx";

export default class Overview extends React.Component {

    constructor(props) {
        super(props);

        this.getIconFor = this.getIconFor.bind(this);

        this.state = {
            components: [],
            layers: [],
        };
    }

    componentDidMount() {
        const client = new HttpClient();
        client.get(Urls.api.data, (err, data) => {
            if (err) {
                throw err;
            }

            const state = this.state;
            state.components = data.components;
            state.layers = data.layers;
            state.types = data.types;

            state.width = Math.floor(document
                .getElementById("app-container")
                .getBoundingClientRect()
                .width);

            this.setState(state);
        });

        window.addEventListener("resize", () => {
            const state = this.state;
            state.width = Math.floor(document
                .getElementById("app-container")
                .getBoundingClientRect()
                .width);

            this.setState(state);
        });
    }

    getIconFor(serviceType) {
        let iconUrl = "https://cdn4.iconfinder.com/data/icons/network-and-sharing-line-icons-vol-1/48/02-256.png";
        const componentType = this.state.types[serviceType];
        
        if (componentType) {
            iconUrl = componentType.icon;
        }

        return iconUrl;
    }

    render() {
        const layerWidth = Math.floor(this.state.width / this.state.layers.length);

        const dependencies = new Array();
        const lines = new Array();

        const components = this.state.layers.map((layer, index) => {

            const layerCenter = Math.floor((layerWidth*index) + (layerWidth/2));

            let top = 40;

            const componentsInLayer = this.state.components
                .filter(c => c.layer == layer.id)
                .map((x,i) => {
                    const componentHeight = 50;
                    const componentWidth = 50;
                    const componentSpacing = 30;

                    const componentLeft = Math.floor(layerCenter-(componentWidth/2));
                    const componentTop = top;
                    top += componentHeight + componentSpacing;

                    dependencies.push({
                        id: x.id,
                        top: componentTop,
                        left: componentLeft,
                        width: componentWidth,
                        height: componentHeight,
                        dependencies: x.dependencies || []
                    });

                    return (
                        <Component
                            key={`component-${x.id}`}
                            x={componentLeft}
                            y={componentTop}
                            width={componentWidth}
                            height={componentHeight}
                            name={x.name} 
                            iconUrl={this.getIconFor(x.type)} />
                    );                    
            });


            dependencies.forEach(x => {
                x.dependencies.forEach(dependencyId => {
                    const d = dependencies.find(dep => dep.id == dependencyId);
                    if (d) {
                        lines.push(
                            <line
                                key={`from-${x.id}-to-${d.id}`} 
                                x1={x.left} 
                                y1={x.top} 
                                x2={d.left} 
                                y2={d.top} 
                                stroke="red" 
                                strokeWidth="1" />
                        );
                    }
                });
            });

            return (
                <g key={`${layer.id}-components`}>
                    {componentsInLayer}
                </g>
            );
        });

        return (
            <svg width={this.state.width} height="100%">
                <Layers width={this.state.width} layers={this.state.layers} />
                {components}
                <g>
                    {lines}
                </g>
                
            </svg>
        );
    }
}