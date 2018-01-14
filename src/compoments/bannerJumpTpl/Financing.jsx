import  React from 'react';
import  {connect}from 'react-redux';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import LoadView from "../common/LoadView";
// import {fetchHander} from '../common/const';
// import empApi from '../common/api';
// import { Toast, Icon } from 'antd-mobile';
import {getFinancialByPage} from '../../redux/action/action';
import {is_weixn,isAppView} from './../common/const';

class Financing extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list :[]
        }
    }

    componentDidMount() {
        this.props.getFinancialByPage({});
        // this.props.indexRedPoint({
        //     user_id:localStorage.user_id,
        //     token:localStorage.h5_token
        // });
    }

    goNext(id){
        this.props.history.push("/encashment/mesDetail?id="+id);
    }
    toNian(url){
        this.props.history.push(url);
    }

    render() {
        let {getFinancialByPageData} = this.props;
        if (getFinancialByPageData==='NOLOAD') {
            return <LoadView/>
        }
        return (<div className="financing">
                <title>什么值得投</title>
                <TitleNav title="什么值得投" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <div className="list">
                    {getFinancialByPageData.list.map((val,index)=>{
                        return(
                            <div className="item" key={index}>
                                {/*<div className="title"><span>什么值得投</span></div>*/}
                                <div className="financial">
                                    <div className="desc">
                                        <span><img src={val.org_pic} alt=""/></span><span>{val.org_name}</span><span>{val.org_des}</span>
                                    </div>
                                    <div className="content flex">
                                        <div>
                                            <div><span>{val.rate}</span>%</div>
                                            <div>预期年化</div></div>
                                        <div>
                                            <div>{val.deadline}</div>
                                            <div>项目期限</div></div>
                                        <div onClick={this.toNian.bind(this,val.url)}>抢购</div>
                                    </div>
                                    <div className="tag">
                                        <img src={require('../../images/V2/index/tag.png')} alt=""/>
                                        {val.bottom_text}
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

Financing.contextTypes = {
    router : React.PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
    return{
        getFinancialByPageData:state.update.getFinancialByPageData
    }
}
export  default    connect(mapStateToProps,{getFinancialByPage})(Financing)