// src/hooks/useBlogEditorHandlers.js

const useBlogEditorHandlers = (components, setComponents) => {
  // Add new component
  const handleAddComponent = (type) => {
    const newComponent = {
      type,
      id: new Date().getTime(),
      alignment: 'left',
      ...(type === 'header' ? { level: 'h1' } : {}),  // Add level for headers
    };
    setComponents([...components, newComponent]);
  };

  // Move component up or down
  const handleMoveComponent = (index, direction) => {
    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      const [movedComponent] = newComponents.splice(index, 1);
      newComponents.splice(direction === 'up' ? index - 1 : index + 1, 0, movedComponent);
      return newComponents;
    });
  };

  // Remove a component
  const handleRemoveComponent = (id) => {
    setComponents((prevComponents) => prevComponents.filter((c) => c.id !== id));
  };

  // Update content of a component
  const handleUpdateContent = (id, content) => {
    setComponents((prevComponents) =>
      prevComponents.map((c) => (c.id === id ? { ...c, content } : c))
    );
  };

  // Update alignment of a component
  const handleUpdateAlignment = (id, newAlignment) => {
    setComponents((prevComponents) =>
      prevComponents.map((c) => (c.id === id ? { ...c, alignment: newAlignment } : c))
    );
  };

  // Update header level of a component
  const handleUpdateHeaderLevel = (id, level) => {
    setComponents((prevComponents) =>
      prevComponents.map((c) => (c.id === id ? { ...c, level } : c))
    );
  };

  return {
    handleAddComponent,
    handleMoveComponent,
    handleRemoveComponent,
    handleUpdateContent,
    handleUpdateAlignment,
    handleUpdateHeaderLevel,
  };
};

export default useBlogEditorHandlers;
