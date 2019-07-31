import React, { Component } from "react";
import "./Dropzone.css";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { flattenDiagnosticMessageText } from "typescript";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      name: this.props.name,
      id: this.props.id
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = e => {
    // this.handleClick()
    this.props.onRemove(e, this.state.id);
  };
  render() {
    let url = "url(" + this.state.url + ")";
    let divStyle = {
      width: "100px",
      height: "100px",
      backgroundImage: url,
      backgroundSize: "cover",
      marginLeft: "10px"
    };
    return (
      <div style={divStyle}>
        <span
          onClick={this.handleClick}
          style={{
            background: "#007bff",
            color: "white",
            fontWeight: "bold",
            padding: "5px 10px 5px 10px",
            border: "white solid 1px",
            borderRadius: "8px",
            width: "200px",
            cursor: "pointer"
          }}
        >
          Remove
        </span>
        {/* <div>{this.state.name}</div> */}
        {/* <img src={this.state.image}/> */}
      </div>
    );
  }
}

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hightlight: false,
      dataGot: this.props.dataGot,
      newImages: this.props.newImages,
      imagesRemoved: this.props.imagesRemoved,
      newAndOld: this.props.newAndOld,
      imagesRemoved: this.props.imagesRemoved
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

  onRemove = (e, removeId) => {
    let dataGot = this.state.dataGot;
    let newImages = this.state.newImages;
    let newAndOld = this.state.newAndOld;
    let imagesRemoved = this.state.imagesRemoved;

    dataGot = dataGot.filter(({ id, name, url }) => {
      if ((id == removeId) & !removeId.toString().includes("blob")) {
        imagesRemoved.push(id);
      }
      console.log(imagesRemoved);
      return removeId != id;
    });
    newImages = newImages.filter(({ id, imageFile }) => {
      console.log(id, removeId, id == removeId);
      return removeId != id;
    });
    console.log(newImages);
    newAndOld = newAndOld.filter(({ id, name, url }) => {
      return removeId != id;
    });
    this.setState(
      {
        dataGot: dataGot,
        newImages: newImages,
        newAndOld: newAndOld,
        imagesRemoved: imagesRemoved
      },
      function() {
        console.log(this.state);
      }
    );
  };
  onFilesAdded(evt) {
    if (this.props.disabled) return;
    let dataGot = this.state.dataGot;
    console.log(dataGot);
    let files = evt.target.files;
    let newImages = this.state.newImages;
    let newURLS = [];
    for (var i = 0; i < files.length; i++) {
      newURLS.push(window.URL.createObjectURL(files.item(i)));
    }
    for (var i = 0; i < files.length; i++) {
      newImages.push({ id: newURLS[i], imageFile: files.item(i) });
      // console.log(files.item(i));
    }
    // console.log(newImages);
    let newAndOld = this.state.newAndOld;

    for (var i = 0; i < files.length; i++) {
      newAndOld.push({
        id: newURLS[i],
        name: files.item(i).name,
        url: newURLS[i]
      });
      // newImages.push(files.item);
    }
    console.log(dataGot);
    this.setState({
      dataGot: dataGot,
      newAndOld: newAndOld,
      newImages: newImages
    });
    // console.log(this.state);
  }
  componentWillMount() {
    this.setState({
      dataGot: this.props.dataGot,
      newAndOld: this.props.newAndOld
    });
    let dataGot = this.state.dataGot;
    let newAndOld = this.props.newAndOld;

    this.setState({
      newAndOld: newAndOld
    });
    // this.state.newAndOld.push({
    //   ...dataGot
    // })
  }
  componentWillUnmount() {
    let object = {
      dataGot: this.state.dataGot,
      newImages: this.state.newImages,
      imagesRemoved: this.state.imagesRemoved,
      newAndOld: this.state.newAndOld,
      imagesRemoved: this.state.imagesRemoved
    };
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            marginTop: "50px",
            height: "200px",
            overflow: "scroll"
          }}
        >
          {dataGot.length > 0 &&
            dataGot.map((item, index) => (
              <Image
                className="indent"
                key={item.id}
                onRemove={this.onRemove}
                name={item.name}
                url={item.url}
                id={item.id}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataGot: state.sell.dataGot,
    newImages: state.sell.newImages,
    imagesRemoved: state.sell.imagesRemoved,
    newAndOld: state.sell.newAndOld,
    imagesRemoved: state.sell.imagesRemoved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: object => dispatch(actions.uploadImage(object))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropzone);
