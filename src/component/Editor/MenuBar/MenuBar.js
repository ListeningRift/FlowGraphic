import React from 'react';
import Logo from '../../Logo.png';
import '../../../css/Editor/Menubar.css';

function Separator() {
    return <div style={{ borderTop: "solid #C0C0C0 1px", margin: "3px 2px" }}></div>
}

class Menus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: "none"
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.onHide)
    }

    onShow = promot => {
        this.setState({
            show: promot
        })
    };

    onHide = () => {
        this.setState({
            show: "none"
        })
    };

    stopEvent = e => {
        e.nativeEvent.stopImmediatePropagation();
    };

    render() {
        return (
        <div id="menus">
            <div className="menu">
                <div className="menutitle"
                     onMouseMove={() => this.onShow("文件")}
                     style={ this.state.show === "文件" ?
                         { backgroundColor: "#E7EAED", color: "black"} : null }>文件</div>
                {this.state.show === "文件" ? (
                    <div className="menulist" onClick={this.stopEvent}>
                        <div className="menuitem">新建动画</div>
                        <div className="menuitem">打开动画</div>
                        <div className="menuitem">保存</div>
                        <div className="menuitem">另存为</div>
                    </div>
                ) : null}
            </div>
            <div className="menu">
                <div className="menutitle"
                     onMouseMove={() => this.onShow("编辑")}
                     style={ this.state.show === "编辑" ?
                         { backgroundColor: "#E7EAED", color: "black"} : null }>编辑</div>
                {this.state.show === "编辑" ? (
                    <div className="menulist" onClick={this.stopEvent}>
                        <div className="menuitem">复制并粘贴</div>
                        <div className="menuitem">删除</div>
                        <div className="menuitem">清空</div>
                        <Separator/>
                        <div className="menuitem">合并</div>
                        <div className="menuitem">解除合并</div>
                        <div className="menuitem">导入图形</div>
                    </div>
                ) : null}
            </div>
            <div className="menu">
                <div className="menutitle"
                     onMouseMove={() => this.onShow("视图")}
                     style={ this.state.show === "视图" ?
                         { backgroundColor: "#E7EAED", color: "black"} : null }>视图</div>
                {this.state.show === "视图" ? (
                    <div className="menulist" onClick={this.stopEvent}>
                        <div className="menuitem">输出源代码</div>
                        <Separator/>
                        <div className="menuitem">添加新动作</div>
                    </div>
                ) : null}
            </div>
            <a href="https://editor.method.ac/" target="_blank" rel="noopener noreferrer"
               style={{ extDecoration: "none" }}>
                <div className="menu" style={{ width: "100px" }}>
                    <div className="menutitle">
                        SVG编辑器
                    </div>
                </div>
            </a>
        </div>
    )}
}

function MenuBar() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div id="logo"
                 style={{ width: "200px", height: "32.5px", position: "absolute", left: "5px" }}>
                <img src={Logo} alt="" style={{ width: "100%", height: "100%" }}/>
            </div>
            <Menus/>
        </div>
    )
}

export default MenuBar;