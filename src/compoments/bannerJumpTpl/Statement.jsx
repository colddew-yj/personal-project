import  React from 'react';
import  TitleNav from '../plugins/TitleNav/TitleNav';
import {is_weixn,isAppView} from './../common/const';
class  Statement extends  React.Component {
    // componentDidMount(){
    //     alert(!isAppView());
    // }


    render(){
        return(<div className="statement">
                <title >免责声明</title>
                <TitleNav title="免责声明" style={isAppView()||is_weixn()?{display:'none'}:{}}/>

                <div className="list">
                    <div className="title"> *风险提示：</div>
                    <div className="content">

                        理财有风险，投资需谨慎。投资者投资不同的理财产品将获得不同的收益预期，也将承担不同程度的风险。投资过程中，可能无法获得预期的收益，甚至无法收回投资成本。P2P等互联网金融理财产品在您投资过程中并不能确保您的本金、收益安全，请您认真阅读理财产品的相关说明，了解产品特点，并根据自身风险承受能力谨慎选择，理智投资。

                    </div>
                    <div className="title"> *免责声明：</div>
                   <div className="content">

                       卡猫所发布的产品信息仅供参考，卡猫尽力严谨处理本软件所载资料，但并不就其准确性作出保证。卡猫不对数据的错误或遗漏承担责任。 卡猫仅作为信息展示平台，与理财平台无任何关联关系，对理财行为的未来效果、收益或其它相关情况不作出任何保证性承诺。若因发布广告内容不实所造成的法律及相关责任，由第三方理财平台自行承担。投资前请慎重考虑平台信用、投资项目的真实性、可行性等因素。用户如因投资发生争议，请与该平台进行沟通交涉。

                   </div>
                    <div className="title">   *收益说明：</div>
                    <div className="content">

                        本页面所有预期收益（包括但不限于返利、商家返利、投资预期收益等）仅供参考，不做任何保证性承诺。一般情况下，投资的未来效果、收益以及与其相关的情况都受到复杂的市场环境、管理人自身能力等诸多因素影响，有时候还受到国家宏观调控的影响，具有不确定性。

                    </div>

                    </div>


            </div>
        )
    }
}

export  default   Statement