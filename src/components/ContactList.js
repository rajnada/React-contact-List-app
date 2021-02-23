import React, { Component } from "react";
import ContactListForm from "./ContactListForm";

class ContactList extends Component {
  state = {
    currentIndex: -1,
    list: this.returnList(),
  };

  deleteArr = [];
  returnList() {
    if (localStorage.getItem("contacts") == null)
      localStorage.setItem("contacts", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("contacts"));
  }
  onAddOrEdit = (data) => {
    var list = this.returnList();
    if (this.state.currentIndex === -1) list.push(data);
    else list[this.state.currentIndex] = data;
    localStorage.setItem("contacts", JSON.stringify(list));
    this.setState({ list, currentIndex: -1 });
  };

  handleEdit = (index) => {
    console.log("index =>", index);
    this.setState({
      currentIndex: index,
    });
    console.log("this.state.currentIndex =>", this.state.currentIndex);
  };

  handleDelete = (index) => {
    var list = this.returnList();
    list.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(list));
    this.setState({ list, currentIndex: -1 });
  };

  handleCheck = (e, uniqueid) => {
    console.log("AP", e.target.checked, uniqueid);
    if (e.target.checked) {
      this.deleteArr.push(uniqueid);
    } else {
      const findIndex = this.deleteArr.findIndex(
        (i) => i.uniqueid === uniqueid
      );
      this.deleteArr.splice(findIndex, 1);
    }
    console.log("Search", this.findIndex);
  };

  handleMultipleDelete = () => {
    if (this.deleteArr.length) {
      var list = this.returnList();
      // console.log(list);return false;
      this.deleteArr.forEach((val) => {
        const find = list.findIndex((i) => i.uniqueid === val);
        list.splice(find, 1);
      });
      localStorage.setItem("contacts", JSON.stringify(list));
      this.setState({ list, currentIndex: -1 });
    } else {
      alert("Please select atleast one record.");
    }
  };

  render() {
    return (
      <div>
        <ContactListForm
          onAddOrEdit={this.onAddOrEdit}
          currentIndex={this.state.currentIndex}
          list={this.state.list}
        />
        <hr />
        <div>
          <button
            className="btn btn-danger"
            onClick={() => this.handleMultipleDelete()}
          >
            Delete Selected
          </button>
        </div>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th width="10%" scope="col">
                Select
              </th>

              <th width="10%" scope="col">
                #
              </th>
              <th width="40%" scope="col">
                Name
              </th>
              <th width="30%" scope="col">
                Phone
              </th>
              <th width="20%" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody style={{ margin: "2px" }}>
            {this.state.list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      className=" checkbox"
                      onClick={(e) => this.handleCheck(e, item.uniqueid)}
                    />
                  </td>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>
                    <a
                      className="actionbtn"
                      type="button"
                      onClick={() => this.handleEdit(index)}
                    >
                      edit
                    </a>

                    <a
                      className="actionbtn"
                      type="button"
                      onClick={() => this.handleDelete(index)}
                    >
                      delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactList;
