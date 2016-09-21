const initialState = {
    steps: [{
        title: 'Projects page',
        text: 'Page with a list of projects is the section where you can view all existing projects at different stages of development',
        selector: '#project-menuItem',
        position: 'right',
        direction: 'home'
    },{
        title: 'Projects search panel',
        text: 'Еhis section allows you to search for existing projects in advanced mode',
        selector: '.inputs-tool',
        position: 'bottom',
        direction: 'review'
    },{
        title: 'Project review panel',
        text: 'In this section you can generate a text report on existing projects',
        selector: '#review-menuItem',
        position: 'right',
        direction: 'stats'
    },{
        title: 'Statistics',
        text: 'In this section users can view detailed stats on the active/completed projects and technologies used in projects that analyze existing tags',
        selector: '#stats-menuItem',
        position: 'right',
        direction: 'admin'
    },{
        title: 'Admin Panel',
        text: 'The administrative panel is used to update and change information on the technologies, tags and user rights for all existing projects',
        selector: '#admin-menuItem',
        position: 'right',
        direction: 'admin/rights'
    },{
        title: 'Admin: Projects Users Rights',
        text: 'In this section, the administrative panel you can manage (distribute) the rights of the user for all existing projects',
        selector: '.rights-toolBar',
        position: 'bottom',
        direction: 'add-project'//'admin/tags'
    },{
        title: 'Add project page',
        text: 'In this section you can create a new project',
        selector: '#addProject-menuItem',
        position: 'right',
        direction: 'home'
    }],
    index: 0,
    settings:{
        debug: false,
        showOverlay: true,
        showSkipButton: true,
        showStepsProgress: true,
        scrollToFirstStep: true,
        type: "continuous",
        locale:{
            back: 'Back',
            close:'Close',
            last: 'Last',
            next: 'Next',
            skip: 'Skip'
        }
    }
};
initialState.steps.forEach(step=>{step.direction = "projects/"+step.direction});

export default function chartReducer(state = initialState, action) {
    if(action.type == "SET_GUIDE_PROGRESS"){
        return Object.assign({},state,{ index: action['index']});
    }
    return state;
}