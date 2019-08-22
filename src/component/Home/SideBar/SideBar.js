import React from "react";
import 'antd/dist/antd.css';
import '../../../css/Home/SideBar.css';
import { Menu, Icon } from "antd";
import Logo from '../../Logo.png'

const { SubMenu } = Menu;

function SideBar(props) {
    return (
        <div id="sidebar">
            <div id="logo"
                 style={{ width: "200px", height: "32.5px", position: "absolute", left: "5px", top: "5px" }}>
                <img src={Logo} alt="" style={{ width: "100%", height: "100%" }}/>
            </div>
            <Menu theme="dark" mode="inline">
                <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">Home</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="bank" />
                            <span>Store</span>
                        </span>
                    }
                >
                    <Menu.Item key="2">FG</Menu.Item>
                    <Menu.Item key="3">Animation</Menu.Item>
                    <Menu.Item key="4">Group (In Development)</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="edit" />
                            <span>Editor</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">New FG</Menu.Item>
                    <Menu.Item key="6">Open FG</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                            <Icon type="tool" />
                            <span>Tool</span>
                        </span>
                    }
                >
                    <Menu.Item key="7">Animation Editor</Menu.Item>
                    <Menu.Item key="8">Group Editor (In Development)</Menu.Item>
                </SubMenu>

            </Menu>
        </div>
    )
}

export default SideBar;