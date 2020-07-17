import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import './App.css';
import Login from './routes/Login';
import Home from './routes/Home';

function App() {
    const state = {
        name: "React",
        isUserAuthenticated: false
    };

    const Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://carlosarboleda.co/">
                    carlosarboleda.co
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    };

    return (
        <Container component="main" maxWidth="xs">
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                state.isUserAuthenticated ?
                                    <Redirect to="/home" /> :
                                    <Redirect to="/login" />
                            )
                        }}
                    />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default App;
