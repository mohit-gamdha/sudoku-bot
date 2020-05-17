import React, {  } from 'react';

function SudokuGrid(props){

	const { gridArray } = props;
	let grid = [];
	for(let i=0;i<9;i++){
		grid.push(gridArray.slice(i*9,(i+1)*9));
	}

	const colorArray = ['#f7bbb7', '#f7bbb7', '#f7bbb7', '#d8f7b7', '#d8f7b7' , '#d8f7b7' , '#93bded', '#93bded', '#93bded',
						'#f7bbb7', '#f7bbb7', '#f7bbb7', '#d8f7b7' , '#d8f7b7', '#d8f7b7', '#93bded', '#93bded', '#93bded',
						'#f7bbb7', '#f7bbb7', '#f7bbb7', '#d8f7b7', '#d8f7b7', '#d8f7b7', '#93bded', '#93bded', '#93bded',
						'#e5a2f2', '#e5a2f2', '#e5a2f2', '#f2c9f2', '#f2c9f2', '#f2c9f2', '#ffa64d', '#ffa64d', '#ffa64d',
						'#e5a2f2', '#e5a2f2', '#e5a2f2', '#f2c9f2', '#f2c9f2', '#f2c9f2', '#ffa64d', '#ffa64d', '#ffa64d', 
						'#e5a2f2', '#e5a2f2', '#e5a2f2', '#f2c9f2', '#f2c9f2', '#f2c9f2', '#ffa64d', '#ffa64d', '#ffa64d',
						'#e085c2', '#e085c2', '#e085c2', '#79d279', '#79d279', '#79d279', '#ff3333', '#ff3333', '#ff3333',
						'#e085c2', '#e085c2', '#e085c2', '#79d279', '#79d279', '#79d279', '#ff3333', '#ff3333', '#ff3333',
						'#e085c2', '#e085c2', '#e085c2', '#79d279', '#79d279', '#79d279', '#ff3333', '#ff3333', '#ff3333']
	return (
		<div className="sudoku-grid">
		{
			grid.map((row,i)=>{
				return <div key={"row"+i} className="row">
				{
					row.map((cell,j)=>{
						return <input 
							key={"cell"+j+"of row"+i}
							type="text"
							onChange={(event)=>props.editGrid(event.target.value,i*9+j)}
							className="cell" 
							value={gridArray[i*9+j]} 
							style={{backgroundColor:colorArray[i*9+j]}}/>
					})
				}
				</div>
			})
		}
		</div>
	);
}

export default SudokuGrid;