export const HTMLField = ({ value, className }) => {
  if (value === null) {
    return <></>;
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: value?.data }}
    ></div>
  );
};

export const hasNonEmptyBlocks = (content) => {
  // Check if current item has Blocks activated and some values
  return Object.keys(content.blocks).length > 0;
};

export const isOldFormat = (content) => {
  // For example News Items have rich text for body text instead of Blocks,
  // but the behavior is activated in order to edit the new items with volto
  return !hasNonEmptyBlocks(content);
};
