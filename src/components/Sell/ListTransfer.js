import React from "react";
import Button from "@material-ui/core/Button";
import List from "./List";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./dropzone/Dropzone.css";

const axios = require("axios");
class ListTransfer extends React.Component {
  /**************States******** */
  //books maintain states for List1
  //transferList1 maintain list for which books are to be transferred from List1 to List2
  // transferList2 maintain same thing but from List2 to List1
  // transferredList1 most weird name for maintaining books in List2
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      transferList1: [],
      transferList2: [],
      transferredList1: [],
      isbuttonClicked: false
    };
    this.onSelect = this.onSelect.bind(this);
    this.transfer = this.transfer.bind(this);
    this.transferBack = this.transferBack.bind(this);
    this.onSelectBack = this.onSelectBack.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectCategoryBack = this.selectCategoryBack.bind(this);
    this.updateArrays = this.updateArrays.bind(this);
    this.nameToTitle = this.nameToTitle.bind(this);
    // console.log(this.props.store.getState());
  }

  /*********Get Request will be here*************/
  componentDidMount() {
    console.log(this.state.transferredList1[0] === undefined);
    if (this.state.transferredList1[0] === undefined) {
      let books, transferredList1;
      axios
        .get("https://market.bits-dvm.org/api/sell/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response.data);
          books = this.props.onStart(response.data).arr1;
          transferredList1 = this.props.onStart(response.data).arr2;
          this.setState({
            books: this.props.books,
            transferredList1: this.props.transferredList1
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        books: this.props.books,
        transferredList1: this.props.transferredList1
      });
    }
    // console.log(this.props.books);
    // this.setState({
    //   books: this.sell.books,
    //   transferredList1: this.props.transferredList1
    // });
    // console.log(JSON.parse(JSON.stringify(this.props.onStart(response.books,response.selected_books).arr1)));
    //  let books =this.props.onStart(response.books,response.selected_books).arr1;
    //  let transferredList1 = this.props.onStart(response.books,response.selected_books).arr2;
    //  this.updateArrays(books, transferredList1);
  }

  componentWillMount() {
    this.setState({
      books: this.props.books,
      transferredList1: this.props.transferredList1
    });
  }

  /* For updating states*/
  updateArrays(books, transferredList1) {
    this.setState({
      books: books,
      transferredList1: transferredList1
    });
  }
  nameToTitle(books) {
    let array = [];
    books.map(({ name, id, category }) => {
      array.push({ title: name, id: id, category: category });
    });
    return array;
  }

  /*Called when checkbox is selected in List 1, not when they are selected through category*/
  onSelect = (e, selectedId, selectedCategory, selectedTitle) => {
    if (e.target.checked) {
      /*For avoiding bugs in react for maintaining state id is increased by 1000 before transferring */
      this.state.transferList1.push({
        id: selectedId + 1000,
        category: selectedCategory,
        title: selectedTitle
      });
    } else {
      let transferList1 = this.state.transferList1.filter(function({
        id,
        category,
        title
      }) {
        return id - 1000 !== selectedId;
      });
      this.setState({ transferList1: transferList1 });
    }
  };

  /*Called when checkbox is selected in List 2, not when they are selected through category*/
  onSelectBack = (e, selectedId, selectedCategory, selectedTitle) => {
    if (e.target.checked) {
      this.state.transferList2.push({
        id: selectedId - 1000,
        category: selectedCategory,
        title: selectedTitle
      });
    } else {
      let transferList2 = this.state.transferList2.filter(function({
        id,
        category,
        title
      }) {
        return id + 1000 !== selectedId;
      });
      this.setState({ transferList2: transferList2 });
    }
  };

  /*Called when select Books button is pressed */
  transfer = e => {
    const transferredBooks = this.state.transferList1;
    let updatedBooks = this.state.books;
    // console.log("updatedBooks"+this.state.books);

    transferredBooks.map(function(list) {
      updatedBooks = updatedBooks.filter(function(obj) {
        // console.log(list.id);
        return obj.id !== list.id - 1000;
      });
      return true;
    });
    this.setState(
      {
        transferredList1: this.state.transferredList1.concat(transferredBooks),
        books: updatedBooks,
        transferList1: []
      },
      () => {
        // this.props.onTransfer(this.state.books, this.state.transferredList1);
        this.props.onTransfer(this.state.books, this.state.transferredList1);
      }
    );
  };

  /*Called when deselect Books button is pressed */
  transferBack = e => {
    const transferredBooks = this.state.transferList2;
    let updatedBooks = this.state.transferredList1;
    // console.log("updatedBooks"+this.state.books);

    transferredBooks.map(function(list) {
      updatedBooks = updatedBooks.filter(function(obj) {
        // console.log(list.id);
        return obj.id !== list.id + 1000;
      });
      return true;
    });
    this.setState(
      {
        books: this.state.books.concat(transferredBooks),
        transferredList1: updatedBooks,
        transferList2: []
      },
      () => {
        this.props.onTransfer(this.state.books, this.state.transferredList1);
      }
    );
  };

  /*when you click on category for category selection in List1 */
  selectCategory = (e, cat) => {
    let list1Books = this.state.books;
    let checkboxes = document.getElementsByClassName(cat);
    let inList1 = [];
    list1Books.map(({ id, category, title }) => {
      for (let i = 0; i < checkboxes.length; i++) {
        if (
          checkboxes[i].id.toString() === id.toString() &&
          checkboxes[i].className.includes(category)
        ) {
          inList1.push(checkboxes[i]);
        }
      }
      return true;
    });

    if (e.target.checked) {
      list1Books.map(({ id, category, title }) => {
        let transferList1 = this.state.transferList1;
        let isAdd = true;
        let selectedId = id;
        transferList1.map(({ id, category, title }) => {
          if (id === selectedId + 1000) {
            isAdd = false;
            return;
          }
          return true;
        });

        if (cat === category && isAdd === true) {
          this.state.transferList1.push({
            id: id + 1000,
            category: category,
            title: title
          });
        }
        return true;
      });

      for (let i = 0; i < inList1.length; i++) {
        inList1[i].checked = true;
      }
    } else {
      let b = this.state.transferList1;
      this.state.books.map(({ id, category, title }) => {
        let selectedId = id;
        if (cat === category) {
          b = b.filter(function({ id, category, title }) {
            return id - 1000 !== selectedId;
          });
        }
        return true;
      });

      this.setState({ transferList1: b }, function() {
        // console.log(this.state.transferList1);
      });

      for (let i = 0; i < inList1.length; i++) {
        inList1[i].checked = false;
      }
    }
  };

  /*when you click on category for category selection in List2 */
  selectCategoryBack = (e, cat) => {
    let list1Books = this.state.transferredList1;
    let checkboxes = document.getElementsByClassName(cat);

    let inList2 = [];
    list1Books.map(({ id, category, title }) => {
      for (let i = 0; i < checkboxes.length; i++) {
        if (
          checkboxes[i].id.toString() === id.toString() &&
          checkboxes[i].className.includes(category)
        ) {
          inList2.push(checkboxes[i]);
        }
      }
      return true;
    });

    if (e.target.checked) {
      list1Books.map(({ id, category, title }) => {
        let transferList2 = this.state.transferList2;
        let isAdd = true;
        let selectedId = id;
        transferList2.map(({ id, category, title }) => {
          if (id === selectedId - 1000) {
            isAdd = false;
            return;
          }
          return true;
        });

        if (cat === category && isAdd === true) {
          this.state.transferList2.push({
            id: id - 1000,
            category: category,
            title: title
          });
        }
        return true;
      });

      for (let i = 0; i < inList2.length; i++) {
        inList2[i].checked = true;
      }
    } else {
      let b = this.state.transferList2;
      this.state.transferredList1.map(({ id, category, title }) => {
        let selectedId = id;
        if (cat === category) {
          b = b.filter(function({ id, category, title }) {
            return id + 1000 !== selectedId;
          });
        }
        return true;
      });

      this.setState({ transferList2: b }, function() {
        // console.log(this.state.transferList2);
      });

      for (let i = 0; i < inList2.length; i++) {
        inList2[i].checked = false;
      }
    }
  };

  render() {
    const containerstyle = {
      display: "flex",
      justifyContent: "center"
    };
    const buttonsContainer = {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "2vh"
    };
    const buttons = {
      width: "85%",
      marginBottom: "15px",
      color: "white",
      backgroundColor: "#3f51b5",
      boxShadow:
        "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
    };
    return (
      <div style={containerstyle} className="Main-container">
        <List
          books={this.state.books}
          onSelect={this.onSelect}
          selectcategory={this.selectCategory}
        />
        <div column="true" style={buttonsContainer}>
          <Button style={buttons} onClick={this.transfer}>
            Select Books
          </Button>
          <Button style={buttons} onClick={this.transferBack}>
            Deselect Books
          </Button>
        </div>
        <List
          books={this.state.transferredList1}
          onSelect={this.onSelectBack}
          selectcategory={this.selectCategoryBack}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.sell.books,
    transferList1: state.sell.transferList1,
    transferList2: state.sell.transferList2,
    transferredList1: state.sell.transferredList1
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTransfer: (arr, arr1) => dispatch(actions.updatestate(arr, arr1)),
    getData: token => dispatch(actions.getData(token)),
    onStart: response => dispatch(actions.sellstart(response))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTransfer);
// export default ListTransfer;
