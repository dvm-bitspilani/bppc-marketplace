import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({ books: newProps.books });
  }

  handleChange = (e, id, category, title) => {
    this.props.onSelect(e, id, category, title);
  };

  selectCategory = (e, category) => {
    this.props.selectcategory(e, category);
  };

  render() {
    const divStyle = {
      width: "45%",
      height: "50vh",
      border: "1px solid grey",
      margin: "auto",
      borderRadius: "5px",
      overflowX: "hidden"
    };
    const groupstyle = {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly"
    };
    const headingstyle = {
      width: "100%",
      padding: "0px",
      color: "white",
      backgroundColor: "#28a745"
    };

    const spanstyle = {
      width: "100%",
      padding: "5px"
    };

    const books = [];
    const categories = [];
    var items = this.state.books;

    items.map(({ id, category, title }) => {
      let alreadyCat = false;
      categories.map(cat => {
        if (category === cat) {
          alreadyCat = true;
        }
        return true;
      });
      // console.log(alreadyCat);
      if (!alreadyCat) {
        const Cat = category;
        categories.push(category);
        items.map(({ id, category, title }) => {
          // console.log("category == b "+ (Cat) + " " + (category) + " " + (Cat== category));
          if (Cat === category) {
            books.push({
              id: id,
              category: category,
              title: title
            });
          }
          return true;
        });
      }
    });
    let showList = categories.map((Cat, index) => {
      return (
        <div key={Cat} style={groupstyle}>
          <div style={headingstyle}>
            <FormGroup check>
              <Label check style={spanstyle}>
                <Input
                  type="checkbox"
                  onChange={e => this.selectCategory(e, Cat)}
                />{" "}
                {Cat}
              </Label>
            </FormGroup>
          </div>

          {books.map(({ id, category, title }) => {
            if (category === Cat) {
              return (
                <FormGroup check key={id}>
                  <Label check style={spanstyle}>
                    <Input
                      type="checkbox"
                      key={id}
                      value={title}
                      onChange={e => this.handleChange(e, id, category, title)}
                      className={Cat}
                    />{" "}
                    {title}
                  </Label>
                </FormGroup>
              );
            } else {
              return null;
            }
          })}
        </div>
      );
    });

    return (
      <div className="bookslist" style={divStyle}>
        <div style={groupstyle}>{showList}</div>
      </div>
    );
  }
}

export default List;
