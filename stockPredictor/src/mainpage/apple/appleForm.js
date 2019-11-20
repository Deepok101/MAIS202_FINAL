import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/form'


class AppleForm extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Form> 
                    <h2>
                        Apple Investing
                    </h2>
                    <Form.Group className='mt-4' controlId="exampleForm.ControlSelect1">
                        <Form.Label>Type of Investor</Form.Label>
                        <Form.Control name="typeInvestment" as="select" onChange={this.handleFormControlChange.bind(this)}>
                            <option>Passive</option>
                            <option>Active</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Margin</Form.Label>
                        <Form.Control as="select">
                            <option>Equity Only</option>
                            <option>Margin</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Row>

                        <Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect2">
                            <Form.Label>Number of AAPL Shares</Form.Label>
                            <Form.Control name="numShares" onChange={this.onChange} value={this.state.numShares} type="number" placeholder="1"/>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control name="amount" value={this.state.numShares*68} type="number" placeholder="Max 50%"/>
                        </Form.Group>
                    </Form.Row>

                </Form>
            </div>


        )
        
    }
}

export default AppleForm
                            
                            
                            
                            
