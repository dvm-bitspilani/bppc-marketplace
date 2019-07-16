import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Dropzone from "./dropzone/Dropzone";

class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books: this.props.books
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.setState({ books: newProps.books });  
    }
      
    handleChange = (e,id,category,title) =>{
        this.props.onSelect(e,id,category,title);
    }
    render(){
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
            padding: "5px",
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

          items.map(({id,category, title}) => {
            let alreadyCat=false;
            categories.map(cat => {
              if(category == cat){alreadyCat= true};
            })
            // console.log(alreadyCat); 
            if(!alreadyCat){
              const Cat = category;
              categories.push(category);
              items.map(({id,category, title}) => {
                // console.log("category == b "+ (Cat) + " " + (category) + " " + (Cat== category));
                if(Cat == category){
                  books.push({
                   id:id,
                   category: category,
                   title:title
                  });
                }
              })
            }
          });
          let showList = categories.map((Cat,index) => {
            return(
            <div key={index} style={groupstyle}>
               <span style={headingstyle}>{Cat}</span>
               {books.map(({id,category,title})=> {
                if(category == Cat){
                  return(
                    <FormGroup check key={id}>
                      <Label check  style={spanstyle} >
                        <Input type="checkbox" key={id} value={title} onChange={(e) => this.handleChange(e,id,category,title)}/>{' '} 
                        {title}
                      </Label>
                  </FormGroup>
                  );}
                }) } 
            </div>
            )
          }) ;

        return(
            <div className="bookslist" style={divStyle}>
            <div style={groupstyle}>{showList}</div>
            </div>
        )
    }


}
class ListTransfer extends React.Component{
    constructor(props){
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
            transferList1:[],
            transferList2:[],
            transferredList1:[],
            isbuttonClicked: false
        }
      this.onSelect = this.onSelect.bind(this);
      this.transfer = this.transfer.bind(this);
      this.transferBack = this.transferBack.bind(this);
      this.onSelectBack = this.onSelectBack.bind(this);
    }

    onSelect = (e,selectedId,selectedCategory,selectedTitle) => {
        if(e.target.checked){
            // console.log("updatedTransferList "+updatedTransferList);
            this.state.transferList1.push({
                id: (selectedId+1000),
                category:selectedCategory,
                title:selectedTitle
              });
             
            // console.log("updatedBooks"+updatedBooks);
      
          // this.setState({
          //   transferList1: updatedTransferList
          //  });
        }
        else{
          // this.setState({
          //   transferList1: this.state.transferList1.filter(function({id,category,title}){
          //                   return (id -1000)!= selectedId;
          //                   })
          //     })
            this.state.transferList1 = this.state.transferList1.filter(function({id,category,title}){
              return (id -1000)!= selectedId;
              });
          // this.state.transferList1.push({
          //     id: selectedId,
          //     category:selectedCategory,
          //     title:selectedTitle
          //   });
        }
     }
     onSelectBack = (e,selectedId,selectedCategory,selectedTitle) => {
      if(e.target.checked){
          this.state.transferList2.push({
              id: (selectedId-1000),
              category:selectedCategory,
              title:selectedTitle
            });
      }
      else{
          this.state.transferList2 = this.state.transferList2.filter(function({id,category,title}){
            return (id + 1000)!= selectedId;
            });
      }
   }

    transfer = (e) =>{        
        const transferredBooks = this.state.transferList1;
        let updatedBooks = this.state.books;  
        // console.log("updatedBooks"+this.state.books);

        transferredBooks.map(function(list){
          updatedBooks = updatedBooks.filter(function(obj){
          console.log(list.id);
          return (obj.id != (list.id-1000));
          })
        })
        this.setState({
          transferredList1: this.state.transferredList1.concat(transferredBooks),
          books: updatedBooks,
          transferList1: []
        }); 
    }
    transferBack = (e) =>{
      const transferredBooks = this.state.transferList2;
        let updatedBooks = this.state.transferredList1;  
        // console.log("updatedBooks"+this.state.books);

        transferredBooks.map(function(list){
          updatedBooks = updatedBooks.filter(function(obj){
          console.log(list.id);
          return (obj.id != (list.id+1000));
          })
        })
        this.setState({
          books: this.state.books.concat(transferredBooks),
          transferredList1: updatedBooks,
          transferList2: []
        }); 
    }

    render(){
    
        const containerstyle = {
            display: "flex",
            justifyContent: "center"
        };
        const buttonsContainer={
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"         
        }
        const buttons={
            width: "85%",
            marginBottom: "15px",
            color: "white",
            backgroundColor: "#3f51b5",
            boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
        }
        return(
            <div style={containerstyle}>
                <List books={this.state.books} onSelect={this.onSelect}/>
                <div column="true" style={buttonsContainer}>
                    <Button style={buttons} onClick={this.transfer}>Select Books</Button>
                    <Button style={buttons} onClick={this.transferBack}>Deselect Books</Button>
                </div>
                <List books={this.state.transferredList1} onSelect={this.onSelectBack}/>
            </div>
        )
    }
}

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.uploadChange = this.uploadChange.bind(this);
    this.state = {
      imagesupload: []
    };
  }

  uploadChange(files) {
    console.log(files);
    const imagesupload = Object.assign([], this.state.imagesupload);
    imagesupload.push(files);
    this.setState({ imagesupload });
  }
  render() {
    return (
      <div>
        <Container>
          <Form>
            {/* <Label>
              <Label for="exampleCustomFileBrowser">Upload an Image</Label>
              <CustomInput
                type="file"
                id="exampleCustomFileBrowser"
                name="customFile"
                label="pick a file"
              />
            </Label> */}
            <div className="App">
              <div className="Card">
                <Dropzone
                  onFilesAdded={this.uploadChange}
                  imagearr={this.state.imagesupload}
                />
              </div>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}
class Description extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Form>
      <FormGroup>
              <Label for="exampleText">Description:</Label>
              <Input type="textarea" name="text" id="description" />
      </FormGroup>
      <FormGroup>
              <Label for="exampleText">Enter the additional material that you have such as slides etc.(Max 5):</Label>
              <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup>
              <Label for="exampleText">Any other details you would like to share with buyer</Label>
              <Input type="textarea" name="text" id="otherDetails" />
      </FormGroup>
      </Form>
    )
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return ["Select Books which you want to sell", "Upload pictures","Description"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ListTransfer/>;
    case 1:
      return <FileInput/>;
    case 2:
      return <Description/>;
    default:
      return "Unknown step";
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }
  return (
    <Container>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography component={'span'}>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    </Container>
  );
}
