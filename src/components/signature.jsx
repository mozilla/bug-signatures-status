import React from 'react';
import { Alert, Table } from 'react-bootstrap';


const SignatureTable = React.createClass({
    render() {
        let percentTitle = "Percentage of crashes with this signature over the total crash count for this product and version";
        let countTitle = "Number of crashes with this signature";
        let totalTitle = "Number of crashes for this product and version";

        let rows = this.props.data.sort((a, b) => b.percent - a.percent);

        let content = this.props.data.map((row, i) => {
            let percent = '-';
            if (row.percent > 0) {
                percent = row.percent.toFixed(1) + ' %';
            }

            return (
                <tr key={i}>
                    <td>{ row.product }</td>
                    <td>{ row.version }</td>
                    <td title={percentTitle}>{ percent }</td>
                    <td title={countTitle}>{ row.versionCount }</td>
                    <td title={totalTitle}>{ row.total || '-' }</td>
                </tr>
            );
        });

        return (
            <Table striped bordered condensed hove>
                <thead>
                    <tr>
                        <td>Product</td>
                        <td>Version</td>
                        <td title={percentTitle}>Percentage</td>
                        <td title={countTitle}>Count</td>
                        <td title={totalTitle}>Total</td>
                    </tr>
                </thead>
                <tbody>
                    { content }
                </tbody>
            </Table>
        );
    }
});


const SignatureContent = React.createClass({
    render() {
        if (this.props.state.isFetching || this.props.productVersionCounts.isFetching) {
            return <Alert bsStyle="info">Fetching signature data... </Alert>;
        }

        if (!this.props.state.data || !this.props.state.data.length) {
            return <Alert bsStyle="warning">No data found for this signature.</Alert>;
        }

        let totals = this.props.productVersionCounts.totals;

        let rows = this.props.state.data.map(product => {
            return product.facets.version.map(version => {
                let key = product.term + ':' + version.term;
                let percent = 0;

                if (totals[key] > 0) {
                    percent = 100.0 * version.count / totals[key];
                }

                return {
                    product: product.term,
                    productCount: product.count,
                    version: version.term,
                    versionCount: version.count,
                    total: totals[key],
                    percent: percent
                };
            });
        });
        rows = [].concat.apply([], rows); // Flatten array.

        return <SignatureTable data={rows} />;
    }
});


const Signature = React.createClass({
    render() {
        return (
            <section>
                <h3>{ this.props.signature }</h3>
                <SignatureContent
                    signature={this.props.signature}
                    state={this.props.state}
                    productVersionCounts={this.props.productVersionCounts}
                />
            </section>
        );
    }
});

export default Signature;
