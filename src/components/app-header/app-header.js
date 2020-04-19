import React, {Component} from "react";
import './app-header.css'

export default class AppHeader extends Component {

    render() {

        const { toDo, done } = this.props;

        return (
            <div className="app-header">
                <h1 className="app-header__title">My ToDo List</h1>
                    <span className="app-header__info">
                    <span className="app-header__info--todo">{toDo} </span>
                    more to do,
                    <span className="app-header__info--done"> {done} </span>
                    done
                </span>
            </div>
        )
    }
};