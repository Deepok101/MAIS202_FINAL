import React from 'react'
import Table from 'react-bootstrap/Table'
import Stock from './stock'
import Nav from '../common/navbar'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

class StockPage extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        if(this.props.default == "apple"){
            return(
                <div>
                    <Nav second="active"/>
                    <Container className='mt-4'>
                        <Tabs defaultActiveKey="Apple" id="uncontrolled-tab-example">
                            <Tab eventKey="Apple" title="Apple">
                                <Stock stock="apple"/>                        
                            </Tab>
                            <Tab eventKey="goldman" title="Goldman">
                                <Stock stock="goldman"/>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            )
        } else if(this.props.default == "goldman"){
            return(
                <div>
                    <Nav/>
                    <Container className='mt-4'>
                        <Tabs defaultActiveKey="Goldman" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Apple">
                                <Stock stock="apple"/>                        
                            </Tab>
                            <Tab eventKey="Goldman" title="Goldman">
                                <Stock stock="goldman"/>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>     
            )
        }

    }

}

export default StockPage