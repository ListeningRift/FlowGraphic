import React from "react";
import { Layout } from "antd";
import SideBar from "../component/Home/SideBar/SideBar";
import '../css/Home/Home.css';
import CardList from '../component/Home/Store/CardList';

const { Sider, Content, Footer } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <div id="home">
                <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <SideBar collapsed={this.state.collapsed}/>
                    </Sider>
                    <Layout>
                        <Content style={{ backgroundColor: "#E7EAED" }}>
                            <CardList/>
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            FlowGraphic, welcome to use!<br/>
                            https://github.com/ListeningRift/FlowGraphic
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Home;