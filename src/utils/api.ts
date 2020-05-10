const dummyData = {
    przemyslawPierzchalka: {
        id: 'przemyslawPierzchalka',
        firstName: 'Przemyslaw',
        lastName: 'Pierzchalka',
        teams: {
            designer: {
                id: 'designer',
                teamName: 'Designer Team',
                members: [
                    'przemyslawPierzchalka',
                    'jakubMankowski',
                    'patrycjaKurasik',
                    'olgaSzczepaniak',
                    'adamTomczak',
                ],
            },
            dashboard: {
                id: 'dashboard',
                teamName: 'Dashboard Team',
                members: ['marcinObiedzinski', 'piotrGoruszewski', 'maciejBlim', 'lukaszMarciniak'],
            },
            charts: {
                id: 'charts',
                teamName: 'Charts Team',
                members: ['piotrLukomiak', 'marcinNerling', 'michalKrzeszowiec'],
            },
            ui: {
                id: 'ui',
                teamName: 'UI Team',
                members: ['stanislawKaczorowski', 'damianSzkodzinski'],
            },
            qa: {
                id: 'qa',
                teamName: 'QA Team',
                members: ['marcinKosinski', 'beataKarkowska'],
            },
        },
        members: {
            przemyslawPierzchalka: {
                id: 'przemyslawPierzchalka',
                firstName: 'Przemyslaw',
                lastName: 'Pierzchalka',
            },
            jakubMankowski: {
                id: 'jakubMankowski',
                firstName: 'Jakub',
                lastName: 'Mankowski',
            },
            patrycjaKurasik: {
                id: 'patrycjaKurasik',
                firstName: 'Patrycja',
                lastName: 'Kurasik',
            },
            olgaSzczepaniak: {
                id: 'olgaSzczepaniak',
                firstName: 'Olga',
                lastName: 'Szczepaniak',
            },
            adamTomczak: {
                id: 'adamTomczak',
                firstName: 'Adam',
                lastName: 'Tomczak',
            },
            marcinObiedzinski: {
                id: 'marcinObiedzinski',
                firstName: 'Marcin',
                lastName: 'Obiedzinski',
            },
            piotrGoruszewski: {
                id: 'piotrGoruszewski',
                firstName: 'Piotr',
                lastName: 'Goruszewski',
            },
            maciejBlim: {
                id: 'maciejBlim',
                firstName: 'Maciej',
                lastName: 'Blim',
            },
            lukaszMarciniak: {
                id: 'lukaszMarciniak',
                firstName: 'Lukasz',
                lastName: 'Marciniak',
            },
            piotrLukomiak: {
                id: 'piotrLukomiak',
                firstName: 'Piotr',
                lastName: 'Lukomiak',
            },
            marcinNerling: {
                id: 'marcinNerling',
                firstName: 'Marcin',
                lastName: 'Nerling',
            },
            michalKrzeszowiec: {
                id: 'michalKrzeszowiec',
                firstName: 'Michal',
                lastName: 'Krzeszowiec',
            },
            stanislawKaczorowski: {
                id: 'stanislawKaczorowski',
                firstName: 'Stanislaw',
                lastName: 'Kaczorowski',
            },
            damianSzkodzinski: {
                id: 'damianSzkodzinski',
                firstName: 'Damian',
                lastName: 'Szkodzinski',
            },
            marcinKosinski: {
                id: 'marcinKosinski',
                firstName: 'Marcin',
                lastName: 'Kosinski',
            },
            beataKarkowska: {
                id: 'beataKarkowska',
                firstName: 'Beata',
                lastName: 'Karkowska',
            },
        },
    },
};

export const getTeams = (): Promise<string> => {
    return new Promise((res, _rej) => {
        setTimeout(() => res(JSON.stringify(dummyData)), 1000);
    });
};
