import  React from 'react';
import  { connect }from 'react-redux';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from './plugins/TitleNav/TitleNav';
import AlertInfo from './plugins/AlertInfo/AlertInfo';
import  TitleInfo from './plugins/TitleInfo/TitleInfo';
import LoadView from './common/LoadView';
import Concat from './plugins/Concat/Concat';
import {PLAT, alertProps,_assign,fetchHander} from './common/const';
import emApi from "./common/api";
import {jrLog} from './common/const';
import {getUserInfo,insertUserInfo} from './../redux/action/action';
import { Toast, Icon } from 'antd-mobile';


class  OnCard extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            validError:'',
            validErrorStatus:false,
            mobile:'',
            cardNum:'',
            code:'',
            bankInfo:{},
            bankInfoStatus:false,
            showSend:true,
            sendCount:60,
            type:'1',
            titleInfoShow:true,
            submitStatus:false
        }
        Object.assign(this.state,alertProps);
    }
    componentDidMount(){
        this.props.insertUserInfo(localStorage.user_id,localStorage.h5_token);//后台需要此插入数据的接口,前台只管调用
        this.props.getUserInfo(localStorage.user_id,localStorage.h5_token);//获取用户信息
        this.setState({
            type:this.props.location.query.type,
            cardNum: localStorage.cardNum,
            mobile:localStorage.mobile
        })

    }
    handlerSubmit(){//提交表单
        if(!this.state.cardNum|| !this.state.mobile){
            Toast.fail('请补全以上信息',2);
            return false;
        }
        let pattern1 =  /^1[3|4|5|7|8]+[0-9]{9}$/;
        if(!pattern1.test(this.state.mobile)){
            Toast.fail('请输入正确格式的手机号',2);
            return false;
        }
        fetchHander(this.state.type==='1'? emApi.addCreditCard:emApi.addBankCard,_assign({
            user_id	: localStorage.user_id,
            token:localStorage.h5_token,
            phone:this.state.mobile,
            bank_number: this.state.cardNum,
            code:this.state.code,
            name:this.props.userInfoData.real_name,
            identity_number:this.props.userInfoData.identity_num,
            bank_name:localStorage.bankName?localStorage.bankName:this.state.bankInfo.bankname?this.state.bankInfo.bankname:'',
            bank_icon:localStorage.bankName?localStorage.bankImg:this.state.bankInfo.img?this.state.bankInfo.img:'',
            card_type:this.state.bankInfo.cardtype?this.state.bankInfo.cardtype:this.state.type==='1'?'贷记卡':'借记卡',
            plat_type:PLAT()=='ios'?32:31
        }),true).then((data)=>{
            localStorage.bankName="";
            localStorage.bankImg="";
            if(this.state.type===1){
                jrLog('kamao_card_keep_27');
            }else{
                jrLog('kamao_chuxucard_keep_31');
            }
            this.setState({
                showAlert:false,
                submitStatus:true
            });
            this.props.history.push(localStorage.preUrl);//绑卡成功后进入之前设置的preurl
        },(mes)=>{
            this.setState({
                showAlert:true,
                iconType:2,
                submitStatus:true,
                textVal:mes,
                validError:mes,
                validErrorStatus:true
            });

            // if(mes=="您的账号在另外的设备上登录，所以需要重新登录哟"){
            //     this.props.history.push('/encashment/login');
            // }else{
            //     this.autoClose();
            // }
        })
    }
    handleValueChange(name,event){
        let eventValue =event.target.value.trim();
        switch (name){
            case 'cardNum':
                if(eventValue){
                    this.setState({
                        cardNum:eventValue,
                        // submitStatus:false,
                        showAlert:true,
                        iconType:0,
                    });
                    fetchHander(emApi.getBankInfo,_assign({
                                    bank_number:eventValue,
                                    user_id:localStorage.user_id,
                                    token:localStorage.h5_token
                                }),true).then((data)=>{
                        this.setState({
                            bankInfo:data,
                            bankInfoStatus:true,
                            cardNum:eventValue,
                            // submitStatus:true,
                            showAlert:false
                        });
                        localStorage.bankImg = data.img;
                        localStorage.bankName= data.bankname;
                        // if(this.state.type===1){
                        //     addGrowingLog('cash_credit_identify');
                        // }else{
                        //     addGrowingLog('cash_debit_card_identify')
                        // }
                    },(mes)=>{
                        this.setState({
                            bankInfo:{error:mes},
                            bankInfoStatus:false,
                            cardNum:eventValue,
                            // submitStatus:true
                        });
                        this.autoClose();
                    })
                }
            break;
            case 'mobile':
                console.log(eventValue);
                let pattern1 =  /^1[3|4|5|7|8]+[0-9]{9}$/;
                if(pattern1.test(eventValue)){
                    this.setState({
                        submitStatus:true
                    });

                }else{
                    this.setState({
                        submitStatus:false
                    });
                }
                this.setState({
                    mobile:eventValue,
                });
                break;


            // case 'code':
            //         this.setState({
            //             code:eventValue
            //         });
            //     break;
        }
    }
    sendMes(){//发送验证码
        let pattern1 =  /^1[3|4|5|6|7|8|9]+[0-9]{9}$/;
        if(!pattern1.test(this.state.mobile)){
            this.setState({
                iconType:2,
                textVal:'手机格式错误',
                showAlert:true
            });
            this.autoClose();
        }else{
            fetchHander(emApi.getCode,_assign({
                phone:this.state.mobile,
                verify_type:this.state.type==='1'?'credit':'merchant'
            }),true).then((data)=>{
                this.setState({
                    iconType:1,
                    textVal:'发送成功',
                    showAlert:true
                });
                this.autoClose();
                let myVar = setInterval(()=>{
                    let count = this.state.sendCount;
                    count--;
                    if (count < 1) {
                        this.setState({
                            showSend: true,
                            sendCount:60
                        });
                        clearInterval(myVar);
                    }else{
                        this.setState({
                            showSend:false,
                            sendCount: count
                        });
                    }
                },1000);
            },(mes)=>{
                this.setState({
                    validError:mes,
                    validErrorStatus:true
                });
            })

        }

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
            })

        },this.state.closeTime);
    }
    closeInfo(){
        this.setState({
            titleInfoShow:false
        })
    }
    toBankList(){
        if(this.state.type==='1'){
            jrLog('kamao_card_choosebank_25');
        }else{
            jrLog('kamao_chuxucard_choosebank_29');
        }
        let _n = Number(this.state.type);
        localStorage.cardNum =  this.state.cardNum;
        localStorage.mobile =  this.state.mobile;
        this.props.history.push("/encashment/bankList?type="+(_n+1)+'&isnew='+this.props.location.query.isnew||'');
    }
    changeValue(e){
        this.setState({
            cardNum:e.target.value
        })
    }

    render(){
        let { userInfoData } = this.props;
        if( userInfoData == 'NOLOAD' || userInfoData == undefined){
            return (<LoadView/>)
        }
        let showCode  = {
            display:this.state.type==='1'?'none':'none'
        }
        let _name= this.state.type==='1'?'信用':'储蓄';
        let titleData = this.state.type==='1'?window.tipInfo.creditMsg:window.tipInfo.bankMsg;
        return(<div className="onCard">
                <title>{this.state.type==='1'?"添加信用卡":this.props.location.query.isnew==='1'?"添加储蓄卡":"更换储蓄卡"}</title>
                <TitleNav preUrl={localStorage.preUrl?localStorage.preUrl:''} title={this.state.type==='1'?"添加信用卡":this.props.location.query.isnew==='1'?"添加储蓄卡":"更换储蓄卡"} opImg={require('./../images/concat.png')}  handler={this.concat.bind(this)}></TitleNav>
                <TitleInfo titleInfoShow={this.state.titleInfoShow} content={titleData} closeIcon={true} close={this.closeInfo.bind(this)}/>
                <form noValidate>
                    <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input type="text" name="name" id="name" value={this.props.userInfoData.real_name} disabled="disabled" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardId">身份证号</label>
                        <input type="text" name="cardId" id="cardId" value={this.props.userInfoData.identity_num} disabled="disabled"/>
                    </div>
                    <div className="addInfo">
                        <div className="form-group">
                            <label htmlFor="cardNum">{this.state.type==='1'?'信用':'储蓄'}卡号</label>
                            <input type="tel" name="cardNum" id="cardNum" placeholder={"请填写"+_name+"卡号"}
                                  value={this.state.cardNum} onChange={this.changeValue.bind(this)}
                                   onBlur={this.handleValueChange.bind(this,'cardNum')}/>
                        </div>

                        <div className="validText" style={(this.state.bankInfo!=={}&&!this.state.bankInfoStatus)||localStorage.bankName?{}:{display:'none'}}>{this.state.bankInfo.error}</div>
                        <div className="form-group">
                            <label htmlFor="mobile">银行</label>
                            <div className="bankStyle" onClick={this.toBankList.bind(this)}
                                 style={{display:'block',color:"#9e9e9e",fontSize:'.7rem',paddingLeft: '6.5rem',
                                paddingTop:'0.4rem'}}>
                                {(this.state.bankInfo!=={}&&this.state.bankInfoStatus) || localStorage.bankName?
                                    <div className="flex"> <img src={localStorage.bankName?(localStorage.bankImg?localStorage.bankImg:require('./../images/Oval 1.png')):this.state.bankInfo.img}  alt=""/>
                                        <span ><span className="flex"><span>{localStorage.bankName?localStorage.bankName:this.state.bankInfo.bankname}</span><img src={require('./../images/arrows/8.png')} alt=""/></span> </span></div>
                                   :<span>请选择银行 <img src={require('./../images/arrows/8.png')} alt=""/></span>}

                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">预留手机号</label>
                            <input type="tel" name="mobile" id="mobile" placeholder="请填写预留手机号"
                                   value={this.state.mobile}
                                   onChange={this.handleValueChange.bind(this,'mobile')}/>
                        </div>

                        <div className="form-group code" style={showCode}>
                            <label htmlFor="code">验证码</label>
                            <input type="text" name="code" id="code" placeholder="请填写验证码" onChange={this.handleValueChange.bind(this,'code')}/>
                            <button type="button" onClick={this.sendMes.bind(this)} disabled={this.state.showSend?false:true} className={this.state.showSend?'sendButton':'sendButtonDis'}>
                                {this.state.showSend?'获取验证码': <span>{this.state.sendCount}s后重新发送</span>}</button>
                        </div>
                        <div className="validText" style={!this.state.validErrorStatus?{display:'none'}:{}}>{this.state.validError}</div>
                    </div>
                    <div className="button">
                        <button  type="button" onClick={this.handlerSubmit.bind(this)}
                                 style={this.state.submitStatus||(localStorage.mobile||localStorage.cardNum)?{}:{background:'#d0d0d0'}}
                                 disabled={this.state.submitStatus||(localStorage.mobile||localStorage.cardNum)?false:true}
                                 className='sendButton btn'>
                            保存
                        </button>
                    </div>

                </form>
                <Concat title="客服咨询" hideModal={this.hideModal.bind(this)} showModal={this.state.showModal} />
                <AlertInfo {...this.state} changeShow={this.changeShow.bind(this)}/>
            </div>
        )
    }
}

OnCard.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        userInfoData:state.update.userInfoData
    }
}
export default connect(mapStateToProps,{getUserInfo,insertUserInfo})(OnCard)