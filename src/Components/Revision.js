import React from 'react';
import Equation from './despejes';
import nerdamer from 'nerdamer/all.min';
import { BlockMath } from 'react-katex';

export default function Revision(props) {
  const { equation, variable } = props;
  const currentEquation = new Equation(equation);
  const [solutionStatus, setSolutionStatus] = React.useState('');

  currentEquation.setEquation();
  const solution = nerdamer(`solve(${equation}, ${variable})`);
  const cleanSolution = solution.toString().replace(/\[|\]/g, '');
  const latexSolution = nerdamer.convertToLaTeX(`${cleanSolution}`);

  function revisar() {
    if (
      currentEquation.eqLeft === cleanSolution ||
      currentEquation.eqRight === cleanSolution
    ) {
      setSolutionStatus('Variable despejada con exito');
    } else {
      setSolutionStatus('Variable pendiente de despejar');
    }
  }

  return (
    <div>
      <button onClick={revisar}>Revisar</button>
      <p>{solutionStatus}</p>
      <BlockMath math={`${variable}=${latexSolution}`} />
    </div>
  );
}
