import  React from 'react';
import  { connect }from 'react-redux';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import  TitleInfo from '../plugins/TitleInfo/TitleInfo';
import  Modal from '../plugins/Modal/Modal';
import {invitationReward} from '../../redux/action/action';
import {isAppView,PLAT,is_weixn,getNew} from '../common/const';
import LoadView from '../common/LoadView';
import {Toast} from 'antd-mobile';


class  RecomReward extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }
    componentDidMount(){
        this.props.invitationReward({user_id:localStorage.user_id, token:localStorage.h5_token});
    }
    getList(data){
        if(data.length!==0){
            let content = <span><img src={require('../../images/iconTag.png')} alt=""/><span>活动奖励会在每日金额出账时更新,请耐心等待</span></span>

            return(
                <div>
                    <TitleInfo titleInfoShow={true} content={content} style={isAppView()?{display:'none'}:{}}/>
                    <div className="list" style={{display:data.length!==0?'block':'none'}}>
                        {data.map((val,index)=>{
                            return <div className="item" key={index}>
                                <div className="title"><span>{val.month}</span><span> +{val.total}</span></div>
                                <div className="dateList">{
                                    val.list.map((ele,i)=>{
                                        return (
                                            <div key={i}>
                                                <div>{ele.date}</div>
                                                <div>
                                                    <div>+{ele.amount}</div>
                                                    <div>{ele.tip}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }</div>
                            </div>
                        })}
                    </div>
                    <button type="button" className="btn goCash" onClick={this.goCash.bind(this)}>去提现</button>
                </div>
            )
        }else{
            return(
                <div className="list noData" style={{display:data.length===0?'block':'none'}}>
                    <img src={require('../../images/img6@2x.png')} alt=""/>
                    <div>抱歉，暂时还没有记录。</div>
                    <button  type="button" className="btn" onClick={this.remFriend.bind(this)}>邀请好友</button>
                </div>
            )
        }
    }
    remFriend(){
        // if(isAppView()){
        //
        // }else{
        //
        // }
        this.props.history.goBack();
    }
    goCash(){
        let type = this.props.location.query.plat_type;
        console.log(type);
        if(type==='otherapp'){
            this.setState({
                visible:true
            })
        }else{
            if(isAppView()){
                try{
                    Toast.loading('loading',0);
                    getNew().then((r)=>{
                        Toast.hide();
                        if(r){
                            if(PLAT()==='ios'){
                                window.webkit.messageHandlers.NativeMethod.postMessage('jump_kamao_my_acount');
                            }else if(PLAT()==='android'){
                                window.onCallByH5.startActivity('MyAccountActivity');
                            }
                        }
                    }).catch(()=>{
                        Toast.hide();
                        this.setState({
                            visible:true
                        })
                    })

                }catch(e){
                    alert(e);
                    console.log(e);
                }
            }else{
                this.setState({
                    visible:true
                })
                // if(PLAT()==='ios'){
                //     location.href=IOSPACK;
                // }else{
                //     location.href=ANDROIDPACK;
                // }
            }
        }


    }

    render(){
        let {invitationRewardData }=this.props;
        if(invitationRewardData==='NOLOAD' || invitationRewardData === undefined){
            return <LoadView/>
        }

        return(<div className="recomReward">
                <title>邀请奖励</title>
                <TitleNav title="邀请奖励" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                {this.getList(invitationRewardData)}
                <Modal visible={this.state.visible} hide={this.hide.bind(this)} getContentTpl={this.getContent()}/>
            </div>
        )
    }
    hide(){
        this.setState({
            visible:false
        })
    }
    getContent(){
        return <div>
            <div className="desc">
                <div>请先下载卡猫APP最新版,</div>
                <div>在卡猫APP"返现账户"中提现.</div>
            </div>
            <div className="btns">
                <div onClick={this.hide.bind(this)}>取消</div>
                <div onClick={()=>{
                    if(PLAT()==='ios'){
                        location.href=IOSPACK;
                    }else{
                        location.href=ANDROIDPACK;
                    }
                }}>去下载</div>
            </div>
        </div>
    }
}

RecomReward.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps=(state)=>{
    return{
        invitationRewardData:state.update.invitationRewardData
    }
}
export default connect(mapStateToProps,{invitationReward})(RecomReward)
