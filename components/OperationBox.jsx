import React, { PureComponent } from "react";
import Image from "next/image";
import axios from "axios";
import styles from '../styles/Create.module.css' 


class OperationBox extends React.PureComponent {

  static defaultProps = {
    innerIcon:'/svg/empty.svg', //the icon in the box
    innerWords:'',             //the words in the box
    clickable:true,             //whether it is clickable
    callback:()=>{},             //callback function
  };

  constructor(props) {
    super(props);
    this.state = {
      file:'',
      showImg:'none',
      token:'TheToken',
      name:'SomeBody',
      storeId:'233',
      subsidyAmount:'123',
      imagePreviewUrl:props.imagePreviewUrl?props.imagePreviewUrl:'',
    }
  }

  // 允许父组件重新传输props
  componentWillReceiveProps(nextProps) {
    this.setState({imagePreviewUrl: nextProps.imagePreviewUrl});
  }

  render() {
    var {imagePreviewUrl,showImg: showIfNoImg} = this.state;
    var imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = ( <label for={'UniqueId-'+this.props.innerWords}><img className={styles.imgInTheBox} src={imagePreviewUrl} /></label>);
      showIfNoImg = 'none';
    } else {
      showIfNoImg = 'block';
    }

    return (
      <>
        {/* the old id is "avatarFor", the new id to avoid duplication is {'UniqueId-'+this.props.innerWords} */}
        {this.props.clickable && <input id={'UniqueId-'+this.props.innerWords} style={{display:'none'}} type="file" onChange={(e)=>this.handleImageChange(e)}/>}
        {imagePreview}
        <label className={styles.selectBox} style={{display:showIfNoImg}} for={'UniqueId-'+this.props.innerWords}>
          <div>
            <Image src={this.props.innerIcon} alt={this.props.innerWords} width={72} height={72} />
            <p>{this.props.innerWords}</p>
          </div>
        </label>

        {/* //todo 提交按钮可以参考下面这个函数: this.chargeFunc 基本上imagePreviewUrl就是结果*/}
        {/* <Button key="submit" type="primary" onClick={this.chargeFunc}>
          确定{" "}
        </Button> */}
      </>
    );
  }

  
  handleImageChange(e) {
    e.preventDefault();
    
    var reader = new FileReader();
    var file = e.target.files[0];
    
    reader.onloadend = () => {
      console.log('The File Is: ',file);
      console.log('The Result Is: ',reader.result);
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.callback(file, reader.result);
    }
    
    reader.readAsDataURL(file)
  }
  chargeFunc = (e) => { 
    console.log("File is",this.state.file);
    const formData = new FormData();
    console.log("------one------");

    // formData.append('file',value);
    formData.append('filename', this.state.file)
    formData.append('token',this.state.token);
    formData.append('userName',this.state.name);
    formData.append('storeId',this.state.storeId);
    formData.append('chargeMoney',this.state.subsidyAmount);
    
    let config = {
      method: 'post',
      headers:{'Content-Type': 'multipart/form-data'}
    }
    // axios.post(saveStoreZeroCharge,formData,config).then((res) => {
    //   if (res.data.msg == '用户登陆已过期') {
    //       alert("请重新登录");
    //       return false;
    //   }
    //   if (res.data.status === 200) {

    //       // this.getStoreInfo();
    //   }
    //   if (res.data.status != 200) {

    //       return false;
    //   }
    // }).catch((error) => {
    //     console.log(error);
    // })
  }
}


export default OperationBox;