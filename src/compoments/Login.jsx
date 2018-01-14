

import React, { Component } from 'react';
import  empApi  from './common/api';
import  TitleNav from './plugins/TitleNav/TitleNav';
import {alertProps,_assign,fetchHander,jrLog} from './common/const';
import AlertInfo  from './plugins/AlertInfo/AlertInfo';
import Concat from './plugins/Concat/Concat';
import { content} from './common/const';
import md5 from 'md5';
const  CAPID =  '593010cf1ff5453888c0cb72050cbfac';
import { Toast } from 'antd-mobile';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            code:'',
            formValid:false,
            sendCount:60,
            showSend:true,
            isAgree:true,
            closeTime:'',
            showModal:false,
            // showDialogModal:false,
            validateBoxShow: false, /*是否显示图形验证码弹窗*/
            usePicVerify: false, /*是否进行图形校验*/
        }
        Object.assign(this.state,alertProps);
    }

    componentDidMount() {
        this.getConfig();
    }
    initDun() {
        let that = this;
        initNECaptcha({
            captchaId: CAPID,
            element: '#captcha',
            mode: 'embed',
            width: '270px',
            onVerify: function (err, data) {
                if(data) {
                    that.setState({
                        validateBoxShow: false
                    });
                    that.goSendMsg(data.validate);
                }
            }
        })
    }


    concat(e){
        setTimeout(()=>{
            this.setState({
                showModal:true
            });
        },200)

    }
    show(){
        // setTimeout(()=>{
        //     this.setState({
        //         showDialogModal:true
        //     });
        // },200)


    }
    // modalTpl(){
    //     return(
    //         <div className="protocol">
    //             {
    //                 this.modalContent()
    //             }
    //         </div>
    //     )
    // }
    modalContent(){
        return(
            <div>{content}
            </div>
        )
    }
    // hideDialogModal(){
    //         this.setState({
    //             showDialogModal:false
    //         });
    // }
    hideModal(){
        this.setState({
            showModal:false
        });
    }

    getConfig() {
        fetchHander(empApi.getVerificationCodeConfig).then((data)=>{
            this.setState({
                usePicVerify: data
            })
        });
        // fetchGet(empApi.getVerificationCodeConfig).then( (ret) => {
        //     if (ret.status === 1) {
        //         this.setState({
        //             usePicVerify: ret.data
        //         })
        //     } else {
        //         alert(ret.message)
        //     }
        // })
    }
    getCode(){
        // jrLog()
        if(!this.state.phone){
            this.setState({
                textVal:'请输入手机号码',
                iconType:2,
                showAlert:true,
                closeTime:2000
            });
            this.autoClose();
        }else{
            if(this.state.usePicVerify) {
                this.initDun();
                this.setState({
                    validateBoxShow: true
                });
            }else {
                this.goSendMsg();
            }
        }
    }
    goSendMsg(validate,event){
        fetchHander(empApi.getLoginCode,_assign({
            phone:this.state.phone,
            dev_num: 'qx',
            sign: md5(this.state.phone + 'frapkkxookfjisksiakd26ooFroMAPP'),
            captchaId: CAPID,
            validate: validate ? validate : ''
        })).then((data)=>{
            this.setState({
                textVal:'发送成功',
                iconType:1,
                showAlert:true
            });
            this.autoClose();
            let myVar = setInterval(()=> {
                let count = this.state.sendCount;
                count--;
                if (count < 1) {
                    this.setState({
                        showSend: true,
                        sendCount:30
                    });
                    clearInterval(myVar);
                }else{
                    this.setState({
                        showSend:false,
                        sendCount: count
                    });
                }
            },1000)
        })
    }
    toLogin(){
        jrLog('kamao_zhuce_xiayibu_72')
        let pattern1 =  /^1[3|4|5|6|7|8]+[0-9]{9}$/;

        if(!this.state.phone || !pattern1.test(this.state.phone) ){
            console.log("1");
            this.setState({
                textVal:'手机号码格式错误',
                iconType:2,
                showAlert:true,
                closeTime:3000
            });
            this.autoClose();
        }else
        if(!this.state.code ){
            this.setState({
                textVal:'请输入验证码',
                iconType:2,
                showAlert:true,
                closeTime:3000
            });
            this.autoClose();
        }else
        if(!this.state.isAgree){
            this.setState({
                textVal:'请阅读并同意相关协议',
                iconType:2,
                showAlert:true,
                closeTime:3000
            });
            this.autoClose();
        }else{
            Toast.loading('登录中...',0);
            var _data = {
                phone: this.state.phone,
                code: this.state.code,
                package_name:'quxianh5',
                source_id	:'tuiguang',
                plat_version: '3.5.0',
                dev_sys: '-',
                net_info: '-',
                dev_no: '-'
            };
            try {
                this.props.location.query.channel_id && Object.assign(_data, {
                    channel_id: this.props.location.query.channel_id
                });
                fetchHander(empApi.login,_assign(_data)).then((data)=>{
                    Toast.hide();
                    localStorage.user_id=data.user_info['id'];
                    localStorage.h5_token=data.token;
                    localStorage.inv_id=data.inv_id;
                    localStorage.mobile=this.state.phone;
                    this.props.history.goBack();
                });
            } catch(e){
                console.log(e);
            }
        }
    }
    changeValue(type,event){
        let eventValue =event.target.value.trim();
        let pattern1 =  /^1[3|4|5|7|8]+[0-9]{9}$/;
        // && !pattern1.test(eventValue)
        if(type==='phone'){

           this.setState({
               phone:eventValue,
           })

        }
        if(type==='code'){
            this.setState({
                code:eventValue,
            })
        }
    }
    changeIsagree(v) {
        this.setState({
            isAgree: !v,
        })
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
        },1000);
    }

    getCaptcha() {
        const { validateBoxShow } = this.state;
        return <div style={{display: validateBoxShow ? 'initial' : 'none' }}
                    className="captcha-box">
            <div id="captcha"></div>
        </div>
    }
    render() {
        return (<div className="login">
            { this.getCaptcha() }
            {/*返回上一页*/}
            <TitleNav title="登录" preUrl={this.props.location.query.goBack==='1'?"":"/encashment/swiperCard"}   opImg={require('./../images/concat.png')} handler={this.concat.bind(this)}></TitleNav>
            <form>
                <label   className="tel">
                    <input type="tel" placeholder="手机号码" name="tel" id="tel" onChange={this.changeValue.bind(this,'phone')} value={this.state.phone}/>
                </label>
                <label   className="code">
                    <input type="tel" name="code" id="code" placeholder="验证码"  onChange={this.changeValue.bind(this,'code')} value={this.state.code}/>
                    <button disabled={this.state.showSend?false:true} type="button"
                            onClick={this.getCode.bind(this,'code')}>{this.state.showSend?'获取验证码': <span>{this.state.sendCount}s后重新发送</span>}
                    </button>
                </label>
                <label   className="agree checkbox">
                        <input type="checkbox" checked={this.state.isAgree} onChange={this.changeIsagree.bind(this,this.state.isAgree)}/>  <label >我已阅读并同意</label>
                        <a href="/#/encashment/protocol">《用户登录注册协议》</a>
                    {/*<input type="checkbox" name="agree" id="agree" checked={this.state.isAgree}*/}
                           {/*onChange={this.changeIsagree.bind(this, this.state.isAgree)}/> <label >我已阅读并同意<Link to="">《用户登录注册协议》</Link></label>*/}
                </label>
                <div className="confirm">
                    <button type="button" className="btn submigtBtn" onClick={this.toLogin.bind(this)}>登录</button>
                </div>
            </form>
            <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal} />
            {/*<Modal title="用户登录注册协议" hideModal={this.hideDialogModal.bind(this)} showModal={this.state.showDialogModal} content={this.modalTpl()}/>*/}

            <AlertInfo {...this.state} changeShow={this.changeShow.bind(this)}/>

        </div>)
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default Login

