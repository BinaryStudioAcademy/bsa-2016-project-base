## Code Example


View for edit project technologies

```javascript
import AddTechnologieView from "./AddTechnologieView"

<AddTechnologieView
    techs={[
     	 {_id: 1,techName:"ReactJs", techDescription:"WEB"},
     	 {_id: 2,techName:"HTML", techDescription:"WEB"},
     	 {_id: 3,techName:"Ruby", techDescription:"Backend"}
    ]}
    selectedTechsModified={(techs)=>{console.log(`new selected techs `, techs)}}

    failedLoadGlobalTechs={(err)=>console.log(`failed load techs from server cos ${err}`)}
    startLoadGlobalTechs={()=>console.log(`start load global techs`)}
    successfullyLoadGlobalTechs={()=>console.log(`global techs loaded successfully`)}

    failedAddNewTech={(err=>console.log(`failed add new tech cos ${err}`))}
    startAddNewTech={()=>console.log(`start add new tech`)}
    successfullyAddNewTech={()=>console.log(`successfully add new tech`)}/>
```

View for see only project technologies (can take onSelectListener)

```javascript
import BacisTechnologieView from "./BacisTechnologieView"

<BacisTechnologieView
    techs={[
     	{_id: 1,techName:"ReactJs", techDescription:"WEB"},
     	{_id: 2,techName:"HTML", techDescription:"WEB"},
     	{_id: 3,techName:"Ruby", techDescription:"Backend"}
    ]}
    selectTech={(tech)=>{console.log(`selected tech `, tech)}}
/>
```
