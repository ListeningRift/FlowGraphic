import React from "react";
import CoverCard from "./Card";
import {Row, Col, Button} from "antd";
import '../../../css/Home/CardField.css';

function CardField(props) {
    return (
        <div className="card_field">
            <div className="card_field_title">
                {props.title}
                <Button type="primary">更多</Button>
            </div>
            <div style={{ height: 240 }}>
                <Row type="flex" justify="space-around" align="middle" style={{ height: "100%" }}>
                    <Col xs={{ span: 4 }}>
                        <CoverCard title="年会" description="公司年会使用高级模板"/>
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <CoverCard title="年会" description="公司年会使用高级模板"/>
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <CoverCard title="年会" description="公司年会使用高级模板"/>
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <CoverCard title="年会" description="公司年会使用高级模板"/>
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <CoverCard title="年会" description="公司年会使用高级模板"/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CardField;