import React, { Component } from "react";
import "./Dropzone.css";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

class Image extends Component{
  constructor(props){
    super(props);
    this.state={
      url:this.props.url,
      name: this.props.name,
      id: this.props.id
    }
    this.handleClick = this.handleClick.bind(this); 
  }
  handleClick = e => {
    // this.handleClick()
    this.props.onRemove(e,this.state.id);
  }
  render(){
    let url = "url(" + this.state.url + ")";
    let divStyle={
      width:"100px",
      height:"100px",
      backgroundImage: url,
      backgroundSize: "cover"
    }
    return(
      <div style={divStyle}>
       <span onClick={this.handleClick} style={{background: "black", color: "white"}}>Remove</span>
       {/* <div>{this.state.name}</div> */}
       {/* <img src={this.state.image}/> */}
      </div>
    )
  }
}

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hightlight: false, 
      dataGot: this.props.dataGot,
      newImages:this.props.newImages,
      imagesRemoved: this.props.imagesRemoved,
      newAndOld:this.props.newAndOld,
      imagesRemoved:this.props.imagesRemoved
    };

    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onRemove = this.onRemove.bind(this);
    // this.onDragOver = this.onDragOver.bind(this);
    // this.onDragLeave = this.onDragLeave.bind(this);
    // this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }
  
  onRemove = (e,removeId) => {
    let dataGot = this.state.dataGot;
    let newImages = this.state.newImages;
    let newAndOld = this.state.newAndOld;

    dataGot = dataGot.filter(({id,name,url}) => {
      //  imagesRemoved.push(id);
       return removeId != id;
    });
    newImages = newImages.filter(({id,imageFile}) => {
      return removeId != id
    });
    console.log(newImages);
    newAndOld = newAndOld.filter(({id,name,url}) => {
      return removeId != id
    });
    this.setState({
      dataGot: dataGot,
      newImages: newImages,
      newAndOld: newAndOld
    },function(){console.log(this.state);});

  }
  onFilesAdded(evt) {
    if (this.props.disabled) return;

    let files = evt.target.files;
    let newImages = this.state.newImages;
    // newImages = 
    for (var i = 0; i < files.length; i++) {
      newImages.push(
        {  id: window.URL.createObjectURL(files.item(i)), 
           imageFile:files.item(i)
        });
    }
    console.log(newImages);
    
    let newAndOld = this.state.newAndOld;
    
    for (var i = 0; i < files.length; i++) {
      newAndOld.push(
        {
         id: window.URL.createObjectURL(files.item(i)),
         name: files.item(i).name,
         url: window.URL.createObjectURL(files.item(i))
        }
      )
      // newImages.push(files.item);
    }
    this.setState({
      newAndOld: newAndOld,
      newImages: newImages
    })
    console.log(this.state);
  }
  componentWillMount(){
    this.setState({
      dataGot: this.props.dataGot
    })
    let dataGot = this.state.dataGot;
    let newAndOld = this.state.newAndOld;
    newAndOld = this.state.newAndOld;
    this.setState({
      newAndOld: newAndOld
    })
  }
  componentWillUnmount(){
    let object = {
      dataGot: this.state.dataGot,
      newImages:this.state.newImages,
      imagesRemoved: this.state.imagesRemoved,
      newAndOld:this.state.newAndOld,
      imagesRemoved:this.state.imagesRemoved
    }
    this.props.uploadImage(object);
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
    let dataGot = this.state.newAndOld;
    return (
      <div>
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
          {dataGot.length > 0 &&
          dataGot.map((item, index) => (
            <Image className="indent" key={item.id} onRemove={this.onRemove} name={item.name} url={item.url} id={item.id}/>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataGot:state.sell.dataGot,
    newImages:state.sell.newImages,
    imagesRemoved: state.sell.imagesRemoved,
    newAndOld:state.sell.newAndOld,
    imagesRemoved:state.sell.imagesRemoved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (object) => dispatch(actions.uploadImage(object))
  };
};

export default connect(
 mapStateToProps,mapDispatchToProps
)(Dropzone);
