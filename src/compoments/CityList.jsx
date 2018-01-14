import  React from 'react';
import  { connect }from 'react-redux';
// import  {Link} from 'react-router';
import {fetchPost,fetchGet} from 'jrbasic';
import  TitleNav from './plugins/TitleNav/TitleNav';
import {cityList} from './../redux/action/action';
import LoadView from './common/LoadView';
import {is_weixn,isAppView} from './common/const';
import { SearchBar} from 'antd-mobile';
class  CityList extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            list : [],
            init :true,
            localCity:'杭州市'
        }
    }
    componentDidMount(){
        this.props.cityList({type:this.props.location.query.type});
        let that = this
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                that.setState({
                    localCity:r.address.city
                });
            }
            else {
                that.setState({
                    localCity:'定位失败,请手动选择城市'
                });
                alert('failed'+this.getStatus());
            }
        },{enableHighAccuracy: true})
    }
    setCity(val){
        console.log(val);
        localStorage.localCity=val.name;
        localStorage.city_id =val.city_id;
        this.props.history.goBack();
    }
    setLocalcity(){
        let local='';
        this.props.cityListData.map((val)=>{
            if(~this.state.localCity.indexOf(val.name) && val.phoneticize.substr(0,1)!=='#'){
                local=val;
            }
        });
        console.log("s:"+this.state.localCity);
        console.log(local);
        localStorage.localCity=local.name;
        localStorage.city_id =local.city_id;
        this.props.history.goBack();
    }

    getList(data){
        // console.log(data);
        let wordList = [];
        let hotList  = [];
        data.map((val,index)=>{
            let _w = val.phoneticize.substr(0,1);
            if(_w==='#'){
                hotList.push(val);
               // data.splice(index,1);

            }
        });

        data.map((val)=>{
            let _w = val.phoneticize.substr(0,1);
            // console.log(_w);
            if(!~wordList.indexOf(_w)){
                wordList.push(_w);
            }

        })
        if(data.length!==0){
            return(
                <div>
                    <div className="localCity">
                        <div>定位城市</div>
                        <div onClick={this.setLocalcity.bind(this)}>{this.state.localCity}</div>
                    </div>
                    <div className="list" style={{display:data.length!==0?'block':'none'}}>
                        <div className="hotTitle">国内热门城市</div>
                        <div className="hot">

                            {
                                hotList.map((ele,i)=>{
                                    return(
                                        <div onClick={this.setCity.bind(this,ele)}>
                                            {ele.name}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {
                            wordList.map((ele,i)=>{
                                return(
                                    <div >
                                        <div className="word" style={ele==='#'?{display:'none'}:{}}>{ele.toUpperCase()}</div>
                                        {data.map((val,index)=>{
                                            return <div className="item" key={index} style={ele===val.phoneticize.substr(0,1)?(val.phoneticize.substr(0,1)==='#'?{display:'none'}:{}):{display:'none'}}
                                                        onClick={this.setCity.bind(this,val)}>
                                                <span> {val.name}</span>
                                            </div>
                                        })}
                                    </div>
                                    )
                            })
                        }


                    </div>
                </div>
            )
        }else{
            return(
                <div className="noData flex" style={{display:data.length===0?'block':'none'}}>
                    {/*<div>*/}
                        {/*<div>定位城市</div>*/}
                        {/*<div>{this.state.localCity}</div>*/}
                    {/*</div>*/}
                    <div>没有找到，请换个试试</div>
                </div>
            )
        }

    }
    search(e){
        let {cityListData }=this.props;
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        let _data = [];
        if(reg.test(e)){
            console.log(1);
            //是中文
            cityListData.map((val)=>{
                if(~val.name.indexOf(e)){
                    _data.push(val);
                }
            })
        }else{
            cityListData.map((val)=>{
                if(~val.phoneticize.indexOf(e)){
                    _data.push(val);
                }
            })
        }
        this.setState({
            list:_data,
            init:false
        })
    }
    render(){
        let {cityListData }=this.props;
        if(cityListData==='NOLOAD' || cityListData == undefined){
            return <LoadView/>
        }

        return(<div className="cityListCount">
                <title>定位</title>
                <TitleNav title="定位" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <div className="search">
                    <SearchBar placeholder="输入城市名称或全拼" maxLength={5} onChange={this.search.bind(this)}/>
                </div>

                {this.getList(this.state.list.length!==0?this.state.list:this.state.init?cityListData:this.state.list)}
            </div>
        )
    }
}

CityList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps=(state)=>{
    return{
        cityListData:state.update.cityListData
    }
}
export default connect(mapStateToProps,{cityList})(CityList)