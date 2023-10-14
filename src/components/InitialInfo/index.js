import { ConsoleSqlOutlined } from '@ant-design/icons';
import { Button} from 'antd';
import  './index.scss';


const InitialInfo = ({activeDataCount, innerTab,onClickAdd, ...props  }) => {
  

return(
<div className='pl-40 pr-40 pb-10 sub-nav'>
        
        <div className='pl-40 pr-40 pb-10 sub-nav-left'>
          <div className='sub-nav-left-item1'>All {activeDataCount}</div>
          {/* <div className='sub-nav-left-item1'>Active 248</div>
          <div className='sub-nav-left-item1'>InActive 798</div> */}
        </div>
        {innerTab!=='users' &&
        <div className='pl-40 pr-40 pb-10 sub-nav-right'>
          <Button
            onClick={onClickAdd}
            type="primary"
            className={["square-button-another"]}
          >
            +ADD
          {/* + Add {ctaLabel} */}
          </Button> 
        </div>
}
</div>
);
};

// const mapStateToProps = ({ users }) => ({ users });

// const mapDispatchToProps = (dispatch) => null;

// export default connect(mapStateToProps, mapDispatchToProps)(InitialInfo);

export default InitialInfo;