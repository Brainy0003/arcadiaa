import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const GoogleAuth = () => (
    <div>
        <p className="text-center or">OU</p>
        <Link to="auth">
            <Button bsStyle="default" bsSize="large" block><i className="fa fa-google"></i> Se connecter avec Google</Button>
        </Link>
    </div>
);

export default GoogleAuth;