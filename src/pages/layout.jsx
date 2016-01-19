import React from 'react';
import { Alert, Button, Input, Navbar, Nav, NavItem, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import { connect } from 'react-redux';

import { changeBugNumber } from '../actions.jsx';
import BugForm from '../components/bug-form.jsx';


const Header = React.createClass({
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Bug Signatures Status</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to="/"><NavItem>Documentation</NavItem></IndexLinkContainer>
                    </Nav>
                    <Navbar.Form pullRight>
                        <BugForm bugNumber={this.props.bugNumber} />
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});


const Footer = React.createClass({
    render() {
        return (
            <p className="text-center">
                Made by {' '}
                <a href="http://adrian.gaudebert.fr/home_en">
                    <span className="glyphicon glyphicon-user" /> Adrian
                </a> - {' '}
                <a href="https://github.com/mozilla/bug-signatures-status">
                    <span className="glyphicon glyphicon-education" /> Source code
                </a> - {' '}
                <a href="https://crash-stats.mozilla.com/api/">
                    <span className="glyphicon glyphicon-cloud-download" /> Data source
                </a>
            </p>
        );
    }
});


const Layout = React.createClass({
    render() {
        let alert;

        if (this.props.productVersionCounts.didInvalidate) {
            alert = <Alert bsStyle="danger">Unable to load data from crash-stats.</Alert>;
        }

        return (
            <div className="app">
                <Header bugNumber={this.props.latestBugNumber} />
                <Grid>
                    { alert }
                    <Row>
                        { this.props.children }
                    </Row>
                    <hr />
                    <Footer />
                </Grid>
            </div>
        );
    }
});

function select(state) {
    return {
        productVersionCounts: state.productVersionCounts,
        latestBugNumber: state.latestBugNumber
    }
}

export default connect(select)(Layout);
