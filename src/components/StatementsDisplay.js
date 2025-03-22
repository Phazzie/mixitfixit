import React from 'react';

/**
 * @function StatementsDisplay
 * @description Functional component that displays a list of statements.
 * @param {object} props - The component props.
 * @param {Array} props.statements - An array of statement objects to display.
 * @returns {JSX.Element} The StatementsDisplay component.
 */
const StatementsDisplay = ({ statements }) => {
  return (
    <div>
      <h2>Statements</h2>
      <ul>
        {statements.map((statement, index) => (
          <li key={index}>{statement.statement}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatementsDisplay;