import React, { Component } from 'react';
import {Col, Row, Input, Button, Tab, Tabs} from 'react-materialize';
import './css/form.css';


class Form extends Component {
    render() {
        const styles = {
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
        };
        return (
            <div className={'container'}>
                <Tabs className={'switchTab'}>
                    <Tab title="Inbound" active></Tab>
                    <Tab title="Outbound"></Tab>
                </Tabs>
                <Row>
                   <Col style={styles} m={6} s={12}>
                       <Input s={12} type='select' label="CHOOSE DEPARTURE TIME">
                           <option value='1'>4:00PM</option>
                           <option value='2'>6:00PM</option>
                           <option value='3'>7:30PM</option>
                       </Input>
                   </Col>
                    <Col m={6} s={12} style={{marginBottom: '30px'}}>
                        <Input s={6} type={'number'} label="NOTIFICATION TIME"/>
                        <Input s={6} type='select'>
                            <option value='1'> MIN </option>
                            <option value='2'> HOUR </option>
                        </Input>
                    </Col>
                    <Col style={styles} m={6} s={12} className={'centered'}>
                        <p>WOULD YOU LIKE A CALL OR A TEXT?</p>
                        <Input name='group1' type='radio' value='CALL' label='CALL' />
                        <Input name='group1' type='radio' value='TEXT' label='TEXT' />
                    </Col>
                    <Col style={styles} m={6} s={12}>
                        <p>PLEASE ENTER PHONE NUMBER</p>
                        <Input label="Telephone" validate type='tel'></Input>
                    </Col>
                    <Button>Save</Button>
                </Row>
            </div>
        );
    }
}

export default Form;
