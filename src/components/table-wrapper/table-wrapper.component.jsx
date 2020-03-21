import React from 'react';
import Table from '../table/table.component';
class TableWrapper extends React.Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            students: [
                { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
                { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
                { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
                { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
            ]
        }
    }

    render() {
        return (
            <div>
                <Table studentData={this.state.students} />
            </div>
        )
    }
}

export default TableWrapper;