import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', ()=>{
   describe('setEntries', ()=>{
       it('adds the entries to the state', ()=>{
           const state = new Map();
           const entries = List.of('Trainspotting', '28 Days later');
           const nextState = setEntries(state, entries);

           expect(nextState).to.equal(Map({
               entries: List.of('Trainspotting', '28 Days later')
           }));
       });

       it('converts to immutable', ()=>{
           const state = Map();
           const entries = ['Trainspotting', '28 Days later'];
           const nextState = setEntries(state, entries);
           expect(nextState).to.equal(
               Map({
                   entries: List.of('Trainspotting', '28 Days later')
               })
           );

       });

   });

   describe('next', ()=>{
      it('takes the next to entries under vote', ()=>{
         const state = Map({
             entries: List.of('Trainspotting', '28 Days later', 'Sunshine')
         });

          const nextState = next(state);
          expect(nextState).to.equal(
              Map({
                  vote: Map({
                      pair: List.of('Trainspotting', '28 Days later')
                  }),
                  entries: List.of('Sunshine'),
              })
          );
      });

       it('it adds to the existing tally the voted entry', ()=>{
           const state = Map({
               pair: List.of('Trainspotting', '28 Days later'),
               tally: Map({
                   'Trainspotting': 4,
                   '28 Days later': 2
               })
           });

           const nextState = vote(state, 'Trainspotting');

           expect(nextState).to.equal(
               Map({
                   pair: List.of('Trainspotting', '28 Days later'),
                   tally: Map({
                       'Trainspotting': 5,
                       '28 Days later': 2
                   })
               })
           );
       });

       it('it puts the winner back to the entries', ()=>{
           const state = Map({
               vote: Map({
                   pair: List.of('Trainspotting', '28 Days later'),
                   tally: Map({
                       'Trainspotting': 4,
                       '28 Days later': 2
                   })
               }),
               entries: List.of('Sunshine', 'Millions', '127 Hours')
           });

           const nextState = next(state);

           expect(nextState).to.equal(
               Map({
                   vote: Map({
                       pair: List.of('Sunshine', 'Millions'),
                   }),
                   entries: List.of('127 Hours', 'Trainspotting')
               })

           );
       });

   });

    describe('vote', ()=>{
        it('creates a tally for the voted entry', ()=>{
            const state = Map({
                pair: List.of('Trainspotting', '28 Days later'),
            });

            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(Map({
                    pair: List.of('Trainspotting', '28 Days later'),
                    tally: Map({
                        'Trainspotting': 1
                    })
            }));
        });

        it('marks winner when one just one entry left', ()=>{
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days later'),
                    tally: Map({
                        'Trainspotting': 222,
                        '28 Days later': 3
                    })
                }),
                entries: List()
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }));

        });

    });

    describe('it puts tied both back to the list of entries', ()=>{
        const state = Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days later'),
                tally: Map({
                    'Trainspotting': 2,
                    '28 Days later': 2
                })
            }),
            entries: List.of('Sunshine', 'Millions', '127 Hours')
        });

        const nextState = next(state);

        expect(nextState).to.equal(
            Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions'),
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days later')
            })
        );
    });

});