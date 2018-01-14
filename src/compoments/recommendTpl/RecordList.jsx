import  React from 'react';
import  { connect }from 'react-redux';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {getInvitationUsers} from '../../redux/action/action';
import LoadView from '../common/LoadView';
import {isAppView,is_weixn} from '../common/const';


class  RecordList extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            showModal:false
        }
    }
    componentDidMount(){
        this.props.getInvitationUsers({user_id:localStorage.user_id, token:localStorage.h5_token});
    }

    getList(data){
        if(data.length!==0){
            return(
                <div>
                    <div className="list" style={{display:data.length!==0?'block':'none'}}>
                        {data.map((val,index)=>{
                            return <div className="item" key={index}>
                                <div className="title"><span>{val.month}</span></div>
                                <div className="dateList">{
                                    val.list.map((ele,i)=>{
                                        return (
                                            <div key={i}>
                                                <div>{ele.date}</div>
                                                <div>
                                                    <div>{ele.phone}</div>
                                                    <div>{ele.tip}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }</div>
                            </div>
                        })}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="list noData" style={{display:data.length===0?'block':'none'}}>
                    <img src={require('../../images/img6@2x.png')} alt=""/>
                    <div>抱歉，暂时还没有记录。</div>
                </div>
            )
        }

    }
    render(){
        let {invitationUsersData }=this.props;
        if(invitationUsersData==='NOLOAD' || invitationUsersData == undefined){
            return <LoadView/>
        }

        return(<div className="recordList">
                <title>邀请记录</title>
                <TitleNav title="邀请记录" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                {this.getList(invitationUsersData)}
            </div>
        )
    }
}

RecordList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps=(state)=>{
    return{
        invitationUsersData:state.update.invitationUsersData
    }
}
export default connect(mapStateToProps,{getInvitationUsers})(RecordList)