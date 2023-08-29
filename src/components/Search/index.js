import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '../../apiServices/searchServices';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountItem from '../AccountItem';
import { useDebounce } from '../../hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            //trim() xóa khoảng trắng ở đầu và cuối
            setSearchResult([]);
            return;
        }

        // 2. axios
        const fetchApi = async () => {
            setLoading(true); //loading trước khi gọi api

            const result = await searchServices.search(debounced);
            setSearchResult(result);

            setLoading(false); //loading sau khi api gọi xong
        };
        fetchApi();

        //1. fetch
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     //  encodeURIComponent(searchValue) dùng mã hóa ký tự đặc biệt thành hợp lệ trên URL
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setSearchResult(res.data);
        //         setLoading(false); //bỏ loading sau khi gọi api
        //     })
        //     .catch(() => {
        //         setLoading(false); //bỏ loading khi bị lỗi
        //     });
    }, [debounced]); //Khi người dùng gõ vào input => chạy lại useEffect

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            // Không cho người dùng gõ dấu cách đầu tiên
            setSearchValue(searchValue);
        }
    };

    return (
        /*Using a wrapper <div> tag around the reference element solves this 
        by creating a new parentNode context.*/
        <div>
            <HeadlessTippy
                interactive //tippy được tương tác mà không ẩn đi
                visible={showResult && searchResult.length > 0} //Visible là Hiển thị không cần hover
                // Hiển thị khi kết quả tìm kiếm có length > 0
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
                //Bấm ngoài khu vực tippy
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef} //Lấy DOM element
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading-btn')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
