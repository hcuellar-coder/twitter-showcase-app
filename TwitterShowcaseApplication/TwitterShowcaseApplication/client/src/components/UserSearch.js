import React, { useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function UserSearch() {
    useEffect(() => {
        console.log('running UserSearch!');
    })

    return (
        <div>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </div>
    )
}

export default UserSearch;