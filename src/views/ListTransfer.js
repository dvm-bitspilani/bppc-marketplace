import React from "react";
import Button from "@material-ui/core/Button";
import List from "./List";

class ListTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          category: "Thermodynamics",
          title: "Book 1"
        },
        {
          id: 2,
          category: "Thermodynamics",
          title: "Book 2"
        },
        {
          id: 3,
          category: "MeOW",
          title: "Book 1"
        },
        {
          id: 4,
          category: "MeOW",
          title: "Book 2"
        },
        {
          id: 5,
          category: "Biology",
          title: "Book 1"
        },
        {
          id: 6,
          category: "Biology",
          title: "Book 2"
        }
      ],
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
  }

  onSelect = (e, selectedId, selectedCategory, selectedTitle) => {
    if (e.target.checked) {
      // console.log("updatedTransferList "+updatedTransferList);
      // let transferList1 = this.state.transferList1;
      // let isAdd = true;
      // transferList1.map(({id,category,title})=>{
      //   if(id == (selectedId+1000)){
      //     isAdd = false;
      //     return;
      //   }
      // });
      // if(isAdd){
      this.state.transferList1.push({
        id: selectedId + 1000,
        category: selectedCategory,
        title: selectedTitle
      });
      // }
      // console.log("updatedBooks"+updatedBooks);

      // this.setState({
      //   transferList1: updatedTransferList
      //  });
    } else {
      // this.setState({
      //   transferList1: this.state.transferList1.filter(function({id,category,title}){
      //                   return (id -1000)!= selectedId;
      //                   })
      //     })
      let transferList1 = this.state.transferList1.filter(function({
        id,
        category,
        title
      }) {
        return id - 1000 !== selectedId;
      });

      this.setState({ transferList1: transferList1 });
      // this.state.transferList1.push({
      //     id: selectedId,
      //     category:selectedCategory,
      //     title:selectedTitle
      //   });
    }
  };
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

  transfer = e => {
    const transferredBooks = this.state.transferList1;
    let updatedBooks = this.state.books;
    // console.log("updatedBooks"+this.state.books);

    transferredBooks.map(function(list) {
      updatedBooks = updatedBooks.filter(function(obj) {
        console.log(list.id);
        return obj.id !== list.id - 1000;
      });
    });
    this.setState({
      transferredList1: this.state.transferredList1.concat(transferredBooks),
      books: updatedBooks,
      transferList1: []
    });
  };

  transferBack = e => {
    const transferredBooks = this.state.transferList2;
    let updatedBooks = this.state.transferredList1;
    // console.log("updatedBooks"+this.state.books);

    transferredBooks.map(function(list) {
      updatedBooks = updatedBooks.filter(function(obj) {
        console.log(list.id);
        return obj.id !== list.id + 1000;
      });
    });
    this.setState({
      books: this.state.books.concat(transferredBooks),
      transferredList1: updatedBooks,
      transferList2: []
    });
  };

  selectCategory = (e, cat) => {
    // let toBeTransferred = this.state.transferList1;
    let list1Books = this.state.books;
    let checkboxes = document.getElementsByClassName(cat);
    if (e.target.checked) {
      // let isAdd = true;
      list1Books.map(({ id, category, title }) => {
        // toBeTransferred.map(({selectedId,selectedCategory,selectedTitle})=>{
        //     if(id == (selectedId-1000)){
        //       isAdd = false;
        //       return;
        //     }
        // });

        if (cat === category) {
          this.state.transferList1.push({
            id: id + 1000,
            category: category,
            title: title
          });
        }
      });

      for (let i = 0; i < checkboxes.length; i++) {
        let isSelected = false;
        this.state.books.map(({ id, category, title }) => {
          // console.log(title);
          if (checkboxes[i].value === title) {
            isSelected = true;
            return;
          }
        });
        // console.log(checkboxes[i].value);
        if (isSelected) {
          checkboxes[i].checked = true;
        }
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
      });
      this.setState({ transferList1: b }, function() {
        console.log(this.state.transferList1);
      });
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    }
  };

  selectCategoryBack = (e, cat) => {
    let toBeTransferred = this.state.transferList2;
    let list1Books = this.state.transferredList1;

    if (e.target.checked) {
      list1Books.map(({ id, category, title }) => {
        if (cat === category) {
          this.state.transferList2.push({
            id: id - 1000,
            category: category,
            title: title
          });
        }
      });
    } else {
      toBeTransferred.map(
        ({ selectedId, selectedCategory, selecctedTitle }) => {
          if (cat === selectedCategory) {
            let transferList2 = this.state.transferList2.filter(function({
              id,
              category,
              title
            }) {
              return id - 1000 !== selectedId;
            });
            this.setState({ transferList2: transferList2 });
          }
        }
      );
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
      alignItems: "center"
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
      <div style={containerstyle}>
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

export default ListTransfer;
