/**
 * @module Validation
 * @description This module provides functions for validating user input, including
 * text input and the structure of JSON objects.
 */

/**
 * @function validateInput
 * @description Validates whether the given input text is non-empty after trimming whitespace.
 * @param {string} text - The text input to validate. Can be any string, null, or undefined.
 * @returns {boolean} True if the input is non-null, non-undefined, and non-empty after trimming, false otherwise.
 * @example 
 * validateInput("Hello"); // Returns true
 * validateInput(""); // Returns false
 * validateInput("   "); // Returns false
 * validateInput(null); // Returns false
 * validateInput(undefined); // Returns false
 */
function validateInput(text) {
  // Handle null or undefined inputs: Return false if the input is null or undefined.
  if (text === null || text === undefined) return false;
  // Trim whitespace from both ends of the string and check if the length is greater than 0.
  return text.trim().length > 0;
}

/**
 * @function validateJsonStructure
 * @description Validates whether the given data object contains all the keys specified in the structure array.
 * @param {object} data - The object to validate. Must be a non-null object.
 * @param {string[]} structure - An array of strings representing the required keys. Must be a non-null array.
 * @returns {boolean} True if the data object is valid and contains all the keys, false otherwise.
 * @example 
 * const data = { name: "John", age: 30 };
 * const structure = ["name", "age"];
 * validateJsonStructure(data, structure); // Returns true
 * const structure2 = ["name", "address"];
 * validateJsonStructure(data, structure2); // Returns false
 * validateJsonStructure(null, structure); // Returns false
 * validateJsonStructure({}, structure); // Returns false
 */
function validateJsonStructure(data, structure) {
  // Handle invalid inputs: Return false if data or structure is null, undefined, or of the wrong type.
  if (data === null || data === undefined || typeof data !== 'object' || structure === null || structure === undefined || !Array.isArray(structure)) return false
  // Iterate over each required key in the structure.
  for (const key of structure) {
    // If the data object does not have the current key, return false.
    if (!data.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

// Export the validation functions for use in other modules.
module.exports = {
  validateInput,
  validateJsonStructure
};