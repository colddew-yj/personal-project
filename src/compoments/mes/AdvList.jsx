import  React from 'react';
import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import LoadView from "../common/LoadView";
// import {fetchHander} from '../common/const';
// import empApi from '../common/api';
// import { Toast, Icon } from 'antd-mobile';
import {getAdMessage} from '../../redux/action/action';
import {isAppView, is_weixn} from '../common/const';

class AdvList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list :[]
        }
    }

    componentDidMount() {
        this.props.getAdMessage({
            user_id:localStorage.user_id,
            token:localStorage.h5_token
        });
        // this.props.indexRedPoint({
        //     user_id:localStorage.user_id,
        //     token:localStorage.h5_token
        // });
    }


    goNext(url){
        location.href=url;
    }
    goMes(id){
        this.props.history.push("/encashment/mesDetail?id="+id);
    }

    render() {
        let {getAdMessageData} = this.props;
        if (getAdMessageData==='NOLOAD') {
            return <LoadView/>
        }
        return (<div className="advList">
                <title>公告</title>
                <TitleNav title="公告" style={isAppView() || is_weixn() ? {display: 'none'} : {}}/>
                <div className="list">
                    {getAdMessageData.map((val,index)=>{
                        return(
                            <div  key={index}>
                                <div className="headTime"><span>{val.head_time}</span></div>
                                <div>
                                    <div className="head">{val.head}</div>
                                    <div className="createTime">{val.create_time}</div>
                                    <div className="img"  onClick={this.goNext.bind(this,val.jump_url)}
                                         style={val.img_url?{}:{display:'none'}}><img src={val.img_url} alt=""/></div>
                                    <div className="content">{val.content}</div>
                                    <div onClick={!val.img_url?this.goMes.bind(this,val.message_id):this.goNext.bind(this,val.jump_url)} className="flex">
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

AdvList.contextTypes = {
    router : React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getAdMessageData:state.update.getAdMessageData
    }
}
export  default    connect(mapStateToProps,{getAdMessage})(AdvList)