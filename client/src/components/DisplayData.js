import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import DataCard from './DataCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const SELECT_ALL_USERS = gql`
    query getUsers{
        users {
            id
            name
            username
            age
            nationality
        }
    }
`

const SELECT_USER_BY_ID = gql`
    query User($id: ID!) {
        user(id: $id){
            username
        }
    }
`

const ADD_NEW_USER = gql`
    mutation addUser($input: AddUserInput!){
        addUser(input: $input){
            name
            username
            age
            nationality
        }
    }
`

const DELETE_USER_BYID = gql`
    mutation deleteUser($id: ID!){
        deleteUser(id: $id){
            id
        }
    }
`

export default function DisplayData() {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    //Add user state
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [nationality, setNationality] = useState("");


    const [id, setId] = useState("");

    const { data, loading, refetch } = useQuery(SELECT_ALL_USERS);
    const [fetchUser, { data: userDataSearch, error: userErrorSearch },] = useLazyQuery(SELECT_USER_BY_ID);
    const [createUser] = useMutation(ADD_NEW_USER);
    const [deleteUser] = useMutation(DELETE_USER_BYID);


    if (userErrorSearch) {
        var errorUserDoesntExist = "User with this id doesn't exist"
    }

    return (
        <div>

            <AddCircleOutlineIcon
                className='d-flex ms-auto me-2 mt-2'
                fontSize='large'
                style={{ cursor: 'pointer' }}
                onClick={handleOpenModal} />
            <div className='container d-flex justify-content-center flex-column'>

                <Row className='container'>
                    {loading && !data && (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                            <CircularProgress />
                        </div>
                    )}
                    {data && data.users.map((user) => {
                        return <Col key={user.id} lg={4} md={4} xs={12} sm={6} className='mb-3'>
                            <DataCard 
                            name={user.name} 
                            username={user.username} 
                            age={user.age} 
                            nationality={user.nationality} 
                            deleteUser={deleteUser} 
                            id={user.id}
                            refetch = {refetch}/>
                        </Col>
                    })}
                </Row>
                <Row className='container col-lg-4 mx-auto'>

                    <FloatingLabel
                        label="User id"
                        controlId="floatingInput"
                        className="mb-3">
                        <Form.Control type='text' placeholder='id' onChange={(event) => {
                            setId(event.target.value);
                        }} />
                    </FloatingLabel>
                    <button className='btn btn-outline-secondary' onClick={() => {
                        fetchUser({
                            variables: {
                                id: Number(id),
                            }
                        })
                    }}>Search user</button>
                    <div>
                        {userDataSearch && (<div>username: {userDataSearch.user.username}</div>)}
                        {userErrorSearch && (<footer className='text-danger'>{errorUserDoesntExist}</footer>)}
                    </div>
                </Row>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(event) => {
                                setName(event.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={(event) => {
                                setUsername(event.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Enter age" onChange={(event) => {
                                setAge(event.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" placeholder="Enter nationality" onChange={(event) => {
                                setNationality(event.target.value.toUpperCase());
                            }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={() => {
                        createUser({
                            variables: {
                                input: {
                                    name,
                                    username,
                                    age: Number(age),
                                    nationality
                                }
                            }
                        })

                        refetch();
                        setShowModal(false);
                    }}>
                        Save User
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
