import React from 'react';
import uniqid from 'uniqid';
import { TransitionGroup } from 'react-transition-group';

// MUI Components
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';

// MUI Icons
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';


const Task = props => {
	const [isHovering, setIsHovering] = React.useState( false );
	return(
		<div 
			onPointerOver={() => setIsHovering( true )}
			onPointerLeave={() => setIsHovering( false )}
			className="text-[#d5d5d4] capitalize transition ease-in-out cursor-pointer w-full h-[40px] mb-3 rounded bg-[#3d4043] hover:bg-[color:var(--tertiary-color)] flex justify-around items-center"
		>
			{
				isHovering
					?	(<>
							<div className="w-[50px] flex justify-center items-center">
								<CheckCircleOutlineIcon sx={{ color: '#d5d5d4' }}/>
							</div>
							<h1 className="truncate grow outline-none bg-transparent text-[#d5d5d4]">
								{ props?.label ?? "UNKNOWN" }
							</h1>
						</>)
					: 	(<>
							<div className="w-[50px] flex justify-center items-center">
								<RadioButtonUncheckedOutlinedIcon sx={{ color: '#d5d5d4' }}/>
							</div>
							<h1 className="truncate grow outline-none bg-transparent text-[#d5d5d4]">
								{ props?.label ?? "UNKNOWN" }
							</h1>
						</>)
			}
		</div>
	);
}

const TaskBox = props => {
	const [tasks, setTasks] = React.useState( props?.tasks ?? [{ label: 'tae' }] );

	return(
		<div className="bg-[#d5d5d4] p-5 rounded shadow-2xl w-full min-w-[300px] h-full flex flex-col">
			<div className="grow w-full">
				<TransitionGroup>
					{
						tasks.map( task => (
							<Collapse key={uniqid()}>
				            	<Task {...task}/>
				            </Collapse>
						))
					}
				</TransitionGroup>
			</div>
			<div className="h-fit flex justify-center items-center">
				<TextField/>
			</div>
		</div>
	);
}

const TextField = ({ value }) => {
	const [isActive, setIsActive] = React.useState( false );
	const [fieldValue, setFieldValue] = React.useState( value ?? "" );

	const handleInputChange = e => {
		setFieldValue( e.target.value );
	}

	const handleOnBlur = React.useCallback(() => {
		if( !fieldValue.length ) setIsActive( false );
	}, [fieldValue]);

	return(
		<div 
			onClick={() => setIsActive( true )}
			onBlur={handleOnBlur}
			className="transition ease-in-out cursor-text w-full h-[50px] rounded bg-[#3d4043] hover:bg-[color:var(--tertiary-color)] flex justify-around items-center"
		>
			{
				isActive
					? (<>
							<div className="w-[50px] flex justify-center items-center">
								<RadioButtonUncheckedOutlinedIcon fontSize="large" sx={{ color: '#d5d5d4' }}/>
							</div>
							<input 
								autoFocus 
								value={fieldValue}
								className="grow outline-none bg-transparent text-[#d5d5d4]"
								onChange={handleInputChange}
								placeholder="Type your new task here."
							/>
						</>)
					: (<>
							<div className="w-[50px] flex justify-center items-center">
								<AddIcon fontSize="large" sx={{ color: '#d5d5d4' }}/>
							</div>
							<h1 className="grow outline-none bg-transparent text-[#d5d5d4]">
								Add a task
							</h1>
						</>)
			}
		</div>
	);
}

export default TaskBox;