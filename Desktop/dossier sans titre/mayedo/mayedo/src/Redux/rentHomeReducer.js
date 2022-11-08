const initialState = {
    rentHomes: [
            {   name: 'Belle Villa Meublée de 6 Pièces ',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'5500000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-23-at-13.18.16-525x328.jpeg",
                id:1,
            },
        
            {   name: 'Belle Villa Meublée de 6 Pièces',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'5500000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-13-at-11.44.48-525x328.jpeg",
                id:2,
            },
        
            {   name: 'Belle Villa Meublée de 6 Pièces',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'2000000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-06-22-at-15.48.25-525x328.jpeg",
                id:3,
            },
            {   name: 'Belle Villa Meublée de 6 Pièces ',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'5500000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.26.05-525x328.jpeg",
                id:4,
            },  
            {   name: 'Belle Villa Meublée de 6 Pièces',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'119000000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.24.51-525x328.jpeg",
                id:5,
            },
            {   name: 'Belle Villa Meublée de 6 Pièces',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'119000000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-15-at-11.04.35-525x328.jpeg",
                id:6,
            },
            {   name: 'Belle Villa Meublée de 6 Pièces ',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'5500000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.26.05-525x328.jpeg",
                id:7,
            },  
            {   name: 'Belle Villa Meublée de 6 Pièces',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'119000000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-28-at-12.24.51-525x328.jpeg",
                id:8,
            },
            {   name: 'Belle Villa Meublée de 6 Pièces',
                project:'Riviera Golf 4',
                description: 'Belle villa meublée haut standing située à Songon  Riviera Golf 4  à proximité du lycée Blaise Pascal,',
                prices :'119000000',
                img :"https://isis-immobilier.com/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-15-at-11.04.35-525x328.jpeg",
                id:9,
            }, 
    ],
}

export function rentHomeReducer(state = initialState, action) {
    switch (action.type) {
        case "GET-RENT-HOMES": {
            return {
                ...state,rentHomes : action.payload
            }
        }
        default: {
            return state
        }
    }
  
}