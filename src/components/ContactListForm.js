import React, { Component } from 'react'

 class ContactListForm extends Component {
     
     state={
        ...this.returnStateObject()
     }

     returnStateObject(){
         if(this.props.currentIndex === -1)
         return {
            uniqueid:"",
            name:"",
            phone:""
         }
         else
         return this.props.list[this.props.currentIndex]
     }

     componentDidUpdate(prevProps){
         if(prevProps.currentIndex !== this.props.currentIndex || prevProps.list !== this.props.list)
         this.setState({...this.returnStateObject()})
     }

     handleInputChange = (e) => {

            this.setState({
                [e.target.name]:e.target.value
            })
        
     }
     handleSubmit = (e) => {
        e.preventDefault();
        const uniqueid = new Date().getTime();
        this.state.uniqueid = uniqueid;
        this.props.onAddOrEdit(this.state)
        // this.state = initialState
        // this.resetForm();
    }

    // resetForm = () =>{
    //     document.getElementById('name').value = '';
    //     document.getElementById('phone').value = '';
    // }

    render() {
        
        return (
            <form onSubmit={this.handleSubmit} autoComplete="off">
            
            <label >Name:  </label>
            <input
            style={{ width: "16%" }}
            
             name="name"
             id="name"
             placeholder="Enter Your Name"
             Value={this.state.name} 
             onChange={this.handleInputChange} />
             <br/>
             <label >Phone: </label>
             <input 
             style={{ width: "16%"}}

             className="input"
             name="phone"
             id="phone"
             placeholder="Enter Your Phone"
             Value={this.state.phone} 
             onChange={this.handleInputChange}
             maxLength="10" />
             <br/>
             <button className="btn btn-primary" type="submit">Add User</button>
             <div>
             
             </div>
            
           </form>
        )
    }
}
export default ContactListForm ;
