import  React from 'react';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import  Modal from '../plugins/Modal/Modal';
import {is_weixn,isAppView,isLogin,appLogin,fetchHander,_assign} from './../common/const';
import emApi from './../common/api';
import {Toast} from 'antd-mobile';

class  CommandPacket extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            visible:false,
            errorType:''
        }
    }
    getNum(){
        console.log(this.refs.num.value);
        if(!this.refs.num.value){
            Toast.fail('请输入口令',1.5);
            return false;
        }
        isLogin().then((r)=>{
            if(r){
                fetchHander(emApi.sendCouponByCommand,{command:this.refs.num.value,user_id:localStorage.userId||localStorage.user_id||'',token:localStorage.token || localStorage.h5_token || ""}).then((data)=>{
                    return data.code+1;
                }).then((c)=>{
                    if(c){
                        this.setState({
                            visible:true,
                            errorType:c
                        })
                    }
                })
            }else{
                Toast.fail('请先登录,正在跳转...',1.5,()=>{
                    appLogin();
                });
                // return false;
            }
        }).catch((e)=>{
          alert(e);
        })

    }
    getPacketTpl(){
        let content ;
        switch (this.state.errorType-1){
            case  0 : content= <div>
                <div>恭喜，领取成功，</div>
                <div>请在“我的现金券”中查看！</div>
            </div> ;break;
            case  1 : content= <div>
                <div>很抱歉</div>
                <div>口令错误</div>
            </div> ;break;
            case  2 : content= <div>
                <div>很抱歉，您的口令</div>
                <div>已经超过有效期了!</div>
            </div> ;break;
            case  3 : content= <div>
                <div>您已经领取过了,</div>
                <div>快去查看吧</div>
            </div> ;break;
            case  4 : content= <div>
                <div>很抱歉，你暂时</div>
                <div>没有资格领取现金券哦!</div>
            </div> ;break;
        }
        return(
           <div className="flex">
               { content }
               <div onClick={()=>{this.setState({visible:false})}}>知道了</div>
           </div>
        )
    }

    render(){
        return(<div className="commandPacket">
                <title >口令兑换</title>
                <TitleNav title="口令兑换" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <section >
                    <img src={require('./../../images/bannerJumpImgs/gbk.png')} alt=""/>
                    <div>
                        <img src={require('./../../images/bannerJumpImgs/kouling2.png')} alt=""/>
                        <input type="text" placeholder="输入口令，领取现金红包" ref="num" />
                    </div>
                    <div>
                        <img src={require('./../../images/bannerJumpImgs/Group@2x.png')} alt="" onClick={this.getNum.bind(this)}/>
                    </div>

                </section>
                <Modal visible={this.state.visible} getContentTpl={this.getPacketTpl()} hide={()=>{this.setState({visible:false})}}/>
            </div>
        )
    }
}
CommandPacket.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export  default   CommandPacket