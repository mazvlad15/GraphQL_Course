import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "react-bootstrap/Card"
import CloseButton from 'react-bootstrap/esm/CloseButton'

export default function DataCard({ name, username, age, nationality, deleteUser, id, refetch }) {
    return (
        <div>
            <Card>
                <Card.Body>
                    <div className='d-flex'>
                    <Card.Title >{name} : {username}</Card.Title>
                    <CloseButton className='ms-auto col-lg-1' onClick={() => {deleteUser({
                        variables: {
                            id: id
                        }
                    });
                    refetch();
                    }}/>
                    </div>
                    <Card.Text>
                        Age: {age}
                        <br />
                        Nationality: {nationality}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
