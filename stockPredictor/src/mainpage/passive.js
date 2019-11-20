import React from 'react'
import Nav from '../common/navbar'
import { VictoryVoronoiContainer, VictoryChart, VictoryZoomContainer, VictoryTooltip, VictoryLine, VictoryBrushContainer, VictoryAxis } from 'victory';

class PassiveChart extends React.Component{
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
        
        return(
            <div>
                    <VictoryChart width={600} height={470} scale={{ x: "time" }}
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
                            data: { stroke: "blue" }
                        }}
                        data={
                            this.props.formattedGameData
                        }
                        
                        x="Date"
                        y="Profit_Passive_Total"
                        />
                        
            
                    </VictoryChart>
                
            </div>


        )
    }
}

export default PassiveChart