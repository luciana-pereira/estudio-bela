interface LinkProps {
    id?: number;
    isActive: boolean;
    onClick: (id: number | undefined) => void;
    children: string;
}

const SelectionLink: React.FC<LinkProps> = ({ id, isActive, onClick, children }) => {
    const handleClick = () => {
        onClick(id);
    };

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            href="#"
            onClick={handleClick}
            style={{
                color: isActive ? '#4a41f8' : '#A4A4A4',
                border: isActive ? '1px solid #4a41f8' : '1px solid #a4a4a478',
            }}
        >
            {children}
        </a>
    )
}

export default SelectionLink;