import React, { Component } from "react";
import ItemStatusFilter from "../item-status-filter";
import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };

    render() {

        const {onFilterChange} = this.props;

        return (
            <div className={"search-panel"}>
                <input
                    placeholder="Search item"
                    onChange={this.onSearchChange}
                    value={this.state.term}
                    className={"search-panel__input form-control"}
                />
                <ItemStatusFilter filter={this.props.filter}
                                  onFilterChange={onFilterChange} />
            </div>
        );
    }
};
