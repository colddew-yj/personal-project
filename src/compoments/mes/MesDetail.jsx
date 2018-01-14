import  React from 'react';
import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import LoadView from "../common/LoadView";
// import {fetchHander} from '../common/const';
// import empApi from '../common/api';
// import { Toast, Icon } from 'antd-mobile';
import {messageDetail} from '../../redux/action/action';
import {isAppView, is_weixn} from '../common/const';

class MesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list :[]
        }
    }

    componentDidMount() {
        this.props.messageDetail({
            user_id:localStorage.user_id,
            token:localStorage.h5_token,
            id:this.props.location.query.id
        });
    }


    goNext(tag){
        if(tag==='system'){
            this.props.history.push("/encashment/mesList");
        }else if(tag==="advertisement"){
            this.props.history.push("/encashment/advList");
        }
    }

    render() {
        let {messageDetailData} = this.props;
        if (messageDetailData==='NOLOAD') {
            return <LoadView/>
        }
        return (<div className="mesDetail">
                <title>消息内容</title>
                <TitleNav title="消息内容" style={isAppView() || is_weixn() ? {display: 'none'} : {}}/>
               <div className="section">
                   <div className="title">{messageDetailData.head}</div>
                   <div className="time">{messageDetailData.create_time}</div>
                   <div className="content">{messageDetailData.content}</div>
               </div>
            </div>
        )

    }
}

MesDetail.contextTypes = {
    router : React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        messageDetailData:state.update.messageDetailData
    }
}
export  default    connect(mapStateToProps,{messageDetail})(MesDetail)