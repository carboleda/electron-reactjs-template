import React from 'react';
import {
    useHistory
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import useSession from '../../hooks/useSession';

export default function() {
    const { logout } = useSession();
    const history = useHistory();

    const onLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <div>
            <h1>Hello world</h1>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onLogout}>
                Cerrar sesión
            </Button>
        </div>
    );
}