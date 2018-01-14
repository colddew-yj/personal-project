import  React from 'react';
import  TitleNav from './plugins/TitleNav/TitleNav';
import {is_weixn,isAppView} from './common/const';
class  TempAF extends  React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return(<div className="tempAF">
                <title>取现公告</title>
                <TitleNav title="取现公告" style={isAppView()||is_weixn()?{display:'none'}:{}}/>
                <img src={require('./../images/4@2x.png')} alt="" style={{width:'100%'}}/>
                <div className="content">
                    <div>取现公告</div>
                    <div>因系统调整，暂时不支持取现，
                        </div>
                    <div>请点击首页公告图<span>去网页版</span>取现！</div>
                </div>
            </div>
        )
    }
}

TempAF.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   TempAF
