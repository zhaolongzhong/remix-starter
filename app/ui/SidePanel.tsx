// app/ui/SidePanel.tsx
import React from "react";
import { Link } from "@remix-run/react";
import MenuToggleButton from "./MenuToggleButton";
import type { ToggleButtonProps } from "./MenuToggleButton";

interface LinkItem {
  id: string;
  text: string;
  to: string;
}

interface SidePanelProps extends ToggleButtonProps {
  links?: LinkItem[];
  title?: string;
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClick,
  position,
  title = "Menu",
  links = [], // Use default empty array if links prop is not provided
}) => {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-full p-4 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <MenuToggleButton
          isOpen={isOpen}
          onClick={onClick}
          position={position}
        />
      </div>
      <nav className="flex-1 flex flex-col">
        {links.length > 0 ? (
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all duration-200 text-gray-800 dark:text-gray-200"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500 dark:text-gray-400">
            No links available
          </p>
        )}
      </nav>
    </div>
  );
};

export default SidePanel;
