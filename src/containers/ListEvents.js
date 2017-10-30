import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class ListEvents extends Component {
    showAddEvent() {
        this.props.viewAddModal();
        this.setState({});
    }
    dropEvent() {
        this.props.viewDropModal();
        this.setState({});
    }
    findEvent(e) {
        this.props.findEvent(e.target.value);
        this.setState({});
    }
    checkedAll(e) {
        this.props.checkedAll(e.target.checked);
        this.setState({});
    }
    showDropCancel() {
        this.props.viewDropModal();
        this.setState({});
    }
    handleAdd() {
        if (this.eventName.value.length > 0 && this.eventDate.value.length > 0 && this.eventCity.value !== 'Город') {
            this.props.addEvent(this.eventName.value, this.eventDate.value, this.eventCity.value);
            this.props.viewAddModal();
            this.setState({});
        }
        else {
            alert("Необходимо заполнить все поля. В противном случае нажмите 'ОТМЕНА'");
        }
    }
    handleDrop() {
        this.props.dropEvent();
        this.setState({});
    }
    handleChange(e) {
        this.props.statusCheckbox(e.target.value);
        this.setState({});
    }
    render() {
        return (
            <div className="tools">
                <div className="btn">
                    <button onClick={this.showAddEvent.bind(this)}>+</button>
                    <button disabled={this.props.store.disabled_drop} onClick={this.dropEvent.bind(this)} >-</button>
                    <input
                        type="text"
                        className="eventInp"
                        placeholder="Поиск"
                        value={this.props.findStr}
                        onChange={this.findEvent.bind(this)}
                    />
                </div>
                <div className="listEvents">
                    <table>
                        <tbody>
                            <tr>
                                <th><input type="checkbox" checked={this.props.store.checked_all} onClick={this.checkedAll.bind(this)} /></th>
                                <th>Название</th>
                                <th>Дата</th>
                                <th>Место проведения</th>
                            </tr>
                            {this.props.store.events.filter(event => event.name.includes(this.props.findStr)).map((event, index) =>
                                <tr key={index}><td><input type="checkbox" value={event.name} onChange={this.handleChange.bind(this)} checked={event.status} /></td><td>{event.name}</td><td>{event.date}</td><td>{event.location}</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={this.props.store.addModal}>
                    <h4>Добавление мероприятия</h4>
                    <input type="text" placeholder="Название" ref={(inputName) => { this.eventName = inputName }} />
                    <input type="date" placeholder="Дата" ref={(inputDate) => { this.eventDate = inputDate }} />
                    <select className="addDrop" ref={(inputCity) => { this.eventCity = inputCity }}>
                        <option selected disabled >Город</option>
                        {this.props.store.cities.map((name, index) =>
                            <option key={index} >{name}</option>
                        )}
                    </select>
                    <button onClick={this.handleAdd.bind(this)}>Добавить</button>
                    <button onClick={this.showAddEvent.bind(this)}>Отмена</button>
                </Modal>
                <Modal isOpen={this.props.store.dropModal}>
                    <h4>Вы действительно хотите удалить выделенное?</h4>
                    <button onClick={this.handleDrop.bind(this)}>Да</button>
                    <button onClick={this.showDropCancel.bind(this)}>Нет</button>
                </Modal>
            </div>
        )
    }
}
export default connect(
    state => ({
        store: state.events,
        findStr: state.findEvents
    }),
    dispatch => ({
        addEvent: (name, date, city) => {
            const data = {
                name: name,
                date: date,
                location: city,
                status: false
            }
            dispatch({ type: 'ADD_EVENT', data: data });
        },
        dropEvent: () => {
            dispatch({ type: 'DROP_EVENT' });
        },
        statusCheckbox: (value) => {
            dispatch({ type: 'EDIT_STATUS', data: { value: value } });
        },
        findEvent: (value) => {
            dispatch({ type: 'FIND_EVENT', data: value });
        },
        viewAddModal: () => {
            dispatch({ type: 'ADD_MODAL' });
        },
        viewDropModal: () => {
            dispatch({ type: 'DROP_MODAL' });
        },
        checkedAll: (status) => {
            dispatch({ type: 'CHECKED_ALL', data: status })
        }

    })
)(ListEvents);
