import soldier from '../assets/soldier.png';
import commander from '../assets/commander.png';
import mvp from '../assets/mvp.png';

export const titles = [
    soldier,
    commander,
    mvp,
]

export const chats = [
    {
        name: 'Bunker Labs — secret drops, early missions',
        description: 'Join our bunker labs for exclusive drops and early missions.',
        type: 'public',
        key: 'bunker_labs',
        color: '#ff0000',
    },
    {
        name: 'Trench Warfare — strategy and tactics',
        description: 'Discuss strategies and tactics for trench warfare.',
        type: 'public',
        key: 'trench_warfare',
        color: '#00ff00',
    },
    {
        name: 'Battlefield Heroes — share your victories',
        description: 'Share your victories and battle stories with fellow heroes.',
        type: 'public',
        key: 'battlefield_heroes',
        color: '#0000ff',
    },
    {
        name: 'Command Center — elite tactics and operations',
        description: 'Discuss elite tactics and operations in the command center.',
        type: 'public',
        key: 'command_center',
        color: '#ff00ff',
    },
    //secret chats
    {
        name: 'Top Secret Missions — classified operations',
        description: 'Join our top secret missions for classified operations.',
        type: 'secret',
        key: 'top_secret_missions',
        color: '#ff00ff',
    },
    {
        name: 'Elite Commanders — strategy and tactics',
        description: 'Discuss strategies and tactics with elite commanders.',
        type: 'secret',
        key: 'elite_commanders',
        color: '#ffff00',
    },
    {
        name: 'Battlefield Legends — share your victories',
        description: 'Share your victories and battle stories with battlefield legends.',
        type: 'secret',
        key: 'battlefield_legends',
        color: '#00ffff',
    },
    {
        name: 'War Room — elite tactics and operations',
        description: 'Discuss elite tactics and operations in the war room.',
        type: 'secret',
        key: 'war_room',
        color: '#ff0000',
    }
]