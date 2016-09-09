/* general */
import React from 'react';
import cookies from 'react-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* actions */
import * as authActions from '../actions/UserAuthActions';
import * as guideActions from '../actions/appGuideActions';

/* styles */
import styles from './app.sass';

/* icons */
import FaIntro from 'react-icons/lib/fa/blind';
import FaList from 'react-icons/lib/fa/list';
import FaExit from 'react-icons/lib/fa/sign-out';
import FaUser from 'react-icons/lib/fa/user-secret';

/* components */
import Joyride from 'react-joyride';
import MenuItem from 'material-ui/MenuItem';
import Navbar from '../components/navbar/Navbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import NotFound from '../components/not-found/NotFound';

injectTapEventPlugin();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.onExit = this.onExit.bind(this);
        this.startGuide = this.startGuide.bind(this);
        this.onGuideProgress = this.onGuideProgress.bind(this);
        this.onGuidePageByIndex = this.onGuidePageByIndex.bind(this);
    }

    componentWillMount(){
        this.props.setAuthUser(
            cookies.load('userEmail'),
            cookies.load('userRole')
       );
    }

    startGuide(){
        browserHistory.push('/' + this.props['guideData'].steps[0].direction);                      
        this.refs['joyride'].reset(true);
        this.refs['joyride'].start(true);
    }

    onGuidePageByIndex(index){
        let direction = index;
        this.props.setGuideProgress(index);
        if(!direction) direction = this.props['guideData'].steps['length'];
        direction = this.props['guideData'].steps[direction - 1].direction;
        if(direction != window['location']) browserHistory.push('/' + direction);
        this.refs['joyride'].start(true);
        this.refs['joyride'].setState({index : index}); //?
   }

    onGuideProgress(data){
        let index = 0;
        if(data['action'] == 'next' || data['action'] == 'back'){
            let progress = this.refs['joyride'].getProgress();
            if(progress['index'] != this.props['guideData'].steps['length'])  
                index = progress['index'];            
            if(data.step && data.step['direction'] != window['location'])
                browserHistory.push('/' + data.step['direction']);
        }
        this.props.setGuideProgress(index);     
    }

    onExit(){
        cookies.remove('x-access-token');
        cookies.remove('userEmail');
        cookies.remove('userRole');
        window.location.assign("http://localhost:2020/"); //?
    }

    render() {
        let menuStepsItems = new Array(),
            children = this.props['children'],
            {settings, steps, index} = this.props['guideData'],
        	title = this.props['children'].props['route'].title;

        if(this.props.authUser['userRole']!= 'ADMIN'){
        	children = [];
            React.Children.forEach(this.props.children, function(child, i) {
                if(child.type['name'].toLowerCase().indexOf('admin') == -1)
                	children.push( <div key={i}>{child}</div>);
                else children.push(<NotFound key={i} />);
            });
        }

        for(let i in steps)   menuStepsItems.push(
            <MenuItem key={i} value={steps[i].selector} 
                style={{
                    backgroundColor: "white", 
                    webkitAppearance: "none"
                }} primaryText={steps[i].title} 
            />
        );

        return (
            <div id={styles["app-container"]}>
            	<Joyride ref="joyride" steps={steps} 
                    callback={this.onGuideProgress}
                    debug={true}
                    type={settings['type']} 
            		locale={settings['locale']}
                    showOverlay={settings['showOverlay']}
                    scrollToFirstStep={settings['scrollToFirstStep']}
		            showStepsProgress={settings['showStepsProgress']}
			    />
                <div className={styles.row}>
                    <Navbar />
                    <div id={styles["main-content"]}>
                        <div className={styles.row}>
                            <div className={styles['main-header']}>
                            	<div>
	                                <FaList size={20} />
	                                <span>{title}</span>
	                            </div>
	                            <div>    
                                	<FaIntro size={20} onClick={this.startGuide}/>
                                	<span onClick={this.startGuide}> Intro guide </span>
                                    <MuiThemeProvider>
                                        <DropDownMenu value={steps[index].selector}
                                            onChange={(e,i)=>{                           
                                            this.onGuidePageByIndex(i);
                                        }}>{menuStepsItems}</DropDownMenu>
                                    </MuiThemeProvider>
                                </div>
                                <FaExit size={20}  onClick={this.onExit}/>
                            </div>
                            {children}
							<ReduxToastr timeOut={3000} newestOnTop={true} position="bottom-left"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign({},
            authActions,
            guideActions
        ), dispatch);
}

function mapStateToProps(state) {
    return {
     	authUser: state['UserAuthReducer'],
     	guideData: state['AppGuideReducer']
    };
}

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppConnected;

