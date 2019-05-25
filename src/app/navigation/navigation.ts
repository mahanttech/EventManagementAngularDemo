import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'User Management',
                title    : 'User Management',
                translate: '',
                type     : 'item',
                icon     : 'crop_square',
                url      : '/Users/UserComponent',
               
            },
            {
                id       : 'Event Management',
                title    : 'Event Management',
                translate: '',
                type     : 'item',
                icon     : 'crop_square',
                url      : '/Events/EventComponent',
               
            },
            {
                id       : 'User Report',
                title    : 'User Report',
                translate: '',
                type     : 'item',
                icon     : 'crop_square',
                url      : '/Events/Report',
               
            },
            {
                id       : 'Calendar',
                title    : 'Calendar',
                translate: '',
                type     : 'item',
                icon     : 'crop_square',
                url      : '/calendar',
               
            },
    

        ]
    }
];
