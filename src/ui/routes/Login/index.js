import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useAuthenticate from '../../hooks/useAuthenticate';
import useSession from '../../hooks/useSession';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const { saveSession } = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);
    const [isEntering, setEntering] = useState(false);
    const [user, authenticate] = useAuthenticate();

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    useEffect(() => {
        if (user && user.id !== undefined) {
            setHelperText('');
            setError(false);
            setEntering(true);
            setIsButtonDisabled(true);
            saveSession(user);
            setTimeout(() => history.push("/home"), 3000);
        } else if (user && user.id === undefined) {
            setError(true);
            setHelperText('Nombre de usuario o contraseña incorrectos');
        }
    }, [user, error, history, username, password, saveSession]);

    const handleKeyPress = e => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || onLogin();
        }
    };

    const onLogin = () => authenticate(username, password);

    return (
        <div>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Inicio de sesión
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Nombre de usuario"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)} />

                    { isEntering && <Alert severity="success">Ingresando...</Alert> }
                    { error && helperText.length > 0 && <Alert severity="warning">{helperText}</Alert> }

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isButtonDisabled}
                        onClick={onLogin}>
                        Iniciar
                    </Button>
                </form>
            </div>
        </div>
    );
}