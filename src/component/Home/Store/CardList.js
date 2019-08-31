import React from "react";
import {Col, Pagination, Row} from "antd";
import CoverCard from "../Card/Card";
import '../../../css/Home/Store.css';


class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            message: []
        }
    }

    componentDidMount() {
        let card = {
            title: "年会",
            description: "公司年会使用高级模板"
        };
        let message = new Array(10).fill(card);
        this.setState({
            total: 500,
            message: message
        })
    }

    pageChange = pageNumber => {
        const { page } = this.state;
        let card = {
            title: "年会"+pageNumber.toString(),
            description: "公司年会使用高级模板"
        };
        let message = new Array(10).fill(card);
        this.setState({
            message: message,
            page: pageNumber
        });
    };

    render() {
        const { total, message } = this.state;
        let row = [];
        row[0] = (<Row type="flex" justify="space-around" align="middle" style={{ height: "100%", marginTop: 10 }}>
                { message.slice(0, 5).map(message => (
                <Col xs={{ span: 4 }}>
                    <CoverCard title={message.title} description={message.description}/>
                </Col>))}
            </Row>);
        row[1] = (<Row type="flex" justify="space-around" align="middle" style={{ height: "100%", marginTop: 30 }}>
            { message.slice(5, 10).map(message => (
                <Col xs={{ span: 4 }}>
                    <CoverCard title={message.title} description={message.description}/>
                </Col>))}
        </Row>);
        return (
            <div id="card-list">
                <div id="card-list-title">
                    My Store
                </div>
                <div id="card-list-cards">
                    { row }
                </div>
                <div id="card-list-pagination">
                    <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={this.pageChange} />
                </div>
            </div>
        )
    }
}

export default CardList;