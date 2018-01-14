import  React from 'react';
import  {connect}from 'react-redux';
// import  {Link} from 'react-router';
import {getOrderSuccess} from './../redux/action/action';
// import {_assign} from './common/const';
import LoadView from './common/LoadView';
import  TitleNav from './plugins/TitleNav/TitleNav';
// import emApi from  "./common/api";
import {jrLog} from './common/const';

class CardResult extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getOrderSuccess({
            user_id:localStorage.user_id,
            order_no:localStorage.order_id,
            token:localStorage.h5_token
        });
        localStorage.amount="";
    }
    toIndex(){
        jrLog('kamao_shuaka_ok_21');
        this.props.history.push('/encashment/swiperCard?institution_id=21');//传递是否有积分的参数
    }

    render() {
        let {orderSuccessData} = this.props;
        if ((orderSuccessData == 'NOLOAD' || orderSuccessData == undefined)) {
            return (<LoadView/>)
        }
        return (<div className="cardResult" op={true} opImg={require('./../images/concat.png')}>
                <title>取现成功</title>
                <TitleNav title="取现成功" preUrl="/encashment"></TitleNav>
                <div className="title">
                    <img src={require('./../images/V2/gou@2x.png')} alt=""/>
                   <span>提现成功</span>
                </div>
                <div className="list">
                    {orderSuccessData.cash_list.map((val,index)=>{
                      return(
                          <div className="flex"><span>{val.name}</span><span>{val.content}</span></div>
                          )
                    })}

                </div>
                <div className="desc">
                    <div>
                        <div>温馨提示：</div>
                        <div>{orderSuccessData.tip}</div>
                    </div>
                </div>
                <div className="confirm">
                    <a href="javascript:;" className="btn submigtBtn" onClick={this.toIndex.bind(this)} >返回首页</a>
                </div>
            </div>
        )

    }
}

CardResult.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        orderSuccessData: state.update.orderSuccessData
    }
}
export default connect(mapStateToProps, {getOrderSuccess})(CardResult)