import  React from 'react';
import  { connect }from 'react-redux';
import {fetchPost,fetchGet} from 'jrbasic';
import empApi from './common/api'
import AlertInfo  from './plugins/AlertInfo/AlertInfo'
import  TitleNav from './plugins/TitleNav/TitleNav';
import  TitleInfo from './plugins/TitleInfo/TitleInfo';
import {insertUserInfo} from './../redux/action/action';
import { _assign,PLAT,alertProps,fetchHander} from './common/const';
import Concat from './plugins/Concat/Concat';
import {jrLog} from './common/const';
class  CardIdValid extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            imgUrl:'',
            isUpload:false,
            showModal:false,
            titleInfoShow:true
        }
        Object.assign(this.state,alertProps);
    }
    componentDidMount(){
        this.props.insertUserInfo(localStorage.user_id, localStorage.h5_token);//后台需要此插入数据的接口,前台只管调用
    }
    next(){
        jrLog('kamao_newuse_Continue_33');
        if(this.state.isUpload){
            this.props.history.push('/encashment/idConfirm');
        }else{
            this.setState({
                textVal:"请上传正确身份证图片",
                iconType:2,
                showAlert:true,
                closeTime:2000
            });
            this.autoClose();
        }

    }
    getImg(event){
        jrLog('kamao_newuse_paizhao_32');
        var input = event.target;
        console.log(input);
        let that = this;
        var reader = new FileReader();
        reader.onload = function () {
            let dataURL = reader.result;
            that.setState({
                imgUrl:dataURL,
                iconType:0,
                textVal:'请稍后',
                showAlert:true
            })
            that.compress(dataURL,fileSize);
        };
        reader.readAsDataURL(input.files[0]);
        var fileSize = Math.round( input.files[0].size/1024/1024) ; //以M为单位
    }

    compress(res,fileSize){
        var img = new Image(),
            maxW = 640; //设置最大宽度
        img.src = res;
        img.onload = ()=> {
            var cvs = document.createElement( 'canvas'),
                ctx = cvs.getContext( '2d');
            if(img.width > maxW) {
                img.height *= maxW / img.width;
                img.width = maxW;
            }

            cvs.width = img.width;
            cvs.height = img.height;

            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            var compressRate = this.getCompressRate(1,fileSize);
            var dataUrl = cvs.toDataURL( 'image/jpeg', compressRate);
            let _index = dataUrl.indexOf('base64');
            let _data = dataUrl.substring(_index+7);
            let imgData = {
                user_id:localStorage.user_id,
                token:localStorage.h5_token,
                suffix: '.jpeg',
                obverse: _data

            };
            fetchHander(empApi.addIdPhoto,_assign(imgData),true).then((data)=>{
                    this.setState({
                        isUpload:true,
                        textVal:'上传成功',
                        iconType:1,
                        closeTime:3000
                    });
                this.autoClose();
                localStorage.name=data.name;
                localStorage.card_id = data.id_card_no;
                },(mes)=>{
                this.setState({
                    isUpload:false,
                    textVal:mes,
                    iconType:2,
                    closeTime:3000
                });
            });
        }

    }
    getCompressRate(allowMaxSize,fileSize){
        var compressRate = 1;
        if(fileSize/allowMaxSize > 4){
            compressRate = 0.25;
        } else if(fileSize/allowMaxSize >3){
            compressRate = 0.3;
        } else if(fileSize/allowMaxSize >2){
            compressRate = 0.35;
        } else if(fileSize > allowMaxSize){
            compressRate = 0.4;
        } else{
            compressRate = 0.45;
        }
        return compressRate;
    }
    concat(e){
        setTimeout(()=>{
            this.setState({
                showModal:true
            });
        },200)

    }
    hideModal(){
        this.setState({
            showModal:false
        });
    }
    changeShow(){
        this.setState({
            showAlert:false
        })
    }
    autoClose(){
        window.clearAlert =  setTimeout(()=>{
            this.setState({
                showAlert:false
            });
        },2000);
    }
    closeInfo(){
        this.setState({
            titleInfoShow:false
        })
    }

    render(){
        let titleData = window.tipInfo? window.tipInfo.certMsg:'';
        // if( (this.props.productCreditData == 'NOLOAD' || this.props.productCreditData == undefined) || (this.props.amontAndPeriodData == 'NOLOAD' || this.props.amontAndPeriodData == undefined)){
        //     return (<LoadView/>)
        // }
        return (<div className="CardIdValid">
                <title>身份验证</title>
                <TitleNav preUrl={localStorage.preUrl?localStorage.preUrl:''} title="身份验证"  opImg={require('./../images/concat.png')} handler={this.concat.bind(this)}></TitleNav>
                <TitleInfo titleInfoShow={this.state.titleInfoShow} content={titleData} closeIcon={true} close={this.closeInfo.bind(this)}/>
                <div className="cards">
                    <div><img src={this.state.imgUrl?this.state.imgUrl:require('./../images/noId.png')} alt=""/></div>
                    <div>
                        <span>身份证正面</span><span>请尽量避免反光</span>
                    </div>
                    <input type="file" accept="image/png,image/jpeg,image/jpg" capture="camera" onChange={this.getImg.bind(this)}/>
                    <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={this.getImg.bind(this)}/>
                </div>
                <div className="desc_extend">
                    <div>完成身份认证可：</div>
                    <div>
                        <div><img src={require('./../images/cc.png')} alt=""/>防范身份信息被冒用，确保资金安全。</div>
                        <div><img src={require('./../images/acd.png')} alt=""/>放心取现交易，保障账户安全。</div></div>
                </div>
                <div className="next">
                    <div>
                        <button   onClick={this.next.bind(this)}>开始验证</button>
                        <span>认证全程仅需1分钟，我们保证您的资料不会被泄露  </span>
                    </div>
                </div>
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal} />

                <AlertInfo {...this.state} changeShow={this.changeShow.bind(this)}/>
            </div>
        )

    }
}

CardIdValid.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
    }
}
export default  connect(mapStateToProps, {insertUserInfo})(CardIdValid)