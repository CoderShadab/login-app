import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void;
    title: string;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick,
    title
}) => {
    return (
        <button
            type='button'
            title={title}
            onClick={onClick}
            className='
                inline-flex
                w-full
                justify-center
                rounded-md
                bg-white
                px-4
                py-2
                text-gray-500
                hover:text-gray-700
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                hover:bg-gray-50
                focus:outline-offset-0
            '
        >
            <Icon size={20} />
        </button>
    );
}

export default AuthSocialButton;