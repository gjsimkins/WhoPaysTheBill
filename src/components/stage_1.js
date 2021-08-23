import React, { useState, useContext, useRef } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'

import { MyContext } from '../context';

const Stage1 = () => {
    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, '']);
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);
        if (validate) {
            // form is valid then add player
            setError([false, '']);
            context.addPlayer(value);
            textInput.current.value = ''
        }
    }

    const validateInput = (value) => {
        if (value === '') {
            setError([true, 'You need to have a name']);
            return false;
        }
        if (value.length <= 2) {
            setError([true, 'You need a name longer than 3 characters']);
            return false;
        }
        return true;
    }

    console.log(context)
    return (
        <>
            <Form onSubmit={handleSubmit} className=" mt-4">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Add Player Name"
                        name="player"
                        ref={textInput}
                    />
                </Form.Group>

                {error[0] ?
                    <Alert variant="danger">
                        {error[1]}
                    </Alert>
                    :
                    null
                }

                <Button className="miami" variant="primary" type="submit">
                    Add Player
                </Button>
                {
                    context.state.players && context.state.players.length > 0 ?
                        <>
                            <hr />
                            <div>
                                <ul className="list-group">
                                    {
                                        context.state.players.map((item, idx) => (
                                            <li key={idx} className="list-group-item d-flex
                                            justify-content-between align-items-center
                                             list-group-item-action">
                                                {item}
                                                <span className="badge badge-danger"
                                                    onClick={() => context.removePlayer(idx)}>
                                                    x
                                                </span>
                                            </li>))
                                    }
                                </ul>
                                <div className="action_button"
                                    onClick={() => context.next()}>
                                    Next
                                </div>
                            </div>
                        </>
                        : null
                }
            </Form>
        </>
    )
}

export default Stage1;