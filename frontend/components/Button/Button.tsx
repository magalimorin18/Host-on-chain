interface Props {
  title: string;
  onClick: () => void;
  style?: string;
}

const Button: React.FC<Props> = ({ title, onClick, style }) => {
  if (style) {
    return (
      <button className={style} type="button" onClick={onClick}>
        {title}
      </button>
    );
  }

  return (
    <button
      className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent"
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
