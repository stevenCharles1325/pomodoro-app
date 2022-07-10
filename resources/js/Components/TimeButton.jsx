import React from 'react';

// MUI Components 
import IconButton from '@mui/material/IconButton';

const TimeButton = props => {
	const [isClicked, setIsClicked] = React.useState( false );

	const memoizedPomodoroButton = React.useCallback(() => {
		setIsClicked( !isClicked );
		props?.onClick?.( !isClicked );
	}, [isClicked, props]);

	const handlePomodoroButton = e => {
		e.stopPropagation();
		memoizedPomodoroButton();
	}

	return(
		<>
			<IconButton onClick={handlePomodoroButton}>
				{ props?.icon }
			</IconButton>
		</>
	);
}

export default TimeButton;