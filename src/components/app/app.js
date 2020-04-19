import React, {Component} from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import AddItem from "../add-item";

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Build Awesome React App'),
            this.createTodoItem('Have a lunch'),
            this.createTodoItem('Draw Awesome Image'),
            this.createTodoItem('Lets Workout'),
        ],
        term: '',
        filter: 'all',
    };

    createTodoItem(label) {

        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    deleteItem = (id) => {

        this.setState(({todoData}) => {

            const resultData = todoData.filter((item) => {
                return item.id !== id;
            });

            return { todoData: resultData }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newTodoData = [].concat(todoData);
            newTodoData.push(newItem);
            return {
                todoData: newTodoData,
            }
        })
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    searchItem = (items, term) => {

        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.label
                    .toLowerCase()
                    .indexOf(term.toLowerCase()) > -1;
        });
    };

    filterItem = (items, filter) => {

        switch(filter) {
            case 'all':
                return items;

            case 'active':
                return items.filter(item => !item.done);

            case 'done':
                return items.filter(item => item.done);

            default:
                return items;
        }
    };

    toggleProperty(arr, id, propName) {
        const resultData = arr.map((item) => {
            if ( item.id === id ) {
                return {...item, [propName]: !item[propName]};
            } else {
                return item;
            }
        });
        return resultData;
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    render() {

        const { todoData, term, filter } = this.state;
        const visibleItems = this.filterItem(this.searchItem(todoData, term), filter);
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div>
                <div className="todo-app">

                    <AppHeader toDo={todoCount}
                               done={doneCount} />

                    <SearchPanel onSearchChange={this.onSearchChange}
                                 onFilterChange={this.onFilterChange}
                                 filter={filter} />

                    <AddItem onItemAdded={this.addItem} />

                    <TodoList
                        todos={visibleItems}
                        onDeleted={ this.deleteItem }
                        onToggleImportant={ this.onToggleImportant }
                        onToggleDone={ this.onToggleDone } />
                </div>
            </div>
        );
    }
};


