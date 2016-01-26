import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';


const Sidebar = React.createClass({
    propTypes: {
        sections: React.PropTypes.arrayOf(React.PropTypes.shape({
            key: React.PropTypes.string,
            label: React.PropTypes.string,
        })).isRequired,
        currentSection: React.PropTypes.string,
        onChangeSection: React.PropTypes.func.isRequired,

        showSearchField: React.PropTypes.bool,
        searchFieldLabel: React.PropTypes.string,
        onChangeSearchText: React.PropTypes.func,
    },

    contextTypes: {
        d2: React.PropTypes.object,
        muiTheme: React.PropTypes.object,
    },

    getDefaultProps() {
        return {
            showSearchField: false,
        };
    },

    componentWillReceiveProps(props) {
        if (props.currentSection) {
            this.setState({ currentSection: props.currentSection });
        }
    },

    getInitialState() {
        return {
            currentSection: this.props.currentSection || this.props.sections[0].key,
            searchText: '',
        };
    },

    renderSearchField() {
        const d2 = this.context.d2;
        const styles = {
            closeButton: {
                position: 'absolute',
                cursor: 'pointer',
                top: '2rem',
                right: '.75rem',
                fontSize: '1rem',
                color: '#AAA',
            },
        };
        if (this.props.showSearchField) {
            return (
                <div style={{ padding: '1rem 1rem 0', position: 'relative' }}>
                    <TextField hintText={!!this.props.searchFieldLabel ? this.props.searchFieldLabel : d2.i18n.getTranslation('search')} style={{ width: '100%' }}
                               value={this.state.searchText}
                               onChange={this.changeSearchText} ref={ref => { this.searchBox = ref; }} />
                    {!!this.state.searchText ? <FontIcon style={styles.closeButton} className="material-icons" onClick={this._clear}>clear</FontIcon> : undefined}
                </div>
            );
        }
    },

    renderSections() {
        const style = {
            item: {
                fontSize: 14,
                borderRadius: 5,
                margin: 8,
            },
            activeItem: {
                fontSize: 14,
                fontWeight: 700,
                color: '#2196f3',
                backgroundColor: '#e0e0e0',
                borderRadius: 5,
                margin: 8,
            },

        };

        return (
            <List style={{ backgroundColor: 'transparent' }}>
                {this.props.sections.map(section => {
                    return (
                        <ListItem
                            key={section.key}
                            primaryText={section.label}
                            onClick={this.setSection.bind(this, section.key)}
                            style={section.key === this.state.currentSection && !this.state.searchText ? style.activeItem : style.item} />
                    );
                })}
            </List>
        );
    },

    render() {
        const style = {
            sidebar: {
                backgroundColor: '#f3f3f3',
                overflowY: 'auto',
                width: 256,
            },
        };

        return (
            <div style={style.sidebar} className="left-bar">
                {this.renderSearchField()}
                {this.renderSections()}
            </div>
        );
    },

    setSection(key) {
        if (key !== this.state.currentSection) {
            this.setState({ currentSection: key });
            this.props.onChangeSection(key);
        }
    },

    changeSearchText() {
        this.setState({ searchText: this.searchBox.getValue() }, () => {
            if (this.props.onChangeSearchText) {
                this.props.onChangeSearchText(this.state.searchText);
            }
        });
    },

    _clear() {
        this.setState({ searchText: '' }, () => {
            if (this.props.onChangeSearchText) {
                this.props.onChangeSearchText(this.state.searchText);
            }
        });
    },

    clearSearchBox() {
        this.setState({ searchText: '' });
    },
});

export default Sidebar;
