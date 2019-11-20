import React from 'react'
import Nav from '../common/navbar'
import Container from 'react-bootstrap/Container'
import ReactTable from "react-table";
import CompanyChart from './companyCharts'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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

                <Container className='mt-4'>
                    <Row>
                        <Col  md={{ span: 8, offset: 2 }}>
                            <Tabs defaultActiveKey="Apple" id="uncontrolled-tab-example">
                                <Tab eventKey="Apple" title="Apple">
                                        <CompanyChart stock="apple"/>
                                
                                </Tab>
                                <Tab eventKey="Goldman" title="Goldman">
                                    <CompanyChart stock="goldman"/>
                                </Tab>
                            </Tabs> 
                        </Col> 
                    </Row>   
                </Container>
            </div>


        )
        
    }
}

export default Stock