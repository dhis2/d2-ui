import React from 'react';
import log from 'loglevel';

export default function withStateFrom(stateSource$, BaseComponent) {
    return class extends React.Component {
        componentDidMount() {
            this.disposable = stateSource$
                .subscribe(
                    (state) => this.setState(state),
                    (error) => log.error(error)
                );
        }

        componentWillUnmount() {
            this.disposable && this.disposable.dispose && this.disposable.dispose();
        }

        render() {
            return (
                <BaseComponent {...this.state} {...this.props} />
            );
        }
    };
}
