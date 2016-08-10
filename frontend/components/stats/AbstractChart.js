import React from "react"
import {PropTypes} from "react"
export default class AbstractChart extends React.Component {
    constructor() {
        super()
        this.nameMap = this.nameMap.bind(this)
        this.valueMap = this.valueMap.bind(this)
    }

    static get propTypes() {
        return {}
    }
    nameMap(item){
        return item.name;
    }
    valueMap(item) {
        return item.value;
    }
    generateChartSeries(data, itemToName = (item)=>{return item.name}){
        return data.map(item=>{
            return {
                field: item.name,
                name: itemToName(item)
            }
        })
    }
    prepareData(data){
        let result = [];
        if (!data) return result
        for (let i = 0; i < data.names.length; i+=1){
            result.push({
                name:data.names[i],
                value:data.values[i]
            })
        }
        return result
    }
}