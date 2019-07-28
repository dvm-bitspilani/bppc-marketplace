import React, { Component } from "react";
import "./Dropzone.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hightlight: false, 
      dataGot: [
        {name: "lake", 
        id:56, 
        url: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
        },
        {name:"trees", 
        id:57, 
        url: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"}
      ],
      newImages:[],
      listOfNames:[],
      imagesRemoved: []
    };

    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    // this.onDragOver = this.onDragOver.bind(this);
    // this.onDragLeave = this.onDragLeave.bind(this);
    // this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    let files = evt.target.files;
    console.log(files);
      let array = this.fileListToArray(files);
      console.log(array);
      let listOfNames = this.state.listOfNames;
      listOfNames = listOfNames.concat(array);
      console.log(listOfNames);
      this.setState({
        listOfNames: listOfNames
      });
    
  }
  componentWillMount(){
    let dataGot = this.state.dataGot;
    let listOfNames=[];
    dataGot.map(({name,id,url})=>{
      listOfNames.push(name);
    });
    this.setState({
      listOfNames: listOfNames
    });
  }
  // onDragOver(evt) {
  //   evt.preventDefault();

  //   if (this.props.disabled) return;

  //   this.setState({ hightlight: true });
  // }

  // onDragLeave() {
  //   this.setState({ hightlight: false });
  // }

  // onDrop(event) {
  //   event.preventDefault();

  //   if (this.props.disabled) return;

  //   const files = event.dataTransfer.files;
  //   if (this.props.onFilesAdded) {
  //     const array = this.fileListToArray(files);
  //     this.props.onFilesAdded(array);
  //   }
  //   this.setState({ hightlight: false });
  // }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i).name);
    }
    return array;
  }

  render() {
    var image = [];
    for (var i = 0; i < this.state.listOfNames.length; i++) {
      var x = this.state.listOfNames[i];
      image.push(x);
      console.log(x);
    }

    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
          accept="image/*"
        />
        {image.length > 0 &&
          image.map((item, index) => (
            <span className="indent" key={index}>
              {item}
            </span>
          ))}
        {image.length === 0 && (
          <img
            alt="upload"
            className="Icon"
            src="baseline-cloud_upload-24px.svg"
          />
        )}
      </div>
    );
  }
}

export default Dropzone;
