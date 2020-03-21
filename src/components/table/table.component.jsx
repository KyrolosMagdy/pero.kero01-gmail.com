import React, { Component } from 'react';
import './table.styles.css';

class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         students: [
            { id: 1, to: 'Wasif', sender: 21, at: 'wasif@email.com' },
            { id: 2, to: 'Ali', sender: 19, at: 'ali@email.com' },
            { id: 3, to: 'Saad', sender: 16, at: 'saad@email.com' },
            { id: 4, to: 'Asad', sender: 25, at: 'asad@email.com' }
         ]
      }
   }

   renderTableData() {
      return this.state.students.map((student, index) => {
         const { id, to, sender, at } = student //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{to}</td>
               <td>{sender}</td>
               <td>{at}</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = Object.keys(this.state.students[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   render() {
      return (
         <div>
            <h1 className='title'>Previous Messages</h1>
            <table className='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}
export default Table