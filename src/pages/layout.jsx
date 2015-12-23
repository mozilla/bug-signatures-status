import React from 'react';
import { Navbar, Nav, NavItem, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';


const Footer = React.createClass({
    render() {
        return (
            <p className="text-center">
                Made by&nbsp;
                <a href="http://adrian.gaudebert.fr/home_en">
                    <span className="glyphicon glyphicon-user" /> Adrian
                </a> -&nbsp;
                <a href="https://github.com/AdrianGaudebert/bug-signatures-status">
                    <span className="glyphicon glyphicon-education" /> Source code
                </a> -&nbsp;
                <a href="https://crash-stats.mozilla.com/api/">
                    <span className="glyphicon glyphicon-cloud-download" /> Data source
                </a>
            </p>
        );
    }
});


export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Bug Signatures Status</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <IndexLinkContainer to="/"><NavItem>Home</NavItem></IndexLinkContainer>
                        <LinkContainer to="/doc"><NavItem>Doc</NavItem></LinkContainer>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row>
                        {this.props.children}
                    </Row>
                    <Footer />
                </Grid>
            </div>
        );
    }
}
