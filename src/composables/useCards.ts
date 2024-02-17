import type {Card} from "@/ts";
import {Api} from "@/api";


export function useCards() {
    const cards = useState<Card[] | []>('cards', () => []);

    const getCards = async () => {
        try {
            const res = await Api.cards.getCards();

            if (res) {
                cards.value = res;
            }
        } catch (e) {
            console.error(e)
            cards.value = [];
        }
    }
    return {cards, getCards};
}
