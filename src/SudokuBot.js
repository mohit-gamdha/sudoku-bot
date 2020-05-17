import React,{ useState, useCallback }from 'react';
import './SudokuBot.css';
import SudokuGrid from './SudokuGrid.js';
function SudokuBot() {


  const [ gridArray, setGridArray ] = useState(Array(81).fill(""));

  const editGrid = useCallback((value, index)=>{
    let editedGridArray = [...gridArray];
    editedGridArray[index]=value;
    setGridArray(editedGridArray);
  })

  let error=" BAD SUDOKU!!! ",showError=false;
  
  function solveSudokuUtil(){
    let sudoku = [];
    for(let i=0;i<10;i++){
      sudoku.push(gridArray.slice(i*9,(i+1)*9));
    }

    if(solveSudoku(sudoku)){
      setGridArray(sudoku.join().split(','));
      showError=false;
    }
    else{
      showError = true;
    }
  }

  function solveSudoku(sudoku){
    if(!sudoku)
      return;

    let row,col,emptyBoxFound=0;
    const N=9;
    for(row=0;row<N;row++)
    {
      for(col=0;col<N;col++)
      {
        if(sudoku[row][col]=="")
        {
          emptyBoxFound=1;
          break;
        }
      }
      if(emptyBoxFound==1)
        break;
    }

    if(emptyBoxFound==0)
      return true;

    for(let val=1;val<=N;val++)
    {
      if(isSafe(sudoku,row,col,val))
      {
        sudoku[row][col]=val;
        if(solveSudoku(sudoku))
          return true;

        sudoku[row][col]="";
      }
    }
    return false;
  }

  function isSafe(sudoku,row,col,val){
    let i,j;
    let N=9;
    //Check if column and row is safe
    for(i=0;i<N;i++){
      if(sudoku[i][col]==val)
        return false;
      if(sudoku[row][i]==val)
        return false;
    }
    //Check if box is safe
    let r = row - row%(parseInt(Math.sqrt(N)));
    let c = col - col%(parseInt(Math.sqrt(N)));
    for(i=0;i<(parseInt(Math.sqrt(N)));i++)
    {
      for(j=0;j<(parseInt(Math.sqrt(N)));j++)
      {
        if(sudoku[i+r][j+c]==val)
          return false;
      }
    }
    return true;
  }

  function clearGrid(){
    setGridArray(Array(81).fill(""));
  }

  return (
    <div className="root">
      <div>
        <h1>Sudoku Bot</h1>
        <div className='error-container'>
          {showError && error}
        </div>
      </div>
      <div className="grid-container">
        <SudokuGrid gridArray={gridArray} editGrid={editGrid} />
      </div>
      <div className='button-container'>
        <input className="button" style={{borderRadius:'5px', background: '#4caf50'}} type='button' value='Solve' onClick={solveSudokuUtil}/>
        <input className="button" style={{borderRadius:'5px', background: '#008cba'}} type='button' value='Clear' onClick={clearGrid}/>
      </div>
    </div>
  );
}

export default SudokuBot;
