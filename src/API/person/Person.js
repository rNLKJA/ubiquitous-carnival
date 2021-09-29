import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import LogoutUser from "../../hooks/useLogout";
import "./person.css"
import { useShowProfile} from "../../BackEndAPI/profileAPI";

const BASE_URL = "https://crm4399.herokuapp.com"

const Person = () => {
    const { loading, profile, error } = useShowProfile();
    const [person, setPerson] = useState({
        firstName: "",
        lastName: "",
        email: [],
        occupation: "",
        phone: [],
    });
    useEffect(() => {
        setPerson(person);
    },[person])




    return (
        <div className="sub-container">
            <div className="person">
                <h1>Personal Information</h1>

                <div className="basicInformation">
                    <h2>Basic Information</h2>
                    <div>
                        <label>First name: </label>
                        <div ondblclick={ShowElement(this)}>{profile.firstName}</div>
                    </div>
                    <div>
                        <label>Given name: </label>
                        {profile.lastName}
                    </div>
                    <div>
                        <label>Occupation: </label>
                        {profile.occupation}
                    </div>
                </div>


                <div className="contactInformation">
                    <h2>Contact Information</h2>
                    <div className="email">
                        <label>email: </label>
                        {profile.email}


                    </div>
                    <div className="phone">
                        <label>Phone: </label>
                        {profile.phone}
                    </div>
                </div>
            </div>

            <button className="btn btn-primary" onClick={LogoutUser}>logout</button>
        </div>
    );

};

export default Person;


function ShowElement(element) {
    var oldhtml = element.innerHTML;
    //创建新的input元素
    var newobj = document.createElement('input');
    //为新增元素添加类型
    newobj.type = 'text';
    //为新增元素添加value值
    newobj.value = oldhtml;
    //为新增元素添加光标离开事件
    newobj.onblur = function() {
        element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
        //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
    }
    //设置该标签的子节点为空
    element.innerHTML = '';
    //添加该标签的子节点，input对象
    element.appendChild(newobj);
    //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
    newobj.setSelectionRange(0, oldhtml.length);
    //设置获得光标
    newobj.focus();
}