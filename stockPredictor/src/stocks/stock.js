import React from 'react'

import ReactTable from "react-table";


class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            stock: null
        }
    }

    sendData(stock){
 
        this.setState({loading: true})
        fetch(`/stock/${stock}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
          }).then(res => res.json()).then(data => this.setState({stock: data}))
    }
    componentDidMount(){
        this.sendData(this.props.stock)
    }

    render(){
        console.log(this.state.stock)
        if(this.state.stock){
            return(
                <div>

                        <div>
                            <ReactTable 
                            data={this.state.stock}
                            columns={[
                                {Header: "Date", accessor: 'Date'},
                                {Header: "Open", accessor: 'Open'},
                                {Header: "Close", accessor: 'Close'},
                                {Header: "Change", accessor: 'Change'},
                            ]}
                            />
                        </div>
                                    
                </div>


            )
        } else {
            return(
                <div>
                    sd
                </div>
            )
        }
    }
}

export default Stock