import React from 'react'
import { Form, Input, Button} from 'antd';
import axios from 'axios'
class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType ,articleID) => {
        // event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        switch( requestType){
            case 'post':
                axios.post('http://ec2-54-180-8-64.ap-northeast-2.compute.amazonaws.com:8000/api/',{
                    title: title,
                    content: content
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
                break;
            case 'put':
                axios.put(`http://ec2-54-180-8-64.ap-northeast-2.compute.amazonaws.com:8000/api/${articleID}`,{
                    title: title,
                    content: content
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
                break;
            default:
        }
    }
    render() {
        return (
        <div>
            <Form onSubmit={(event) => this.handleFormSubmit(
                event,
                this.props.requestType,
                this.props.articleID)}>
            <Form.Item label="title">
                <Input name="title" placeholder="put a title here" />
            </Form.Item>
            <Form.Item label="Content">
                <Input name="content" placeholder="put a title Content" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
            </Form.Item>
            </Form>
        </div>
        );
    }
}

export default CustomForm