import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import PaymentModal from '../components/PaymentModal'
import { getOrderDetails,payOrder,deliverOder } from '../actions/orderActions'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET} from'../constants/orderConstants'

const OrderScreen = ({ match, history}) => {
    const orderId = match.params.id
    const [ sdkReady, setSdkReady ] = useState(false)
    const dispatch = useDispatch()
    
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay =useselector((state)=>state.orderPay)
    const{ loading: loadingPay, success: successPay}=orderPay

    const orderDeliver =useselector((state)=>state.orderDeliver)
    const{ loading: loadingDeliver, success: successDeliver}=orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        //Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty, 0)
        )
    }
    useEffect(() => {
        if(userInfo){
            history.push('/login')
        }
        const addPayhereScript = async () => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = "https://www.payhere.lk/lib/payhere.js"
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || successDeliver){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(window.paypal){
                addPayhereScript()
            }else{
                setSdkReady(true)
            }
        }
        
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId, successPay, successDeliver, order])

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}
        </Message> : 
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping :</h2>
                                <p>
                                    <strong>Name: </strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong> {' '}
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city},{'  '}
                                    {order.shippingAddress.postalCode},{'  '}
                                    {order.shippingAddress.country}
                                </p>
                                <h2>Order Status :</h2>  
                                {order.isShipped ? <Message variant='success'>Shipped on {order.shippedAt}</Message> :
                                    <Message variant='danger'>Not Shipped</Message>}
                                {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                    <Message variant='danger'>Not Delivered</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method:</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                                    <Message variant='danger'>Not Paid</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is empty </Message> :
                                    (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty}  x  LKR {item.price} = LKR {item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items </Col>
                                        <Col>LKR {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping </Col>
                                        <Col>LKR {order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>LKR {order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <PaymentModal
                                        orderId= {order._id}
                                        name= 'Biscuit Products'
                                        amount= {order.totalPrice}
                                        firstname = {order.user.name}
                                        email = {order.user.email}
                                        address = {order.shippingAddress.address}
                                        city = {order.shippingAddress.city}
                                        country = {order.shippingAddress.country}
                                    />
                                </ListGroup.Item>
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverhandler}>
                                            Mark as Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
}

export default OrderScreen
