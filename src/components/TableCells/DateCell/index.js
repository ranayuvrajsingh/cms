import './index.scss'
import moment from "moment";

export const DateCell = ({data, format, sortedColumn, ...props}) => {
    return <div className={sortedColumn ? 'sorted' : ''}>
        <p className={'listing-row-text'}>{data && moment(data)?.format(format) || '-'}</p>
    </div>
}
