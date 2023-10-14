import { Menu } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './categoryHeader.scss';
import { ChevronButtonIcon } from '../../assets/svgs';

let scroll = 160;
const CategoryHeader = ({
  data,
  onclick,
  activeCount = 0,
  innerTab,
  activeFilters,
  showCategoryHeaders,
  onApplyFilters = () => {},
  ...props
}) => {
  const ref = useRef(null);
  const [current, setCurrent] = useState(data[0]?.name?.toLowerCase());
  const [slideLeft, setSlideLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    resetScroll();
    setSliderWidth(
      document.getElementById('scroller')?.scrollWidth -
        document.getElementById('scroller')?.offsetWidth
    );
  }, [innerTab]);
  useEffect(() => {
    setCurrent(activeFilters?.category__in || 'all');
  }, [innerTab, activeFilters]);
  const resetScroll = () => {
    document.getElementById('scroller')?.scrollTo(0, 0);
  };

  //on arrow click
  const moveRight = () => {
    const el = document.getElementById(`scroller`);
    setSlideLeft((el.scrollLeft += scroll));
  };

  const moveLeft = () => {
    const el = document.getElementById(`scroller`);
    setSlideLeft((el.scrollLeft -= scroll));
  };

  const onHScroll = () => {
    const el = document.getElementById(`scroller`).scrollLeft;
    setScrollWidth(el);
  };

  const handleClick = (e) => {
    console.log(e.key)
    console.log(activeFilters)
    if (activeFilters.category__in == e.key) {
      onApplyFilters?.({ page: 1, category__in: '' });
    } else {
      let filters = {};
      filters.page = 1;
      filters.city__in = activeFilters.city__in
      filters.category__in = [e.key];
      delete filters.categories;
      delete filters.location;

      onApplyFilters?.(filters);
    }
  };
  if (data?.length === 0) return null;
  return (
    <>
    {showCategoryHeaders && (
    <div className="inner-categoryheader-component">
      <div className="btn">
        {scrollWidth == 0 ? null : (
          <ChevronButtonIcon onClick={moveLeft} className="leftArrow" />
        )}

        {Math.ceil(scrollWidth) >= sliderWidth ? null : (
          <ChevronButtonIcon onClick={moveRight} className="rightArrow" />
        )}

        <div
          ref={ref}
          className="inner-categoryheader flex items-start justify-start"
          id="scroller"
          onScroll={onHScroll}
        >
          <Menu
            style={{ width: '100%' }}
            defaultSelectedKeys={current}
            selectedKeys={current}
            className="menu"
            mode="horizontal"
          >
            <Menu.Item
              key="all"
              onClick={(e) => {
                setCurrent('all');
                let filters = {};
                filters.page = 1;
                filters.city__in = activeFilters.city__in;
                filters.category__in = '';

                delete filters.categories;
                delete filters.location;
                onApplyFilters?.(filters);
              }}
            >
              All
              {'all' === current && (
                <div className={'count-container'}>
                  <span className={'count'}>{activeCount}</span>
                </div>
              )}
            </Menu.Item>
            {data &&
              data.map((label, index) => (
                <Menu.Item
                  onClick={(e) => {
                    setCurrent(label?.id);
                    handleClick(e);
                  }}
                  key={[label?.id]}
                >
                  {label?.name}
                  {label?.id === current && (
                    <div className={'count-container'}>
                      <span className={'count'}>{activeCount}</span>
                    </div>
                  )}
                </Menu.Item>
              ))}
          </Menu>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default CategoryHeader;
