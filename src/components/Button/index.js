import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text= false,
    rounded=false,
    disabled=false,
    small = false,
    large = false,    
    children,
    className, //thêm prop className dùng để đặt className => custom riêng 
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    // passProps là những props pass thêm vào
    //Các tình huống tương tác với nút
    // to: link nội bộ
    // href: link bên ngoài

    // Các loại button: primary, outline
    // Các size button: small, medium, large
    // (mặc định là medium khi không truyền prop)
    let Comp = 'button';

    const props = {        
        onClick,
        ...passProps,
    };

    // remove event listener when btn is disabled
    if(disabled){
        // Cách 1 (chỉ xóa props onClick)
        // delete props.onClick
        // Cách 2
        Object.keys(props).forEach(key =>{
            if(key.startsWith('on') && typeof props[key] === 'function') 
            //sự kiện bắt đầu bằng on và typeof là hàm => là lắng nghe sự kiện        
        {
            delete props[key]
        }

        })
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className] :className, //khi có className sẽ lấy value của className
        primary,
        // Nếu có truyền primary vào button, primary sẽ được thêm vào className của <Comp>
        outline,
        text,
        rounded,
        disabled,
        small,
        large,            
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {/* Sử dụng span trong button để khi thêm icon sẽ dễ xử lý */}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
