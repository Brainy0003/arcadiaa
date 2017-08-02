import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import { Header, Footer } from './layout';
import { Signin, Signup } from './authentication';
import Chat from './chat/Chat';
import PollsContainer from './polls/PollsContainer';
import Profile from './profile/Profile';
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
                    <Route exact path="/" component={Home} />
                    <PrivateRoute path="/chat" component={Chat} />
                    <PrivateRoute path="/polls" component={PollsContainer} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Footer />
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default App;