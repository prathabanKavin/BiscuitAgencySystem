import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const HomeScreen = () => {
    return (
        <>
            <Nav justify variant="pills" defaultActiveKey="/orders">
            <Nav.Item>
                <LinkContainer to="/orders">
                    <Nav.Link><i class="fas fa-th-list"></i> Orders</Nav.Link>
                </LinkContainer>  
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/products">
                    <Nav.Link><i class="fas fa-warehouse"></i> Products</Nav.Link>   
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to='/delivery'>
                    <Nav.Link><i class="fas fa-truck-moving"></i> Delivery</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to='/accounts'>
                    <Nav.Link><i class="fas fa-file-invoice-dollar"></i> Accounts</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to='/support'> 
                    <Nav.Link><i class="fas fa-headset"></i> Customer Support</Nav.Link> 
                </LinkContainer>
            </Nav.Item>
            </Nav>
        </>
    )
}

export default HomeScreen
