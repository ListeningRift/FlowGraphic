import React from "react";
import { Layout } from "antd";
import SideBar from "./SideBar/SideBar";
import '../../css/Home/Home.css';

const { Sider, Header, Content, Footer } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
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
                        <SideBar/>
                    </Sider>
                    <Layout>
                        <Header>
                            2
                        </Header>
                        <Content>
                            3
                        </Content>
                        <Footer>
                            4
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Home;