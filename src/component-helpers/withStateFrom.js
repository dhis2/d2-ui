import React from 'react';

export default function withStateFrom(stateSource$, BaseComponent) {
    return class extends React.Component {
        componentDidMount() {
            this.disposable = stateSource$
                .subscribe((state) => this.setState(state));
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
