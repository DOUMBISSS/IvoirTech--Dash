


const initialState = {
    prestations: [
        {
            id:1,
            name: 'Nettoyage Grand ménage',
            description : 'Offrez à votre intérieur un nettoyage en profondeur : cuisine, chambres, meubles, locaux, surfaces, et dépoussiérage inclus. Service complet à partir de 60 000 FCFA par prestation. Pour un espace impeccable et frais !',
            prest:['Nettoyage fenêtres/stores/murs', 'Nettoyage complet cuisine/chambres' , 
            'Nettoyage meubles/locaux', 'Nettoyages des surfaces/dépoussierage'],
            prices :'60 000 FCFA/prestation',
            img :'femme.avif',
        },
        {
            id:2,
            name: 'Nettoyage Standard',
            description : 'Nous proposons un entretien régulier de vos bureaux, aires communes, sanitaires, cuisines, chambres, meubles et locaux. Le service inclut également le dépoussiérage et le nettoyage des surfaces pour un environnement propre et agréable au quotidien.',
            prest:['Nettoyage régulier de bureau,des aires communes et des sanitaires', 'Nettoyage cuisine/chambres/meubles','Nettoyage meubles/locaux',
        'Nettoyages des surfaces/dépoussierage'],
            prices :'70 000 FCFA/Mois',
            img :'sourire.avif',
        },
        {
            id:3,
            name: 'Nettoyage Résidentiel',
            description : 'Nous offrons un entretien régulier de votre maison, incluant le dépoussiérage des surfaces ainsi que le nettoyage complet des cuisines, chambres et meubles. Pour un intérieur toujours impeccable !',
            prest:['Nettoyage régulier des surfaces/depoussierages', 'Nettoyage cuisine/chambres/meubles','Nettoyage fenêtres/stores/murs'],
            prices :'30 000 FCFA/Mois',
            img :'fem.avif',
        },
        {
            id:4,
            name: 'Nettoyage Bureaux',
            description : 'Un service dédié pour vos espaces professionnels : nettoyage des bureaux, locaux d’archives, sols, meubles et vitres. Offrez à votre environnement de travail un aspect propre et soigné !',
            prest:['Nettoyage bureaux/locaux archives','Nettoyage sols/meubles/vitres','Vidage des corbeilles à papier'],
            prices :'60 000 FCFA/Mois',
            img :'plein.avif',
        },
        {
            id:5,
            name: 'Nettoyage espaces extérieurs',
            description : 'Nous assurons un entretien régulier de vos espaces extérieurs, parkings et terrasses, incluant l’élimination des débris pour un environnement extérieur propre et accueillant.',
            prest:['Nettoyage régulier des espaces extérieures/parkings/terrasses', 'Elimination des débris extérieurs'],
            prices :'20 000 FCFA/prestation',
            img :'jardinier.avif',
        },
        {
            id:6,
            name: 'Nettoyage spécifiques',
            description : 'Un service adapté pour vos besoins après travaux ! Nous effectuons le nettoyage complet des espaces après rénovations ou constructions pour un rendu propre et prêt à l’usage.',
            prest:['Nettoyage des travaux de rénovations/constructions'],
            prices :'100 000 FCFA/prestation',
            img :'asiatique.avif',
        },
        {
            id:7,
            name: 'Nettoyage Fauteuils',
            description : 'Nous proposons un nettoyage professionnel de vos fauteuils pour éliminer les taches, la poussière et redonner éclat et fraîcheur à votre mobilier.',
            prest:['Nettoyage des fauteuils'],
            prices :'15 000 FCFA/prestation',
            img :'fauteil.avif',
        },
        {
            id:8,
            name: 'Nettoyage Simples',
            description : 'Nous assurons le nettoyage efficace de vos moquettes et tapis, éliminant poussière, taches et allergènes pour un intérieur propre et sain.',
            prest:['Nettoyage des moquettes/tapis'],
            prices :'10 000 FCFA/prestation',
            img :'fauteil.avif',
        },
        {
            id:9,
            name: 'Nettoyage évènementiel',
            description : 'Assurez la propreté et l’ordre après vos réunions, conférences, réceptions ou événements grâce à un service rapide et efficace.',
            prest:['Nettoyage après des réunions/conférences/évènements/receptions...', 'Gestion rapide des déchets générés lors d'+ 'évènements'],
            prices :'50 000 FCFA/prestation',
            img :'plein-coup.avif',
        },
        ],

    offres : [
        {
            id:1,
            name: 'Nettoyage Grand ménage',
            description:['Nettoyage fenetres/stores/murs', 'Nettoyage complet cuisine/chambres' , 
            'Nettoyage meubles/locaux', 'Nettoyages des surfaces/dépoussierage'
            ],
            prices :'80 000 FCFA/prestation',
            img :'femme.avif',
        },
        {
            id:2,
            name: 'Nettoyage Standard',
            description:['Nettoyage régulier de bureau,des aires communes et des sanitaires', 'Nettoyage cuisine/chambres/meubles','Nettoyage meubles/locaux',
        'Nettoyages des surfaces/dépoussierage'],
            prices :'100 000 FCFA/Mois',
            img :'sourire.avif',
        },
        {
            id:3,
            name: 'Nettoyage Résidentiel',
            description:['Nettoyage régulier des surfaces/depoussierages', 'Nettoyage cuisine/chambres/meubles',],
            prices :'30 000 FCFA/Mois',
            img :'fem.avif',
        },
        {
            id:4,
            name: 'Nettoyage Bureaux',
            description:['Nettoyage bureaux/locaux archives','Nettoyage sols/meubles/vitres'],
            prices :'80 000 FCFA/prestation',
            img :'plein.avif',
        },

    ]
    
}

export function prestationReducer(state = initialState, action) {
    switch (action.type) {
        case "GET-NEW-USER": {
            return {
                ...state,user : action.payload
            } 
        }
        case "GET-USER": {
            return action.payload
        }
        default: {
            return state
        }
    }
  
}