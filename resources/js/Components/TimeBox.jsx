import React from 'react';
import uniqid from 'uniqid';

import { CountdownCircleTimer } from 'react-countdown-circle-timer'

// POMODORO Components
import TimeController from './TimeController'

// MUI Components
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';


export default function TimeBox( props ){
	const [prevTimeStatus, setPrevTimeStatus] = React.useState( null );
	const [timeStatus, setTimeStatus] = React.useState( 'pause' );
	const [initTimeDuration, setInitTimeDuration] = React.useState( 11 );
	const [timeDuration, setTimeDuration] = React.useState( initTimeDuration );
	const [timeMessage, setTimeMessage] = React.useState( null );

	const handleControllerClick = React.useCallback(buttonName => {
		if( timeStatus !== 'restart' ) setPrevTimeStatus( timeStatus );

		setTimeStatus(() => buttonName);
	}, [timeStatus, prevTimeStatus]);

	const shouldClockPlay = React.useMemo(() => (
		timeStatus === 'play' ||
		(timeStatus === 'restart' && prevTimeStatus === 'play')
		), [timeStatus, prevTimeStatus]);

	const clockKey = React.useMemo(() => {
		if( timeStatus === 'restart' || timeStatus === 'stop' ){
			return uniqid();
		}
	}, [timeStatus]);


	React.useEffect(() => {
		if( timeStatus === 'restart' ){
			setTimeStatus( prevTimeStatus );
		}
	}, [timeStatus, prevTimeStatus]);

	return(
		<div className="w-full min-w-[440px] h-fit text-[color:var(--tertiary-color)]">
			<div className="w-full h-[50%] min-h-[200px] max-h-[500px] flex flex-col sm:flex-row items-center justify-between">
				<div className="w-fit sm:w-[calc(100%/3)] h-fit p-[5px] flex flex-row sm:flex-col p-[10px]">
					<Button size="small" sx={{ color: 'var(--tertiary-color)' }}>Pomodoro</Button>
					<Button size="small" sx={{ color: 'var(--tertiary-color)' }}>Short Break</Button>
					<Button size="small" sx={{ color: 'var(--tertiary-color)' }}>Long Break</Button>
				</div>
				<div className="w-[calc(100%/3)] p-[10px] flex items-center	justify-center timer-wrapper">
					<CountdownCircleTimer
						key={clockKey}
						isPlaying={shouldClockPlay}
					    duration={timeDuration}
					    colors={["#70DBFF", "#9470FF", "#70FF94", "#A30000"]}
						colorsTime={[Math.floor( timeDuration * 1 ), Math.floor( timeDuration * 0.9 ), Math.floor( timeDuration * 0.5 ), 0]}
					    onUpdate={remainingTime => {
					    	if( remainingTime === Math.floor( timeDuration * 1 )){
					    		setTimeMessage( `Let's do this! 💪` );
					    	}
					    	else if( remainingTime === Math.floor( timeDuration * 0.9 )){
					    		setTimeMessage( 'You can do this! 👍' );
					    	}
					    	else if( remainingTime === Math.floor( timeDuration * 0.5 )){
					    		setTimeMessage( 'You are almost there! ⏳' );
					    	}
					    	else if( remainingTime === Math.floor( timeDuration * 0.2 )){
					    		setTimeMessage( 'A little bit more! 💣' );
					    	}
					    	else if( !remainingTime ){
					    		setTimeMessage( 'Well done! 🎉' );
					    	}
					    }}
					>
						{ renderTime }
					</CountdownCircleTimer>
				</div>
				<div className="w-[calc(100%/3)] p-[10px] flex justify-center align-center transition ease-in-out">
					<TimeController onClick={handleControllerClick}/>
				</div>
			</div>
			<div className="border-y p-2 text-center">
				<h1 className="uppercase font-bold transition">
					{ timeMessage }
				</h1>
			</div>
		</div>
	);
}

const renderTime = ({ remainingTime }) => {
	const currentTime = React.useRef( remainingTime );
	const prevTime = React.useRef( null );
	const isNewTimeFirstTick = React.useRef( false );
	const [, setOneLastRerender] = React.useState( 0 );

	if( currentTime.current !== remainingTime ) {
		isNewTimeFirstTick.current = true;
		prevTime.current = currentTime.current;
		currentTime.current = remainingTime;
	} 
	else {
		isNewTimeFirstTick.current = false;
	}

	// force one last re-render when the time is over to tirgger the last animation
	if (remainingTime === 0) {
		setTimeout(() => {
			setOneLastRerender((val) => val + 1);
		}, 20);
	}

	const isTimeUp = isNewTimeFirstTick.current;

	return (
		<div className="time-wrapper font-bold">
			<div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
				{ remainingTime }
			</div>
			{
				prevTime.current !== null && (
					<div
						key={prevTime.current}
						className={`time ${!isTimeUp ? "down" : ""}`}
					>
						{ prevTime.current }
					</div>
				)
			}
		</div>
	);
};