import './index.scss'

export const ColorCell = ({data, sortedColumn, isBold, backgroundColor, ...props}) => {
    return <div className={sortedColumn ? 'sorted' : ''}>
        <div className={['listing-row', isBold && 'bold'].join('')} style={{backgroundColor}}>
            <div className={'color-square'} style={{backgroundColor: data}}/>
            <p className={'listing-row-text'}>{data || '-'}</p>
        </div>
    </div>
}
