import React from 'react'
import Nav from '../common/navbar'
import { VictoryVoronoiContainer, VictoryChart, VictoryZoomContainer, VictoryTooltip, VictoryLine, VictoryBrushContainer, VictoryAxis } from 'victory';

class MainPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            numShares: 0,
            amount:0,
            typeInvestor: "passive",
            gameData: [],
            formattedGameData: [],
            passiveProfit: 0,
            activeProfit: 0
            


        }

    }

    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render(){
        if(this.props.both == false){
            return(
                <div>
                    
                        <VictoryChart width={700} height={470} scale={{ x: "time" }}
                        containerComponent={
                            <VictoryVoronoiContainer
                            
                            labels={({ datum }) => `${(`${datum._x.getFullYear()}-${datum._x.getMonth()}-${datum._x.getDate()}`)}, $${(datum._y)}`}
                            labelComponent={
                                <VictoryTooltip
                                cornerRadius={0}
                                flyoutStyle={{ fill: "white" }}
                                />}
                            />
                        }
                        >
                            {/* <VictoryAxis dependentAxis crossAxis
                                width={400}
                                height={400}
                                domain={[-10, 140]}
                                theme={VictoryTheme.material}
                                offsetX={50}
                                standalone={false}
                            />

                            <VictoryAxis crossAxis
                                width={400}
                                height={400}
                                theme={VictoryTheme.material}
                                standalone={false}
                            /> */}
                            <VictoryAxis
                                dependentAxis label="Price"
                            />
                            <VictoryAxis
                                label="Time"
                            />
                            <VictoryLine
                            style={{
                                data: { stroke: this.props.color }
                            }}
                            data={
                                this.props.formattedGameData
                            }
                            
                            x="Date"
                            y={this.props.colName}
                            />



                        </VictoryChart>
                    
                </div>


            )
        } else {
            return(
                <div>
                    
                <VictoryChart width={700} height={470} scale={{ x: "time" }}
                containerComponent={
                    <VictoryVoronoiContainer
                    
                    labels={({ datum }) => `${(`${datum._x.getFullYear()}-${datum._x.getMonth()}-${datum._x.getDate()}`)}, $${(datum._y)}`}
                    labelComponent={
                        <VictoryTooltip
                        cornerRadius={0}
                        flyoutStyle={{ fill: "white" }}
                        />}
                    />
                }
                >

                    <VictoryLine
                    style={{
                        data: { stroke: 'blue' }
                    }}
                    data={
                        this.props.formattedGameData
                    }
                    
                    x="Date"
                    y="Profit_Passive_Total"
                    />
                    <VictoryLine
                    style={{
                        data: { stroke: 'tomato' }
                    }}
                    data={
                        this.props.formattedGameData
                    }
                    
                    x="Date"
                    y="Profit_Active_Total"
                    />

                </VictoryChart>
            
        </div>
            )
        }
    }
}

export default MainPage