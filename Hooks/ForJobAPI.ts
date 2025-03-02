export function JobTransform(value: string) {
    // List of keywords to check for
    const keywords = ["Developer", "Manager", "Analyst", "Engineer", "Architect", "Administrator", "Scientist"];
    
    // Check if the value contains any of the keywords
    let containsKeyword = keywords.some(keyword => value.includes(keyword));
    
    if (containsKeyword) {
      // Remove any of the specified keywords from the value
      let valueWithoutKeyword = value;
      keywords.forEach(keyword => {
        valueWithoutKeyword = valueWithoutKeyword.replace(` ${keyword}`, "");
      });
  
      // Split the value into words, convert them to lowercase, and join with underscores
      let transformedValue = valueWithoutKeyword.split(' ').map(word => word.toLowerCase()).join('_');    
      return transformedValue;
    } else {
      return value;
    }
  }
  