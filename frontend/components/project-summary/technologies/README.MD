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
 	addNewTech={tech=>console.log(`add tech to global`, tech)}/>
```

View for see only project technologies (can take onSelectListener)

```javascript
import BacisTechnologieView fro, "./BacisTechnologieView"

<BacisTechnologieView
    techs={[
     	{_id: 1,techName:"ReactJs", techDescription:"WEB"},
     	{_id: 2,techName:"HTML", techDescription:"WEB"},
     	{_id: 3,techName:"Ruby", techDescription:"Backend"}
    ]}
    selectTech={(tech)=>{console.log(`selected tech `, tech)}}
/>
```
