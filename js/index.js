import { addNote, closeModal } from './modal.mjs';
import { tagFunctions } from './tags.mjs';
import { displayCards, editCards } from './noteCards.mjs';

tagFunctions();

addNote();
closeModal();
displayCards();
editCards();


