import  React from 'react';
// import  Vue from 'vue';
import './../style/test.less';
// import  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TweenOne from 'rc-tween-one';
var Animate = require('rc-animate');
var TweenOneGroup = TweenOne.TweenOneGroup;
import BannerAnim, {Element} from 'rc-banner-anim';
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
class Test extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // new Vue({
        //     el: '#v',
        //     data: {
        //         message: 'Hello Vue.js!'
        //     }
        // })
        function curry(func) {
            var args = Array.prototype.slice.call(arguments,1);
            return function() {
              var  innerArgs =  Array.prototype.concat(arguments);
              var finalArgs = args.concat(innerArgs);
                return func.apply(null, finalArgs);
            };
        }
        function add(n1,n2) {
            return n1+ n2 ;
        }
        var currid = curry(add,5);
        console.log(currid(3));
        curry((add(),5),3)
    }

    move() {
        console.log("s");
    }

    render() {
        let items = ['xxxxx', 'yyyyy', 'zzzzz', 'xxxxx', 'yyyyy', 'zzzzz'];
        return (<div className="test">
                <title>测试页面</title>
                {/*<div className="c3"></div>*/}
<title>测试页面</title>
                <div className="content">
                    <TweenOne
                        animation={{
                            top: -items.length * 20 + 'px',
                            repeat: -1,
                            duration: items.length * 1000,
                            repeatDelay: 0
                        }}
                        className="box">
                        {items.map((val, index) => {
                            return <div key={index}>{val}</div>
                        })}
                    </TweenOne>
                </div>
                <BannerAnim autoPlay autoPlaySpeed={3000} dragPlay={false} ease="easeOutBack">
                    <Element key="demo1">
                        <TweenOne animation={{y: -30, type: 'from'}}>Ant Motion Demo</TweenOne>
                    </Element>
                    <Element key="demo2" hideProps={false}>
                        <TweenOne animation={{y: -30, type: 'from'}}>Ant2 Motion Demo</TweenOne>
                    </Element>
                </BannerAnim>
                <div>
                    <button className="type1">
                        test
                    </button>
                    <button className="type2">
                        test2
                    </button>
                    <button className="type3">
                        test3
                    </button>
                </div>

            </div>

        )
    }
}

// Test.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };
export  default   Test