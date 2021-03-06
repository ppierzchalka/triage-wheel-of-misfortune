import { Participants } from '../WheelOfMisfortune/WheelOfMisfortune';

const colors = [
    '#ef5350',
    '#f44336',
    '#e53935',
    '#d32f2f',
    '#ec407a',
    '#e91e63',
    '#d81b60',
    '#c2185b',
    '#ab47bc',
    '#9c27b0',
    '#8e24aa',
    '#7b1fa2',
    '#673ab7',
    '#5e35b1',
    '#512da8',
    '#4527a0',
    '#3f51b5',
    '#3949ab',
    '#303f9f',
    '#283593',
    '#2196f3',
    '#1e88e5',
    '#1976d2',
    '#1565c0',
    '#03a9f4',
    '#039be5',
    '#0288d1',
    '#0277bd',
    '#00bcd4',
    '#00acc1',
    '#0097a7',
    '#00838f',
    '#009688',
    '#00897b',
    '#00796b',
    '#00695c',
    '#4caf50',
    '#43a047',
    '#388e3c',
    '#2e7d32',
    '#8bc34a',
    '#7cb342',
    '#689f38',
    '#558b2f',
    '#cddc39',
    '#c0ca33',
    '#afb42b',
    '#9e9d24',
    '#ffeb3b',
    '#fdd835',
    '#fbc02d',
    '#f9a825',
    '#ffc107',
    '#ffb300',
    '#ffa000',
    '#ff8f00',
    '#ff9800',
    '#fb8c00',
    '#f57c00',
    '#ef6c00',
    '#ff5722',
    '#f4511e',
    '#e64a19',
    '#d84315',
];

const getRandomColor = () => {
    const colorsCount = colors.length;
    const randomColorNumber = Math.floor(Math.random() * (colorsCount - 0 + 1));
    return colors[randomColorNumber];
};

const shuffleArray = (array: any[]) => {
    return array.reduce((acc, _curr, i) => {
        const j = Math.floor(Math.random() * i);
        const temp = acc[i];
        acc[i] = acc[j];
        acc[j] = temp;
        return array;
    }, array);
};

export const prepareParticipantsData = (participants: string[]): Participants =>
    shuffleArray(participants).map((participant) => ({
        text: participant,
        fillStyle: getRandomColor(),
    }));
