import  React from 'react';
import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import LoadView from "../common/LoadView";
// import {fetchHander} from '../common/const';
// import empApi from '../common/api';
// import { Toast, Icon } from 'antd-mobile';
import {myMessage,indexRedPoint} from '../../redux/action/action';
import {isAppView, is_weixn} from '../common/const';
import {jrLog} from '../common/const';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list :[]
        }
    }

    componentDidMount() {
        this.props.myMessage({
            user_id:localStorage.user_id,
            token:localStorage.h5_token
        });
        // this.props.indexRedPoint({
        //     user_id:localStorage.user_id,
        //     token:localStorage.h5_token
        // });
    }


    goNext(tag){
        if(tag==='system'){
            jrLog('kamao_mynews_system_88');
            this.props.history.push("/encashment/mesList");
        }else if(tag==="advertisement"){
            jrLog('kamao_mynews_Notice_89');
            this.props.history.push("/encashment/advList");
        }
    }

    render() {
        let {myMessageData} = this.props;
        if (myMessageData==='NOLOAD') {
            return <LoadView/>
        }
        return (<div className="message">
                <title>我的消息</title>
                <TitleNav title="我的消息" style={isAppView() || is_weixn() ? {display: 'none'} : {}}/>

                <div className="list">
                    {myMessageData.map((val,index)=>{
                        return(
                            <div onClick={this.goNext.bind(this,val.msg_en)} className="flex" key={index}>
                                <div className="img">
                                    <img src={val.img_url} alt="" />
                                    <span style={val.is_read===1?{}:{display:'none'}} ></span>
                                </div>
                                <div className="content">
                                    <div>{val.name}</div>
                                    <div>{val.head}</div>
                                </div>
                                <div className="time">{val.time}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }
}

Message.contextTypes = {
    router : React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        myMessageData:state.update.myMessageData
    }
}
export  default    connect(mapStateToProps,{myMessage})(Message)