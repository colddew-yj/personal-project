import  React from 'react';
import {Modal,Toast,Icon} from 'antd-mobile';
import LoadView from './../common/LoadView';
import emApi from './../common/api';
import {fetchPost} from 'jrbasic';
import  {Link} from 'react-router';
import { jrLog } from './../common/const'
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {is_weixn,isAppView} from './../common/const';

class Nianqianan extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            visible: false,
            isSign: '',
            phone:''
        }
    }

    componentDidMount() {
        fetchPost(emApi.getFinancialNumber,{type:1}).then((res)=>{
            if(res.status===1){
                jrLog('nianqianani_huodongye_jiazai_loadcomplete',{
                    package_name:this.props.location.query.package_name || PACKAGE_NAME,
                    app_name:this.props.location.query.app_name || APP_NAME,
                    user_id:localStorage.user_id || localStorage.userId||'',
                    phone:'',
                    Cashback:'',
                    type:'nianqianan'
                });
                this.setState({
                    list:res.data
                });
            }else{
                Toast.fail(res.message);
            }
        })
    }

    showModal(isSign,val) {
        // event.preventDefault();
        this.setState({
            visible: true,
            isSign: isSign,
            phone:''
        });

        jrLog(val?'nianqianan_huodongye_qufanxian_apply':'nianqianan_huodongye_canyushoutou_apply',{
            package_name:this.props.location.query.package_name || PACKAGE_NAME,
            app_name:this.props.location.query.app_name || APP_NAME,
            user_id:localStorage.user_id || localStorage.userId||'',
            phone:this.state.phone || '',
            Cashback:val?val:"",
            type:'nianqianan'
        });
    }

    hideModal() {
        this.setState({
            visible: false
        });
    }

    getImgs() {
        let imgs = ['./../../images/bannerJumpImgs/1.png',
            './../../images/bannerJumpImgs/2.png',
            './../../images/bannerJumpImgs/3.png',
            './../../images/bannerJumpImgs/4.png',
            './../../images/bannerJumpImgs/5.png',
            './../../images/bannerJumpImgs/6.png'];
        return(<div className="list">
            {
                this.state.list.map((val, index) => {
                    return(<div key={index}>
                        <img src={require('./../../images/bannerJumpImgs/'+(index+1)+'.png')} alt="" className="card"/>
                        <img src={require('./../../images/bannerJumpImgs/redArrow2.png')} style={index===0?{}:{display:'none'}} className="cardArrow"/>
                        <img src={require('./../../images/bannerJumpImgs/redArrow1.png')} style={index!==0?{}:{display:'none'}} className="cardArrow"/>
                        <div className="desc" onClick={this.showModal.bind(this,'1',index+1)}><span>去返现</span><span>(已有{val}人选择)</span></div>
                    </div>)
                })
            }
        </div>)
    }

    getModal() {
        return (
        this.state.isSign==='1'
            ?
            <Modal visible={this.state.visible} footer={[]} closable={ false} transparent={true} className="self" maskClosable={true}
                   onClose={this.hideModal.bind(this)}>
                {
                    <div className="toSign">
                        <div className="title">超级返名额登记 <img onClick={this.hideModal.bind(this)} src={require('./../../images/bannerJumpImgs/close.png')} alt=""/></div>
                        <div className="desc">
                            <div>
                                为了追踪您的投资信息
                            </div>
                            <div>给您返现奖励</div>

                        </div>
                        <div className="inputItem">
                            <div>*该手机号码仅用于信息追踪</div>
                            <input type="tel" placeholder="请输入您将用于注册投资的手机号码" onChange={this.changeVal.bind(this)}/>
                        </div>
                        <button type="button" onClick={this.send.bind(this)}>确定</button>
                        <div className="mes">
                            <div>您即将投资的是评级为 <span>AA</span> 的平台</div>
                            <div>参与活动则表示同意 <Link to="encashment/statement">返现协议与免责声明</Link></div>
                            <div>请确认此手机号可以联系到本人，</div>
                            <div>若不能请联系客服。</div>
                        </div>

                    </div>
                }
            </Modal>
            :
            <Modal visible={this.state.visible} footer={[]} transparent={true} maskClosable={true} className="nqaHelp"
                   onClose={this.hideModal.bind(this)}>
                {
                        <div className="concat">
                            <img src={require('./../../images/bannerJumpImgs/Group 5.png')} alt="" className="bk"/>
                            <span className="close" onClick={this.hideModal.bind(this)}>&#215;</span>
                            <div>卡猫官方客服微信号:</div>
                            <div>喵小妹（<div onClick={this.copyHtml.bind(this)}>微信号：kamao699</div>）</div>
                            <div>卡猫官方微信公众号：</div>
                            <div>卡猫99（<div  onClick={this.copyHtml.bind(this)}>微信号：kamao99</div>）</div>
                        </div>
                }
            </Modal>
        )
    }
    copyHtml(e){
        // var rng = window.createTextRange();
        // rng.moveToElementText(e.target);
        // rng.select();
        // document.execCommand("Copy"); // 执行浏览器复制命令
        // // window.clipboardData.setData("Text",e.target);
        Toast.info('请长按复制');
    }
    changeVal(event){
        let eventValue =event.target.value.trim();
        this.setState({
            phone:eventValue
        })
    }
    send(){
        jrLog('nianqianan_tanchuang_queding_apply',{
            package_name:this.props.location.query.package_name || PACKAGE_NAME,
            app_name:this.props.location.query.app_name || APP_NAME,
            user_id:localStorage.user_id || localStorage.userId||'',
            phone:this.state.phone || '',
            Cashback:"",
            type:'nianqianan'
        });
        let pattern1 =  /^1[3|4|5|6|7|8]+[0-9]{9}$/;

        if(!this.state.phone || !pattern1.test(this.state.phone) ){
            Toast.fail('请输入正确格式的11位手机号码',2);
            return false;
        }
        fetchPost(emApi.FinancialRegister,{
            type:'1',
            phone:this.state.phone,
            token:localStorage.h5_token,
            user_id:localStorage.user_id || localStorage.userId || "",
            channel_id:this.props.location.query.channel_id || ''
        }).then((res)=>{
            if(res.status===1){
                window.location.href="https://m.nianqa.com/#/nqaRegisterOne/sm036";
            }else{
                Toast.fail(res.message,1);
            }
        })
    }

    render() {
        if (this.state.list.length === 0) {
            return <LoadView/>
        }
        return (
            <div className="nianqianan">
                <title>什么值得投</title>
                <TitleNav title="什么值得投" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <div className="title">
                    <img src={require('./../../images/bannerJumpImgs/title.png')} alt=""/>
                </div>
                {this.getImgs()}

                <div className="txt"><img src={require('./../../images/bannerJumpImgs/txtarea.png')} alt=""/></div>
                <div className="send">
                    <div onClick={this.showModal.bind(this, '2')}><img
                        src={require('./../../images/bannerJumpImgs/concat.png')} alt=""/><span>客服</span></div>
                    <div onClick={this.showModal.bind(this, '1','')}>参与首投活动</div>
                </div>
                {this.getModal()}

            </div>
        )
    }
}

Nianqianan.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default  Nianqianan;