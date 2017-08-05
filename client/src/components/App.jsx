import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import { Header } from './layout';
import { Signin, Signup } from './authentication';
import Chat from './chat/Chat';
import { PollsContainer, Poll } from './polls';
import Profile from './profile/Profile';
import Management from './management/Management';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import store from '../configureStore';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/app.css';

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router>
                <div className="app-container">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute path="/chat" component={Chat} />
                        <PrivateRoute exact path="/polls" component={PollsContainer} />
                        <PrivateRoute path="/management" component={Management} />
                        <PrivateRoute path="/polls/:pollId" component={Poll} />
                        <PrivateRoute path="/profile" component={Profile} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/signup" component={Signup} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default App;