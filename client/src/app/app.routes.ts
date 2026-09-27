import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Learn } from './learn/learn';
import { Practice } from './practice/practice';
import { Play } from './play/play';
import { NoteId } from './practice/note-id/note-id';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'learn',
        children: [
            {
                path: '',
                component: Learn
            }
        ]
    },
    {
        path: 'practice',
        children: [
            {
                path: '',
                component: Practice
            },
            {
                path: 'note-id',
                component: NoteId,
            }
        ]
    },
    {
        path: 'play',
        children: [
            {
                path: '',
                component: Play
            }
        ]
    }
];
