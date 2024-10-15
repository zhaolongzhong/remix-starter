// app/ui/MenuToggleButton.tsx
export type ToggleButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  position: string;
};

const MenuToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  onClick,
  position,
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed ${position} z-50 -mt-2  focus:outline-none`}
      aria-label="Toggle Side Panel"
      aria-expanded={isOpen}
    >
      <svg
        className="w-6 h-6 text-gray-700 dark:text-gray-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          // Close Icon
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          // Hamburger Icon
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};
export default MenuToggleButton;
