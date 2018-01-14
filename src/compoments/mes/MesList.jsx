import  React from 'react';
import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import LoadView from "../common/LoadView";
// import {fetchHander} from '../common/const';
// import empApi from '../common/api';
// import { Toast, Icon } from 'antd-mobile';
import {getSysMessage} from '../../redux/action/action';
import {isAppView, is_weixn} from '../common/const';

class MesList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list :[]
        }
    }

    componentDidMount() {
        this.props.getSysMessage({
            user_id:localStorage.user_id,
            token:localStorage.h5_token
        });
        // this.props.indexRedPoint({
        //     user_id:localStorage.user_id,
        //     token:localStorage.h5_token
        // });
    }


    goNext(id){
        this.props.history.push("/encashment/mesDetail?id="+id);
    }

    render() {
        let {getSysMessageData} = this.props;
        if (getSysMessageData==='NOLOAD') {
            return <LoadView/>
        }
        return (<div className="mesList">
                <title>系统消息</title>
                <TitleNav title="系统消息" style={isAppView() || is_weixn() ? {display: 'none'} : {}}/>

                <div className="list">
                    {getSysMessageData.map((val,index)=>{
                        return(
                            <div  key={index}>
                                <div className="headTime"><span>{val.head_time}</span></div>
                                <div>
                                    <div className="head">{val.head}</div>
                                    <div className="createTime">{val.create_time}</div>
                                    <div className="content">{val.content}</div>
                                    <div onClick={this.goNext.bind(this,val.message_id)} className="flex">
                                        <span>查看详情</span>
                                        <img src={require('./../../images/arrows/8.png')} alt=""/>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }
}

MesList.contextTypes = {
    router : React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getSysMessageData:state.update.getSysMessageData
    }
}
export  default    connect(mapStateToProps,{getSysMessage})(MesList)