import {Tag} from "antd";
import './index.scss'
import {TagCloseButton} from "../../assets/svgs";

export const Tags = ({data = [], dataKey = '', onDeleteTag, labelKey = 'name', ...props}) => {
    if (data?.[dataKey]?.length === 0)
        return null;
    return <div className={'tags'}>
        {
            data?.[dataKey]?.map(tag => {
                return <Tag closable onClose={() => onDeleteTag(dataKey, tag)} closeIcon={<TagCloseButton/>}>
                    <span className={'tag-name'}>
                        {tag?.[labelKey] || tag}
                    </span>
                </Tag>
            })
        }
    </div>
}
