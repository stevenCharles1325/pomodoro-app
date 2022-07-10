import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

// MUI Components
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';

// APP Components
import TimeBox from '../Components/TimeBox';
import TaskBox from '../Components/TaskBox';

export default function App(props) {
    return (
        <>
            <div className="flex flex-col h-screen w-screen bg-[color:var(--primary-color)]">
                <div className="px-5  h-[50px] shadow-md border-b-1 border-[color:var(--tertiary-color)] flex items-center justify-between">
                    <h5 className="uppercase font-bold text-[color:var(--secondary-color)]">
                        pomodoro
                    </h5>
                    {
                        props.auth.user 
                            ? (
                                <Button>
                                    Sign-out
                                </Button>
                                ) 
                            : (
                                <>
                                    <ButtonGroup size="small" variant="text">
                                        <Button>
                                            Sign-in
                                        </Button>
                                        <Button>
                                            Sign-up
                                        </Button>
                                    </ButtonGroup>
                                </>
                            )
                    }
                </div>
                <div className="grow p-[20px] grid grid-flow-row gap-5 md:grid-flow-col">
                    <TimeBox/>
                    <TaskBox/>
                </div>
            </div>
        </>
    );
}
