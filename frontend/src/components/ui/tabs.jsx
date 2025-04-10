import React from "react";

export function Tabs({ defaultValue, children, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {children.map((child) => {
        if (child.type.displayName === "TabsList") {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type.displayName === "TabsContent" && child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-2 border-b mb-4">
      {children.map((child) =>
        React.cloneElement(child, {
          isActive: child.props.value === activeTab,
          onSelect: () => setActiveTab(child.props.value),
        })
      )}
    </div>
  );
}

export function TabsTrigger({ children, value, isActive, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-200 ${
        isActive ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div>{children}</div>;
}

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";
