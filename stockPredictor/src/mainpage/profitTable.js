import React from 'react'
import Table from 'react-bootstrap/Table'

class ProfitTable extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div>
                <Table>
                <thead>
                    <tr>
                        <th>Investment Strategy</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Active</td>
                        <td>{this.props.activeProfit}</td>
                
                    </tr>
                    <tr>
                        <td>Passive</td>
                        <td>{this.props.passiveProfit}</td>                                 
                    </tr>
                </tbody>
                </Table>
            </div>
        )
    }

}

export default ProfitTable