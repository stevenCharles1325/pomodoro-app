import React from 'react';

// POMODORO Components
import TimeButton from './TimeButton'
import TimePlayButton from './TimePlayButton'

// MUI Icons
import ReplayIcon from '@mui/icons-material/Replay';
import StopIcon from '@mui/icons-material/Stop';

const TimeController = props => {
	const [isResetPlayButton, setIsResetPlayButton] = React.useState( false );

	const handleOnClick = buttonName => {
		if( buttonName === 'stop' ) setIsResetPlayButton(() => true);
		if( buttonName === 'play' ) setIsResetPlayButton(() => false);

		props?.onClick?.( buttonName );
	}

	return(
		<div className="w-fit h-fit p-[5px] flex flex-row sm:flex-col justify-center items-center">
			<TimePlayButton 
				isReset={isResetPlayButton}
				onClick={isClicked => handleOnClick( isClicked ?  'play' : 'pause' )}
			/>

			{/*Replay*/}
			<TimeButton icon={<ReplayIcon/>} onClick={() => handleOnClick('restart')}/>

			{/*Stop*/}
			<TimeButton icon={<StopIcon/>} onClick={() => handleOnClick('stop')}/>
		</div>
	);
}


export default TimeController;