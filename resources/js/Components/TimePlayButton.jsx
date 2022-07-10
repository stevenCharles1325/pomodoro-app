import React from 'react';

// MUI Components
import IconButton from '@mui/material/IconButton';

// MUI Icons
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TimePlayButton = props => {
	const [isPlaying, setIsPlaying] = React.useState( false );

	const icon = React.useMemo(() => (
		!isPlaying || props?.isReset
			? <PlayArrowIcon/>
			: <PauseIcon/> 
	), [isPlaying, props]);

	const memoizedPomodoroButton = React.useCallback(() => {
		setIsPlaying( !isPlaying );
		props?.onClick?.( !isPlaying );
	}, [isPlaying, props]);

	const handlePlayButton = e => {
		e.stopPropagation();
		memoizedPomodoroButton();
	}
	
	React.useEffect(() => {if( props?.isReset ) setIsPlaying( false )}, [props]);
	
	return(
		<>
			<IconButton onClick={handlePlayButton}>
				{ icon }
			</IconButton>
		</>
	);
}


export default TimePlayButton;