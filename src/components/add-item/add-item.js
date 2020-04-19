import React, { Component } from "react";

import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: '',
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded( this.state.label );
        this.setState({
            label: '',
        })
    };

    render() {
        return (
            <form className="add-item input-group" onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       value={this.state.label}
                       placeholder="what to do?" />

                <div className="input-group-append">
                    <button className="btn btn-outline-primary"
                            type="submit">
                        Add Task
                    </button>
                </div>
            </form>
        );
    }
}