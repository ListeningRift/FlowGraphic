import React from "react";
import { Card, Icon } from "antd";

const { Meta } = Card;

function CoverCard(props) {
    return (
        <Card
            style={{ width: "14vw" }}
            bodyStyle={{ padding: 10, height: 65 }}
            cover={
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                    style={{ height: "14vh", background: "yellow" }}
                />
            }
            actions={[
                <Icon type="star" key="Collect" />,
                <Icon type="edit" key="Edit" />,
                <Icon type="eye" key="Preview" />,
            ]}
        >
            <Meta
                style={{ height: 40 }}
                title={props.title}
                description={props.description}
            />
        </Card>
    )
}

export default CoverCard;