import  React from 'react';
import  {connect}from 'react-redux';
import {getIndex, getBanner, indexRedPoint} from './../redux/action/action';
import LoadView from './common/LoadView';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import BannerAnim, {Element} from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import {PLAT, jrLog,onScroll,curry,throttle} from './common/const';
import {Toast} from 'antd-mobile';
import copy from 'copy-to-clipboard';
class EncashmentIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            closeDownload: false,
            handClose:false
        };

        //首页 底部的下载提示会随滚动隐藏或显示,调用onScroll方法;第一次挂载后,监听滚动操作;离开页面后,必须需要移除监听;监听的函数需在构造方法里作相应绑定
        this.showImg = this.showImg.bind(this);
    }

    componentDidMount() {
        // try{
        // this.props.getIndex();
        window.addEventListener('scroll', this.showImg);
        this.props.getIndex({plat_version: '3.8.0', plat_type: PLAT() == 'ios' ? 32 : 31});//首页基础数据
        this.props.getBanner();//首页banner数据
        this.props.indexRedPoint({//首页消息小红点的接口
            user_id: localStorage.user_id || '',
            token: localStorage.h5_token || ''
        });
        if (typeof(Storage) !== "undefined") {
            try {
                localStorage.amount = "";
                localStorage.channel_id = this.props.location.query.channel_id ? this.props.location.query.channel_id : '';
            } catch (e) {
                alert('请关闭无痕浏览模式或更新、更换浏览器');
            }

        } else {
            alert('请关闭无痕浏览模式或更新、更换浏览器');
        }

        // }catch(e){
        //     alert('无恒');
        // }


    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.showImg);
    }

    concated() {
        this.setState({
            showModal: true
        });
        // event.preventDefault();

    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    renderItem(v) {
        return (
            <div>{v}</div>
        )
    }

    _onImageClick(event) {

        const thisLink = this.props.getBannerData[this._imageGallery.getCurrentIndex()]['ad_link'];
        jrLog('kamao_shouye_banner_2', {banner: thisLink});
        thisLink && (window.location.href = thisLink);
    }

    // toSwiper() {
    //     alert('a');
    //     // this.props.history.push('/encashment/swiperCard');
    //
    //     this.props.history.push('#/encashment/swiperCard');
    // }

    togetCard() {
        jrLog('kamao_shouye_Card_6', {})
        this.props.history.push('/encashment/getCard');
    }

    toQues() {
        this.props.history.push('/encashment/ques');
    }

    toDownload(url) {
        if (PLAT() === 'ios') {
            location.href = IOSPACK;
        } else {
            location.href = ANDROIDPACK;
        }
    }

    recommend() {//去邀请页面   不用
        this.props.history.push('/encashment/recommendTpl');
    }

    toSwiperCard(vip) {//去输入金额页面,两个如何的差别是有无积分
        vip ? jrLog('kamao_shouye_edu_3', {}) : jrLog('kamao_shouye_quxian_1', {});
        localStorage.institution_id = vip ? 22 : 21;  //翰银有无积分的特征
        this.props.history.push('/encashment/swiperCard');

    }

    toInvit() {//去邀请页面
        jrLog('kamao_shouye_PopupInvitingfriends_7');
        this.props.history.push('/encashment/recommend?plat_type=kamaoh5');
    }

    goMine() {//去我的页面
        jrLog('kamao_shouye_my_14');
        Toast.loading('',0);
        this.props.history.push('/encashment/mine');
    }

    goMes() {//去消息页面
        jrLog('kamao_shouye_news_9');
        if (!localStorage.user_id) {
            this.props.history.push('/encashment/login?goBack=1');
            return false;
        }
        this.props.history.push('/encashment/message');
    }

    toFinancial() {//去理财页面  不用
        this.props.history.push('/encashment/finincList');
    }

    toNqa() {//去理财页面  不用
        if (!localStorage.user_id) {
            this.props.history.push('/encashment/login?goBack=1');
        }else{
            this.props.history.push('/encashment/nianqianan');

        }
    }

    copy1() {
        try {
            copy('卡猫99');
            Toast.success('复制成功', 1);
        } catch (e) {
            Toast.info('请长按复制');
        }
    }

    copy2() {
        try {
            copy('卡猫信用卡管家');
            Toast.success('复制成功', 1);
        } catch (e) {
            Toast.info('请长按复制');
        }
    }
    colosX(){
        this.setState({
            closeDownload:true,
            handClose:true
        })
    }
    showImg(){
        if(!this.state.handClose){
            // let mid = curry.call(this,onScroll2,'downloadBtn',false,'180');
            // curry(onScroll2,'downloadBtn',false,'')((isShow)=>{
            //     console.log("s")
            //     if(isShow){
            //         this.setState({
            //             closeDownload: true
            //         })
            //     }else{
            //         this.setState({
            //             closeDownload: false
            //         })
            //     }
            // });
            onScroll('downloadBtn',(isShow)=>{
                if(isShow){
                    this.setState({
                        closeDownload: true
                    })
                }else{
                    this.setState({
                        closeDownload: false
                    })
                }
            })

        }


        // for(var i = 0;i < imgLen; i++){
        //     var curImg = content.children[i].children[0];
        //     if(curImg.offsetTop < seeHeight + srcollTop){
        //         if(curImg.dataset.src != "undefined"){
        //             curImg.setAttribute("src",curImg.dataset.src);
        //         }
        //     }
        // }
    }
    scroll(){

    }

    render() {

        let {getIndexData, getBannerData, indexRedPointData} = this.props;

        if (getIndexData == 'NOLOAD' || getIndexData == undefined || getBannerData == 'NOLOAD' || getBannerData == 'NOLOAD') {
            return (<LoadView/>)
        }
        let slides = [];
        for (let i in getBannerData) {
            let _n = {original: ''};
            _n.original = getBannerData[i].ad_pic;
            // _n.toUrl=getBannerData[i].ad_link;
            slides.push(_n);
        }
        // this.setState({
        //     slides:slides
        // })
        // var slides = [{
        //     original: require("../images/Rectangle5.png")
        // }];
        let descArr = getIndexData.note.note_list;
        // let _desc = [];
        let list = getIndexData.block_list;
        let financial = getIndexData.financial ? getIndexData.financial.financial_list[0] : [];
        // for(let i in descArr){
        //     _desc.push({'renderThumbInner':(descArr[i])});
        // }
        let _downLoadUrl = PLAT()==='ios'?IOSPACK
            :ANDROIDPACK;

        return (<div className="encashmentIndex">
                <title>卡猫</title>
                <div className="head">
                    <div className="headContent">
                        <div className="flex">
                            <span onClick={this.goMine.bind(this)}><img
                                src={require('./../images/V2/index/More@2x.png')} alt=""/></span>
                            <span onClick={this.goMes.bind(this)}>
                                 <img src={indexRedPointData !== 'NOLOAD' && indexRedPointData.message_point === 1 ?
                                     require('./../images/V2/index/icon_news@2x.png') :
                                     require('./../images/V2/index/Line@2x.png')
                                 } alt=""/>
                             </span>
                        </div>
                        <div className="flex">
                            <div onClick={this.toSwiperCard.bind(this, '')}><img
                                src={require('./../images/V2/index/shou.png')} alt=""/>
                                <div className="text">刷卡收款</div>
                            </div>
                            <div onClick={this.togetCard.bind(this)}><img
                                src={require('./../images/V2/index/credit.png')} alt=""/>
                                <div className="text">办信用卡</div>
                            </div>
                        </div>
                    </div>
                    <div className="barText">
                        <img src={require('./../images/V2/index/Shape@1x.png')} alt=""/>
                        <BannerAnim autoPlay autoPlaySpeed={3000} dragPlay={false} ease="easeOutBack"
                                    className="notice-bar">
                            {
                                descArr.map((val, index) => {
                                    return ( <Element key={index}>
                                        <TweenOne animation={{y: -30, type: 'from'}}>{val}</TweenOne>
                                    </Element>)
                                })
                            }
                        </BannerAnim>
                    </div>

                </div>
                <div className="content">
                    <div className="item">
                        <div className="flex act" onClick={this.toInvit.bind(this)}>
                            <div><img src={require('./../images/V2/index/ban1.png')} alt=""/></div>
                            <div className="desc">
                                <div>邀请好友送现金</div>
                                <div>TA一直取现，您就一直赚钱</div>
                                <div >点击立即邀请 ></div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="flex act act-2">
                            <div className="desc">
                                <div>VIP专区</div>
                                <div>信用卡提额养卡</div>
                            </div>
                            <div><img src={require('./../images/V2/index/1@2x.png')} alt=""/></div>
                        </div>
                        <div className="improve">
                            <div>
                                <button onClick={this.toSwiperCard.bind(this, 'vip')}>现在提额</button>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <ImageGallery onClick={this._onImageClick.bind(this)} ref={i => this._imageGallery = i}
                                      items={slides}
                                      slideInterval={3000} showPlayButton={false}
                                      showBullets={slides.length > 1 ? true : false} showThumbnails={false}
                                      autoPlay={true} showNav={false} showFullscreenButton={false}/>

                    </div>
                    {/*目前下架理财相关,但不可直接删除*/}
                    {/*<div className="item">*/}
                        {/*<div className="title"><span>什么值得投</span></div>*/}
                        {/*<div className="financial">*/}
                            {/*<div className="desc">*/}
                                {/*<span>明星产品</span><span>{financial.org_name}</span><span>{financial.org_des}</span>*/}
                            {/*</div>*/}
                            {/*<div className="content flex">*/}
                                {/*<div>*/}
                                    {/*<div><span>{financial.rate}</span>%</div>*/}
                                    {/*<div>预期年化</div>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                    {/*<div>{financial.deadline}</div>*/}
                                    {/*<div>项目期限</div>*/}
                                {/*</div>*/}
                                {/*<div onClick={this.toNqa.bind(this)}>抢购</div>*/}
                            {/*</div>*/}
                            {/*<div className="tag">*/}
                                {/*<img src={require('./../images/V2/index/tag.png')} alt=""/>*/}
                                {/*{financial.bottom_text}*/}
                            {/*</div>*/}
                            {/*<div className="more" onClick={this.toFinancial.bind(this)}>*/}
                                {/*点击查看更多理财产品*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <div className="item">
                        <div className="flex download">
                            <div><span><img src={require('./../images/V2/icon_weixin@2x.png')} alt=""/>微信公众号: <span
                                className="copy" onClick={this.copy1.bind(this)}>卡猫99</span></span></div>
                            <div><span><img src={require('./../images/V2/index/kamao.png')} alt=""/>微信小程序: <span
                                className="copy" onClick={this.copy2.bind(this)}>卡猫信用卡管家</span> </span></div>

                        </div>
                        <div className="button"  id="downloadBtn">
                            <div>
                                <button onClick={this.toDownload.bind(this)}>下载卡猫APP，信用卡取现分分钟搞定</button>
                            </div>
                            <div>Copyright@2010-2020 厦门融到金融信息服务有限公司</div>
                        </div>
                    </div>
                </div>
                <div className="downloadNav" style={ this.state.closeDownload ? {display: 'none'} : {display: 'block'}}>
                    <div className="content flex">
                        <img className="icon" src={require('./../images/V2/kamaoBlue.png')} alt=""/>
                        <div>下载卡猫App，信用卡取现分分钟搞定</div>
                        <div>
                            <button className="btn" type="button" onClick={this.toDownload.bind(this)}>下载
                            </button>
                            <img src={require('./../images/V2/icon_close@2x(1).png')} onClick={this.colosX.bind(this)}/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

EncashmentIndex.contextTypes = {
    router: React.PropTypes.object.isRequired
};
//映射reducer里的state
const mapStateToProps = (state) => {
    return {
        getIndexData: state.update.getIndexData,
        getBannerData: state.update.getBannerData,
        indexRedPointData: state.update.indexRedPointData
    }
}
export default connect(mapStateToProps, {getIndex, getBanner, indexRedPoint})(EncashmentIndex)
