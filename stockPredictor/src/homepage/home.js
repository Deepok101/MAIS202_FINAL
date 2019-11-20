import React from 'react'
import Nav from '../common/navbar'
import Container from 'react-bootstrap/Container'
import ReactTable from "react-table";
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }


    render(){
        return(
            <div>
                <Nav/>
                    <Jumbotron fluid>
                        <Container>
                            <h1>Stock Predictor</h1>
                            <p>
                                A stock predictor model made for Apple stocks.
                            </p>
                        </Container>
                    </Jumbotron>
                                
            </div>


        )
        
    }
}

export default Stock