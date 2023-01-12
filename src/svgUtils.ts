export const translateLabel = (label) => {
  const labelSplit = label.split("_");

  if (labelSplit[labelSplit.length - 2] === "base") {
    return "Base";
  }

  if (labelSplit[labelSplit.length - 2] === "face") {
    return "Face";
  }

  else {
    if (isNaN(labelSplit[1])) {
      return labelSplit.slice(1, labelSplit.length).map(word => word[0].toUpperCase() + word.substr(1)).join(" ");
    }
    return labelSplit.slice(2, labelSplit.length).map(word => word[0].toUpperCase() + word.substr(1)).join(" ");
  }
};

export const parseSVG = (svgData): any => {
  const defs = svgData.match(/\<defs>.*?\<\/defs>/g)
  const parts = [
    ...svgData.match(/\<\/defs>.*?\<defs>/g).map((segment) => segment.substring(7, segment.length - 6))
  ]

  return parts.map((part, index) => ({id: index, data: defs[index] + part}));
}