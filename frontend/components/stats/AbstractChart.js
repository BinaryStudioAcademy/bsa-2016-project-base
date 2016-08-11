import React from "react"
import {PropTypes} from "react"
export default class AbstractChart extends React.Component {
    constructor() {
        super()
        this.colors = {get,same,different,index, sameLine};
    }

    static get propTypes() {
        return {}
    }

}

const colors = ["#87A96B","#FFA474","#FAE7B5","#9F8170","#FD7C6E","#000000","#ACE5EE","#1F75FE","#A2A2D0","#6699CC","#0D98BA","#7366BD","#DE5D83","#CB4154","#B4674D","#FF7F49","#EA7E5D","#B0B7C6","#FFFF99","#1CD3A2","#FFAACC","#DD4492","#1DACD6","#BC5D58","#DD9475","#9ACEEB","#FFBCD9","#FDDB6D","#2B6CC4","#EFCDB8","#6E5160","#CEFF1D","#71BC78","#6DAE81","#C364C5","#CC6666","#E7C697","#FCD975","#A8E4A0","#95918C","#1CAC78","#1164B4"];
function get(n){
    return colors.slice(0,n);
}
function index(i){
    return colors[i];
}
function sameLine(data){
    return Object.assign({}, data, {datasets: data.datasets.map((item,i)=>{
        return Object.assign({}, item,{
            backgroundColor: index(i),
            pointBorderColor: index(i),
            borderColor:index(i)
        })
    })});
}
function same(data){
    return Object.assign({}, data, {datasets: data.datasets.map((item,i)=>{
        return Object.assign({}, item,{
            backgroundColor: index(i),
        })
    })});
}
function different(data){
    data.datasets.forEach(data=>{
        data.backgroundColor = get(data.data.length)
    })
}