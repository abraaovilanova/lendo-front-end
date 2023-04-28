export function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
  
    var matrix = [];
  
    // Initialize the matrix
    for (var i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    for (var j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (var i = 1; i <= b.length; i++) {
      for (var j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            )
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
  

  export function similarityInPercent(maxLength, distance){
    return (maxLength - distance) / maxLength * 100
  }

  export function similarityCheck(textString, voiceString) {
    var distance = levenshteinDistance(textString, voiceString);
    var maxLength = Math.max(textString.length, voiceString.length);
    return similarityInPercent(maxLength, distance);
  }