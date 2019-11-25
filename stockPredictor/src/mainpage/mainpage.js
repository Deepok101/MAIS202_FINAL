import React from 'react'
import Nav from '../common/navbar'
import AppleChart from '../results/companyCharts'
import Container from 'react-bootstrap/Container'
import ProfitTable from './profitTable'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/Button'
import GameChart from './gameChart'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom'
import Chart from './gameChart'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

class MainPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            numShares: 0,
            amount:0,
            typeInvestor: "Passive",
            gameData: [],
            formattedGameData: [],
            passiveProfit: 0,
            activeProfit: 0,
            loading:false,
            price:0
        }
        this.onChange = this.onChange.bind(this)
        this.sendData = this.sendData.bind(this)
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    handleFormControlChange(event){
        let fieldVal = event.target.value;
        this.setState({typeInvestor: fieldVal})
    }

    sendData(stock){
        var body = {
            "numShares": this.state.numShares,
            "typeInvestment": this.state.typeInvestor
        }
        this.setState({loading: true})
        fetch(`/game/prediction/${stock}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
          }).then(res => res.json()).then(data => this.setState({gameData: data, loading: false})).then(() => this.transformData())
    }

    transformData(){
        var dataFormatted=[]
        var data = this.state.gameData
        for(var i=0; i<data.length; i++){
           
            dataFormatted.push({Date: new Date(data[i].Date), 
                Profit_Active_Total: parseFloat(data[i].Profit_Active_CumSum_Total), 
                Profit_Passive_Total: parseFloat(data[i].Profit_Passive_CumSum_Total)})
            
        }
        this.setState({formattedGameData: dataFormatted})
        this.setState({activeProfit: dataFormatted[dataFormatted.length-1].Profit_Active_Total})
        this.setState({passiveProfit: dataFormatted[dataFormatted.length-1].Profit_Passive_Total})

    }

    render(){
        console.log(this.state.typeInvestor)
        var chart;
        var gameChart;
        var profitResults;
        var showAllBtn;
        if(this.state.loading == true){
            
            chart = 
                <Spinner animation="border" role="status" className="mt-4 mb-3">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            profitResults=null;
            showAllBtn=null;
        } else {
            if(this.state.formattedGameData.length != 0){
                gameChart = <GameChart formattedGameData={this.state.formattedGameData}/>
                if(this.state.typeInvestor == "Passive"){
                    chart = <Chart color="blue" formattedGameData={this.state.formattedGameData} both={false} colName="Profit_Passive_Total"/>
                } else if(this.state.typeInvestor == "Active"){
                    chart = <Chart color="red" formattedGameData={this.state.formattedGameData} both={false} colName="Profit_Active_Total"/>
                } else if(this.state.typeInvestor == "both"){
                    chart = <Chart color="red" formattedGameData={this.state.formattedGameData} both={true}/>
                }
                profitResults = 
                    <Table striped bordered hover className="mt-3">
                        <ProfitTable activeProfit={this.state.activeProfit} passiveProfit={this.state.passiveProfit}/>
                    </Table>
                showAllBtn = 
                    <Button variant="success" size="lg" className="mt-3" onClick={() => this.setState({typeInvestor: "both"})} block>
                        Show both results
                    </Button>
            }

        }

        
        return(
            <div>
                <Nav first="active"/>
                <Container className='mt-4'>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                <Tab eventKey="home" title="Apple Stock">
                                    <Card style={{ padding: '1rem' }}>
                                        <Form> 
                                            <h2>
                                                Apple Investing
                                            </h2>
                                            <h5>
                                                Date: 2013-07-12
                                            </h5>
                                            <h5>
                                                Price: $67.27
                                            </h5>
                                            <Form.Group className='mt-4' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Type of Investor</Form.Label>
                                                <Form.Control name="typeInvestment" as="select" onChange={this.handleFormControlChange.bind(this)}>
                                                    <option>Passive</option>
                                                    <option>Active</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Row>

                                                <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect2">
                                                    <Form.Label>Number of AAPL Shares</Form.Label>
                                                    <Form.Control name="numShares" onChange={this.onChange} value={this.state.numShares} type="number" placeholder="Number of Stocks"/>
                                                </Form.Group>
                                                <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Amount</Form.Label>
                                                    <Form.Control name="amount" value={this.state.numShares*67.27} type="number" placeholder="Max 50%"/>
                                                </Form.Group>
                                            </Form.Row>

                                        </Form>
                                    </Card>
                                    <div>
                                        <Button variant="primary" size="lg" className="mt-3" onClick={() => this.sendData("apple")} block>
                                            Submit
                                        </Button>
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Goldman Sachs">
                                    <Card style={{ padding: '1rem' }}>
                                        <Form> 
                                            <h2>
                                                Goldman Sachs Investing
                                            </h2>
                                            <h5>
                                                Date: 2013-07-15
                                            </h5>
                                            <h5>
                                                Price: $160.28
                                            </h5>
                                            <Form.Group className='mt-4' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Type of Investor</Form.Label>
                                                <Form.Control name="typeInvestment" as="select" onChange={this.handleFormControlChange.bind(this)}>
                                                    <option>Passive</option>
                                                    <option>Active</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Row>

                                                <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect2">
                                                    <Form.Label>Number of GS Shares</Form.Label>
                                                    <Form.Control name="numShares" onChange={this.onChange} value={this.state.numShares} type="number" placeholder="Number of stocks"/>
                                                </Form.Group>
                                                <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Amount</Form.Label>
                                                    <Form.Control name="amount" value={this.state.numShares*160.28} type="number" placeholder="Max 50%"/>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Card>
                                    <div>
                                        <Button variant="primary" size="lg" className="mt-3" onClick={() => this.sendData("goldman")} block>
                                            Submit
                                        </Button>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            

                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            {chart}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            {profitResults}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            {showAllBtn}
                        </Col>
                    </Row>
                </Container>
            </div>


        )
    }
}

export default withRouter(MainPage);