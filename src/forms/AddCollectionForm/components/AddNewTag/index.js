import {Button, Input} from "antd";
import './index.scss'

export const AddNewTag = () => {
    return <div className={'add-new-tag-container'}>
        <Input placeholder={'Enter new tag here'}/>
        <Button
            className=""
            type="primary"
            htmlType="submit"
        >
            Add Tag
        </Button>
    </div>
}
