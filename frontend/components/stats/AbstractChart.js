import React from "react"
import {PropTypes} from "react"
import colors from "./colors"
export default class AbstractChart extends React.Component {
    constructor() {
        super()
        this.colors = {get,same,different,index, sameLine};
    }

    static get propTypes() {
        return {}
    }
}

function get(n){
    return colors.slice(0,n);
}
function index(i){
    return colors[i];
}
function sameLine(data){
    return Object.assign({}, data, {datasets: data.datasets.map((item,i)=>{
        return Object.assign({}, item,{
            backgroundColor: index(i).background,
            borderColor:index(i)["border-color"],
            pointBorderColor: index(i).background,
        })
    })});
}
function same(data){
    return Object.assign({}, data, {datasets: data.datasets.map((item,i)=>{
        return Object.assign({}, item,{
            backgroundColor: index(i).background,
            borderColor:index(i)["border-color"],
        })
    })});
}
function different(data){
    data.datasets.forEach(data=>{
        data.backgroundColor = get(data.data.length).map(color=>color.background)
        data.borderColor = get(data.data.length).map(color=>color["border-color"])
    })
}