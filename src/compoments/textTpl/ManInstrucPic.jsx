import  React from 'react';
import  TitleNav from '../plugins/TitleNav/TitleNav';

import {is_weixn,isAppView} from '../common/const';

class  ManInstrucPic extends  React.Component {
    constructor(props){
        super(props);

    }



    render(){
        return(<div style={{height:'100%'}}>
                <title>取现流程</title>
                <TitleNav title="取现流程" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <img src={require('../../images/marRule.jpg')} alt="" style={{width:'100%'}}/>
            </div>
        )
    }
}

ManInstrucPic.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export  default   ManInstrucPic
